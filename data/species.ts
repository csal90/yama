import type { Species } from "@/types";

export const species: Species[] = [
  {
    id: "rocky-mountain-juniper",
    commonName: "Rocky Mountain Juniper",
    scientificName: "Juniperus scopulorum",
    description:
      "One of the most sought-after yamadori species in Colorado. Rocky Mountain Junipers develop incredible deadwood, dramatic movement, and beautiful live veins when growing in exposed, windswept conditions. Found throughout the Front Range foothills and canyon areas, often clinging to rocky outcrops where decades of harsh weather create natural bonsai forms.",
    elevationRange: { min: 5000, max: 9000 },
    habitatType: "Rocky outcrops, dry hillsides, canyon walls, exposed ridgelines",
    yamadoriSuitability: "excellent",
    stylingNotes:
      "Exceptional deadwood (shari and jin). Responds well to guy-wiring and slow shaping. Natural twisting trunk lines are prized. Compact foliage pads develop with patience. Red-brown bark ages beautifully.",
    bestScoutingSeason: ["spring", "fall"],
    difficulty: "intermediate",
  },
  {
    id: "ponderosa-pine",
    commonName: "Ponderosa Pine",
    scientificName: "Pinus ponderosa",
    description:
      "The iconic pine of Colorado's montane zone. Ponderosa pines in exposed, rocky habitats can develop short, thick trunks and dramatic windswept forms. Younger trees in poor soil conditions make excellent yamadori candidates. The distinctive orange-brown bark plates and long needles make for striking bonsai.",
    elevationRange: { min: 5500, max: 9000 },
    habitatType: "Montane forests, rocky slopes, south-facing hillsides",
    yamadoriSuitability: "good",
    stylingNotes:
      "Long needles can be reduced over time with proper technique. Best styled in informal upright or windswept forms. Bark becomes more attractive with age. Requires patience during initial recovery period after collection.",
    bestScoutingSeason: ["spring"],
    difficulty: "intermediate",
  },
  {
    id: "limber-pine",
    commonName: "Limber Pine",
    scientificName: "Pinus flexilis",
    description:
      "Named for its incredibly flexible branches, Limber Pine is a high-altitude species that develops extraordinary character in exposed alpine environments. Trees growing near treeline often exhibit dramatic deadwood, twisted trunks, and compact growth that naturally resembles refined bonsai.",
    elevationRange: { min: 7500, max: 12000 },
    habitatType: "Subalpine forests, exposed ridges, rocky alpine terrain",
    yamadoriSuitability: "excellent",
    stylingNotes:
      "Flexible branches make wiring and positioning easier. Develops excellent deadwood naturally. Short needles are ideal for bonsai proportion. Slow growth means collected trees often have significant age and character. Pairs well with shari and jin techniques.",
    bestScoutingSeason: ["summer"],
    difficulty: "advanced",
  },
  {
    id: "douglas-fir",
    commonName: "Douglas Fir",
    scientificName: "Pseudotsuga menziesii",
    description:
      "A versatile and widely distributed conifer in Colorado's mountains. Douglas Fir makes interesting bonsai with its distinctive buds and layered branching. While less commonly collected than junipers or pines, specimens growing in rocky, exposed sites can develop impressive character.",
    elevationRange: { min: 6000, max: 10000 },
    habitatType: "North-facing slopes, mixed montane forests, shaded ravines",
    yamadoriSuitability: "moderate",
    stylingNotes:
      "Develops natural layered branching ideal for formal and informal upright styles. Soft foliage is attractive but can be difficult to refine into tight pads. New spring growth provides nice color contrast. Benefits from careful root work during collection.",
    bestScoutingSeason: ["spring", "fall"],
    difficulty: "intermediate",
  },
  {
    id: "engelmann-spruce",
    commonName: "Engelmann Spruce",
    scientificName: "Picea engelmannii",
    description:
      "Colorado's high-altitude spruce species, found in dense subalpine forests and at treeline. When growing in exposed conditions at high elevation, Engelmann Spruce can develop stunning weathered forms with dramatic deadwood and compact growth. These high-altitude specimens are among the most prized yamadori finds.",
    elevationRange: { min: 9000, max: 12500 },
    habitatType: "Subalpine forests, treeline environments, north-facing high-altitude slopes",
    yamadoriSuitability: "good",
    stylingNotes:
      "Short, stiff needles work well for bonsai. Can develop excellent ramification. Treeline specimens often have naturally compact, windswept forms. Requires careful aftercare — spruce can be slow to recover from collection. Best results with patient, gradual styling.",
    bestScoutingSeason: ["summer"],
    difficulty: "advanced",
  },
  {
    id: "bristlecone-pine",
    commonName: "Bristlecone Pine",
    scientificName: "Pinus aristata",
    description:
      "Among the oldest living organisms on Earth, Colorado's Bristlecone Pines are legendary for their twisted, weathered forms and extreme longevity. Found at the highest elevations, these trees represent the pinnacle of natural bonsai artistry. Note: collection is heavily restricted in most areas due to their ecological significance.",
    elevationRange: { min: 9500, max: 12000 },
    habitatType: "Exposed alpine ridges, rocky high-elevation terrain, windswept summits",
    yamadoriSuitability: "limited",
    stylingNotes:
      "Iconic twisted forms and extensive deadwood. Short, dense needles in bottle-brush clusters. Extremely slow growing — collected specimens may be centuries old. Most areas prohibit collection. Where permitted, extreme care and expertise required. Considered the ultimate yamadori prize by many practitioners.",
    bestScoutingSeason: ["summer"],
    difficulty: "expert",
  },
];
