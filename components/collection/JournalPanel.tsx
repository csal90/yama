"use client";

import { useState } from "react";
import { useJournal } from "@/lib/hooks/useJournal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Plus,
  X,
  Trash2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarkerStatus } from "@/types";

const STAGE_CONFIG: Record<MarkerStatus, { label: string; color: string }> = {
  scouted: { label: "Scouted", color: "bg-sky-100 text-sky-700" },
  collected: { label: "Collected", color: "bg-emerald-100 text-emerald-700" },
  potted: { label: "Potted", color: "bg-amber-100 text-amber-700" },
  dead: { label: "Dead", color: "bg-stone-100 text-stone-500" },
};

export function JournalPanel() {
  const { entries, loaded, addEntry, deleteEntry } = useJournal();
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [stage, setStage] = useState<MarkerStatus>("scouted");
  const [entryDate, setEntryDate] = useState(
    () => new Date().toISOString().split("T")[0],
  );

  async function handleCreate() {
    if (!title.trim()) return;
    await addEntry({ title, body, stage, entryDate });
    setTitle("");
    setBody("");
    setStage("scouted");
    setShowNew(false);
  }

  const grouped = entries.reduce<Record<string, typeof entries>>(
    (acc, entry) => {
      const key = entry.entryDate;
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    },
    {},
  );

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Journal timeline</h2>
          <p className="text-sm text-stone-warm mt-1">
            Notes from discovery through potting — pairs with your saved spots and markers.
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => setShowNew(true)}
        >
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </div>

      {showNew && (
        <div className="rounded-xl border border-forest/20 bg-forest/5 p-5 mb-8 slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">New Journal Entry</h3>
            <button
              type="button"
              onClick={() => setShowNew(false)}
              className="p-1 rounded hover:bg-forest/10"
            >
              <X className="h-4 w-4 text-stone-warm" />
            </button>
          </div>
          <div className="space-y-3">
            <Input
              placeholder="Title (e.g., Found amazing juniper on Flagstaff)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <textarea
              placeholder="Details, observations, photos to remember..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              className="flex w-full rounded-lg border border-sand bg-white px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-stone-warm/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 focus-visible:border-forest/40 resize-none"
            />
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="rounded-lg border border-sand bg-white px-3 py-1.5 text-sm text-foreground shadow-sm"
              />
              <div className="flex gap-1.5">
                {(Object.entries(STAGE_CONFIG) as [MarkerStatus, { label: string; color: string }][]).map(
                  ([key, cfg]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStage(key)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium transition-all border",
                        stage === key
                          ? cfg.color + " border-current"
                          : "bg-white text-bark border-sand hover:bg-sand-light",
                      )}
                    >
                      {cfg.label}
                    </button>
                  ),
                )}
              </div>
            </div>
            <Button onClick={handleCreate} disabled={!title.trim()}>
              Save Entry
            </Button>
          </div>
        </div>
      )}

      {!loaded ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
        </div>
      ) : entries.length === 0 && !showNew ? (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-sand bg-sand-light/20">
          <div className="rounded-full bg-sand-light p-4 mb-4">
            <BookOpen className="h-8 w-8 text-stone-warm/40" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No journal entries yet
          </h3>
          <p className="text-sm text-stone-warm max-w-md mb-6">
            Start documenting your yamadori finds alongside spots you save on the map.
          </p>
          <Button className="gap-2" onClick={() => setShowNew(true)}>
            <Plus className="h-4 w-4" />
            Create First Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-stone-warm" />
                <h3 className="text-sm font-semibold text-bark">
                  {new Date(date + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
              </div>
              <div className="space-y-3 pl-6 border-l-2 border-sand">
                {grouped[date].map((entry) => {
                  const cfg = STAGE_CONFIG[entry.stage];
                  return (
                    <div
                      key={entry.id}
                      className="rounded-xl border border-sand/70 bg-white p-4 transition-shadow hover:shadow-sm relative"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground text-sm truncate">
                              {entry.title}
                            </h4>
                            <span
                              className={cn(
                                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                                cfg.color,
                              )}
                            >
                              {cfg.label}
                            </span>
                          </div>
                          {entry.body && (
                            <p className="text-xs text-stone-warm leading-relaxed line-clamp-3">
                              {entry.body}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteEntry(entry.id)}
                          className="shrink-0 p-1.5 rounded-lg hover:bg-rose-50 transition-colors text-stone-warm/40 hover:text-rose-500"
                          aria-label="Delete entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
