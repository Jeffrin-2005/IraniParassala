import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { reviewStats, reviewPlaceholders } from "../data/reviews";
import { site } from "../lib/site";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-coffee py-24 md:py-28">
      <div className="container-narrow">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-4">Customer Reviews</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
            What Parassala is saying
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="font-display text-3xl text-gold">{reviewStats.rating} / {reviewStats.outOf}</span>
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} strokeWidth={1.5} />
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm text-cream/55">Based on {reviewStats.count} reviews</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviewPlaceholders.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-cream/10 bg-charcoal/50 p-7">
                <Quote className="text-gold/50" size={22} />
                <div className="mt-4 flex text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill={s < r.stars ? "currentColor" : "none"} strokeWidth={1.5} />
                  ))}
                </div>
                <p className="mt-3 italic text-cream/70 leading-relaxed">"{r.quote}"</p>
                <p className="mt-4 text-xs tracking-wide text-cream/45">— {r.reviewer}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <a
            href={site.googleReviewsUrl}
            className="rounded-full border border-gold/50 px-8 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors duration-300 hover:bg-gold hover:text-charcoal"
          >
            View More Reviews
          </a>
        </Reveal>
      </div>
    </section>
  );
}
