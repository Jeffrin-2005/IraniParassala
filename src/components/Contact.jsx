import { MapPin, Phone, Navigation } from "lucide-react";
import InstagramGlyph from "./InstagramGlyph";
import Reveal from "./Reveal";
import { site } from "../lib/site";

export default function Contact() {
  return (
    <section id="contact" className="bg-cream-soft py-24 md:py-28">
      <div className="container-narrow">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-4">Location & Contact</p>
          <h2 className="section-heading">Visit Irani Restaurant</h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="flex flex-col justify-between rounded-2xl border border-charcoal/8 bg-cream p-8 sm:p-10 shadow-card">
            <div className="space-y-7">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                  <MapPin size={19} />
                </span>
                <div>
                  <p className="text-sm text-charcoal/50">Address</p>
                  <p className="font-display text-lg text-charcoal">{site.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                  <Phone size={19} />
                </span>
                <div>
                  <p className="text-sm text-charcoal/50">Phone</p>
                  <a href={site.phoneTel} className="font-display text-lg text-charcoal hover:text-burgundy">
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                  <InstagramGlyph size={19} />
                </span>
                <div>
                  <p className="text-sm text-charcoal/50">Instagram</p>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg text-charcoal hover:text-burgundy"
                  >
                    {site.instagramHandle}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
              >
                <Navigation size={15} /> Get Directions
              </a>
              <a
                href={site.phoneTel}
                className="inline-flex items-center gap-2 rounded-full border-2 border-burgundy px-6 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
              >
                <Phone size={15} /> Call Restaurant
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/15 px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <InstagramGlyph size={15} /> Instagram
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="overflow-hidden rounded-2xl border border-charcoal/8 shadow-card min-h-[320px]">
            <iframe
              title="Irani Restaurant location map"
              src={site.mapsEmbedUrl}
              className="h-full w-full min-h-[320px] grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
