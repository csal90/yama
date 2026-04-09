import type { Species } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  TreePine,
  Calendar,
  Leaf,
  Star,
} from "lucide-react";
import {
  DIFFICULTY_LABELS,
  SEASON_LABELS,
  formatElevation,
} from "@/lib/utils";

interface SpeciesCardProps {
  species: Species;
}

const suitabilityConfig = {
  excellent: { label: "Excellent", color: "text-emerald-600", stars: 4 },
  good: { label: "Good", color: "text-blue-600", stars: 3 },
  moderate: { label: "Moderate", color: "text-amber-600", stars: 2 },
  limited: { label: "Limited", color: "text-stone-500", stars: 1 },
};

export function SpeciesCard({ species: sp }: SpeciesCardProps) {
  const suit = suitabilityConfig[sp.yamadoriSuitability];

  return (
    <div className="group rounded-xl border border-sand/70 bg-white overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-sand">
      {/* Image placeholder */}
      <div className="aspect-[16/10] bg-gradient-to-br from-forest/10 via-moss/5 to-lichen/10 relative flex items-center justify-center overflow-hidden">
        <TreePine className="h-20 w-20 text-forest/15 group-hover:text-forest/25 transition-colors duration-500 group-hover:scale-110 transform" />
        <div className="absolute top-3 left-3">
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
      </div>

      <div className="p-5 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {sp.commonName}
          </h3>
          <p className="text-sm text-stone-warm italic">{sp.scientificName}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-stone-warm leading-relaxed">
          {sp.description}
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-sand-light/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-warm mb-1">
              <Mountain className="h-3.5 w-3.5" />
              Elevation Range
            </div>
            <div className="text-sm font-semibold text-foreground">
              {formatElevation(sp.elevationRange.min)} –{" "}
              {formatElevation(sp.elevationRange.max)}
            </div>
          </div>
          <div className="rounded-lg bg-sand-light/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-warm mb-1">
              <Calendar className="h-3.5 w-3.5" />
              Best Season
            </div>
            <div className="text-sm font-semibold text-foreground">
              {sp.bestScoutingSeason.map((s) => SEASON_LABELS[s]).join(", ")}
            </div>
          </div>
        </div>

        {/* Habitat */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-bark uppercase tracking-wider mb-1.5">
            <Leaf className="h-3.5 w-3.5 text-moss" />
            Habitat
          </div>
          <p className="text-sm text-stone-warm">{sp.habitatType}</p>
        </div>

        {/* Yamadori suitability */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-bark uppercase tracking-wider mb-1.5">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            Yamadori Suitability
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${suit.color}`}>
              {suit.label}
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < suit.stars
                      ? "text-amber-400 fill-amber-400"
                      : "text-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Styling notes */}
        <div>
          <div className="text-xs font-semibold text-bark uppercase tracking-wider mb-1.5">
            Bonsai Styling Notes
          </div>
          <p className="text-sm text-stone-warm leading-relaxed">
            {sp.stylingNotes}
          </p>
        </div>
      </div>
    </div>
  );
}
