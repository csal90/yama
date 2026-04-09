import type { ScoutingSpot, UserMarker } from "@/types";

function escXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function feetToMeters(feet: number): number {
  return Math.round(feet * 0.3048);
}

export function spotsToGpx(spots: ScoutingSpot[]): string {
  const waypoints = spots
    .map(
      (s) => `  <wpt lat="${s.coordinates.lat}" lon="${s.coordinates.lng}">
    <ele>${feetToMeters(s.elevation)}</ele>
    <name>${escXml(s.name)}</name>
    <desc>${escXml(s.description)}</desc>
    <type>Scouting Spot</type>
  </wpt>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Yama" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Yama Scouting Spots</name>
    <time>${new Date().toISOString()}</time>
  </metadata>
${waypoints}
</gpx>`;
}

export function markersToGpx(markers: UserMarker[]): string {
  const waypoints = markers
    .map(
      (m) => `  <wpt lat="${m.lat}" lon="${m.lng}">
    <name>${escXml(m.species ?? "Tree Marker")}</name>
    <desc>${escXml(`Status: ${m.status}${m.notes ? ` — ${m.notes}` : ""}`)}</desc>
    <type>User Marker</type>
  </wpt>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Yama" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Yama Tree Markers</name>
    <time>${new Date().toISOString()}</time>
  </metadata>
${waypoints}
</gpx>`;
}

export function downloadGpx(content: string, filename: string) {
  const blob = new Blob([content], { type: "application/gpx+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
