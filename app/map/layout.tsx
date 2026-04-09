import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Explore Map — Yama",
  description:
    "Discover Colorado scouting spots for ethical yamadori collecting. Filter by species, elevation, access type, and more.",
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
