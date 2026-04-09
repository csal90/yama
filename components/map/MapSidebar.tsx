"use client";

import type { ScoutingSpot } from "@/types";
import type { MapFilters } from "@/types";
import { SpotCard } from "@/components/spots/SpotCard";
import { MapFilterPanel } from "@/components/map/MapFilters";
import { SpotDetailDrawer } from "@/components/spots/SpotDetailDrawer";
import { MapPin, TreePine, ChevronLeft } from "lucide-react";

interface MapSidebarProps {
  spots: ScoutingSpot[];
  allSpecies: string[];
  filters: MapFilters;
  searchQuery: string;
  activeFilterCount: number;
  activeSpot: ScoutingSpot | null;
  savedSpotIds: string[];
  onSearchChange: (query: string) => void;
  onFilterChange: <K extends keyof MapFilters>(
    key: K,
    value: MapFilters[K]
  ) => void;
  onResetFilters: () => void;
  onSpotClick: (spot: ScoutingSpot) => void;
  onToggleSave: (spotId: string) => void;
  onCloseDetail: () => void;
}

export function MapSidebar({
  spots,
  allSpecies,
  filters,
  searchQuery,
  activeFilterCount,
  activeSpot,
  savedSpotIds,
  onSearchChange,
  onFilterChange,
  onResetFilters,
  onSpotClick,
  onToggleSave,
  onCloseDetail,
}: MapSidebarProps) {
  if (activeSpot) {
    return (
      <div className="h-full flex flex-col bg-white">
        <SpotDetailDrawer
          spot={activeSpot}
          isSaved={savedSpotIds.includes(activeSpot.id)}
          onToggleSave={() => onToggleSave(activeSpot.id)}
          onClose={onCloseDetail}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-sand/70">
        <div className="flex items-center gap-2 mb-3">
          <TreePine className="h-5 w-5 text-forest" />
          <h2 className="font-semibold text-foreground">Scouting Spots</h2>
          <span className="ml-auto text-xs text-stone-warm bg-sand-light rounded-full px-2.5 py-0.5 font-medium">
            {spots.length} spots
          </span>
        </div>
        <MapFilterPanel
          filters={filters}
          searchQuery={searchQuery}
          activeFilterCount={activeFilterCount}
          allSpecies={allSpecies}
          onSearchChange={onSearchChange}
          onFilterChange={onFilterChange}
          onReset={onResetFilters}
        />
      </div>

      {/* Spot list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {spots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MapPin className="h-10 w-10 text-sand mb-3" />
            <p className="text-sm font-medium text-bark">No spots found</p>
            <p className="text-xs text-stone-warm mt-1">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          spots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              isSaved={savedSpotIds.includes(spot.id)}
              onToggleSave={() => onToggleSave(spot.id)}
              onClick={() => onSpotClick(spot)}
            />
          ))
        )}
      </div>
    </div>
  );
}
