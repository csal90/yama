"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { readPremiumCache, writePremiumCache } from "@/lib/premiumCache";
import { useAuth } from "./useAuth";

export function usePremium() {
  const { user, loading: authLoading } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Apply sessionStorage before paint so Pro UI does not flash on refresh.
  useLayoutEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsPremium(false);
      setLoading(false);
      return;
    }
    const cached = readPremiumCache(user.id);
    if (cached !== undefined) {
      setIsPremium(cached);
      setLoading(false);
    } else {
      setIsPremium(false);
      setLoading(true);
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    const uid = user.id;
    let cancelled = false;

    async function fetchProfile() {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("is_premium")
          .eq("id", uid)
          .single();

        if (cancelled) return;

        const next = data?.is_premium ?? false;
        setIsPremium(next);
        writePremiumCache(uid, next);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, supabase]);

  const upgradeToPremium = async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ is_premium: true })
      .eq("id", user.id);
    setIsPremium(true);
    writePremiumCache(user.id, true);
  };

  return {
    isPremium,
    loading: loading || authLoading,
    isAuthenticated: !!user,
    upgradeToPremium,
  };
}
