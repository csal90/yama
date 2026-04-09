"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { spots } from "@/data/spots";
import { useSavedSpots } from "@/lib/hooks/useSavedSpots";
import { useUserMarkers } from "@/lib/hooks/useUserMarkers";
import { usePremium } from "@/lib/hooks/usePremium";
import { useAuth } from "@/lib/hooks/useAuth";
import { SpotCard } from "@/components/spots/SpotCard";
import { JournalPanel } from "@/components/collection/JournalPanel";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { PremiumBadge } from "@/components/ui/PremiumGate";
import { Input } from "@/components/ui/input";
import {
  Bookmark,
  MapPin,
  Plus,
  Trash2,
  Calendar,
  TreePine,
  Route,
  X,
  Sparkles,
  BookOpen,
} from "lucide-react";
import type { Region } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { TripPlan } from "@/lib/hooks/useSavedSpots";

type TabId = "saved" | "trips" | "journal";

function SavedPageContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isPremium, loading: premiumLoading } = usePremium();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?next=/saved");
    }
  }, [authLoading, user, router]);

  const {
    savedSpots,
    tripPlans,
    loaded,
    toggleSaveSpot,
    updateSpotNotes,
    addTripPlan,
    removeTripPlan,
  } = useSavedSpots();

  const { markers: pinnedTrees, loaded: markersLoaded } = useUserMarkers();

  const [activeTab, setActiveTab] = useState<TabId>("saved");
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [newTripName, setNewTripName] = useState("");
  const [newTripRegion, setNewTripRegion] = useState<Region>("Front Range");

  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "saved" || t === "trips" || t === "journal") {
      setActiveTab(t);
    }
  }, [searchParams]);

  function goToTab(tab: TabId) {
    setActiveTab(tab);
    router.replace(`/saved?tab=${tab}`, { scroll: false });
  }

  const savedSpotData = useMemo(() => {
    return savedSpots
      .map((saved) => ({
        ...saved,
        spot: spots.find((s) => s.id === saved.spotId),
      }))
      .filter((s) => s.spot !== undefined);
  }, [savedSpots]);

  const spotsByRegion = useMemo(() => {
    const grouped: Record<string, typeof savedSpotData> = {};
    savedSpotData.forEach((item) => {
      const region = item.spot!.region;
      if (!grouped[region]) grouped[region] = [];
      grouped[region].push(item);
    });
    return grouped;
  }, [savedSpotData]);

  const handleCreateTrip = () => {
    if (!newTripName.trim()) return;
    addTripPlan({
      name: newTripName,
      region: newTripRegion,
      spots: [],
      notes: "",
    });
    setNewTripName("");
    setShowNewTrip(false);
  };

  if (authLoading || !loaded || !markersLoaded || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (premiumLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="page-transition">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
            Collection
          </h1>
          <p className="text-lg text-stone-warm mb-2 max-w-md mx-auto">
            Saved spots, trip plans, and your journal — together in one Pro workspace.
          </p>
          <p className="text-sm text-stone-warm mb-8 max-w-lg mx-auto">
            Bookmark catalog spots, build itineraries, and log your yamadori journey. Tree markers on
            the map stay under Pro as well.
          </p>
          <Button className="gap-2" asChild>
            <Link href="/premium">
              <Sparkles className="h-4 w-4" />
              View Yama Pro plans
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-transition">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Bookmark className="h-6 w-6 text-forest" />
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Collection
              </h1>
              <PremiumBadge />
            </div>
            <p className="text-lg text-stone-warm">
              Saved spots, trip plans, journal, and pinned trees.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 bg-sand-light/50 rounded-lg p-1 mb-8 w-fit max-w-full">
          <button
            type="button"
            onClick={() => goToTab("saved")}
            className={cn(
              "px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === "saved"
                ? "bg-white text-foreground shadow-sm"
                : "text-stone-warm hover:text-foreground",
            )}
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Saved spots</span>
              <span className="sm:hidden">Saved</span>
              {savedSpotData.length > 0 && (
                <span className="bg-forest/10 text-forest text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {savedSpotData.length}
                </span>
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={() => goToTab("trips")}
            className={cn(
              "px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === "trips"
                ? "bg-white text-foreground shadow-sm"
                : "text-stone-warm hover:text-foreground",
            )}
          >
            <span className="flex items-center gap-2">
              <Route className="h-4 w-4 shrink-0" />
              Trips
              {tripPlans.length > 0 && (
                <span className="bg-forest/10 text-forest text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {tripPlans.length}
                </span>
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={() => goToTab("journal")}
            className={cn(
              "px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === "journal"
                ? "bg-white text-foreground shadow-sm"
                : "text-stone-warm hover:text-foreground",
            )}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 shrink-0" />
              Journal
            </span>
          </button>
        </div>

        {activeTab === "saved" && (
          <div className="space-y-10">
            {pinnedTrees.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <TreePine className="h-5 w-5 text-forest" />
                  <h2 className="text-lg font-semibold text-foreground">My pinned trees</h2>
                  <span className="text-xs text-stone-warm bg-sand-light rounded-full px-2 py-0.5">
                    {pinnedTrees.length}
                  </span>
                </div>
                <p className="text-sm text-stone-warm mb-4">
                  Map markers you placed. Open on the map to edit or review.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pinnedTrees.map((m) => (
                    <Link
                      key={m.id}
                      href={`/map?mlat=${encodeURIComponent(String(m.lat))}&mlng=${encodeURIComponent(String(m.lng))}`}
                      className="rounded-xl border border-sand/70 bg-white p-4 transition-shadow hover:shadow-sm hover:border-forest/25"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {m.species?.trim() || "Tree marker"}
                          </p>
                          <p className="text-xs text-stone-warm mt-0.5 capitalize">
                            {m.status.replace(/_/g, " ")}
                          </p>
                        </div>
                        <MapPin className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-stone-warm mt-2 font-mono">
                        {m.lat.toFixed(4)}°, {m.lng.toFixed(4)}°
                      </p>
                      {m.notes ? (
                        <p className="text-xs text-stone-warm mt-2 line-clamp-2 italic">{m.notes}</p>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {savedSpotData.length === 0 && pinnedTrees.length === 0 ? (
              <EmptyState
                icon={Bookmark}
                title="Nothing saved yet"
                description="Pin trees on the map or bookmark catalog spots from the map list."
                ctaLabel="Open the Map"
                ctaHref="/map"
              />
            ) : savedSpotData.length > 0 ? (
              <div className="space-y-8">
                {pinnedTrees.length > 0 && (
                  <h2 className="text-lg font-semibold text-foreground pt-2 border-t border-sand/70">
                    Saved scouting spots
                  </h2>
                )}
                {Object.entries(spotsByRegion).map(([region, items]) => (
                  <div key={region}>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-lg font-semibold text-foreground">{region}</h2>
                      <span className="text-xs text-stone-warm bg-sand-light rounded-full px-2 py-0.5">
                        {items.length} spots
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {items.map(({ spot, spotId, notes }) => (
                        <div key={spotId} className="relative">
                          <SpotCard
                            spot={spot!}
                            isSaved
                            onToggleSave={() => toggleSaveSpot(spotId)}
                          />
                          {notes && (
                            <div className="mt-1 px-4 pb-2">
                              <p className="text-xs text-stone-warm italic bg-sand-light/50 rounded p-2">
                                {notes}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-warm text-center py-6 rounded-xl border border-dashed border-sand bg-sand-light/20">
                You haven&apos;t bookmarked any catalog spots yet — explore the{" "}
                <Link href="/map" className="text-forest font-medium underline">
                  map
                </Link>{" "}
                and save spots from the detail panel.
              </p>
            )}
          </div>
        )}

        {activeTab === "trips" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-stone-warm">
                Organize saved spots into scouting trip itineraries.
              </p>
              <Button size="sm" className="gap-2" onClick={() => setShowNewTrip(true)}>
                <Plus className="h-4 w-4" />
                New Trip
              </Button>
            </div>

            {showNewTrip && (
              <div className="rounded-xl border border-forest/20 bg-forest/5 p-5 mb-6 slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Create New Trip</h3>
                  <button
                    type="button"
                    onClick={() => setShowNewTrip(false)}
                    className="p-1 rounded hover:bg-forest/10"
                  >
                    <X className="h-4 w-4 text-stone-warm" />
                  </button>
                </div>
                <div className="flex gap-3">
                  <Input
                    placeholder="Trip name (e.g., Spring Front Range Scout)"
                    value={newTripName}
                    onChange={(e) => setNewTripName(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateTrip()}
                  />
                  <Button onClick={handleCreateTrip}>Create</Button>
                </div>
              </div>
            )}

            {tripPlans.length === 0 && !showNewTrip ? (
              <EmptyState
                icon={Route}
                title="No trip plans yet"
                description="Create a trip plan, then add spots from the map using Add to trip…"
                ctaLabel="Create Your First Trip"
                onCtaClick={() => setShowNewTrip(true)}
              />
            ) : (
              <div className="space-y-4">
                {tripPlans.map((trip) => (
                  <TripPlanCard
                    key={trip.id}
                    trip={trip}
                    onDelete={() => removeTripPlan(trip.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "journal" && <JournalPanel />}
      </div>

      <Footer />
    </div>
  );
}

export default function SavedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-8 w-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
        </div>
      }
    >
      <SavedPageContent />
    </Suspense>
  );
}

function TripPlanCard({
  trip,
  onDelete,
}: {
  trip: TripPlan;
  onDelete: () => void;
}) {
  const tripSpots = trip.spots
    .map((id) => spots.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="rounded-xl border border-sand/70 bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{trip.name}</h3>
          <p className="text-sm text-stone-warm flex items-center gap-1.5 mt-0.5">
            <MapPin className="h-3.5 w-3.5" />
            {trip.region}
            {trip.plannedDate && (
              <>
                <span className="mx-1">·</span>
                <Calendar className="h-3.5 w-3.5" />
                {trip.plannedDate}
              </>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="shrink-0 p-1.5 rounded-lg hover:bg-rose-50 transition-colors text-stone-warm/50 hover:text-rose-500"
          aria-label="Delete trip"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {tripSpots.length > 0 ? (
        <div className="space-y-2">
          {tripSpots.map((spot) => (
            <div
              key={spot!.id}
              className="flex items-center gap-3 rounded-lg bg-sand-light/40 px-3 py-2"
            >
              <TreePine className="h-4 w-4 text-forest shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{spot!.name}</p>
                <p className="text-xs text-stone-warm">{spot!.region}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-sand bg-sand-light/20 p-6 text-center">
          <p className="text-sm text-stone-warm">
            No spots yet. Open a scouting spot on the map and use{" "}
            <span className="font-medium text-foreground">Add to trip…</span> in the detail panel.
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-sand-light p-4 mb-4">
        <Icon className="h-8 w-8 text-stone-warm/40" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-stone-warm max-w-md mb-6">{description}</p>
      {ctaHref ? (
        <Link href={ctaHref}>
          <Button className="gap-2">
            <MapPin className="h-4 w-4" />
            {ctaLabel}
          </Button>
        </Link>
      ) : (
        <Button className="gap-2" onClick={onCtaClick}>
          <Plus className="h-4 w-4" />
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
