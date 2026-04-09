import { species } from "@/data/species";
import { SpeciesCard } from "@/components/species/SpeciesCard";
import { Footer } from "@/components/layout/Footer";
import { TreePine, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Species Guide — Yama",
  description:
    "Learn about Colorado's bonsai-relevant tree species, from Rocky Mountain Juniper to ancient Bristlecone Pine.",
};

export default function SpeciesPage() {
  return (
    <div className="page-transition">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 mb-4">
            <TreePine className="h-6 w-6 text-forest" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Colorado Species Guide
            </h1>
          </div>
          <p className="text-lg text-stone-warm leading-relaxed">
            A field guide to the key bonsai-relevant tree species found across
            Colorado&apos;s diverse habitats — from low-elevation foothills junipers
            to ancient high-alpine bristlecone pines.
          </p>
        </div>

        {/* Ethics reminder */}
        <div className="rounded-xl border border-forest/20 bg-forest/5 p-4 sm:p-5 mb-10 flex gap-3">
          <ShieldCheck className="h-5 w-5 text-forest shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-forest mb-1">
              Species Identification Supports Ethical Collecting
            </h3>
            <p className="text-sm text-forest/80 leading-relaxed">
              Understanding species, their habitats, and growth patterns is
              fundamental to responsible yamadori practice. Use this guide to
              learn which species thrive in different conditions, and always
              verify collecting regulations for your specific area and species.
            </p>
          </div>
        </div>

        {/* Species grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {species.map((sp) => (
            <SpeciesCard key={sp.id} species={sp} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
