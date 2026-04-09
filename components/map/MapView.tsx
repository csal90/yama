"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import maplibregl, {
  type Map as MapLibreMap,
  type Marker,
} from "maplibre-gl";
import type { ScoutingSpot, UserMarker, MarkerStatus } from "@/types";
import {
  DIFFICULTY_LABELS,
  formatElevation,
  formatDistance,
  COLORADO_CENTER,
} from "@/lib/utils";

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? "";

function getMapStyle(): string {
  return `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${MAPTILER_KEY}`;
}

function esc(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function popupHtml(spot: ScoutingSpot, isSaved: boolean): string {
  return `<div class="sp">
  <div class="sp__top">
    <h3 class="sp__name">${esc(spot.name)}</h3>
    ${isSaved ? '<span class="sp__saved">Saved</span>' : ""}
  </div>
  <p class="sp__region">${esc(spot.region)}</p>
  <div class="sp__meta">
    <span>${esc(DIFFICULTY_LABELS[spot.difficulty])}</span>
    <span>&middot;</span>
    <span>${esc(formatElevation(spot.elevation))}</span>
    <span>&middot;</span>
    <span>${esc(formatDistance(spot.hikeDistance))}</span>
    <span>&middot;</span>
    <span>${spot.species.length} species</span>
  </div>
  <p class="sp__desc">${esc(spot.description)}</p>
</div>`;
}

function markerEl(isActive: boolean): HTMLDivElement {
  const el = document.createElement("div");
  el.className = `dot${isActive ? " dot--active" : ""}`;
  return el;
}

const STATUS_COLORS: Record<MarkerStatus, string> = {
  scouted: "#3b82f6",
  collected: "#10b981",
  potted: "#f59e0b",
  dead: "#9ca3af",
};

/** Preview marker before the user saves a new placement */
function pendingPlacementEl(): HTMLDivElement {
  const el = document.createElement("div");
  el.className = "user-marker user-marker--pending";
  el.setAttribute("aria-label", "New marker placement");
    el.style.cssText = `
    width: 16px;
    height: 16px;
    background: #f59e0b;
    border: 3px solid #fff;
    border-radius: 3px;
    transform: rotate(45deg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
  `;
  return el;
}

function userMarkerEl(status: MarkerStatus, isOwn: boolean): HTMLDivElement {
  const el = document.createElement("div");
  el.className = "user-marker";
  el.style.cssText = `
    width: 14px;
    height: 14px;
    background: ${STATUS_COLORS[status]};
    border: 2.5px solid #fff;
    border-radius: 3px;
    transform: rotate(45deg);
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.3);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    opacity: ${isOwn ? "1" : "0.7"};
  `;
  return el;
}

function userMarkerPopupHtml(m: UserMarker): string {
  return `<div class="sp">
  <div class="sp__top">
    <h3 class="sp__name">${m.species ? esc(m.species) : "Unknown species"}</h3>
    <span class="sp__saved" style="background:${STATUS_COLORS[m.status]}20;color:${STATUS_COLORS[m.status]}">${esc(m.status)}</span>
  </div>
  <p class="sp__region">${m.lat.toFixed(4)}°N, ${Math.abs(m.lng).toFixed(4)}°W</p>
  ${m.notes ? `<p class="sp__desc">${esc(m.notes)}</p>` : ""}
</div>`;
}

interface MapViewProps {
  spots: ScoutingSpot[];
  activeSpot: ScoutingSpot | null;
  savedSpotIds: string[];
  onSpotClick: (spot: ScoutingSpot) => void;
  userMarkers?: UserMarker[];
  currentUserId?: string;
  placeMode?: boolean;
  onMapClick?: (lat: number, lng: number) => void;
  onUserMarkerClick?: (marker: UserMarker) => void;
  /** One-time fly (e.g. deep link from Saved → pinned tree) */
  flyToPin?: { lat: number; lng: number } | null;
  /** Unsaved placement — show a preview marker until the form is submitted */
  pendingPlacement?: { lat: number; lng: number } | null;
}

export function MapView({
  spots,
  activeSpot,
  savedSpotIds,
  onSpotClick,
  userMarkers = [],
  currentUserId,
  placeMode = false,
  onMapClick,
  onUserMarkerClick,
  flyToPin = null,
  pendingPlacement = null,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const userMarkersRef = useRef<Map<string, Marker>>(new Map());
  const draftMarkerRef = useRef<Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const onSpotClickRef = useRef(onSpotClick);
  useEffect(() => {
    onSpotClickRef.current = onSpotClick;
  }, [onSpotClick]);

  const onMapClickRef = useRef(onMapClick);
  useEffect(() => {
    onMapClickRef.current = onMapClick;
  }, [onMapClick]);

  const onUserMarkerClickRef = useRef(onUserMarkerClick);
  useEffect(() => {
    onUserMarkerClickRef.current = onUserMarkerClick;
  }, [onUserMarkerClick]);

  const placeModeRef = useRef(placeMode);
  placeModeRef.current = placeMode;

  const addTerrain = useCallback((map: MapLibreMap) => {
    const SRC = "maptiler-terrain";
    if (map.getSource(SRC)) {
      map.setTerrain({ source: SRC, exaggeration: 1.25 });
      return;
    }
    map.addSource(SRC, {
      type: "raster-dem",
      url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${MAPTILER_KEY}`,
      tileSize: 256,
    });
    map.setTerrain({ source: SRC, exaggeration: 1.25 });
  }, []);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    if (!MAPTILER_KEY) return;
    const markerStore = markersRef.current;
    const userMarkerStore = userMarkersRef.current;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: getMapStyle(),
      center: [COLORADO_CENTER.lng, COLORADO_CENTER.lat],
      zoom: 6.8,
      pitch: 0,
      bearing: 0,
      maxPitch: 75,
      minZoom: 5,
    });

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        visualizePitch: true,
      }),
      "bottom-right",
    );
    map.addControl(
      new maplibregl.ScaleControl({ maxWidth: 150 }),
      "bottom-left",
    );

    map.on("style.load", () => addTerrain(map));

    const markReady = () => setMapReady(true);
    if (map.loaded()) markReady();
    else map.once("load", markReady);

    map.on("click", (e) => {
      if (!placeModeRef.current) return;
      const fn = onMapClickRef.current;
      if (fn) {
        fn(e.lngLat.lat, e.lngLat.lng);
      }
    });

    mapRef.current = map;

    return () => {
      setMapReady(false);
      markerStore.forEach((m) => m.remove());
      markerStore.clear();
      userMarkerStore.forEach((m) => m.remove());
      userMarkerStore.clear();
      draftMarkerRef.current?.remove();
      draftMarkerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [addTerrain]);

  // Place mode cursor
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const canvas = map.getCanvas();
    canvas.style.cursor = placeMode ? "crosshair" : "";
    return () => {
      canvas.style.cursor = "";
    };
  }, [placeMode]);

  // Render scouting spot markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const markerStore = markersRef.current;

    const render = () => {
      markerStore.forEach((m) => m.remove());
      markerStore.clear();

      spots.forEach((spot) => {
        const isActive = activeSpot?.id === spot.id;
        const isSaved = savedSpotIds.includes(spot.id);
        const el = markerEl(isActive);

        const m = new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat([spot.coordinates.lng, spot.coordinates.lat])
          .setPopup(
            new maplibregl.Popup({
              closeButton: true,
              offset: 14,
              maxWidth: "300px",
              className: "sp-wrap",
            }).setHTML(popupHtml(spot, isSaved)),
          )
          .addTo(map);

        el.addEventListener("click", () => onSpotClickRef.current(spot));
        markerStore.set(spot.id, m);
      });
    };

    const tryRender = () => {
      if (map.isStyleLoaded() && map.loaded()) {
        render();
      } else {
        map.once("idle", render);
      }
    };

    tryRender();

    return () => {
      map.off("idle", render);
    };
  }, [spots, activeSpot, savedSpotIds]);

  // Render user markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const store = userMarkersRef.current;

    const render = () => {
      store.forEach((m) => m.remove());
      store.clear();

      userMarkers.forEach((um) => {
        const isOwn = um.userId === currentUserId;
        const el = userMarkerEl(um.status, isOwn);

        const m = new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat([um.lng, um.lat])
          .setPopup(
            new maplibregl.Popup({
              closeButton: true,
              offset: 12,
              maxWidth: "280px",
              className: "sp-wrap",
            }).setHTML(userMarkerPopupHtml(um)),
          )
          .addTo(map);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onUserMarkerClickRef.current?.(um);
        });
        store.set(um.id, m);
      });
    };

    const tryRender = () => {
      if (map.isStyleLoaded() && map.loaded()) {
        render();
      } else {
        map.once("idle", render);
      }
    };

    tryRender();

    return () => {
      map.off("idle", render);
    };
  }, [userMarkers, currentUserId]);

  // Preview marker for placement-in-progress (not yet saved to DB)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const cleanupDraft = () => {
      draftMarkerRef.current?.remove();
      draftMarkerRef.current = null;
    };

    if (!pendingPlacement) {
      cleanupDraft();
      return;
    }

    const render = () => {
      cleanupDraft();
      const el = pendingPlacementEl();
      const m = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([pendingPlacement.lng, pendingPlacement.lat])
        .addTo(map);
      draftMarkerRef.current = m;

      map.easeTo({
        center: [pendingPlacement.lng, pendingPlacement.lat],
        zoom: Math.max(map.getZoom(), 13),
        pitch: map.getPitch(),
        bearing: map.getBearing(),
        duration: 700,
        essential: true,
      });
    };

    if (map.isStyleLoaded() && map.loaded()) {
      render();
    } else {
      map.once("idle", render);
    }

    return () => {
      map.off("idle", render);
      cleanupDraft();
    };
  }, [pendingPlacement, mapReady]);

  // Fly to active spot
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeSpot) return;

    map.easeTo({
      center: [activeSpot.coordinates.lng, activeSpot.coordinates.lat],
      zoom: Math.max(map.getZoom(), 11),
      pitch: map.getPitch(),
      bearing: map.getBearing(),
      duration: 1200,
      essential: true,
    });

    const marker = markersRef.current.get(activeSpot.id);
    if (!marker) return;
    const popup = marker.getPopup();
    if (popup && !popup.isOpen()) marker.togglePopup();
  }, [activeSpot]);

  // Deep link: fly to lat/lng (e.g. /map?mlat=&mlng=)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyToPin) return;

    const run = () => {
      map.easeTo({
        center: [flyToPin.lng, flyToPin.lat],
        zoom: Math.max(map.getZoom(), 12),
        pitch: map.getPitch(),
        bearing: map.getBearing(),
        duration: 1200,
        essential: true,
      });
    };

    if (map.isStyleLoaded() && map.loaded()) {
      run();
    } else {
      map.once("load", run);
    }
  }, [flyToPin]);

  if (!MAPTILER_KEY) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-sand-light/30">
        <div className="text-center max-w-sm px-6">
          <p className="text-sm font-semibold text-bark mb-1">Map key missing</p>
          <p className="text-xs text-stone-warm leading-relaxed">
            Set{" "}
            <code className="bg-sand-light px-1 py-0.5 rounded text-[11px]">NEXT_PUBLIC_MAPTILER_KEY</code>{" "}
            (free key from{" "}
            <a
              href="https://cloud.maptiler.com/account/keys/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline"
            >
              cloud.maptiler.com
            </a>
            ).{" "}
            Local: put it in{" "}
            <code className="bg-sand-light px-1 py-0.5 rounded text-[11px]">.env.local</code>
            . Vercel: Project → Settings → Environment Variables → same name and value,
            then redeploy —{" "}
            <code className="bg-sand-light px-1 py-0.5 rounded text-[11px]">NEXT_PUBLIC_*</code>{" "}
            is set at build time, not from your laptop&apos;s .env file.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="h-full w-full" />;
}
