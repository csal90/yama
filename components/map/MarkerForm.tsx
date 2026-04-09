"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  MapPin,
  Eye,
  EyeOff,
  TreePine,
  Save,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  UserMarker,
  MarkerStatus,
  MarkerVisibility,
} from "@/types";
import type { CreateMarkerInput, UpdateMarkerInput } from "@/lib/hooks/useUserMarkers";

const STATUS_OPTIONS: { value: MarkerStatus; label: string; color: string }[] = [
  { value: "scouted", label: "Scouted", color: "bg-sky-100 text-sky-700 border-sky-200" },
  { value: "collected", label: "Collected", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "potted", label: "Potted", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "dead", label: "Dead", color: "bg-stone-100 text-stone-500 border-stone-200" },
];

const COMMON_SPECIES = [
  "Rocky Mountain Juniper",
  "Ponderosa Pine",
  "Limber Pine",
  "Bristlecone Pine",
  "Engelmann Spruce",
  "Douglas Fir",
];

interface MarkerFormProps {
  lat: number;
  lng: number;
  marker?: UserMarker;
  onSave: (input: CreateMarkerInput | UpdateMarkerInput) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export function MarkerForm({
  lat,
  lng,
  marker,
  onSave,
  onDelete,
  onCancel,
}: MarkerFormProps) {
  const [species, setSpecies] = useState(marker?.species ?? "");
  const [status, setStatus] = useState<MarkerStatus>(marker?.status ?? "scouted");
  const [notes, setNotes] = useState(marker?.notes ?? "");
  const [visibility, setVisibility] = useState<MarkerVisibility>(
    marker?.visibility ?? "private",
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (marker) {
      onSave({ species: species || null, status, notes, visibility });
    } else {
      onSave({ lat, lng, species: species || undefined, status, notes, visibility });
    }
  }

  return (
    <div className="slide-up flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-sand/70">
        <div className="min-w-0 pr-2">
          <h2 className="text-lg font-bold text-foreground leading-tight flex items-center gap-2">
            <MapPin className="h-5 w-5 text-forest shrink-0" />
            {marker ? "Edit Marker" : "New Tree Marker"}
          </h2>
          <p className="text-xs text-stone-warm mt-1">
            {lat.toFixed(5)}°N, {Math.abs(lng).toFixed(5)}°W
          </p>
        </div>
        <button
          onClick={onCancel}
          className="shrink-0 p-1.5 rounded-lg hover:bg-sand-light transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-stone-warm" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
        {/* Species */}
        <div>
          <label className="text-xs font-semibold text-bark uppercase tracking-wider mb-1.5 block">
            Species
          </label>
          <Input
            placeholder="e.g., Rocky Mountain Juniper"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            list="species-suggestions"
          />
          <datalist id="species-suggestions">
            {COMMON_SPECIES.map((sp) => (
              <option key={sp} value={sp} />
            ))}
          </datalist>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {COMMON_SPECIES.map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => setSpecies(sp)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium transition-all border",
                  species === sp
                    ? "bg-forest text-white border-forest"
                    : "bg-white text-bark border-sand hover:border-stone-warm/40 hover:bg-sand-light",
                )}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-xs font-semibold text-bark uppercase tracking-wider mb-1.5 block">
            Status
          </label>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all border",
                  status === opt.value ? opt.color : "bg-white text-bark border-sand hover:bg-sand-light",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs font-semibold text-bark uppercase tracking-wider mb-1.5 block">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Trunk movement, deadwood features, access notes..."
            rows={4}
            className="flex w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-stone-warm/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 focus-visible:border-forest/40 resize-none"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="text-xs font-semibold text-bark uppercase tracking-wider mb-1.5 block">
            Visibility
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setVisibility("private")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                visibility === "private"
                  ? "border-forest bg-forest/5 text-forest"
                  : "border-sand bg-white text-bark hover:bg-sand-light",
              )}
            >
              <EyeOff className="h-4 w-4" />
              Private
            </button>
            <button
              type="button"
              onClick={() => setVisibility("premium_shared")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                visibility === "premium_shared"
                  ? "border-amber-400 bg-amber-50 text-amber-700"
                  : "border-sand bg-white text-bark hover:bg-sand-light",
              )}
            >
              <Eye className="h-4 w-4" />
              Share with Pro
            </button>
          </div>
        </div>

        {/* Actions (inside form so Save submits reliably) */}
        <div className="border-t border-sand/70 pt-4 mt-2 flex gap-2">
          <Button type="submit" className="flex-1 gap-2">
            <Save className="h-4 w-4" />
            {marker ? "Update" : "Save Marker"}
          </Button>
          {marker && onDelete && (
            <Button
              type="button"
              variant="ghost"
              className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
