import { motion } from "framer-motion";
import { UtensilsCrossed, HeartHandshake, Sparkles, Users } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Authentic Flavours",
    text: "Carefully prepared dishes inspired by comforting Indian and Irani-style flavours.",
  },
  {
    icon: HeartHandshake,
    title: "Warm Hospitality",
    text: "A welcoming place to enjoy good food with friends and family.",
  },
  {
    icon: Sparkles,
    title: "Fresh & Satisfying",
    text: "Food made to deliver a delicious and memorable dining experience.",
  },
  {
    icon: Users,
    title: "Perfect for Every Occasion",
    text: "Ideal for casual meals, family visits and gatherings.",
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
  return (
    <section className="bg-charcoal py-24 md:py-28">
      <div className="container-narrow">
        <Reveal className="max-w-xl">
          <p className="eyebrow mb-4">The Signature Experience</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
            Why guests keep coming back
          </h2>
        </Reveal>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border border-cream/10 bg-coffee/60 p-8 shadow-card"
            >
  
              <h3 className="font-display text-2xl text-cream mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-cream/65">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
