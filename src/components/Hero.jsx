import { motion } from "framer-motion";
import { Phone, Star, ChevronDown } from "lucide-react";
import { site } from "../lib/site";
import biryaniDuo from "../assets/images/biryani-duo.jpeg";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-end overflow-hidden">
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={biryaniDuo}
          alt="Two platters of Irani Restaurant's signature spiced chicken biriyani"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
      <div className="absolute inset-0 bg-charcoal/20" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative container-narrow pb-20 pt-40 md:pb-28 text-cream"
      >
        <motion.p variants={fadeUp} className="eyebrow mb-5 text-gold">
          Welcome to Irani Restaurant
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-3xl"
        >
          Authentic Flavours.
          <br />
          <span className="italic text-gold-light">Timeless</span> Tradition.
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-7 max-w-xl text-base sm:text-lg text-cream/85 font-light">
          A warm dining experience in Parassala, Kerala, bringing together
          comforting flavours, traditional hospitality and memorable food.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-charcoal transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            Explore Menu
          </a>
          <a
            href={site.phoneTel}
            className="group inline-flex items-center gap-2 rounded-full border border-cream/40 px-8 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <Phone size={16} className="transition-transform duration-300 group-hover:-rotate-12" />
            Call Now
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.5 }}
          className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-cream/15 bg-charcoal/40 px-5 py-3.5 backdrop-blur-sm"
        >
          <div className="flex items-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} strokeWidth={1.5} />
            ))}
          </div>
          <div className="h-8 w-px bg-cream/20" />
          <div className="leading-tight">
            <p className="font-display text-xl text-cream">{site.rating} / 5</p>
            <p className="text-xs text-cream/60">{site.reviewCount}+ Reviews</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to About section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute bottom-8 right-10 items-center justify-center rounded-full border border-cream/30 p-2.5 text-cream/70 hover:text-gold hover:border-gold transition-colors"
      >
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
