import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map, BookOpen, Mountain, TreePine } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/[0.03] via-transparent to-moss/[0.05]" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5016' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-medium text-forest mb-6">
            <Mountain className="h-3.5 w-3.5" />
            Colorado-focused yamadori scouting
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Discover Colorado&apos;s
            <span className="text-forest"> bonsai treasures</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-stone-warm leading-relaxed max-w-2xl mx-auto">
            A map-based discovery platform for finding legal scouting areas,
            identifying species habitats, and planning ethical yamadori
            collecting trips across Colorado.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/map">
              <Button size="xl" className="gap-2.5 w-full sm:w-auto">
                <Map className="h-5 w-5" />
                Explore Colorado Map
              </Button>
            </Link>
            <Link href="/species">
              <Button
                variant="outline"
                size="xl"
                className="gap-2.5 w-full sm:w-auto"
              >
                <BookOpen className="h-5 w-5" />
                View Species Guide
              </Button>
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "25+", label: "Scouting Spots" },
              { value: "6", label: "Species Profiled" },
              { value: "7", label: "Regions Covered" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-forest">
                  {value}
                </div>
                <div className="text-xs sm:text-sm text-stone-warm mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative trees */}
        <div className="absolute bottom-0 left-8 opacity-[0.04] hidden lg:block">
          <TreePine className="h-48 w-48" />
        </div>
        <div className="absolute bottom-4 right-12 opacity-[0.03] hidden lg:block">
          <TreePine className="h-32 w-32" />
        </div>
      </div>
    </section>
  );
}
