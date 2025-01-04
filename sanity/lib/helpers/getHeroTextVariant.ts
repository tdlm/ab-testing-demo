import { client } from '@/sanity/lib/client';

import {
    HERO_TEXT_VARIANT_BY_ID_QUERY,
    HERO_TEXT_VARIANT_QUERY,
} from '@/sanity/lib/queries';

export const getHeroTextVariant = async () => {
    const heroTextVariants = await client.fetch(HERO_TEXT_VARIANT_QUERY);

    // Calculate our total weight.
    const totalWeight = heroTextVariants.reduce(
        (sum: number, variant: { distributionWeight: number }) =>
            sum + variant.distributionWeight,
        0
    );

    // Generate a random number between 0 and our total weight.
    const random = Math.random() * Math.max(totalWeight, 100); // NOTE: We need to make sure we go at least to 100.

    // Find our variant based on weight distribution by checking if our random number is less than or equal to our weight sum.
    let weightSum = 0;
    const selectedHeroTextVariant = heroTextVariants.find(
        (variant: { distributionWeight: number }) => {
            weightSum += variant.distributionWeight;
            return random <= weightSum;
        }
    );

    if (!selectedHeroTextVariant) {
        return {};
    }

    // Once we have our selected variant, we need to fetch the actual variant data. This avoids selecting everything
    // all at once.
    const heroTextVariant = await client.fetch(HERO_TEXT_VARIANT_BY_ID_QUERY, {
        variantId: selectedHeroTextVariant.variantId,
    });

    if (!heroTextVariant) {
        return {};
    }

    return heroTextVariant;
};
