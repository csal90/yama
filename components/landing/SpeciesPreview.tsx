import Link from "next/link";
import { species } from "@/data/species";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, TreePine } from "lucide-react";
import { DIFFICULTY_LABELS, formatElevation } from "@/lib/utils";

export function SpeciesPreview() {
  const previewSpecies = species.slice(0, 3);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Species guide
            </h2>
            <p className="mt-3 text-lg text-stone-warm max-w-xl">
              Learn about key bonsai-relevant species, from foothills junipers
              to ancient alpine bristlecones.
            </p>
          </div>
          <Link href="/species">
            <Button variant="outline" className="gap-2 shrink-0">
              View All Species
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewSpecies.map((sp) => (
            <div
              key={sp.id}
              className="group rounded-xl border border-sand/70 bg-white overflow-hidden transition-all duration-200 hover:shadow-md hover:border-sand"
            >
              <div className="aspect-[16/9] bg-gradient-to-br from-forest/10 via-moss/5 to-lichen/10 flex items-center justify-center">
                <TreePine className="h-16 w-16 text-forest/20 group-hover:text-forest/30 transition-colors" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {sp.commonName}
                    </h3>
                    <p className="text-xs text-stone-warm italic">
                      {sp.scientificName}
                    </p>
                  </div>
                  <Badge
                    variant={
                      sp.difficulty === "beginner"
                        ? "success"
                        : sp.difficulty === "expert"
                          ? "danger"
                          : sp.difficulty === "advanced"
                            ? "warning"
                            : "info"
                    }
                  >
                    {DIFFICULTY_LABELS[sp.difficulty]}
                  </Badge>
                </div>
                <p className="text-sm text-stone-warm leading-relaxed line-clamp-2 mb-3">
                  {sp.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-stone-warm">
                  <span className="flex items-center gap-1">
                    <Mountain className="h-3.5 w-3.5" />
                    {formatElevation(sp.elevationRange.min)} –{" "}
                    {formatElevation(sp.elevationRange.max)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
