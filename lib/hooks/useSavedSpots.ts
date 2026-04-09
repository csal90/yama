"use client";

import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

interface SavedSpotRow {
  id: string;
  spot_id: string;
  notes: string;
  created_at: string;
}

interface TripPlanRow {
  id: string;
  name: string;
  region: string;
  notes: string;
  planned_date: string | null;
  created_at: string;
}

interface TripPlanSpotRow {
  spot_id: string;
  position: number;
}

export interface SavedSpot {
  spotId: string;
  notes: string;
  addedAt: string;
}

export interface TripPlan {
  id: string;
  name: string;
  region: string;
  spots: string[];
  notes: string;
  plannedDate?: string;
}

export function useSavedSpots() {
  const { user, loading: authLoading } = useAuth();
  const [savedSpots, setSavedSpots] = useState<SavedSpot[]>([]);
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [loaded, setLoaded] = useState(false);
  const supabase = createClient();

  // Fetch saved spots from Supabase when user is available
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setSavedSpots([]);
      setTripPlans([]);
      setLoaded(true);
      return;
    }

    async function fetchData() {
      const [spotsRes, tripsRes] = await Promise.all([
        supabase
          .from("saved_spots")
          .select("id, spot_id, notes, created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("trip_plans")
          .select("id, name, region, notes, planned_date, created_at")
          .order("created_at", { ascending: false }),
      ]);

      if (spotsRes.data) {
        setSavedSpots(
          spotsRes.data.map((r: SavedSpotRow) => ({
            spotId: r.spot_id,
            notes: r.notes,
            addedAt: r.created_at,
          }))
        );
      }

      if (tripsRes.data) {
        const plans: TripPlan[] = [];
        for (const trip of tripsRes.data as TripPlanRow[]) {
          const { data: tripSpots } = await supabase
            .from("trip_plan_spots")
            .select("spot_id, position")
            .eq("trip_plan_id", trip.id)
            .order("position");

          plans.push({
            id: trip.id,
            name: trip.name,
            region: trip.region,
            notes: trip.notes,
            plannedDate: trip.planned_date ?? undefined,
            spots: (tripSpots as TripPlanSpotRow[] | null)?.map((s) => s.spot_id) ?? [],
          });
        }
        setTripPlans(plans);
      }

      setLoaded(true);
    }

    fetchData();
  }, [user, authLoading, supabase]);

  const isSpotSaved = useCallback(
    (spotId: string) => savedSpots.some((s) => s.spotId === spotId),
    [savedSpots]
  );

  const toggleSaveSpot = useCallback(
    async (spotId: string) => {
      if (!user) return;

      const existing = savedSpots.find((s) => s.spotId === spotId);
      if (existing) {
        // Remove
        setSavedSpots((prev) => prev.filter((s) => s.spotId !== spotId));
        await supabase
          .from("saved_spots")
          .delete()
          .eq("user_id", user.id)
          .eq("spot_id", spotId);
      } else {
        // Add
        const now = new Date().toISOString();
        setSavedSpots((prev) => [
          { spotId, notes: "", addedAt: now },
          ...prev,
        ]);
        await supabase
          .from("saved_spots")
          .insert({ user_id: user.id, spot_id: spotId });
      }
    },
    [user, savedSpots, supabase]
  );

  const updateSpotNotes = useCallback(
    async (spotId: string, notes: string) => {
      if (!user) return;
      setSavedSpots((prev) =>
        prev.map((s) => (s.spotId === spotId ? { ...s, notes } : s))
      );
      await supabase
        .from("saved_spots")
        .update({ notes })
        .eq("user_id", user.id)
        .eq("spot_id", spotId);
    },
    [user, supabase]
  );

  const addTripPlan = useCallback(
    async (plan: Omit<TripPlan, "id">) => {
      if (!user) return "";
      const { data, error } = await supabase
        .from("trip_plans")
        .insert({
          user_id: user.id,
          name: plan.name,
          region: plan.region,
          notes: plan.notes,
          planned_date: plan.plannedDate || null,
        })
        .select("id")
        .single();

      if (error || !data) return "";

      setTripPlans((prev) => [
        { ...plan, id: data.id, spots: plan.spots ?? [] },
        ...prev,
      ]);
      return data.id;
    },
    [user, supabase]
  );

  const removeTripPlan = useCallback(
    async (tripId: string) => {
      if (!user) return;
      setTripPlans((prev) => prev.filter((t) => t.id !== tripId));
      await supabase.from("trip_plans").delete().eq("id", tripId);
    },
    [user, supabase]
  );

  const addSpotToTrip = useCallback(
    async (tripId: string, spotId: string) => {
      if (!user) return;

      let position = 0;
      let shouldInsert = false;

      setTripPlans((prev) => {
        const trip = prev.find((t) => t.id === tripId);
        if (!trip || trip.spots.includes(spotId)) return prev;
        shouldInsert = true;
        position = trip.spots.length;
        return prev.map((t) =>
          t.id === tripId ? { ...t, spots: [...t.spots, spotId] } : t,
        );
      });

      if (!shouldInsert) return;

      const { error } = await supabase.from("trip_plan_spots").insert({
        trip_plan_id: tripId,
        spot_id: spotId,
        position,
      });
      if (error) {
        console.error("trip_plan_spots insert:", error.message);
      }
    },
    [user, supabase],
  );

  const removeSpotFromTrip = useCallback(
    async (tripId: string, spotId: string) => {
      if (!user) return;
      setTripPlans((prev) =>
        prev.map((t) =>
          t.id === tripId
            ? { ...t, spots: t.spots.filter((s) => s !== spotId) }
            : t
        )
      );
      await supabase
        .from("trip_plan_spots")
        .delete()
        .eq("trip_plan_id", tripId)
        .eq("spot_id", spotId);
    },
    [user, supabase]
  );

  return {
    savedSpots,
    tripPlans,
    loaded,
    isAuthenticated: !!user,
    isSpotSaved,
    toggleSaveSpot,
    updateSpotNotes,
    addTripPlan,
    removeTripPlan,
    addSpotToTrip,
    removeSpotFromTrip,
  };
}
