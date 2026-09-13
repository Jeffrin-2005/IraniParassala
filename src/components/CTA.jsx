import { Phone, Navigation } from "lucide-react";
import Reveal from "./Reveal";
import { site } from "../lib/site";
import chickenBiryani from "../assets/images/chicken-biryani.jpg";

export default function CTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <img
        src={chickenBiryani}
        alt="Chicken biriyani platter"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-charcoal/80" />

      <Reveal className="relative container-narrow text-center text-cream">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
          Good food.
          <br />
          Good company. Good memories.
        </h2>
        <p className="mt-6 text-cream/75 max-w-md mx-auto">
          Make your next meal a memorable one.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={site.phoneTel}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5 hover:shadow-soft"
          >
            <Phone size={16} /> Call Now
          </a>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
          >
            <Navigation size={16} /> Get Directions
          </a>
        </div>
      </Reveal>
    </section>
  );
}
