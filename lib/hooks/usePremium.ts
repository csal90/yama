"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export function usePremium() {
  const { user, loading: authLoading } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      const { data } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user!.id)
        .single();

      setIsPremium(data?.is_premium ?? false);
      setLoading(false);
    }

    fetchProfile();
  }, [user, authLoading, supabase]);

  const upgradeToPremium = async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ is_premium: true })
      .eq("id", user.id);
    setIsPremium(true);
  };

  return {
    isPremium,
    loading: loading || authLoading,
    isAuthenticated: !!user,
    upgradeToPremium,
  };
}
