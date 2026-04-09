"use client";

import type { AccessType, Difficulty, MapFilters as MapFiltersType, Season } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  ACCESS_TYPE_LABELS,
  DIFFICULTY_LABELS,
  SEASON_LABELS,
  cn,
} from "@/lib/utils";
import { useState } from "react";

interface MapFiltersProps {
  filters: MapFiltersType;
  searchQuery: string;
  activeFilterCount: number;
  allSpecies: string[];
  onSearchChange: (query: string) => void;
  onFilterChange: <K extends keyof MapFiltersType>(
    key: K,
    value: MapFiltersType[K]
  ) => void;
  onReset: () => void;
}

export function MapFilterPanel({
  filters,
  searchQuery,
  activeFilterCount,
  allSpecies,
  onSearchChange,
  onFilterChange,
  onReset,
}: MapFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-warm/50" />
        <Input
          placeholder="Search spots, species, regions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-sand-light"
          >
            <X className="h-3.5 w-3.5 text-stone-warm" />
          </button>
        )}
      </div>

      {/* Filter toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-sand-light/50 hover:bg-sand-light transition-colors text-sm"
      >
        <span className="flex items-center gap-2 text-bark font-medium">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center h-5 min-w-5 rounded-full bg-forest text-white text-[10px] font-bold px-1.5">
              {activeFilterCount}
            </span>
          )}
        </span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-stone-warm" />
        ) : (
          <ChevronDown className="h-4 w-4 text-stone-warm" />
        )}
      </button>

      {/* Expanded filters */}
      {expanded && (
        <div className="space-y-4 pt-1 slide-up">
          {/* Species */}
          <FilterSection title="Species">
            <div className="flex flex-wrap gap-1.5">
              {allSpecies.map((sp) => (
                <FilterChip
                  key={sp}
                  label={sp}
                  active={filters.species.includes(sp)}
                  onClick={() => {
                    const next = filters.species.includes(sp)
                      ? filters.species.filter((s) => s !== sp)
                      : [...filters.species, sp];
                    onFilterChange("species", next);
                  }}
                />
              ))}
            </div>
          </FilterSection>

          {/* Difficulty */}
          <FilterSection title="Difficulty">
            <div className="flex flex-wrap gap-1.5">
              {(
                Object.entries(DIFFICULTY_LABELS) as [Difficulty, string][]
              ).map(([key, label]) => (
                <FilterChip
                  key={key}
                  label={label}
                  active={filters.difficulties.includes(key)}
                  onClick={() => {
                    const next = filters.difficulties.includes(key)
                      ? filters.difficulties.filter((d) => d !== key)
                      : [...filters.difficulties, key];
                    onFilterChange("difficulties", next);
                  }}
                />
              ))}
            </div>
          </FilterSection>

          {/* Access type */}
          <FilterSection title="Access Type">
            <div className="flex flex-wrap gap-1.5">
              {(
                Object.entries(ACCESS_TYPE_LABELS) as [AccessType, string][]
              ).map(([key, label]) => (
                <FilterChip
                  key={key}
                  label={label}
                  active={filters.accessTypes.includes(key)}
                  onClick={() => {
                    const next = filters.accessTypes.includes(key)
                      ? filters.accessTypes.filter((a) => a !== key)
                      : [...filters.accessTypes, key];
                    onFilterChange("accessTypes", next);
                  }}
                />
              ))}
            </div>
          </FilterSection>

          {/* Season */}
          <FilterSection title="Best Season">
            <div className="flex flex-wrap gap-1.5">
              {(Object.entries(SEASON_LABELS) as [Season, string][]).map(
                ([key, label]) => (
                  <FilterChip
                    key={key}
                    label={label}
                    active={filters.seasons.includes(key)}
                    onClick={() => {
                      const next = filters.seasons.includes(key)
                        ? filters.seasons.filter((s) => s !== key)
                        : [...filters.seasons, key];
                      onFilterChange("seasons", next);
                    }}
                  />
                )
              )}
            </div>
          </FilterSection>

          {/* Elevation range */}
          <FilterSection title="Elevation Range">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.elevationRange[0]}
                onChange={(e) =>
                  onFilterChange("elevationRange", [
                    Number(e.target.value) || 5000,
                    filters.elevationRange[1],
                  ])
                }
                className="h-8 text-xs"
              />
              <span className="text-xs text-stone-warm">–</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.elevationRange[1]}
                onChange={(e) =>
                  onFilterChange("elevationRange", [
                    filters.elevationRange[0],
                    Number(e.target.value) || 13000,
                  ])
                }
                className="h-8 text-xs"
              />
              <span className="text-xs text-stone-warm shrink-0">ft</span>
            </div>
          </FilterSection>

          {/* Road access */}
          <FilterSection title="Road Access">
            <div className="flex gap-1.5">
              <FilterChip
                label="Road Accessible"
                active={filters.roadAccess === true}
                onClick={() =>
                  onFilterChange(
                    "roadAccess",
                    filters.roadAccess === true ? null : true
                  )
                }
              />
              <FilterChip
                label="Hike/4WD Only"
                active={filters.roadAccess === false}
                onClick={() =>
                  onFilterChange(
                    "roadAccess",
                    filters.roadAccess === false ? null : false
                  )
                }
              />
            </div>
          </FilterSection>

          {/* Reset */}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="w-full gap-2 text-stone-warm"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-bark mb-1.5 uppercase tracking-wider">
        {title}
      </p>
      {children}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-150 border",
        active
          ? "bg-forest text-white border-forest"
          : "bg-white text-bark border-sand hover:border-stone-warm/40 hover:bg-sand-light"
      )}
    >
      {label}
    </button>
  );
}
