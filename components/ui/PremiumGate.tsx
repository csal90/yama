"use client";

import { Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePremium } from "@/lib/hooks/usePremium";
import { useState } from "react";

interface PremiumGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PremiumGate({ children, fallback }: PremiumGateProps) {
  const { isPremium, loading, isAuthenticated } = usePremium();

  if (loading) return null;

  if (!isAuthenticated || !isPremium) {
    return fallback ?? <DefaultFallback />;
  }

  return <>{children}</>;
}

function DefaultFallback() {
  const { isAuthenticated, upgradeToPremium } = usePremium();
  const [upgrading, setUpgrading] = useState(false);

  async function handleUpgrade() {
    setUpgrading(true);
    await upgradeToPremium();
    setUpgrading(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-sand/70 bg-sand-light/30 p-6 text-center">
        <Lock className="h-6 w-6 text-stone-warm/40 mx-auto mb-2" />
        <p className="text-sm font-medium text-bark mb-1">Sign in required</p>
        <p className="text-xs text-stone-warm">
          Create an account to access premium features.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200/70 bg-amber-50/30 p-6 text-center">
      <Sparkles className="h-6 w-6 text-amber-500 mx-auto mb-2" />
      <p className="text-sm font-medium text-bark mb-1">Premium Feature</p>
      <p className="text-xs text-stone-warm mb-3">
        Upgrade to unlock tree markers, collection journal, and more.
      </p>
      <Button
        size="sm"
        className="gap-2"
        onClick={handleUpgrade}
        disabled={upgrading}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {upgrading ? "Upgrading..." : "Upgrade to Premium"}
      </Button>
    </div>
  );
}

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
      <Sparkles className="h-2.5 w-2.5" />
      Pro
    </span>
  );
}
