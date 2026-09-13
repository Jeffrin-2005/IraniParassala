import { motion } from "framer-motion";

// Shared scroll-reveal wrapper: fades and lifts content into place once,
// the first time it enters the viewport.
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  as: Component = motion.div,
}) {
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
