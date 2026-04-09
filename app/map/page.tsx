"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { spots } from "@/data/spots";
import type { ScoutingSpot, MapLayer, UserMarker } from "@/types";
import { useFilters } from "@/lib/hooks/useFilters";
import { useSavedSpots } from "@/lib/hooks/useSavedSpots";
import { useUserMarkers } from "@/lib/hooks/useUserMarkers";
import { usePremium } from "@/lib/hooks/usePremium";
import { useAuth } from "@/lib/hooks/useAuth";
import { MapSidebar } from "@/components/map/MapSidebar";
import { MarkerForm } from "@/components/map/MarkerForm";
import { LayerToggle } from "@/components/map/LayerToggle";
import { PremiumBadge } from "@/components/ui/PremiumGate";
import { List, Map as MapIcon, MapPin, X, Sparkles, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { spotsToGpx, downloadGpx } from "@/lib/gpx";
import type { CreateMarkerInput, UpdateMarkerInput } from "@/lib/hooks/useUserMarkers";

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
  { id: "my-markers", label: "My Tree Markers", enabled: true },
];

export default function MapPage() {
  const [activeSpot, setActiveSpot] = useState<ScoutingSpot | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>(DEFAULT_LAYERS);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");
  const [placeMode, setPlaceMode] = useState(false);
  const [pendingPin, setPendingPin] = useState<{ lat: number; lng: number } | null>(null);
  const [editingMarker, setEditingMarker] = useState<UserMarker | null>(null);
  const [markerError, setMarkerError] = useState<string | null>(null);

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
  const { user } = useAuth();
  const { savedSpots, isSpotSaved, toggleSaveSpot, updateSpotNotes, isAuthenticated } = useSavedSpots();
  const { isPremium, upgradeToPremium } = usePremium();
  const { markers, createMarker, updateMarker, deleteMarker } = useUserMarkers();

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

  const displayedUserMarkers = useMemo(() => {
    if (!layers.find((l) => l.id === "my-markers")?.enabled) return [];
    return markers;
  }, [markers, layers]);

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
    setEditingMarker(null);
    setPendingPin(null);
    setPlaceMode(false);
    setMobileView("list");
  }, []);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (!placeMode) return;
      setMarkerError(null);
      setPendingPin({ lat, lng });
      setPlaceMode(false);
      setActiveSpot(null);
      setMobileView("list");
    },
    [placeMode],
  );

  const handleUserMarkerClick = useCallback((marker: UserMarker) => {
    setEditingMarker(marker);
    setPendingPin(null);
    setActiveSpot(null);
    setPlaceMode(false);
    setMobileView("list");
  }, []);

  const handleMarkerSave = useCallback(
    async (input: CreateMarkerInput | UpdateMarkerInput) => {
      setMarkerError(null);
      if (editingMarker) {
        await updateMarker(editingMarker.id, input as UpdateMarkerInput);
        setEditingMarker(null);
      } else if (pendingPin) {
        const { error } = await createMarker(input as CreateMarkerInput);
        if (error) {
          setMarkerError(error);
          return;
        }
        setPendingPin(null);
      }
    },
    [editingMarker, pendingPin, createMarker, updateMarker],
  );

  const handleMarkerDelete = useCallback(async () => {
    if (!editingMarker) return;
    await deleteMarker(editingMarker.id);
    setEditingMarker(null);
  }, [editingMarker, deleteMarker]);

  const handleCancelForm = useCallback(() => {
    setPendingPin(null);
    setEditingMarker(null);
    setMarkerError(null);
  }, []);

  const showMarkerForm = pendingPin || editingMarker;

  function handlePlaceModeToggle() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!isPremium) return;
    setPlaceMode(!placeMode);
    setPendingPin(null);
    setEditingMarker(null);
    setActiveSpot(null);
  }

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
          {(activeSpot || showMarkerForm) && (
            <span className="h-2 w-2 rounded-full bg-forest" />
          )}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            "w-full md:w-[400px] lg:w-[420px] border-r border-sand/70 shrink-0 overflow-hidden",
            mobileView === "list" ? "block" : "hidden md:block"
          )}
        >
          {showMarkerForm ? (
            <div className="h-full bg-white flex flex-col">
              {markerError && (
                <div className="shrink-0 mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {markerError}
                </div>
              )}
              <MarkerForm
                lat={editingMarker?.lat ?? pendingPin!.lat}
                lng={editingMarker?.lng ?? pendingPin!.lng}
                marker={editingMarker ?? undefined}
                onSave={handleMarkerSave}
                onDelete={editingMarker ? handleMarkerDelete : undefined}
                onCancel={handleCancelForm}
              />
            </div>
          ) : (
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
              isPremium={isPremium}
              privateNotes={
                activeSpot
                  ? savedSpots.find((s) => s.spotId === activeSpot.id)?.notes ?? ""
                  : ""
              }
              onNotesChange={
                activeSpot
                  ? (notes) => updateSpotNotes(activeSpot.id, notes)
                  : undefined
              }
              onDownloadGpx={
                activeSpot
                  ? () => downloadGpx(spotsToGpx([activeSpot]), `${activeSpot.id}.gpx`)
                  : undefined
              }
            />
          )}
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
            userMarkers={displayedUserMarkers}
            currentUserId={user?.id}
            placeMode={placeMode}
            onMapClick={handleMapClick}
            onUserMarkerClick={handleUserMarkerClick}
          />
          <LayerToggle layers={layers} onToggle={handleToggleLayer} />

          {/* Place marker button */}
          <div className="absolute top-3 left-3 z-[1000]">
            {isAuthenticated && isPremium ? (
              placeMode ? (
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-forest px-3 py-2 text-sm font-medium text-white shadow-md flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Click map to place marker
                  </div>
                  <button
                    onClick={() => setPlaceMode(false)}
                    className="rounded-lg bg-white p-2 shadow-md border border-sand/70 hover:bg-sand-light transition-colors"
                  >
                    <X className="h-4 w-4 text-bark" />
                  </button>
                </div>
              ) : (
                <Button
                  size="sm"
                  className="gap-2 shadow-md"
                  onClick={handlePlaceModeToggle}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Place Marker</span>
                </Button>
              )
            ) : isAuthenticated ? (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 shadow-md bg-white"
                onClick={async () => {
                  await upgradeToPremium();
                }}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span className="hidden sm:inline">Upgrade to Place Markers</span>
                <span className="sm:hidden">Upgrade</span>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 shadow-md bg-white"
                onClick={() => router.push("/login")}
              >
                <Lock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign in to Place Markers</span>
                <span className="sm:hidden">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
