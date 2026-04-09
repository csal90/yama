"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";

export function EthicsBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-forest/5 border-b border-forest/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-sm text-forest">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <p className="leading-snug">
            <span className="font-medium">Ethical collecting matters.</span>{" "}
            <span className="text-forest/80">
              Always verify land ownership, obtain required permits, and
              practice sustainable collection. When in doubt, scout and
              photograph — don&apos;t dig.
            </span>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 rounded hover:bg-forest/10 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5 text-forest/60" />
        </button>
      </div>
    </div>
  );
}
