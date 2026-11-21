const petals = [
  { left: "5%", size: 14, duration: 14, delay: 0 },
  { left: "15%", size: 10, duration: 18, delay: 2 },
  { left: "28%", size: 16, duration: 16, delay: 4 },
  { left: "42%", size: 12, duration: 20, delay: 1 },
  { left: "58%", size: 14, duration: 15, delay: 6 },
  { left: "71%", size: 10, duration: 19, delay: 3 },
  { left: "84%", size: 16, duration: 17, delay: 5 },
  { left: "93%", size: 12, duration: 21, delay: 8 },
];

export function FloatingPetals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg viewBox="0 0 32 32" fill="none" width="100%" height="100%">
            <path
              d="M16 2C19 8 26 10 30 16C26 22 19 24 16 30C13 24 6 22 2 16C6 10 13 8 16 2Z"
              fill="#f3a8b8"
              opacity="0.85"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
