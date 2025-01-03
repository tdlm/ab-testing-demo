import { Hero } from "@/components/Hero";

import { getHeroTextVariant } from "@/sanity/lib/helpers/getHeroTextVariant";

export default async function Home() {
  const { heroTitle = 'Fallback Title', heroSubtitle = 'Fallback Subtitle' } = await getHeroTextVariant();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-2 lg:p-4 font-[family-name:var(--font-geist-sans)]">
        <Hero heading={heroTitle} subheading={heroSubtitle} />
    </div>
  );
}
