import { Hero } from '@/components/Hero';
import { TrackVariantView } from '@/components/TrackVariantView';

import { getHeroTextVariant } from '@/sanity/lib/helpers/getHeroTextVariant';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const {
        heroTitle = 'Welcome to Redis A/B Testing',
        heroSubtitle = 'We hope you enjoy your time here!',
        _id = '',
    } = await getHeroTextVariant();

    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-2 lg:p-4 font-[family-name:var(--font-geist-sans)]">
            <TrackVariantView variantId={_id}>
                <Hero heading={heroTitle} subheading={heroSubtitle} />
            </TrackVariantView>
        </div>
    );
}
