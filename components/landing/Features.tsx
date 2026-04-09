import {
  MapPin,
  TreePine,
  Bookmark,
  ShieldCheck,
  Compass,
  Mountain,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Discover Legal Scouting Areas",
    description:
      "Browse a curated map of Colorado scouting zones with verified land access information, permit details, and collection regulations.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: TreePine,
    title: "Track Species & Habitats",
    description:
      "Learn which bonsai-relevant species thrive at different elevations and regions. Filter by species to find the perfect hunting grounds.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Bookmark,
    title: "Save & Plan Trips",
    description:
      "Bookmark promising spots, add personal notes, and organize scouting trips by region. Build your collection wishlist over time.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Ethical Practices First",
    description:
      "Every spot includes permit guidance, land access notes, and ethics reminders. We promote responsible yamadori hunting above all else.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Compass,
    title: "Filter by Your Skill Level",
    description:
      "From beginner-friendly roadside spots to expert alpine treeline zones, find scouting areas that match your experience and fitness level.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Mountain,
    title: "Colorado-Focused Intel",
    description:
      "Detailed local knowledge covering the Front Range, Pikes Peak, San Juans, Wet Mountains, and more. Real elevations, real coordinates, real species data.",
    color: "bg-stone-100 text-stone-600",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-sand/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything you need for
            <br />
            responsible yamadori hunting
          </h2>
          <p className="mt-4 text-lg text-stone-warm">
            Yama combines mapping, species data, and ethical guidance into one
            streamlined platform designed for Colorado bonsai enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-sand/70 bg-background p-6 transition-all duration-200 hover:border-sand hover:shadow-md"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${feature.color} mb-4 transition-transform group-hover:scale-110`}
              >
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-stone-warm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
