export const WORK = [
  {
    slug: "midnight-market-pop-up",
    title: "Midnight Market Pop-Up",
    category: "Activations",
    tag: "Brand Activation",
    location: "Sydney",
    outcome: "3,200 attendees · 18% email capture",
    summary:
      "A street-level pop-up with sampling, photo moments and product demos built for social sharing."
  },
  {
    slug: "harbour-corporate-summit",
    title: "Harbour Corporate Summit",
    category: "Corporate",
    tag: "Corporate Event",
    location: "Barangaroo",
    outcome: "420 guests · 4 speakers · 1 seamless run sheet",
    summary:
      "A high-trust conference setup with stage management, timing control and guest experience."
  },
  {
    slug: "community-family-day",
    title: "Community Family Day",
    category: "Community",
    tag: "Community Event",
    location: "Parramatta",
    outcome: "1,100 attendees · 0 safety incidents",
    summary:
      "A family friendly day with clear signage, smooth flow and volunteer coordination."
  },
  {
    slug: "expo-lead-engine",
    title: "Expo Lead Engine",
    category: "Exhibitions",
    tag: "Exhibition",
    location: "ICC Sydney",
    outcome: "680 leads · 2-day booth support",
    summary:
      "A booth layout designed for quick conversations and frictionless lead capture."
  },
  {
    slug: "launch-night",
    title: "Launch Night Experience",
    category: "Activations",
    tag: "Product Launch",
    location: "Surry Hills",
    outcome: "Press + influencers · content-ready moments",
    summary:
      "A premium launch with brand storytelling, lighting cues and a social-first content plan."
  },
  {
    slug: "roadshow-series",
    title: "Multi-City Roadshow",
    category: "Logistics",
    tag: "Logistics",
    location: "NSW / VIC / QLD",
    outcome: "6 cities · freight + setup coordination",
    summary:
      "A repeatable event kit with consistent setup standards across multiple locations."
  }
];

export function getWorkBySlug(slug) {
  return WORK.find((w) => w.slug === slug);
}