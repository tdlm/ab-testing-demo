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
    const random = Math.random() * totalWeight;

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

    const heroTextVariant = await client.fetch(HERO_TEXT_VARIANT_BY_ID_QUERY, {
        variantId: selectedHeroTextVariant.variantId,
    });

    if (!heroTextVariant) {
        return {};
    }

    return heroTextVariant;
};
