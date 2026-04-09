"use client";

import { useState, useCallback, useMemo } from "react";
import type { MapFilters, ScoutingSpot } from "@/types";

const DEFAULT_FILTERS: MapFilters = {
  species: [],
  elevationRange: [5000, 13000],
  accessTypes: [],
  difficulties: [],
  seasons: [],
  roadAccess: null,
  hikeDistanceMax: null,
};

export function useFilters(spots: ScoutingSpot[]) {
  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");

  const updateFilter = useCallback(
    <K extends keyof MapFilters>(key: K, value: MapFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchQuery("");
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.species.length > 0) count++;
    if (
      filters.elevationRange[0] !== 5000 ||
      filters.elevationRange[1] !== 13000
    )
      count++;
    if (filters.accessTypes.length > 0) count++;
    if (filters.difficulties.length > 0) count++;
    if (filters.seasons.length > 0) count++;
    if (filters.roadAccess !== null) count++;
    if (filters.hikeDistanceMax !== null) count++;
    return count;
  }, [filters]);

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          spot.name.toLowerCase().includes(q) ||
          spot.region.toLowerCase().includes(q) ||
          spot.species.some((s) => s.toLowerCase().includes(q)) ||
          spot.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      if (filters.species.length > 0) {
        if (!spot.species.some((s) => filters.species.includes(s)))
          return false;
      }

      if (
        spot.elevation < filters.elevationRange[0] ||
        spot.elevation > filters.elevationRange[1]
      ) {
        return false;
      }

      if (filters.accessTypes.length > 0) {
        if (!filters.accessTypes.includes(spot.accessType)) return false;
      }

      if (filters.difficulties.length > 0) {
        if (!filters.difficulties.includes(spot.difficulty)) return false;
      }

      if (filters.seasons.length > 0) {
        if (!spot.bestSeasons.some((s) => filters.seasons.includes(s)))
          return false;
      }

      if (filters.roadAccess !== null) {
        if (spot.roadAccess !== filters.roadAccess) return false;
      }

      if (filters.hikeDistanceMax !== null) {
        if (spot.hikeDistance > filters.hikeDistanceMax) return false;
      }

      return true;
    });
  }, [spots, filters, searchQuery]);

  return {
    filters,
    searchQuery,
    setSearchQuery,
    updateFilter,
    resetFilters,
    activeFilterCount,
    filteredSpots,
  };
}
