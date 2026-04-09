export type AccessType =
  | "public_land"
  | "permit_required"
  | "private_permission"
  | "unknown";

export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type Season = "spring" | "summer" | "fall" | "winter";

export type Badge =
  | "permit_likely_required"
  | "scouting_only"
  | "sensitive_habitat"
  | "beginner_friendly"
  | "high_alpine"
  | "road_accessible"
  | "remote_access";

export type Region =
  | "Front Range"
  | "Colorado Springs"
  | "Pikes Peak"
  | "San Juan Mountains"
  | "Gunnison"
  | "Rocky Mountain Foothills"
  | "Wet Mountains"
  | "Sangre de Cristo"
  | "Mosquito Range";

export interface ScoutingSpot {
  id: string;
  name: string;
  region: Region;
  coordinates: { lat: number; lng: number };
  elevation: number; // feet
  species: string[];
  bestSeasons: Season[];
  accessType: AccessType;
  difficulty: Difficulty;
  hikeDistance: number; // miles
  roadAccess: boolean;
  badges: Badge[];
  description: string;
  accessNotes: string;
  permitNotes: string;
  scoutingNotes: string;
  ethicsReminder: string;
  imageUrl?: string;
}

export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  description: string;
  elevationRange: { min: number; max: number };
  habitatType: string;
  yamadoriSuitability: "excellent" | "good" | "moderate" | "limited";
  stylingNotes: string;
  bestScoutingSeason: Season[];
  difficulty: Difficulty;
  imageUrl?: string;
}

export interface SavedSpot {
  spotId: string;
  notes: string;
  addedAt: string;
  tripPlanId?: string;
}

export interface TripPlan {
  id: string;
  name: string;
  region: Region;
  spots: string[];
  notes: string;
  plannedDate?: string;
}

export interface MapFilters {
  species: string[];
  elevationRange: [number, number];
  accessTypes: AccessType[];
  difficulties: Difficulty[];
  seasons: Season[];
  roadAccess: boolean | null;
  hikeDistanceMax: number | null;
}

export interface MapLayer {
  id: string;
  label: string;
  enabled: boolean;
}
