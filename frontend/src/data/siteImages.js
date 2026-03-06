export const SITE_IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
  services:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
  contact:
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
  activations:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
  corporate:
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
  community:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  exhibitions:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  logistics:
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80"
};

export function getCategoryImage(category) {
  switch (category) {
    case "Activations":
      return SITE_IMAGES.activations;
    case "Corporate":
      return SITE_IMAGES.corporate;
    case "Community":
      return SITE_IMAGES.community;
    case "Exhibitions":
      return SITE_IMAGES.exhibitions;
    case "Logistics":
      return SITE_IMAGES.logistics;
    default:
      return SITE_IMAGES.hero;
  }
}