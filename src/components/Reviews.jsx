import { Star } from "lucide-react";
import Reveal from "./Reveal";
import { reviewStats } from "../data/reviews";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-coffee py-24 md:py-28">
      <div className="container-narrow">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-4">Our Rating</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
            Rated by our customers
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="font-display text-3xl text-white">
              {reviewStats.rating} / {reviewStats.outOf}
            </span>
            <div className="flex text-cream" aria-label={`${reviewStats.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(Number(reviewStats.rating)) ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm text-cream/55">
            Based on {reviewStats.count} ratings
          </p>
        </Reveal>
      </div>
    </section>
  );
}
