"use client";

import { Layers } from "lucide-react";
import type { MapLayer } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface LayerToggleProps {
  layers: MapLayer[];
  onToggle: (layerId: string) => void;
}

export function LayerToggle({ layers, onToggle }: LayerToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-3 right-3 z-[1000]">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-md border border-sand/70 transition-colors",
          open ? "bg-sand-light" : "hover:bg-sand-light"
        )}
      >
        <Layers className="h-4 w-4 text-bark" />
        <span className="text-bark hidden sm:inline">Layers</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-sand/70 p-2 slide-up">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => onToggle(layer.id)}
              className={cn(
                "flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-sm transition-colors text-left",
                layer.enabled
                  ? "bg-forest/10 text-forest font-medium"
                  : "text-bark hover:bg-sand-light"
              )}
            >
              <span
                className={cn(
                  "h-3 w-3 rounded-sm border-2 shrink-0 transition-colors",
                  layer.enabled
                    ? "bg-forest border-forest"
                    : "border-stone-warm/30"
                )}
              />
              {layer.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
