// ---------------------------------------------------------------------------
// SITE CONFIG — central place for the restaurant's contact details.
// Update this file and the change reflects everywhere on the site.
// ---------------------------------------------------------------------------

export const site = {
  name: "Irani Restaurant",
  phoneDisplay: "073060 48162",
  phoneRaw: "07306048162",
  phoneTel: "tel:+917306048162",
  address: "85V3+62W, Parassala, Kerala 695502",
  instagramUrl: "https://www.instagram.com/irani_parassala?stkn=d3h1dzJqbnh6cnR4",
  instagramHandle: "@irani_parassala",
  rating: "3.9",
  reviewCount: "1,561",
  // Google Maps directions link built from the plus-code address provided.
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("85V3+62W, Parassala, Kerala 695502"),
  // TODO: Replace with the exact Google Maps embed URL for this location
  // (Google Maps → Share → Embed a map → copy the src URL) for a pinpoint-accurate map.
  mapsEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("85V3+62W, Parassala, Kerala 695502") +
    "&output=embed",
  // TODO: Replace with the restaurant's Google Business review link once confirmed.
  googleReviewsUrl: "#",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];
