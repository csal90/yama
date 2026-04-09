import type { ScoutingSpot } from "@/types";

export const spots: ScoutingSpot[] = [
  // ── Colorado Springs / Pikes Peak ─────────────────────────────
  {
    id: "north-cheyenne-canyon",
    name: "North Cheyenne Cañon Ridgeline",
    region: "Colorado Springs",
    coordinates: { lat: 38.791, lng: -104.886 },
    elevation: 7200,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 1.2,
    roadAccess: true,
    badges: ["beginner_friendly", "road_accessible"],
    description:
      "The ridgelines above North Cheyenne Cañon Park offer excellent scouting for juniper and ponderosa. Rocky granite outcrops along the trail edges host weather-beaten specimens with natural bonsai character. Easy access from the park road makes this ideal for beginners.",
    accessNotes:
      "City of Colorado Springs open space. Free access, open dawn to dusk. Stay on designated trails for scouting.",
    permitNotes:
      "Collection is NOT permitted in city open space. Scouting and photography only. Use this area to study natural forms and identify species.",
    scoutingNotes:
      "Best specimens are on south-facing rocky outcrops above the main trail. Look for junipers with exposed deadwood on wind-battered ridge crests. The Captain Jack's trail area has particularly good examples.",
    ethicsReminder:
      "This is a protected open space — observe and learn, but do not collect. Use your scouting skills here to prepare for collecting in permitted areas.",
  },
  {
    id: "pikes-peak-treeline",
    name: "Pikes Peak Treeline Zone",
    region: "Pikes Peak",
    coordinates: { lat: 38.842, lng: -105.044 },
    elevation: 11500,
    species: ["Bristlecone Pine", "Limber Pine", "Engelmann Spruce"],
    bestSeasons: ["summer"],
    accessType: "permit_required",
    difficulty: "expert",
    hikeDistance: 4.5,
    roadAccess: false,
    badges: ["permit_likely_required", "sensitive_habitat", "high_alpine"],
    description:
      "The treeline zone on Pikes Peak hosts some of the most spectacular natural bonsai forms in Colorado. Ancient bristlecone and limber pines cling to exposed granite at over 11,000 feet, shaped by centuries of extreme wind, ice, and UV exposure.",
    accessNotes:
      "Pike National Forest. Access via Crags Trail or Barr Trail. High-altitude conditions require preparation. Summer-only access for most routes.",
    permitNotes:
      "USFS permit required for any collection in Pike National Forest. Contact Pikes Peak Ranger District. Bristlecone pines are generally protected — verify regulations before any collection attempt.",
    scoutingNotes:
      "Approach from the Crags trailhead for the most accessible treeline specimens. The zone between 11,000–11,800ft has the best wind-sculpted forms. Bring binoculars for scouting exposed ridgelines. Weather changes rapidly — plan for early starts.",
    ethicsReminder:
      "High-alpine trees grow incredibly slowly — a small specimen may be hundreds of years old. Only consider collection with proper permits and significant yamadori experience. When in doubt, photograph and leave.",
  },
  {
    id: "garden-of-the-gods-perimeter",
    name: "Garden of the Gods Foothills",
    region: "Colorado Springs",
    coordinates: { lat: 38.874, lng: -104.87 },
    elevation: 6400,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 0.5,
    roadAccess: true,
    badges: ["scouting_only", "beginner_friendly", "road_accessible"],
    description:
      "The foothills surrounding Garden of the Gods feature dramatic red rock formations with junipers and ponderosas growing directly from sandstone cracks. Incredible natural bonsai aesthetics for study and photography. The contrast of green foliage against red rock is stunning.",
    accessNotes:
      "City park with free access. Extremely popular — visit early morning or weekdays for quieter scouting. Stay on trails.",
    permitNotes:
      "Collection is strictly prohibited. This is a registered National Natural Landmark. Scouting and study only.",
    scoutingNotes:
      "The Palmer Trail loop and Siamese Twins area have especially good juniper specimens growing from rock. Study how roots wrap around and through sandstone — this informs how you work with exposed root bonsai styles (neagari).",
    ethicsReminder:
      "This is a protected natural landmark. Do not disturb any vegetation. Use this as an outdoor classroom to refine your eye for yamadori potential.",
  },
  {
    id: "gold-camp-road",
    name: "Gold Camp Road Corridor",
    region: "Colorado Springs",
    coordinates: { lat: 38.772, lng: -104.918 },
    elevation: 8100,
    species: ["Rocky Mountain Juniper", "Douglas Fir", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 1.8,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The historic Gold Camp Road, a converted railroad grade above Colorado Springs, passes through excellent juniper and pine habitat. Rocky cuts along the road expose trees growing in challenging conditions with limited soil, creating natural bonsai forms.",
    accessNotes:
      "Pike National Forest road. Partially closed to vehicles beyond the tunnels. Hikeable year-round in lower sections. Road can be rough — high clearance recommended.",
    permitNotes:
      "USFS land — a permit from the Pikes Peak Ranger District is required for any collection. Check current regulations and seasonal restrictions.",
    scoutingNotes:
      "Focus on the rocky road cuts between tunnels 1 and 3. Junipers growing from cracks in the granite have excellent character. The south-facing exposures along the old railroad grade get maximum sun and wind stress.",
    ethicsReminder:
      "Even with a USFS permit, practice selective and sustainable collection. Take only what you're confident you can successfully grow. Leave the best specimens for future generations.",
  },
  {
    id: "rampart-range",
    name: "Rampart Range Upper Ridges",
    region: "Colorado Springs",
    coordinates: { lat: 38.95, lng: -105.08 },
    elevation: 9200,
    species: ["Limber Pine", "Rocky Mountain Juniper", "Douglas Fir"],
    bestSeasons: ["spring", "summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 3.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The Rampart Range Road provides access to excellent high-elevation habitat along the Front Range divide. Upper ridgelines feature wind-battered limber pines and junipers with substantial character. Less visited than closer areas, offering more solitude for scouting.",
    accessNotes:
      "Pike National Forest. Accessible via Rampart Range Road (seasonal — typically open May through October). Some side roads require 4WD.",
    permitNotes:
      "USFS permit required for collection. Rampart Range is within Pike National Forest jurisdiction. Contact the South Platte Ranger District.",
    scoutingNotes:
      "Best specimens are on exposed granite ridgelines west of the main road. Hike any of the short spur trails to ridgetop for panoramic scouting. Limber pines at 9000+ feet show the most character.",
    ethicsReminder:
      "High-elevation trees are slow-growing and ecologically important. Collect responsibly and within the bounds of your permit. Consider the long-term impact on the landscape.",
  },

  // ── Front Range ───────────────────────────────────────────────
  {
    id: "clear-creek-canyon",
    name: "Clear Creek Canyon Walls",
    region: "Front Range",
    coordinates: { lat: 39.735, lng: -105.363 },
    elevation: 6800,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "advanced",
    hikeDistance: 1.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The steep canyon walls along Clear Creek between Golden and Idaho Springs host incredible juniper specimens clinging to vertical rock faces. These trees develop extraordinary deadwood and twisted forms from the challenging growing conditions.",
    accessNotes:
      "Mix of BLM and Jefferson County Open Space. Highway 6 provides road access. Steep terrain — scrambling required to reach the best specimens.",
    permitNotes:
      "Verify land jurisdiction carefully — boundaries between BLM, county, and private land can be unclear in the canyon. BLM may issue permits; county open space does not allow collection.",
    scoutingNotes:
      "Scout from the road with binoculars first. The south-facing canyon walls between Tunnel 1 and the Mayhem Gulch pulloff have exceptional junipers. Note that rock climbing areas overlap — visit on weekdays to avoid crowds.",
    ethicsReminder:
      "This is a popular recreation corridor. Be respectful of other users. Verify land ownership boundaries before any collection attempts. Some areas are critical bighorn sheep habitat.",
  },
  {
    id: "mount-falcon",
    name: "Mount Falcon Park Ridges",
    region: "Front Range",
    coordinates: { lat: 39.644, lng: -105.234 },
    elevation: 7700,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine", "Douglas Fir"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["scouting_only", "beginner_friendly", "road_accessible"],
    description:
      "Jefferson County's Mount Falcon Park offers excellent scouting opportunities along its exposed ridgelines. The meadow-to-forest transitions feature scattered junipers and ponderosas in rocky soil. The Walker Home ruins area has particularly scenic specimens.",
    accessNotes:
      "Jeffco Open Space. Free parking at both trailheads. Open sunrise to sunset. Well-maintained trails.",
    permitNotes:
      "Collection NOT permitted in Jefferson County Open Space. Outstanding scouting and study location only.",
    scoutingNotes:
      "The ridgeline trail between the two trailheads passes through prime juniper habitat. The exposed areas near Castle Trail offer windswept ponderosa worth studying. Excellent views help with landscape-level habitat assessment.",
    ethicsReminder:
      "Open space parks exist to protect natural areas. Use these visits to develop your scouting eye and species identification skills, then apply them in areas where permitted collection is possible.",
  },
  {
    id: "south-platte-corridor",
    name: "South Platte River Canyon",
    region: "Front Range",
    coordinates: { lat: 39.38, lng: -105.2 },
    elevation: 6200,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.5,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The granite canyon of the South Platte between Deckers and Cheesman Reservoir is prime juniper territory. Warm, dry conditions and rocky substrate produce classic yamadori candidates with dramatic root-over-rock growth and extensive deadwood.",
    accessNotes:
      "Pike National Forest. Access via County Road 126 (Deckers Road). Multiple pulloffs and picnic areas provide trailhead options.",
    permitNotes:
      "USFS permit required. Contact the South Platte Ranger District. Fire restrictions may limit access during high-risk periods.",
    scoutingNotes:
      "Focus on the granite domes and cliff bands above the river. South-facing aspects have the most stressed, characterful trees. The area between Lone Rock and Wigwam has excellent specimens. Cross-reference with USFS land maps to ensure you're on National Forest.",
    ethicsReminder:
      "This riparian corridor is ecologically sensitive. Avoid disturbing stream banks and riparian vegetation. Collect only from upland rocky areas and always with a valid permit.",
  },
  {
    id: "staunton-state-park",
    name: "Staunton State Park High Meadows",
    region: "Front Range",
    coordinates: { lat: 39.518, lng: -105.37 },
    elevation: 8200,
    species: ["Ponderosa Pine", "Douglas Fir", "Limber Pine"],
    bestSeasons: ["spring", "summer"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 2.2,
    roadAccess: true,
    badges: ["scouting_only", "beginner_friendly"],
    description:
      "Staunton State Park's high meadows and granite formations provide excellent habitat for scouting. The park features diverse terrain from meadows to cliff faces, with ponderosa and Douglas fir in various growth conditions. The lion-shaped rock formations create unique microclimates.",
    accessNotes:
      "Colorado State Park. Day pass required ($10). Open year-round but winter access may be limited.",
    permitNotes:
      "Collection is NOT permitted in state parks. Use as a learning and scouting practice site only.",
    scoutingNotes:
      "The Elk Falls trail passes through excellent mixed conifer terrain. The granite domes near the Lions Head formation have interesting wind-stressed trees. Take notes on species, conditions, and growth forms to apply to your collecting on USFS land.",
    ethicsReminder:
      "State parks protect Colorado's natural heritage. Practice non-invasive scouting techniques — photograph, sketch, and take notes without disturbing vegetation or soil.",
  },

  // ── Gunnison ──────────────────────────────────────────────────
  {
    id: "black-canyon-rim",
    name: "Black Canyon North Rim Junipers",
    region: "Gunnison",
    coordinates: { lat: 38.58, lng: -107.72 },
    elevation: 8000,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The North Rim of the Black Canyon area features ancient junipers growing from Precambrian rock along the canyon edge. The extreme exposure and thin soil produce extraordinary twisted forms. Less visited than the South Rim, offering quieter scouting.",
    accessNotes:
      "Mix of BLM and Curecanti NRA land surrounding the national park. Verify boundaries carefully. North Rim Road is seasonal (typically May–November).",
    permitNotes:
      "Collection is prohibited within the National Park. Adjacent BLM land may allow permitted collection — contact the Gunnison Field Office for current regulations.",
    scoutingNotes:
      "Focus on BLM land north and east of the park boundary. The piñon-juniper woodland along the canyon rim has excellent weathered specimens. Use the park as inspiration but collect only on permitted BLM land.",
    ethicsReminder:
      "The Black Canyon ecosystem is fragile and irreplaceable. Respect all park boundaries. Even on adjacent BLM land, collect conservatively and sustainably.",
  },
  {
    id: "hartman-rocks",
    name: "Hartman Rocks Recreation Area",
    region: "Gunnison",
    coordinates: { lat: 38.508, lng: -106.96 },
    elevation: 7800,
    species: ["Rocky Mountain Juniper"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 1.0,
    roadAccess: true,
    badges: ["beginner_friendly", "road_accessible"],
    description:
      "BLM-managed recreation area south of Gunnison featuring extensive juniper woodland growing from granite formations. The open terrain and good road access make this an excellent beginner scouting area. Junipers here develop character from the harsh Gunnison Basin climate.",
    accessNotes:
      "BLM land with open access. Well-established trail network for mountain biking and hiking. Multiple access points from County Road 38.",
    permitNotes:
      "BLM land — contact the Gunnison Field Office about collection permits. This is an active recreation area, so be aware of multi-use conflicts.",
    scoutingNotes:
      "The granite outcrops scattered throughout the area host the best juniper specimens. Look for trees growing directly from rock crevices with exposed root systems. The western section has less trail traffic and more undisturbed habitat.",
    ethicsReminder:
      "Hartman Rocks is a shared recreation area. Be respectful of other users and leave no trace. If collecting with a permit, work discreetly and restore the collection site.",
  },
  {
    id: "cochetopa-pass",
    name: "Cochetopa Pass High Country",
    region: "Gunnison",
    coordinates: { lat: 38.15, lng: -106.63 },
    elevation: 10000,
    species: ["Limber Pine", "Engelmann Spruce", "Douglas Fir"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 3.5,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The high country around Cochetopa Pass offers excellent access to subalpine species. Limber pine and spruce at the transition zone between montane and subalpine forests develop interesting forms in the exposed, windy conditions typical of high passes.",
    accessNotes:
      "Gunnison National Forest. Access via Highway 114. Several forest roads provide high-elevation starting points. Summer-only access for most areas.",
    permitNotes:
      "USFS permit required for collection on National Forest land. Contact the Gunnison Ranger District.",
    scoutingNotes:
      "The best specimens are in the transition zone between 9,500–10,500ft where trees face maximum wind exposure. Side roads off Highway 114 lead to productive ridgelines. The limber pines on exposed knolls are particularly promising.",
    ethicsReminder:
      "High-altitude collection areas are slow to recover. Take only what you need and ensure the tree has a strong chance of survival. Fill and restore any holes left from collection.",
  },

  // ── San Juan Mountains ────────────────────────────────────────
  {
    id: "engineer-pass",
    name: "Engineer Pass Alpine Zone",
    region: "San Juan Mountains",
    coordinates: { lat: 37.98, lng: -107.59 },
    elevation: 12000,
    species: ["Engelmann Spruce", "Limber Pine", "Bristlecone Pine"],
    bestSeasons: ["summer"],
    accessType: "permit_required",
    difficulty: "expert",
    hikeDistance: 3.0,
    roadAccess: false,
    badges: ["permit_likely_required", "sensitive_habitat", "high_alpine", "remote_access"],
    description:
      "The alpine zone near Engineer Pass in the San Juans is one of Colorado's most spectacular high-altitude environments. Krummholz spruce and ancient pines at treeline display centuries of wind sculpting. The remoteness and harsh conditions create world-class yamadori forms.",
    accessNotes:
      "Uncompahgre National Forest. 4WD required for Engineer Pass Road (seasonal, typically July–September). High altitude — be prepared for altitude sickness, sudden storms, and cold temperatures even in summer.",
    permitNotes:
      "USFS permit required. Contact Ouray Ranger District. Alpine collection is subject to additional restrictions. Bristlecone collection is generally prohibited.",
    scoutingNotes:
      "Focus on the treeline band between 11,500–12,200ft. Krummholz spruce clusters on the windward side of ridgelines have the most dramatic forms. The traverse between Engineer and Cinnamon passes has exceptional specimens. Plan for short work windows due to afternoon storms.",
    ethicsReminder:
      "Alpine ecosystems are among the most fragile in Colorado. Trees at treeline may be centuries old despite their small size. Approach with humility and collect only with expert-level skills and proper permits.",
  },
  {
    id: "molas-pass",
    name: "Molas Pass Treeline",
    region: "San Juan Mountains",
    coordinates: { lat: 37.75, lng: -107.69 },
    elevation: 10900,
    species: ["Engelmann Spruce", "Limber Pine"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "advanced",
    hikeDistance: 2.5,
    roadAccess: true,
    badges: ["high_alpine"],
    description:
      "Molas Pass along the Million Dollar Highway offers accessible high-altitude scouting. The treeline zone here features wind-flagged spruce and compact limber pines. The dramatic San Juan scenery makes this a memorable scouting destination.",
    accessNotes:
      "San Juan National Forest. Highway 550 provides road access to the pass. Several trailheads at the summit parking area. Summer access only for off-road exploration.",
    permitNotes:
      "USFS permit required for any collection on National Forest land. Contact the Columbine Ranger District.",
    scoutingNotes:
      "The ridgelines east of the pass summit have excellent treeline specimens. Look for flagged spruce where prevailing west winds create one-sided growth. The Little Molas Lake area has good specimen diversity in a relatively accessible setting.",
    ethicsReminder:
      "The San Juans are a treasured wilderness. Practice minimum-impact scouting and collection. Share trail with other hikers and be respectful of the landscape.",
  },
  {
    id: "ophir-pass",
    name: "Ophir Pass Rocky Outcrops",
    region: "San Juan Mountains",
    coordinates: { lat: 37.85, lng: -107.78 },
    elevation: 11700,
    species: ["Limber Pine", "Engelmann Spruce"],
    bestSeasons: ["summer"],
    accessType: "permit_required",
    difficulty: "advanced",
    hikeDistance: 2.0,
    roadAccess: false,
    badges: ["permit_likely_required", "high_alpine", "remote_access"],
    description:
      "Ophir Pass connects Silverton to Telluride through a narrow, dramatic alpine corridor. Rocky outcrops along the pass road and adjacent ridgelines host wind-battered limber pines and krummholz spruce with exceptional yamadori character.",
    accessNotes:
      "Uncompahgre National Forest. 4WD required for Ophir Pass Road. Short summer access season (July–September). The road is narrow with exposure — not for the faint of heart.",
    permitNotes:
      "USFS permit required. This area falls under the Norwood Ranger District. Verify current collection zones and restrictions.",
    scoutingNotes:
      "The rocky knolls on the north side of the pass between 11,000–11,700ft have the best limber pine specimens. Trees growing from fractured rock faces develop incredible exposed root systems. Scout during clear morning weather before afternoon thunderstorms.",
    ethicsReminder:
      "Remote alpine areas require extra care. Pack out everything and restore any disturbed ground. These slow-growing trees may represent centuries of survival.",
  },
  {
    id: "silverton-caldera",
    name: "Silverton Caldera Rim",
    region: "San Juan Mountains",
    coordinates: { lat: 37.82, lng: -107.65 },
    elevation: 10800,
    species: ["Engelmann Spruce", "Limber Pine"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "advanced",
    hikeDistance: 4.0,
    roadAccess: false,
    badges: ["high_alpine", "remote_access"],
    description:
      "The ancient volcanic caldera surrounding Silverton creates a unique high-altitude bowl with dramatic ridgelines. Trees growing on the exposed caldera rim face extreme conditions, producing twisted, weathered forms with significant deadwood.",
    accessNotes:
      "San Juan National Forest and BLM land. Multiple trailheads accessible from Silverton. High altitude — acclimatize before extensive hiking. Summer-only access.",
    permitNotes:
      "Verify land jurisdiction before collection — the area includes national forest, BLM, and private mining claims. USFS and BLM permits may be required.",
    scoutingNotes:
      "The ridgeline trails north of Silverton (toward Handies Peak) offer the best combination of access and specimen quality. Look for spruce krummholz on exposed saddles and limber pines on rocky promontories.",
    ethicsReminder:
      "The San Juan mining district has a long history of environmental impact. Practice restorative ethics — leave each site better than you found it.",
  },

  // ── Rocky Mountain Foothills ──────────────────────────────────
  {
    id: "horsetooth-hogback",
    name: "Horsetooth Hogback Ridgeline",
    region: "Rocky Mountain Foothills",
    coordinates: { lat: 40.555, lng: -105.17 },
    elevation: 6200,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.5,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The Horsetooth Hogback west of Fort Collins is a dramatic sandstone ridge with exceptional juniper habitat. Trees growing from rock crevices on the exposed ridge face extreme wind and drought stress, creating natural yamadori forms visible from miles away.",
    accessNotes:
      "Mix of Larimer County and City of Fort Collins open space. Portions are open for public access. Verify current trail status and boundaries.",
    permitNotes:
      "Collection NOT permitted in county/city open space. Adjacent BLM and private land may have different regulations. Verify jurisdiction carefully.",
    scoutingNotes:
      "The ridge crest trail provides excellent elevated scouting. Junipers on the west (windward) face of the hogback show the most dramatic wind shaping. Use this area to study wind effects on form and develop your scouting eye.",
    ethicsReminder:
      "Hogback ecosystems are unique geological and biological features. Respect trail boundaries and land ownership. Scout responsibly and collect only where legally permitted.",
  },
  {
    id: "lyons-sandstone",
    name: "Lyons Sandstone Formations",
    region: "Rocky Mountain Foothills",
    coordinates: { lat: 40.22, lng: -105.27 },
    elevation: 5800,
    species: ["Rocky Mountain Juniper"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 1.5,
    roadAccess: true,
    badges: ["beginner_friendly", "road_accessible"],
    description:
      "The red sandstone formations near Lyons host stunning junipers growing from rock faces and outcrops. The warm, south-facing rock creates a microclimate favorable for developing stressed, characterful growth. An accessible and productive scouting destination.",
    accessNotes:
      "Mix of BLM land and Boulder County open space near Lyons. Access via Highway 36 and local roads. Some areas have seasonal closures for raptor nesting.",
    permitNotes:
      "Check specific land ownership before any collection. BLM parcels may allow collection with a permit from the Royal Gorge Field Office. County open space prohibits collection.",
    scoutingNotes:
      "Focus on the exposed red sandstone outcrops along the hogback. Root-over-rock junipers here are particularly spectacular. Early morning light provides the best conditions for assessing trunk movement and deadwood.",
    ethicsReminder:
      "Raptor nesting areas require seasonal buffers. Check with the local BLM office for current restrictions. Avoid disturbing wildlife during your scouting visits.",
  },
  {
    id: "boulder-canyon",
    name: "Boulder Canyon Granite Zone",
    region: "Rocky Mountain Foothills",
    coordinates: { lat: 40.005, lng: -105.36 },
    elevation: 6500,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine", "Douglas Fir"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 1.8,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "Boulder Canyon's granite walls host diverse tree species in challenging growing conditions. The canyon creates a wind tunnel effect that shapes trees dramatically. Multiple access points along the canyon road make this a convenient scouting corridor.",
    accessNotes:
      "Roosevelt National Forest and Boulder County land. Highway 119 provides road access. Multiple pulloffs and trailheads. Some areas are climbing closures.",
    permitNotes:
      "USFS land requires a permit for collection. Contact the Boulder Ranger District. County land prohibits collection. Verify boundaries carefully.",
    scoutingNotes:
      "The south-facing granite walls between Boulder Falls and Nederland have the best juniper specimens. Trees growing from cracks at the top of cliff faces show the most wind exposure and character. Access can require scrambling.",
    ethicsReminder:
      "Boulder Canyon is heavily used for recreation. Be mindful of climbers, kayakers, and other visitors. Practice low-impact scouting and leave no trace.",
  },

  // ── Wet Mountains ─────────────────────────────────────────────
  {
    id: "hardscrabble-pass",
    name: "Hardscrabble Pass Ridgelines",
    region: "Wet Mountains",
    coordinates: { lat: 38.28, lng: -105.17 },
    elevation: 9000,
    species: ["Ponderosa Pine", "Rocky Mountain Juniper", "Douglas Fir"],
    bestSeasons: ["spring", "summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.5,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The Wet Mountains are an underappreciated range between the Arkansas Valley and the Sangre de Cristos. Hardscrabble Pass area features excellent mixed conifer habitat with south-facing exposures that stress trees into yamadori-worthy forms.",
    accessNotes:
      "San Isabel National Forest. Highway 96 provides access. Several forest roads lead to higher elevations. Less crowded than Front Range locations.",
    permitNotes:
      "USFS permit required for collection. Contact the San Carlos Ranger District. The relatively low visitation means less competition for good specimens.",
    scoutingNotes:
      "The ridgelines on either side of the pass have excellent scouting. South-facing rocky outcrops between 8,500–9,500ft are prime territory. Look for ponderosas in decomposed granite — the poor soil creates compact, aged-looking specimens.",
    ethicsReminder:
      "The Wet Mountains have healthy forest ecosystems. Practice selective collection that doesn't impact the visual landscape or local ecology.",
  },
  {
    id: "greenhorn-mountain",
    name: "Greenhorn Mountain Slopes",
    region: "Wet Mountains",
    coordinates: { lat: 37.88, lng: -105.02 },
    elevation: 9800,
    species: ["Ponderosa Pine", "Limber Pine", "Douglas Fir"],
    bestSeasons: ["spring", "summer"],
    accessType: "public_land",
    difficulty: "advanced",
    hikeDistance: 4.0,
    roadAccess: false,
    badges: ["remote_access"],
    description:
      "Greenhorn Mountain, the highest peak in the Wet Mountains, offers remote scouting in a less-visited range. The upper slopes feature limber pines with significant age and character. The effort to reach these specimens is rewarded with solitude and quality.",
    accessNotes:
      "San Isabel National Forest. Access via Ophir Creek Road (Forest Road 400). Remote area — carry navigation tools. Cell service limited.",
    permitNotes:
      "USFS permit required. Contact the San Carlos Ranger District. Low-traffic area means less management attention — be prepared to self-regulate.",
    scoutingNotes:
      "The upper slopes above 9,000ft have the best specimens. Exposed rocky ridgelines on the west side of the mountain face prevailing winds and develop the most character. The Greenhorn Trail provides the most direct access to high-elevation terrain.",
    ethicsReminder:
      "Remote areas require extra self-reliance and responsibility. Pack out all waste, restore collection sites, and report any issues to the ranger district.",
  },

  // ── Sangre de Cristo ──────────────────────────────────────────
  {
    id: "great-sand-dunes-foothills",
    name: "Sangre de Cristo Foothills (East Face)",
    region: "Sangre de Cristo",
    coordinates: { lat: 37.75, lng: -105.56 },
    elevation: 8500,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine", "Limber Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 3.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The east-facing foothills of the Sangre de Cristo range near the Great Sand Dunes offer unique scouting. The dry, windy conditions at the base of the range stress trees into compact, aged forms. The mix of high desert and montane habitats creates diverse species opportunities.",
    accessNotes:
      "Rio Grande National Forest. Access via various county roads from the San Luis Valley. Adjacent to but outside of Great Sand Dunes National Park.",
    permitNotes:
      "USFS permit required for collection on National Forest land. Do NOT enter the national park for collection. Contact the Saguache Ranger District.",
    scoutingNotes:
      "The foothill ridges between 8,000–9,000ft east of the Crest have excellent wind-stressed junipers. The dry, sandy soil produces trees with exposed root systems and twisted trunks. Spring and fall light is spectacular for photography and scouting.",
    ethicsReminder:
      "The Sangre de Cristo ecosystem supports rare and endemic species. Collect only from common species in non-sensitive areas. Respect all park boundaries.",
  },
  {
    id: "music-pass",
    name: "Music Pass High Basin",
    region: "Sangre de Cristo",
    coordinates: { lat: 37.85, lng: -105.65 },
    elevation: 11300,
    species: ["Engelmann Spruce", "Limber Pine", "Bristlecone Pine"],
    bestSeasons: ["summer"],
    accessType: "permit_required",
    difficulty: "advanced",
    hikeDistance: 3.5,
    roadAccess: false,
    badges: ["permit_likely_required", "high_alpine", "remote_access"],
    description:
      "Music Pass in the Sangre de Cristos provides access to a spectacular high basin with ancient trees at treeline. The alpine environment produces some of the most dramatic natural bonsai forms in southern Colorado. The remote setting rewards the effort required to reach it.",
    accessNotes:
      "San Isabel National Forest / Sangre de Cristo Wilderness. 4WD road to trailhead, then hiking. Wilderness regulations apply beyond the trailhead.",
    permitNotes:
      "USFS permit required. Collection within the Sangre de Cristo Wilderness is generally prohibited. Verify current regulations with the San Carlos Ranger District. Adjacent non-wilderness areas may allow permitted collection.",
    scoutingNotes:
      "The treeline zone between Music Pass and the high basin has exceptional krummholz specimens. Limber pines on exposed rocky knolls are particularly noteworthy. The hike is strenuous but the quality of specimens makes it worthwhile. Start early for the best weather window.",
    ethicsReminder:
      "Wilderness areas have the highest level of protection. Respect wilderness regulations strictly. Even where collection is permitted nearby, demonstrate exemplary ethics and restoration practices.",
  },

  // ── Mosquito Range ────────────────────────────────────────────
  {
    id: "hoosier-pass",
    name: "Hoosier Pass Treeline",
    region: "Mosquito Range",
    coordinates: { lat: 39.36, lng: -106.06 },
    elevation: 11500,
    species: ["Engelmann Spruce", "Limber Pine"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["high_alpine", "road_accessible"],
    description:
      "Hoosier Pass on Highway 9 provides one of the most accessible treeline zones in Colorado. The pass area features wind-flagged spruce and limber pines easily visible from the parking area. Road access to 11,500ft makes this ideal for high-altitude scouting without extreme hiking.",
    accessNotes:
      "White River National Forest. Highway 9 summit parking area provides direct access. Year-round road access (paved highway). Winter conditions can be severe.",
    permitNotes:
      "USFS permit required for any collection. Contact the Dillon Ranger District. The accessible location means this area receives more management attention.",
    scoutingNotes:
      "The ridgelines north and south of the highway offer the best specimens within a short hike. Wind-flagged spruce on the west-facing slopes are particularly dramatic. The Continental Divide Trail provides a maintained path to higher terrain.",
    ethicsReminder:
      "High-traffic treeline areas are closely monitored. Practice impeccable ethics here — your actions are visible to many people. Always have permits in hand before any collection activity.",
  },
  {
    id: "mosquito-pass",
    name: "Mosquito Pass Ghost Forest",
    region: "Mosquito Range",
    coordinates: { lat: 39.28, lng: -106.18 },
    elevation: 12200,
    species: ["Bristlecone Pine", "Limber Pine"],
    bestSeasons: ["summer"],
    accessType: "permit_required",
    difficulty: "expert",
    hikeDistance: 5.0,
    roadAccess: false,
    badges: [
      "permit_likely_required",
      "sensitive_habitat",
      "high_alpine",
      "remote_access",
    ],
    description:
      "Mosquito Pass, the highest road pass in North America, traverses an otherworldly landscape of ancient bristlecone and limber pines. The 'ghost forest' of standing deadwood and living remnants represents some of the oldest trees in Colorado. An extreme but unforgettable scouting destination.",
    accessNotes:
      "Pike National Forest. Rough 4WD road from Alma or Leadville (summer only, typically July–September). Extremely exposed — weather turns dangerous quickly at 12,000+ft.",
    permitNotes:
      "USFS permit required. Bristlecone collection is heavily restricted. Contact the Leadville Ranger District well in advance. Expect additional scrutiny for any collection at this elevation.",
    scoutingNotes:
      "The ghost forest zone between 11,800–12,500ft has extraordinary specimens. Many are standing dead with preserved architecture that informs yamadori aesthetics. Living specimens tend to be partially alive with significant deadwood — true yin-yang trees. Scout with binoculars from the road to minimize disturbance.",
    ethicsReminder:
      "This is one of Colorado's most sensitive and scientifically important tree habitats. The bristlecone pines here may be over 1,000 years old. Scouting only is strongly recommended. If you must collect, ensure you have all required permits and expertise.",
  },

  // ── Additional Front Range / Foothills ────────────────────────
  {
    id: "castlewood-canyon",
    name: "Castlewood Canyon Rim",
    region: "Front Range",
    coordinates: { lat: 39.33, lng: -104.74 },
    elevation: 6200,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 1.0,
    roadAccess: true,
    badges: ["scouting_only", "beginner_friendly", "road_accessible"],
    description:
      "Castlewood Canyon State Park features a dramatic rhyolite canyon with excellent juniper specimens on the canyon rim and walls. Easy trail access and diverse habitat make this perfect for beginners learning to identify yamadori potential.",
    accessNotes:
      "Colorado State Park. Day pass required ($10). Well-maintained trails. Open year-round.",
    permitNotes:
      "Collection NOT permitted in state parks. Excellent scouting and educational resource only.",
    scoutingNotes:
      "The rim trail provides excellent vantage points for scouting the canyon walls. Junipers growing from the rhyolite faces on the east side of the canyon show the most character. The falls area has particularly old specimens.",
    ethicsReminder:
      "State parks protect natural areas for everyone. Use this location to sharpen your species identification and scouting skills in a comfortable, accessible setting.",
  },
  {
    id: "phantom-canyon",
    name: "Phantom Canyon Road Corridor",
    region: "Front Range",
    coordinates: { lat: 38.58, lng: -105.17 },
    elevation: 6800,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 1.5,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The historic Phantom Canyon Road between Victor and Cañon City follows a narrow granite canyon with exceptional juniper habitat. The remote feel and limited traffic create a peaceful scouting environment with high-quality specimens accessible from the road.",
    accessNotes:
      "BLM and Pike National Forest. Gravel road passable by most vehicles in dry conditions. Some narrow sections — check road conditions before visiting.",
    permitNotes:
      "Mixed jurisdiction — verify ownership at specific locations. BLM and USFS may issue collection permits. Contact the Royal Gorge Field Office (BLM) or Pikes Peak Ranger District (USFS).",
    scoutingNotes:
      "The narrow canyon sections between miles 5 and 15 have the best cliff-dwelling junipers. Look for trees with dramatic lean growing from the canyon walls. The wider canyon openings have ponderosas in decomposed granite. Stop at pulloffs and glass the walls with binoculars.",
    ethicsReminder:
      "Phantom Canyon is a historic and ecological corridor. Collect responsibly and restore all sites. The remoteness means your practices set the standard for others who follow.",
  },
  {
    id: "shelf-road",
    name: "Shelf Road Limestone Ledges",
    region: "Front Range",
    coordinates: { lat: 38.62, lng: -105.24 },
    elevation: 7000,
    species: ["Rocky Mountain Juniper"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 1.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The Shelf Road climbing area near Cañon City features limestone cliffs with ancient junipers rooted in crevices and ledges. The limestone substrate creates unique growing conditions different from the typical granite habitat, producing distinctively pale-barked specimens.",
    accessNotes:
      "BLM recreation area. Well-developed parking and trail infrastructure for the climbing area. Juniper habitat extends beyond the climbing zones.",
    permitNotes:
      "BLM land — contact the Royal Gorge Field Office for collection permit information. Be aware of climbing area boundaries and seasonal raptor closures.",
    scoutingNotes:
      "The limestone ledges above and between climbing walls have excellent junipers. The Bank and Cactus Cliff areas are particularly productive. The calcium-rich soil produces different growth characteristics than granite habitat — note the lighter bark color and often denser foliage.",
    ethicsReminder:
      "This is a heavily used climbing area. Be respectful of climbers and their equipment. Avoid disturbing climbing anchors, routes, or vegetation that stabilizes cliff edges.",
  },

  // ── Black Forest / Colorado Springs Expansion ──────────────────
  {
    id: "black-forest-ponderosa",
    name: "Black Forest Ponderosa Woodland",
    region: "Colorado Springs",
    coordinates: { lat: 39.01, lng: -104.63 },
    elevation: 7200,
    species: ["Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "private_permission",
    difficulty: "beginner",
    hikeDistance: 0.5,
    roadAccess: true,
    badges: ["beginner_friendly", "road_accessible"],
    description:
      "The Black Forest north of Colorado Springs is one of the largest ponderosa woodlands along the Front Range. Originally called 'The Pinery' by settlers, the area was logged heavily in the 1800s. Regrowth ponderosas in decomposed granite soil develop compact, characterful forms. Some private landowners may grant access for scouting and selective collection.",
    accessNotes:
      "Predominantly private land. Some county road rights-of-way for visual scouting. The 2013 Black Forest Fire opened areas where stressed regrowth trees develop yamadori character.",
    permitNotes:
      "Private land requires explicit landowner permission. No USFS land here. Build relationships with property owners — many are receptive when approached respectfully.",
    scoutingNotes:
      "Focus on areas with thin, rocky soil where ponderosas grow slowly and develop thick bark early. Fire-scarred trees from 2013 often have dramatic deadwood features. The eastern edges where forest meets grassland have naturally stunted specimens.",
    ethicsReminder:
      "Always get written permission from landowners. The Black Forest community values their trees — be transparent about your intentions and respectful of property boundaries.",
  },

  // ── Northern Mountains / Route 14 Corridor ─────────────────────
  {
    id: "poudre-canyon-rustic",
    name: "Poudre Canyon — Rustic Corridor",
    region: "Northern Mountains",
    coordinates: { lat: 40.72, lng: -105.58 },
    elevation: 7600,
    species: ["Ponderosa Pine", "Lodgepole Pine", "Douglas Fir"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 1.5,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The Poudre Canyon along Route 14 west of Fort Collins is a well-known collecting corridor among Colorado yamadori practitioners. The area north of Rustic in Roosevelt National Forest has produced excellent ponderosa and lodgepole pine specimens. Rocky ridges above the canyon create ideal stressed growing conditions.",
    accessNotes:
      "Roosevelt National Forest. Highway 14 provides year-round road access through the canyon. Forest roads branch off to higher terrain. Some roads are seasonal.",
    permitNotes:
      "USFS transplant permit required — $5 per tree from the Canyon Lakes Ranger District. Collecting season typically April 15–May 31 and fall. Maximum 8 permits per transaction.",
    scoutingNotes:
      "The granite outcrops north of Rustic between miles 65–80 on Route 14 are the most productive area. Ponderosas in decomposed granite with limited soil develop compact, aged character. Lodgepole pines on exposed ridgetops also show good potential.",
    ethicsReminder:
      "This is a popular collecting area — practice sustainable harvesting. Don't over-collect from any single area. Spread your collection across a wide zone and only take trees you're confident you can grow.",
  },
  {
    id: "cameron-pass",
    name: "Cameron Pass Subalpine Zone",
    region: "Northern Mountains",
    coordinates: { lat: 40.52, lng: -105.89 },
    elevation: 10200,
    species: ["Engelmann Spruce", "Limber Pine", "Subalpine Fir"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["high_alpine", "road_accessible"],
    description:
      "Cameron Pass on Route 14 provides road access to excellent subalpine habitat in the Medicine Bow Mountains. Spruce and limber pine at treeline develop krummholz forms from extreme wind exposure. The Continental Divide corridor here funnels weather that sculpts dramatic specimens.",
    accessNotes:
      "Roosevelt/Routt National Forest. Highway 14 provides paved access to the pass. Several trailheads at the summit. Summer is the primary season; winter access is limited to ski/snowshoe.",
    permitNotes:
      "USFS permit required. Contact the Canyon Lakes Ranger District. Subalpine collecting has additional timing considerations — the ground may not thaw until late June.",
    scoutingNotes:
      "The ridgeline north of the pass toward the Rawah Wilderness boundary has excellent wind-sculpted specimens. Limber pines on exposed knolls at 10,000–11,000ft show the best character. The Michigan Ditch trail provides good access to treeline habitat.",
    ethicsReminder:
      "Subalpine trees grow extremely slowly. A 6-inch trunk at this elevation may be over 100 years old. Collect conservatively and only with proper permits and experience.",
  },

  // ── Western Slope ──────────────────────────────────────────────
  {
    id: "grand-mesa-pinon-juniper",
    name: "Grand Mesa Piñon-Juniper Woodland",
    region: "Western Slope",
    coordinates: { lat: 39.03, lng: -108.12 },
    elevation: 6800,
    species: ["Utah Juniper", "Piñon Pine", "Rocky Mountain Juniper"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 1.0,
    roadAccess: true,
    badges: ["beginner_friendly", "road_accessible"],
    description:
      "The lower flanks of Grand Mesa transition from piñon-juniper woodland into montane forest, creating excellent collecting habitat. Utah juniper and piñon pine in the arid mesa country develop twisted, characterful forms in rocky red soil. This is classic western slope collecting territory.",
    accessNotes:
      "Grand Mesa National Forest and adjacent BLM land. Multiple access roads from Highway 65 and I-70. Lower-elevation areas are accessible year-round.",
    permitNotes:
      "USFS or BLM permit depending on land jurisdiction. Contact the Grand Valley Ranger District (USFS) or Grand Junction BLM Field Office. Permits are typically $5–10 per tree.",
    scoutingNotes:
      "The piñon-juniper belt between 5,500–7,500ft on the south and west flanks has the best material. Look for Utah junipers growing from sandstone ledges and piñon pines in decomposed shale. The driest, most exposed sites produce the most compact specimens.",
    ethicsReminder:
      "Western slope woodland ecosystems are slow to recover from disturbance. Collect selectively and restore the site by filling holes and redistributing soil. Piñon-juniper woodlands provide critical wildlife habitat.",
  },
  {
    id: "uncompahgre-plateau",
    name: "Uncompahgre Plateau Ridges",
    region: "Western Slope",
    coordinates: { lat: 38.48, lng: -108.52 },
    elevation: 8200,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine", "Utah Juniper"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The Uncompahgre Plateau is a massive elevated mesa southwest of Grand Junction known among collectors for exceptional Rocky Mountain juniper. The dry climate, decomposed granite substrate, and high winds create trees with extraordinary deadwood and live vein features — the hallmark of world-class yamadori.",
    accessNotes:
      "Uncompahgre National Forest and BLM land. Divide Road (Forest Road 402) traverses the plateau. Many side roads provide access. High clearance recommended; 4WD for some roads.",
    permitNotes:
      "USFS permit from the Ouray or Norwood Ranger District, or BLM permit from the Uncompahgre Field Office. This is productive collecting country — permits are generally available.",
    scoutingNotes:
      "The exposed ridgelines along the western escarpment between 7,500–9,000ft have the finest juniper specimens. Trees growing from rock outcrops with significant deadwood are the prize finds. The area around Columbine Pass is particularly productive. Bring plenty of water — it's dry country.",
    ethicsReminder:
      "The Uncompahgre Plateau is a working landscape shared with ranchers and hunters. Respect grazing allotments and fence lines. Practice zero-trace collecting — restore every site completely.",
  },
  {
    id: "gateway-canyon",
    name: "Gateway Canyon Desert Junipers",
    region: "Western Slope",
    coordinates: { lat: 38.68, lng: -108.97 },
    elevation: 5400,
    species: ["Utah Juniper", "Piñon Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The red rock desert canyon country near Gateway hosts some of Colorado's most dramatic Utah juniper specimens. These ancient, wind-blasted trees grow from sandstone cracks and ledges with massive deadwood features. The dry heat and mineral-rich soil produce dense, slow-growing wood prized for yamadori.",
    accessNotes:
      "BLM land managed by the Grand Junction Field Office. Access via Highway 141. Remote area — carry extra water and fuel. Cell service limited.",
    permitNotes:
      "BLM permit required for collection. Contact the Grand Junction Field Office. The area is also popular with rock climbers — be aware of climbing area boundaries.",
    scoutingNotes:
      "The canyon walls and rimrock above the Dolores River have exceptional Utah junipers, some estimated at 500+ years old. Look for trees with bark stripped by wind to expose pale, twisted deadwood (shari). The driest, most exposed ledges produce the finest specimens.",
    ethicsReminder:
      "Desert ecosystems are extremely slow to recover. A tree growing here for 500 years cannot be replaced in your lifetime. Collect only what you're certain you can keep alive and develop into worthy bonsai.",
  },

  // ── Elk Mountains / Aspen Area ─────────────────────────────────
  {
    id: "independence-pass",
    name: "Independence Pass Treeline",
    region: "Elk Mountains",
    coordinates: { lat: 39.11, lng: -106.56 },
    elevation: 12100,
    species: ["Engelmann Spruce", "Limber Pine", "Bristlecone Pine"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "advanced",
    hikeDistance: 2.5,
    roadAccess: true,
    badges: ["high_alpine", "road_accessible"],
    description:
      "Independence Pass at 12,095ft provides road access to some of the highest treeline habitat in Colorado. Ancient bristlecone pines and limber pines on the exposed ridgelines above the pass display centuries of wind sculpting. The Sawatch and Elk Mountain ranges converge here, creating dramatic alpine scenery.",
    accessNotes:
      "White River / San Isabel National Forest. Highway 82 provides paved access (seasonal, typically June–October). Trailheads at the pass summit. High altitude — acclimatize before strenuous activity.",
    permitNotes:
      "USFS permit required for any collection. Contact the Aspen-Sopris Ranger District. Bristlecone collection is restricted — verify current regulations.",
    scoutingNotes:
      "The alpine tundra and krummholz zone within a mile north and south of the pass summit has extraordinary specimens. Look for the ancient bristlecone grove on the ridge northeast of the parking area. Limber pines on exposed granite knolls show fantastic deadwood and live-vein features.",
    ethicsReminder:
      "Independence Pass is one of Colorado's most visited alpine areas. Your collecting practices are visible to thousands of visitors. Set an exemplary standard — or better, scout and photograph only.",
  },
  {
    id: "marble-crystal-river",
    name: "Crystal River Valley Corridor",
    region: "Elk Mountains",
    coordinates: { lat: 39.07, lng: -107.19 },
    elevation: 7800,
    species: ["Douglas Fir", "Rocky Mountain Juniper", "Engelmann Spruce"],
    bestSeasons: ["spring", "summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.5,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The Crystal River valley between Carbondale and Marble passes through dramatic canyon terrain with diverse conifer habitat. Douglas fir and juniper on the south-facing canyon walls develop excellent character from the harsh microclimate. The marble quarry area provides unique geological context for tree growth.",
    accessNotes:
      "White River National Forest. Highway 133 and County Road 3 provide road access. Some areas require hiking off-road for the best specimens.",
    permitNotes:
      "USFS permit required. Contact the Aspen-Sopris Ranger District. Mixed land ownership in the valley — verify jurisdiction at specific sites.",
    scoutingNotes:
      "The canyon narrows between Redstone and Marble have excellent cliff-dwelling conifers. South-facing limestone and granite walls host junipers and Douglas fir with dramatic root-over-rock growth. The area around the old marble quarry has unique mineral-influenced growing conditions.",
    ethicsReminder:
      "The Crystal River valley is a sensitive ecosystem and popular recreation corridor. Be mindful of other users, especially near the Crystal Mill historic site.",
  },

  // ── Sawatch Range ──────────────────────────────────────────────
  {
    id: "cottonwood-pass",
    name: "Cottonwood Pass Bristlecone Zone",
    region: "Sawatch Range",
    coordinates: { lat: 38.83, lng: -106.41 },
    elevation: 11800,
    species: ["Bristlecone Pine", "Limber Pine", "Engelmann Spruce"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "advanced",
    hikeDistance: 2.5,
    roadAccess: true,
    badges: ["high_alpine", "road_accessible"],
    description:
      "Cottonwood Pass between Buena Vista and Gunnison crosses the Continental Divide through excellent bristlecone and limber pine habitat. The Sawatch Range's high ridges and exposed granite support ancient specimens with dramatic form. Road access to 12,000ft makes this one of the most accessible high-alpine collecting zones.",
    accessNotes:
      "Gunnison and San Isabel National Forest. Paved road to the pass summit (seasonal, typically June–October). Trailheads at and near the summit.",
    permitNotes:
      "USFS permit required. Contact the Salida Ranger District. Bristlecone collection is heavily restricted at high elevation.",
    scoutingNotes:
      "The ridgelines south of the pass between 11,500–12,500ft have exceptional bristlecone specimens. The granite substrate supports trees with exposed root systems and significant deadwood. The Ptarmigan Lake trail provides access to productive scouting terrain.",
    ethicsReminder:
      "High-altitude bristlecone habitat is irreplaceable. These trees may predate European settlement. Scout respectfully and consider this a learning destination rather than a collecting one.",
  },
  {
    id: "mt-princeton-hot-springs",
    name: "Mt. Princeton Foothills",
    region: "Sawatch Range",
    coordinates: { lat: 38.73, lng: -106.22 },
    elevation: 8800,
    species: ["Ponderosa Pine", "Douglas Fir", "Rocky Mountain Juniper"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 3.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The eastern foothills of Mt. Princeton above the Arkansas Valley offer excellent mixed-species collecting at moderate elevation. Ponderosa pine and juniper in decomposed granite develop compact, aged forms. The dry valley climate stresses trees into yamadori-worthy specimens without requiring extreme alpine conditions.",
    accessNotes:
      "San Isabel National Forest. County Road 162 provides access past Mt. Princeton Hot Springs. Forest roads lead to higher terrain. Most accessible spring through fall.",
    permitNotes:
      "USFS permit required. Contact the Salida Ranger District. Moderate-elevation collecting is generally straightforward to permit.",
    scoutingNotes:
      "The rocky ridges between 8,000–9,500ft on the east-facing slopes have the best material. Decomposed granite pockets produce ponderosas with naturally constrained root systems — ideal for collection. The area around Chalk Creek has unique mineral-influenced soil conditions.",
    ethicsReminder:
      "The Collegiate Peaks area attracts many visitors. Practice discreet, respectful collecting. Restore sites completely and avoid collecting in view of popular trails or camping areas.",
  },

  // ── Arkansas Valley ────────────────────────────────────────────
  {
    id: "royal-gorge-rim",
    name: "Royal Gorge Rim Country",
    region: "Arkansas Valley",
    coordinates: { lat: 38.46, lng: -105.33 },
    elevation: 6800,
    species: ["Rocky Mountain Juniper", "Piñon Pine", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "The rim country surrounding the Royal Gorge features ancient junipers and piñon pines growing from granite and schist formations along the Arkansas River canyon. The extreme exposure and thin rocky soil produce trees with extraordinary deadwood and twisted live veins. BLM land in the area is accessible for permitted collection.",
    accessNotes:
      "BLM land surrounding Royal Gorge Park (the park itself is a private attraction). Multiple access points from county roads south of Cañon City. Some terrain requires scrambling.",
    permitNotes:
      "BLM permit from the Royal Gorge Field Office. Avoid the privately owned Royal Gorge Bridge & Park area. Focus on BLM parcels east and west of the gorge.",
    scoutingNotes:
      "The canyon rim east of the bridge has exceptional cliff-dwelling junipers on BLM land. Piñon pines on the south-facing slopes above the river develop dense, compact forms. The geology transitions from granite to schist — note how soil chemistry affects growth patterns.",
    ethicsReminder:
      "The Royal Gorge area is ecologically sensitive and includes bighorn sheep habitat. Avoid disturbing wildlife corridors and collect only from stable, non-erosion-prone areas.",
  },
  {
    id: "browns-canyon",
    name: "Browns Canyon Wilderness Edge",
    region: "Arkansas Valley",
    coordinates: { lat: 38.73, lng: -106.05 },
    elevation: 7200,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine", "Douglas Fir"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "advanced",
    hikeDistance: 3.0,
    roadAccess: false,
    badges: ["remote_access"],
    description:
      "The granite canyon walls along the Arkansas River near Browns Canyon National Monument host exceptional juniper and ponderosa specimens. The narrow canyon creates extreme microclimates — intense sun, reflected heat, and wind tunneling produce dramatic stressed growth. Collecting is on adjacent BLM/USFS land outside the monument.",
    accessNotes:
      "BLM and San Isabel National Forest land adjacent to Browns Canyon National Monument. Wilderness and monument boundaries prohibit collection — focus on adjacent permitted areas. Access via Ruby Mountain or Railroad Bridge trailheads.",
    permitNotes:
      "Collection prohibited within the National Monument and Wilderness. Adjacent USFS land requires a permit from the Salida Ranger District. BLM parcels — contact the Royal Gorge Field Office.",
    scoutingNotes:
      "The granite walls outside the monument boundary on the east side have excellent juniper. Use the monument for scouting and visual reference, then target specimens on permitted land nearby. The river access points provide canyon-bottom perspectives for spotting cliff-growing trees.",
    ethicsReminder:
      "National monument and wilderness boundaries exist for a reason. Respect them absolutely. Collect only on verified permitted land and carry your permits at all times.",
  },

  // ── Windy Ridge / Mosquito Range Expansion ─────────────────────
  {
    id: "windy-ridge-bristlecone",
    name: "Windy Ridge Bristlecone Scenic Area",
    region: "Mosquito Range",
    coordinates: { lat: 39.28, lng: -106.1 },
    elevation: 11700,
    species: ["Bristlecone Pine", "Limber Pine"],
    bestSeasons: ["summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 1.0,
    roadAccess: false,
    badges: ["scouting_only", "high_alpine"],
    description:
      "Windy Ridge Bristlecone Pine Scenic Area near Alma contains some of the oldest bristlecone pines in Colorado, with specimens over 800 years old. This federally protected area on the eastern flank of Mt. Bross at 11,700ft is a must-visit for any serious yamadori practitioner — not for collecting, but for studying the pinnacle of natural bonsai form.",
    accessNotes:
      "Pike National Forest. Access from Highway 9 south of Alma via Kite Lake Road. High-clearance vehicle recommended. Summer-only access (typically June–September).",
    permitNotes:
      "Collection is PROHIBITED in the Scenic Area. This is a protected grove for study and appreciation only. Use it to inform your collecting in other areas.",
    scoutingNotes:
      "The ancient bristlecones here display every form of wind sculpting, deadwood, and survival adaptation imaginable. Study how live veins wrap around massive deadwood sections. Note the 'flag' growth pattern pointing away from prevailing winds. Photograph extensively — this is your masterclass.",
    ethicsReminder:
      "This grove is a living laboratory and national treasure. Stay on trails, do not touch or disturb trees, and leave nothing behind. The knowledge you gain here will make you a better collector elsewhere.",
  },

  // ── Additional Front Range / Foothills ──────────────────────────
  {
    id: "pine-valley-ranch",
    name: "Pine Valley Ranch — North Fork Zone",
    region: "Front Range",
    coordinates: { lat: 39.42, lng: -105.28 },
    elevation: 6900,
    species: ["Ponderosa Pine", "Rocky Mountain Juniper", "Douglas Fir"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 1.5,
    roadAccess: true,
    badges: ["scouting_only", "beginner_friendly", "road_accessible"],
    description:
      "Pine Valley Ranch Park along the North Fork of the South Platte features a transition zone between grassland and montane forest. Ponderosas growing in rocky granite outcrops above the river develop characterful forms. Excellent beginner scouting location to study how substrate and exposure influence tree growth.",
    accessNotes:
      "Jefferson County Open Space. Free parking and access. Well-maintained trails. Open year-round, sunrise to sunset.",
    permitNotes:
      "Collection NOT permitted in Jeffco Open Space. Use for scouting education and species study. The adjacent Pike National Forest (up-canyon) allows permitted collection.",
    scoutingNotes:
      "Walk the river trail and observe ponderosas on the granite domes above. Note how trees on south-facing rock faces differ from those in sheltered valley bottoms. The rock outcrops near the historic lodge have excellent study specimens.",
    ethicsReminder:
      "Open space parks are for observation and learning. Use your scouting skills here to identify what makes a great yamadori candidate, then apply that knowledge in permitted collecting areas.",
  },
  {
    id: "kenosha-pass",
    name: "Kenosha Pass — South Park Gateway",
    region: "Front Range",
    coordinates: { lat: 39.41, lng: -105.76 },
    elevation: 10000,
    species: ["Limber Pine", "Lodgepole Pine", "Engelmann Spruce"],
    bestSeasons: ["spring", "summer"],
    accessType: "public_land",
    difficulty: "intermediate",
    hikeDistance: 3.0,
    roadAccess: true,
    badges: ["road_accessible"],
    description:
      "Kenosha Pass marks the transition from the Front Range to South Park, a vast high-altitude valley. The exposed ridgelines at 10,000ft host limber pines and lodgepoles battered by winds sweeping across the park. The Colorado Trail passes through here, providing good access to collecting terrain.",
    accessNotes:
      "Pike National Forest. Highway 285 provides year-round paved access to the pass. Trailhead parking at the summit. The Colorado Trail heads both directions along the ridgeline.",
    permitNotes:
      "USFS permit required. Contact the South Park Ranger District. Moderate to good availability of permits for this area.",
    scoutingNotes:
      "Follow the Colorado Trail north from the pass for the best limber pine specimens on exposed granite ridges. The wind exposure from South Park creates dramatically one-sided growth patterns. Lodgepole stands at the forest edges have naturally thinned specimens with good taper.",
    ethicsReminder:
      "Kenosha Pass is a popular trailhead and scenic stop. Practice discreet collecting away from high-traffic trails. The Colorado Trail is a national treasure — leave the corridor undisturbed.",
  },
  {
    id: "waterton-canyon",
    name: "Waterton Canyon Granite Walls",
    region: "Front Range",
    coordinates: { lat: 39.44, lng: -105.1 },
    elevation: 5800,
    species: ["Rocky Mountain Juniper", "Ponderosa Pine"],
    bestSeasons: ["spring", "fall"],
    accessType: "public_land",
    difficulty: "beginner",
    hikeDistance: 2.0,
    roadAccess: true,
    badges: ["scouting_only", "beginner_friendly", "road_accessible"],
    description:
      "Waterton Canyon south of Denver is the starting point of the Colorado Trail and features an accessible granite canyon with excellent juniper habitat. The canyon's south-facing walls host characterful junipers visible from the wide gravel trail. Perfect for beginners learning to identify yamadori-worthy specimens from a comfortable trail.",
    accessNotes:
      "Denver Water property with public trail access. Flat gravel road (no vehicles). The trail follows the South Platte into the canyon. Open year-round. Bighorn sheep are common — keep distance.",
    permitNotes:
      "Collection is NOT permitted — Denver Water property. Excellent scouting venue to develop your eye before collecting in nearby Pike National Forest areas.",
    scoutingNotes:
      "The canyon walls between miles 2–5 have the most impressive cliff-dwelling junipers. Use binoculars to study how roots penetrate granite cracks and how wind shapes crown architecture. The warm canyon microclimate means trees here are more vigorous than high-elevation specimens.",
    ethicsReminder:
      "Waterton Canyon is a protected water supply corridor. Stay on the trail, don't disturb vegetation, and respect the bighorn sheep herd. This is an education-only destination.",
  },
];
