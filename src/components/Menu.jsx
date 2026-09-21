import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menuCategories } from "../data/menu";
import Reveal from "./Reveal";

export default function Menu() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const active = menuCategories.find((c) => c.id === activeId);

  return (
    <section id="menu" className="bg-cream-soft py-24 md:py-28">
      <div className="container-narrow">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-4">Explore Our Menu</p>
          <h2 className="section-heading">A little bit of everything</h2>
          <p className="mt-5 text-charcoal/65">
            Sample categories below — the restaurant team can drop in real
            dishes, descriptions and prices any time.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
  activeId === cat.id
    ? "bg-black text-white border border-black"
    : "bg-cream text-charcoal/70 border border-charcoal/10 hover:-translate-y-0.5 hover:shadow-sm"
}`}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {active.items.map((dish, i) => (
                <div
                  key={i}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-charcoal/8 bg-cream px-6 py-5 shadow-card transition-shadow hover:shadow-soft"
                >
                  <div className="min-w-0">
                    <h3 className="font-display text-xl text-charcoal">{dish.name}</h3>
                    <p className="mt-1 text-sm text-charcoal/60 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-lg text-burgundy pt-1">
                    {dish.price}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full border-2 border-burgundy px-8 py-3.5 text-sm font-semibold tracking-wide text-burgundy transition-colors duration-300 hover:bg-burgundy hover:text-cream"
          >
            View Full Menu
          </a>
        </Reveal>
      </div>
    </section>
  );
}
