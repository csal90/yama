"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { ScoutingSpot } from "@/types";
import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS, formatElevation, cn } from "@/lib/utils";
import { COLORADO_CENTER } from "@/lib/utils";

// Fix Leaflet default icon issue with bundlers
const createIcon = (color: string, isActive: boolean) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${isActive ? "28px" : "22px"};
      height: ${isActive ? "28px" : "22px"};
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.2s;
      ${isActive ? "box-shadow: 0 0 0 4px rgba(45,80,22,0.3), 0 2px 8px rgba(0,0,0,0.3);" : ""}
    "></div>`,
    iconSize: [isActive ? 28 : 22, isActive ? 28 : 22],
    iconAnchor: [isActive ? 14 : 11, isActive ? 14 : 11],
    popupAnchor: [0, isActive ? -16 : -13],
  });

const pinColors: Record<string, string> = {
  beginner: "#16a34a",
  intermediate: "#2563eb",
  advanced: "#ea580c",
  expert: "#dc2626",
};

function FlyToSpot({ spot }: { spot: ScoutingSpot | null }) {
  const map = useMap();
  useEffect(() => {
    if (spot) {
      map.flyTo([spot.coordinates.lat, spot.coordinates.lng], 11, {
        duration: 0.8,
      });
    }
  }, [spot, map]);
  return null;
}

interface MapViewProps {
  spots: ScoutingSpot[];
  activeSpot: ScoutingSpot | null;
  savedSpotIds: string[];
  onSpotClick: (spot: ScoutingSpot) => void;
}

export function MapView({
  spots,
  activeSpot,
  savedSpotIds,
  onSpotClick,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapContainer
      center={[COLORADO_CENTER.lat, COLORADO_CENTER.lng]}
      zoom={7}
      className="h-full w-full"
      zoomControl={false}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <FlyToSpot spot={activeSpot} />

      {spots.map((spot) => {
        const isActive = activeSpot?.id === spot.id;
        const isSaved = savedSpotIds.includes(spot.id);
        return (
          <Marker
            key={spot.id}
            position={[spot.coordinates.lat, spot.coordinates.lng]}
            icon={createIcon(
              pinColors[spot.difficulty] || "#2d5016",
              isActive
            )}
            eventHandlers={{
              click: () => onSpotClick(spot),
            }}
          >
            <Popup>
              <div className="p-3 min-w-[240px]">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-semibold text-sm text-foreground leading-tight">
                    {spot.name}
                  </h3>
                  {isSaved && (
                    <span className="text-[10px] font-medium text-forest bg-forest/10 px-1.5 py-0.5 rounded">
                      Saved
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-warm mb-2">{spot.region}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      DIFFICULTY_COLORS[spot.difficulty]
                    )}
                  >
                    {DIFFICULTY_LABELS[spot.difficulty]}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-warm mb-2">
                  <span>{formatElevation(spot.elevation)}</span>
                  <span>{spot.species.length} species</span>
                </div>
                <p className="text-xs text-stone-warm line-clamp-2 mb-2">
                  {spot.description}
                </p>
                <button
                  onClick={() => onSpotClick(spot)}
                  className="text-xs font-medium text-forest hover:text-forest-light transition-colors"
                >
                  View Details →
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
