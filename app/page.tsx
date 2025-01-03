import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-2 lg:p-4 font-[family-name:var(--font-geist-sans)]">
        <Hero heading="Hello World" subheading="This is a subheading" />
    </div>
  );
}
