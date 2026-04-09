import { TreePine, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-sand bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest text-white">
                <TreePine className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Yama</span>
            </div>
            <p className="text-sm text-stone-warm max-w-md leading-relaxed">
              A discovery platform for ethical bonsai collecting and yamadori
              scouting. We promote responsible practices, land access
              awareness, and sustainable collection.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-stone-warm">
              <li>
                <Link
                  href="/map"
                  className="hover:text-forest transition-colors"
                >
                  Explore Map
                </Link>
              </li>
              <li>
                <Link
                  href="/species"
                  className="hover:text-forest transition-colors"
                >
                  Species Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="hover:text-forest transition-colors"
                >
                  Saved Spots
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-stone-warm">
              <li>
                <span className="cursor-default">USFS Permit Info</span>
              </li>
              <li>
                <span className="cursor-default">BLM Regulations</span>
              </li>
              <li>
                <span className="cursor-default">Collection Ethics</span>
              </li>
              <li>
                <span className="cursor-default">Land Access Info</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sand py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-warm">
            &copy; {new Date().getFullYear()} Yama. All data is for educational
            purposes. Always verify regulations before collecting.
          </p>
          <p className="text-xs text-stone-warm flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-400" /> for the
            yamadori community
          </p>
        </div>
      </div>
    </footer>
  );
}
