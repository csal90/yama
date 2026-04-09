"use client";

import type { ScoutingSpot } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Mountain,
  Footprints,
  Bookmark,
  BookmarkCheck,
  TreePine,
} from "lucide-react";
import {
  ACCESS_TYPE_LABELS,
  ACCESS_TYPE_COLORS,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
  formatElevation,
  formatDistance,
  cn,
} from "@/lib/utils";

interface SpotCardProps {
  spot: ScoutingSpot;
  isSaved?: boolean;
  isActive?: boolean;
  onToggleSave?: () => void;
  onClick?: () => void;
}

export function SpotCard({
  spot,
  isSaved,
  isActive,
  onToggleSave,
  onClick,
}: SpotCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl border bg-white p-4 transition-all duration-200 cursor-pointer",
        isActive
          ? "border-forest/40 shadow-md ring-1 ring-forest/20"
          : "border-sand/70 hover:border-sand hover:shadow-sm"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
            {spot.name}
          </h3>
          <p className="text-xs text-stone-warm mt-0.5 flex items-center gap-1">
            <MapPin className="h-3 w-3 shrink-0" />
            {spot.region}
          </p>
        </div>
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className="shrink-0 p-1.5 rounded-lg hover:bg-sand-light transition-colors"
            aria-label={isSaved ? "Unsave spot" : "Save spot"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-forest" />
            ) : (
              <Bookmark className="h-4 w-4 text-stone-warm/50 group-hover:text-stone-warm" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
            DIFFICULTY_COLORS[spot.difficulty]
          )}
        >
          {DIFFICULTY_LABELS[spot.difficulty]}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
            ACCESS_TYPE_COLORS[spot.accessType]
          )}
        >
          {ACCESS_TYPE_LABELS[spot.accessType]}
        </span>
      </div>

      <p className="text-xs text-stone-warm leading-relaxed line-clamp-2 mb-3">
        {spot.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-stone-warm">
        <span className="flex items-center gap-1">
          <Mountain className="h-3.5 w-3.5" />
          {formatElevation(spot.elevation)}
        </span>
        <span className="flex items-center gap-1">
          <Footprints className="h-3.5 w-3.5" />
          {formatDistance(spot.hikeDistance)}
        </span>
        <span className="flex items-center gap-1">
          <TreePine className="h-3.5 w-3.5" />
          {spot.species.length} species
        </span>
      </div>
    </div>
  );
}
