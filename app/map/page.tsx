"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { spots } from "@/data/spots";
import type { ScoutingSpot, MapLayer } from "@/types";
import { useFilters } from "@/lib/hooks/useFilters";
import { useSavedSpots } from "@/lib/hooks/useSavedSpots";
import { MapSidebar } from "@/components/map/MapSidebar";
import { LayerToggle } from "@/components/map/LayerToggle";
import { List, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-sand-light/30 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-stone-warm">Loading map...</p>
        </div>
      </div>
    ),
  }
);

const DEFAULT_LAYERS: MapLayer[] = [
  { id: "all-spots", label: "All Scouting Spots", enabled: true },
  { id: "public-land", label: "Public Land Overlay", enabled: false },
  { id: "saved", label: "Saved Spots Only", enabled: false },
  { id: "beginner", label: "Beginner Friendly", enabled: false },
];

export default function MapPage() {
  const [activeSpot, setActiveSpot] = useState<ScoutingSpot | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>(DEFAULT_LAYERS);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");

  const {
    filters,
    searchQuery,
    setSearchQuery,
    updateFilter,
    resetFilters,
    activeFilterCount,
    filteredSpots,
  } = useFilters(spots);

  const router = useRouter();
  const { savedSpots, isSpotSaved, toggleSaveSpot, isAuthenticated } = useSavedSpots();
  const savedSpotIds = useMemo(
    () => savedSpots.map((s) => s.spotId),
    [savedSpots]
  );

  const allSpecies = useMemo(() => {
    const set = new Set<string>();
    spots.forEach((s) => s.species.forEach((sp) => set.add(sp)));
    return Array.from(set).sort();
  }, []);

  const displayedSpots = useMemo(() => {
    let result = filteredSpots;

    if (layers.find((l) => l.id === "saved")?.enabled) {
      result = result.filter((s) => savedSpotIds.includes(s.id));
    }
    if (layers.find((l) => l.id === "beginner")?.enabled) {
      result = result.filter((s) => s.difficulty === "beginner");
    }

    return result;
  }, [filteredSpots, layers, savedSpotIds]);

  const handleToggleLayer = useCallback((layerId: string) => {
    setLayers((prev) =>
      prev.map((l) =>
        l.id === layerId ? { ...l, enabled: !l.enabled } : l
      )
    );
  }, []);

  const handleToggleSave = useCallback(
    (spotId: string) => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      toggleSaveSpot(spotId);
    },
    [isAuthenticated, toggleSaveSpot, router]
  );

  const handleSpotClick = useCallback((spot: ScoutingSpot) => {
    setActiveSpot(spot);
    setMobileView("list");
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Mobile toggle */}
      <div className="md:hidden flex border-b border-sand/70 bg-white">
        <button
          onClick={() => setMobileView("map")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors",
            mobileView === "map"
              ? "text-forest border-b-2 border-forest"
              : "text-stone-warm"
          )}
        >
          <MapIcon className="h-4 w-4" />
          Map
        </button>
        <button
          onClick={() => setMobileView("list")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors",
            mobileView === "list"
              ? "text-forest border-b-2 border-forest"
              : "text-stone-warm"
          )}
        >
          <List className="h-4 w-4" />
          List
          {activeSpot && (
            <span className="h-2 w-2 rounded-full bg-forest" />
          )}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar — desktop always visible, mobile conditional */}
        <div
          className={cn(
            "w-full md:w-[400px] lg:w-[420px] border-r border-sand/70 shrink-0 overflow-hidden",
            mobileView === "list" ? "block" : "hidden md:block"
          )}
        >
          <MapSidebar
            spots={displayedSpots}
            allSpecies={allSpecies}
            filters={filters}
            searchQuery={searchQuery}
            activeFilterCount={activeFilterCount}
            activeSpot={activeSpot}
            savedSpotIds={savedSpotIds}
            onSearchChange={setSearchQuery}
            onFilterChange={updateFilter}
            onResetFilters={resetFilters}
            onSpotClick={handleSpotClick}
            onToggleSave={handleToggleSave}
            onCloseDetail={() => setActiveSpot(null)}
          />
        </div>

        {/* Map */}
        <div
          className={cn(
            "flex-1 relative",
            mobileView === "map" ? "block" : "hidden md:block"
          )}
        >
          <MapView
            spots={displayedSpots}
            activeSpot={activeSpot}
            savedSpotIds={savedSpotIds}
            onSpotClick={handleSpotClick}
          />
          <LayerToggle layers={layers} onToggle={handleToggleLayer} />
        </div>
      </div>
    </div>
  );
}
