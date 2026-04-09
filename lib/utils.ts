import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AccessType, Badge, Difficulty, Season } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ACCESS_TYPE_LABELS: Record<AccessType, string> = {
  public_land: "Public Land",
  permit_required: "Permit Required",
  private_permission: "Private (Permission Needed)",
  unknown: "Access Unknown",
};

export const ACCESS_TYPE_COLORS: Record<AccessType, string> = {
  public_land: "bg-emerald-100 text-emerald-800",
  permit_required: "bg-amber-100 text-amber-800",
  private_permission: "bg-orange-100 text-orange-800",
  unknown: "bg-gray-100 text-gray-700",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-blue-100 text-blue-800",
  advanced: "bg-orange-100 text-orange-800",
  expert: "bg-red-100 text-red-800",
};

export const SEASON_LABELS: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  fall: "Fall",
  winter: "Winter",
};

export const BADGE_LABELS: Record<Badge, string> = {
  permit_likely_required: "Permit Likely Required",
  scouting_only: "Scouting Only",
  sensitive_habitat: "Sensitive Habitat",
  beginner_friendly: "Beginner Friendly",
  high_alpine: "High Alpine Access",
  road_accessible: "Road Accessible",
  remote_access: "Remote Access",
};

export const BADGE_COLORS: Record<Badge, string> = {
  permit_likely_required: "bg-amber-50 text-amber-700 border-amber-200",
  scouting_only: "bg-sky-50 text-sky-700 border-sky-200",
  sensitive_habitat: "bg-rose-50 text-rose-700 border-rose-200",
  beginner_friendly: "bg-emerald-50 text-emerald-700 border-emerald-200",
  high_alpine: "bg-indigo-50 text-indigo-700 border-indigo-200",
  road_accessible: "bg-stone-50 text-stone-700 border-stone-200",
  remote_access: "bg-violet-50 text-violet-700 border-violet-200",
};

export function formatElevation(feet: number): string {
  return `${feet.toLocaleString()}ft`;
}

export function formatDistance(miles: number): string {
  if (miles < 0.1) return "Roadside";
  return `${miles} mi`;
}

export const COLORADO_CENTER = { lat: 38.9, lng: -105.5 };
export const COLORADO_BOUNDS: [[number, number], [number, number]] = [
  [36.99, -109.05],
  [41.0, -102.04],
];
