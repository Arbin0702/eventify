export const SERVICES = [
  {
    slug: "brand-activations",
    title: "Brand Activations",
    tagline: "Interactive experiences that pull people in.",
    hero: "Launch moments that feel premium, personal and shareable.",
    bullets: ["Product demos + sampling", "Pop-ups + immersive builds", "Street teams + engagement", "Photo moments + social hooks"],
    details: [
      "We design activations that feel natural for the audience and strategic for the brand.",
      "From concept and run sheets to supplier coordination and on-ground delivery, we keep it smooth.",
      "We can build in content moments (photo walls, product shots, quick interviews) to amplify reach."
    ]
  },
  {
    slug: "community-events",
    title: "Community Events",
    tagline: "Bring people together for a shared cause.",
    hero: "Warm, inclusive events with safe logistics and friendly flow.",
    bullets: ["Family & council events", "Charity walks + campaigns", "Festival coordination", "Volunteer + stakeholder support"],
    details: [
      "Community events need clarity, safety, and a great attendee experience.",
      "We help manage stakeholders, signage, schedules, bump-in/out and on-site operations.",
      "The goal: a fun day that’s well-run and easy to repeat next year."
    ]
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    tagline: "Professional events with energy.",
    hero: "Internal and client-facing experiences that feel modern and effortless.",
    bullets: ["Conferences + workshops", "Team engagement events", "Award nights + launches", "Guest management + agendas"],
    details: [
      "We coordinate end-to-end logistics so your team can focus on people.",
      "We keep the agenda tight, the experience polished, and the day running on time.",
      "Perfect for launches, leadership events, and business milestones."
    ]
  },
  {
    slug: "event-logistics",
    title: "Event Logistics",
    tagline: "The backbone of a seamless event.",
    hero: "Planning, freight, setup and schedules — done properly.",
    bullets: ["Bump-in / bump-out", "Freight + equipment", "Floor plans + risk checks", "Supplier coordination"],
    details: [
      "Strong logistics reduce risk and stress — that’s the job.",
      "We plan runsheets, manage vendors, and control timing across setup and pack down.",
      "If something changes on the day, we adapt fast with clear communication."
    ]
  },
  {
    slug: "exhibitions-trade-shows",
    title: "Exhibitions & Trade Shows",
    tagline: "Stands that attract attention.",
    hero: "Layouts and lead capture that help sales teams perform.",
    bullets: ["Stand concept + layout", "Lead capture flow", "Brand storytelling", "On-site support"],
    details: [
      "A booth should be easy to enter, clear to understand, and designed for conversations.",
      "We help shape the flow, messaging and on-site support so the team can sell.",
      "Great for expos, trade shows, and industry showcases."
    ]
  },
  {
    slug: "event-staffing",
    title: "Event Staffing (Optional)",
    tagline: "Reliable, brand-aligned people.",
    hero: "Hosts, brand reps, runners and crew (optional).",
    bullets: ["Hosts + brand reps", "Setup crew + runners", "Briefing + training", "Shift scheduling"],
    details: [
      "If your event needs people power, we can plan roles and shifts.",
      "We prioritise professionalism, clear briefings, and reliable attendance.",
      "You get consistent staff energy that matches your brand tone."
    ]
  }
];

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}