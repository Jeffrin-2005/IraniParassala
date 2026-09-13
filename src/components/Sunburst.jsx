// A radiating line motif drawn from the restaurant's own wall mural —
// used sparingly as a section divider / decorative accent, never as a logo.
export default function Sunburst({ className = "", rays = 24, stroke = "#B9924F" }) {
  const lines = Array.from({ length: rays }).map((_, i) => {
    const angle = (360 / rays) * i;
    return (
      <line
        key={i}
        x1="50"
        y1="50"
        x2="50"
        y2="4"
        stroke={stroke}
        strokeWidth="1"
        transform={`rotate(${angle} 50 50)`}
      />
    );
  });
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {lines}
      <circle cx="50" cy="50" r="3" fill={stroke} />
    </svg>
  );
}
