"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ScoutingSpot } from "@/types";
import type { TripPlan } from "@/lib/hooks/useSavedSpots";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  MapPin,
  Mountain,
  Footprints,
  Calendar,
  Car,
  TreePine,
  ShieldCheck,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  Navigation,
  Binoculars,
  Download,
  StickyNote,
  Sparkles,
} from "lucide-react";
import {
  ACCESS_TYPE_LABELS,
  ACCESS_TYPE_COLORS,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
  BADGE_LABELS,
  BADGE_COLORS,
  SEASON_LABELS,
  formatElevation,
  formatDistance,
  cn,
} from "@/lib/utils";

interface SpotDetailDrawerProps {
  spot: ScoutingSpot;
  isSaved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
  isPremium?: boolean;
  privateNotes?: string;
  onNotesChange?: (notes: string) => void;
  onDownloadGpx?: () => void;
  tripPlans?: TripPlan[];
  onAddToTrip?: (tripId: string) => void;
  /** Saved spots + trips (Collection). When false, show Pro CTAs instead. */
  collectionEnabled?: boolean;
}

export function SpotDetailDrawer({
  spot,
  isSaved,
  onToggleSave,
  onClose,
  isPremium,
  privateNotes,
  onNotesChange,
  onDownloadGpx,
  tripPlans = [],
  onAddToTrip,
  collectionEnabled = true,
}: SpotDetailDrawerProps) {
  const [tripFeedback, setTripFeedback] = useState<string | null>(null);
  const tripsEligible =
    onAddToTrip && tripPlans.length > 0
      ? tripPlans.filter((t) => !t.spots.includes(spot.id))
      : [];

  useEffect(() => {
    setTripFeedback(null);
  }, [spot.id]);

  return (
    <div className="slide-up flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-sand/70">
        <div className="min-w-0 pr-2">
          <h2 className="text-lg font-bold text-foreground leading-tight">
            {spot.name}
          </h2>
          <p className="text-sm text-stone-warm mt-1 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {spot.region} · {spot.coordinates.lat.toFixed(3)}°N,{" "}
            {Math.abs(spot.coordinates.lng).toFixed(3)}°W
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1.5 rounded-lg hover:bg-sand-light transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-stone-warm" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              DIFFICULTY_COLORS[spot.difficulty]
            )}
          >
            {DIFFICULTY_LABELS[spot.difficulty]}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              ACCESS_TYPE_COLORS[spot.accessType]
            )}
          >
            {ACCESS_TYPE_LABELS[spot.accessType]}
          </span>
          {spot.badges.map((badge) => (
            <span
              key={badge}
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                BADGE_COLORS[badge]
              )}
            >
              {BADGE_LABELS[badge]}
            </span>
          ))}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-sand-light/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-warm mb-1">
              <Mountain className="h-3.5 w-3.5" />
              Elevation
            </div>
            <div className="text-sm font-semibold text-foreground">
              {formatElevation(spot.elevation)}
            </div>
          </div>
          <div className="rounded-lg bg-sand-light/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-warm mb-1">
              <Footprints className="h-3.5 w-3.5" />
              Hike Distance
            </div>
            <div className="text-sm font-semibold text-foreground">
              {formatDistance(spot.hikeDistance)}
            </div>
          </div>
          <div className="rounded-lg bg-sand-light/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-warm mb-1">
              <Car className="h-3.5 w-3.5" />
              Road Access
            </div>
            <div className="text-sm font-semibold text-foreground">
              {spot.roadAccess ? "Yes" : "No — 4WD/Hike"}
            </div>
          </div>
          <div className="rounded-lg bg-sand-light/50 p-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-warm mb-1">
              <Calendar className="h-3.5 w-3.5" />
              Best Season
            </div>
            <div className="text-sm font-semibold text-foreground">
              {spot.bestSeasons.map((s) => SEASON_LABELS[s]).join(", ")}
            </div>
          </div>
        </div>

        {/* Species */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <TreePine className="h-4 w-4 text-forest" />
            Species Likely Found
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {spot.species.map((sp) => (
              <Badge key={sp} variant="default">
                {sp}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Description
          </h3>
          <p className="text-sm text-stone-warm leading-relaxed">
            {spot.description}
          </p>
        </div>

        {/* Scouting notes */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Binoculars className="h-4 w-4 text-moss" />
            Scouting Notes
          </h3>
          <p className="text-sm text-stone-warm leading-relaxed">
            {spot.scoutingNotes}
          </p>
        </div>

        {/* Access notes */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Navigation className="h-4 w-4 text-sky-600" />
            Access Information
          </h3>
          <p className="text-sm text-stone-warm leading-relaxed">
            {spot.accessNotes}
          </p>
        </div>

        {/* Permit / Legal */}
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
          <h3 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" />
            Permit & Legal Notes
          </h3>
          <p className="text-sm text-amber-700 leading-relaxed">
            {spot.permitNotes}
          </p>
        </div>

        {/* Ethics reminder */}
        <div className="rounded-lg border border-forest/20 bg-forest/5 p-4">
          <h3 className="text-sm font-semibold text-forest mb-2 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            Ethics Reminder
          </h3>
          <p className="text-sm text-forest/80 leading-relaxed">
            {spot.ethicsReminder}
          </p>
        </div>

        {/* Private notes (premium) */}
        {isPremium && isSaved && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <StickyNote className="h-4 w-4 text-amber-500" />
              Private Notes
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0 text-[9px] font-bold uppercase text-amber-700">
                <Sparkles className="h-2 w-2" />
                Pro
              </span>
            </h3>
            <textarea
              value={privateNotes ?? ""}
              onChange={(e) => onNotesChange?.(e.target.value)}
              placeholder="Add private observations, waypoints, collection plans..."
              rows={3}
              className="flex w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-stone-warm/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 focus-visible:border-forest/40 resize-none"
            />
          </div>
        )}

        {/* Photo placeholder */}
        <div className="rounded-lg border border-dashed border-sand bg-sand-light/30 p-8 text-center">
          <div className="text-stone-warm/40 mb-2">
            <Mountain className="h-8 w-8 mx-auto" />
          </div>
          <p className="text-sm text-stone-warm/60">
            Photos coming soon
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="border-t border-sand/70 p-4 space-y-2">
        <div className="flex gap-2">
          {collectionEnabled ? (
            <Button
              variant={isSaved ? "secondary" : "default"}
              className="flex-1 gap-2"
              onClick={onToggleSave}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Save Spot
                </>
              )}
            </Button>
          ) : (
            <Button variant="default" className="flex-1 gap-2" asChild>
              <Link href="/premium">
                <Sparkles className="h-4 w-4" />
                Save with Pro
              </Link>
            </Button>
          )}
          {collectionEnabled ? (
            onAddToTrip ? (
              tripsEligible.length > 0 ? (
                <div className="flex-1 min-w-0 relative">
                  <label htmlFor="add-to-trip" className="sr-only">
                    Add this spot to a trip plan
                  </label>
                  <select
                    id="add-to-trip"
                    className="flex h-10 w-full rounded-md border border-sand bg-white px-3 py-2 text-sm font-medium text-foreground shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 cursor-pointer"
                    defaultValue=""
                    onChange={(e) => {
                      const id = e.target.value;
                      if (!id) return;
                      onAddToTrip(id);
                      setTripFeedback(
                        tripPlans.find((t) => t.id === id)?.name ?? "Trip",
                      );
                      e.target.value = "";
                    }}
                  >
                    <option value="">Add to trip…</option>
                    {tripsEligible.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : tripPlans.some((t) => t.spots.includes(spot.id)) ? (
                <Button variant="outline" className="flex-1 gap-2" disabled>
                  <Navigation className="h-4 w-4" />
                  On all trips
                </Button>
              ) : (
                <Button variant="outline" className="flex-1 gap-2 px-2" asChild>
                  <Link
                    href="/saved?tab=trips"
                    className="flex items-center justify-center gap-2"
                  >
                    <Navigation className="h-4 w-4 shrink-0" />
                    Plan a trip
                  </Link>
                </Button>
              )
            ) : (
              <Button variant="outline" className="flex-1 gap-2" disabled>
                <Navigation className="h-4 w-4" />
                Add to Trip
              </Button>
            )
          ) : (
            <Button variant="outline" className="flex-1 gap-2" asChild>
              <Link href="/premium" className="flex items-center justify-center gap-2">
                <Navigation className="h-4 w-4" />
                Trips on Pro
              </Link>
            </Button>
          )}
          {isPremium && onDownloadGpx && (
            <Button variant="ghost" size="icon" onClick={onDownloadGpx} title="Download GPX">
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
        {tripFeedback && (
          <p className="text-xs text-forest text-center">
            Added to “{tripFeedback}” — view in{" "}
            <Link href="/saved?tab=trips" className="underline font-medium">
              Collection
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
