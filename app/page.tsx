import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SpeciesPreview } from "@/components/landing/SpeciesPreview";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="page-transition">
      <Hero />
      <Features />
      <SpeciesPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
