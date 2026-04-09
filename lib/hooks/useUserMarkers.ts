"use client";

import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";
import type { UserMarker, MarkerStatus, MarkerVisibility } from "@/types";

interface MarkerRow {
  id: string;
  user_id: string;
  lat: number;
  lng: number;
  species: string | null;
  status: string;
  notes: string;
  visibility: string;
  created_at: string;
  updated_at: string;
}

function rowToMarker(r: MarkerRow): UserMarker {
  return {
    id: r.id,
    userId: r.user_id,
    lat: r.lat,
    lng: r.lng,
    species: r.species,
    status: r.status as MarkerStatus,
    notes: r.notes,
    visibility: r.visibility as MarkerVisibility,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export interface CreateMarkerInput {
  lat: number;
  lng: number;
  species?: string;
  status?: MarkerStatus;
  notes?: string;
  visibility?: MarkerVisibility;
}

export interface UpdateMarkerInput {
  species?: string | null;
  status?: MarkerStatus;
  notes?: string;
  visibility?: MarkerVisibility;
}

export function useUserMarkers() {
  const { user, loading: authLoading } = useAuth();
  const [markers, setMarkers] = useState<UserMarker[]>([]);
  const [loaded, setLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setMarkers([]);
      setLoaded(true);
      return;
    }

    async function fetchMarkers() {
      const { data } = await supabase
        .from("user_markers")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setMarkers((data as MarkerRow[]).map(rowToMarker));
      }
      setLoaded(true);
    }

    fetchMarkers();
  }, [user, authLoading, supabase]);

  const createMarker = useCallback(
    async (
      input: CreateMarkerInput,
    ): Promise<{ marker: UserMarker | null; error: string | null }> => {
      if (!user) return { marker: null, error: "Not signed in" };

      const row = {
        user_id: user.id,
        lat: input.lat,
        lng: input.lng,
        species: input.species ?? null,
        status: input.status ?? "scouted",
        notes: input.notes ?? "",
        visibility: input.visibility ?? "private",
      };

      const { data, error } = await supabase
        .from("user_markers")
        .insert(row)
        .select("*")
        .single();

      if (error) {
        console.error("user_markers insert:", error.message, error);
        return { marker: null, error: error.message };
      }
      if (!data) {
        return { marker: null, error: "No data returned" };
      }

      const marker = rowToMarker(data as MarkerRow);
      setMarkers((prev) => [marker, ...prev]);
      return { marker, error: null };
    },
    [user, supabase],
  );

  const updateMarker = useCallback(
    async (markerId: string, input: UpdateMarkerInput) => {
      if (!user) return;

      const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (input.species !== undefined) updates.species = input.species;
      if (input.status !== undefined) updates.status = input.status;
      if (input.notes !== undefined) updates.notes = input.notes;
      if (input.visibility !== undefined) updates.visibility = input.visibility;

      setMarkers((prev) =>
        prev.map((m) =>
          m.id === markerId ? { ...m, ...input, updatedAt: updates.updated_at as string } : m,
        ),
      );

      await supabase
        .from("user_markers")
        .update(updates)
        .eq("id", markerId)
        .eq("user_id", user.id);
    },
    [user, supabase],
  );

  const deleteMarker = useCallback(
    async (markerId: string) => {
      if (!user) return;

      setMarkers((prev) => prev.filter((m) => m.id !== markerId));

      await supabase
        .from("user_markers")
        .delete()
        .eq("id", markerId)
        .eq("user_id", user.id);
    },
    [user, supabase],
  );

  return {
    markers,
    loaded,
    createMarker,
    updateMarker,
    deleteMarker,
  };
}
