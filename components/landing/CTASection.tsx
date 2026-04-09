import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-forest relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to explore Colorado&apos;s bonsai landscape?
          </h2>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Start scouting with confidence. Browse the map, learn the species,
            and plan your next collecting trip — all with ethics and
            responsibility front and center.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/map">
              <Button
                size="xl"
                className="gap-2.5 w-full sm:w-auto bg-white text-forest hover:bg-white/90 active:bg-white/80"
              >
                <Map className="h-5 w-5" />
                Open the Map
              </Button>
            </Link>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/70">
            <ShieldCheck className="h-4 w-4" />
            Always collect responsibly and with proper permits
          </div>
        </div>
      </div>
    </section>
  );
}
