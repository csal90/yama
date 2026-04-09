"use client";

import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";
import type { JournalEntry, MarkerStatus } from "@/types";

interface JournalRow {
  id: string;
  user_id: string;
  marker_id: string | null;
  title: string;
  body: string;
  entry_date: string;
  stage: string;
  created_at: string;
}

function rowToEntry(r: JournalRow): JournalEntry {
  return {
    id: r.id,
    userId: r.user_id,
    markerId: r.marker_id,
    title: r.title,
    body: r.body,
    entryDate: r.entry_date,
    stage: r.stage as MarkerStatus,
    createdAt: r.created_at,
  };
}

export interface CreateEntryInput {
  markerId?: string;
  title: string;
  body?: string;
  entryDate?: string;
  stage?: MarkerStatus;
}

export function useJournal() {
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setEntries([]);
      setLoaded(true);
      return;
    }

    async function fetchEntries() {
      const { data } = await supabase
        .from("journal_entries")
        .select("*")
        .order("entry_date", { ascending: false });

      if (data) {
        setEntries((data as JournalRow[]).map(rowToEntry));
      }
      setLoaded(true);
    }

    fetchEntries();
  }, [user, authLoading, supabase]);

  const addEntry = useCallback(
    async (input: CreateEntryInput): Promise<JournalEntry | null> => {
      if (!user) return null;

      const row = {
        user_id: user.id,
        marker_id: input.markerId ?? null,
        title: input.title,
        body: input.body ?? "",
        entry_date: input.entryDate ?? new Date().toISOString().split("T")[0],
        stage: input.stage ?? "scouted",
      };

      const { data, error } = await supabase
        .from("journal_entries")
        .insert(row)
        .select("*")
        .single();

      if (error || !data) return null;

      const entry = rowToEntry(data as JournalRow);
      setEntries((prev) => [entry, ...prev]);
      return entry;
    },
    [user, supabase],
  );

  const updateEntry = useCallback(
    async (entryId: string, updates: Partial<CreateEntryInput>) => {
      if (!user) return;

      const row: Record<string, unknown> = {};
      if (updates.title !== undefined) row.title = updates.title;
      if (updates.body !== undefined) row.body = updates.body;
      if (updates.entryDate !== undefined) row.entry_date = updates.entryDate;
      if (updates.stage !== undefined) row.stage = updates.stage;

      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryId
            ? {
                ...e,
                ...(updates.title !== undefined && { title: updates.title }),
                ...(updates.body !== undefined && { body: updates.body }),
                ...(updates.entryDate !== undefined && { entryDate: updates.entryDate }),
                ...(updates.stage !== undefined && { stage: updates.stage }),
              }
            : e,
        ),
      );

      await supabase
        .from("journal_entries")
        .update(row)
        .eq("id", entryId)
        .eq("user_id", user.id);
    },
    [user, supabase],
  );

  const deleteEntry = useCallback(
    async (entryId: string) => {
      if (!user) return;
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
      await supabase
        .from("journal_entries")
        .delete()
        .eq("id", entryId)
        .eq("user_id", user.id);
    },
    [user, supabase],
  );

  return { entries, loaded, addEntry, updateEntry, deleteEntry };
}
