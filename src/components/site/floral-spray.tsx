// Hoạ tiết hoa cách điệu (vector tự vẽ) dùng trang trí góc card / màn hình bìa.
export function FloralSpray({ className, mirrored }: { className?: string; mirrored?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 220"
      className={className}
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <g opacity="0.9">
        <path
          d="M30 210 C 20 160, 40 120, 15 70"
          stroke="#7a8c5f"
          strokeWidth="2"
          fill="none"
        />
        <path d="M30 150 q -18 -6 -26 -24" stroke="#7a8c5f" strokeWidth="2" fill="none" />
        <path d="M24 110 q 18 -4 24 -22" stroke="#7a8c5f" strokeWidth="2" fill="none" />
        <ellipse cx="12" cy="86" rx="7" ry="4" fill="#c7b78a" transform="rotate(-30 12 86)" />
        <ellipse cx="48" cy="90" rx="7" ry="4" fill="#c7b78a" transform="rotate(20 48 90)" />
      </g>

      {[
        { cx: 48, cy: 150, r: 26, fill: "var(--color-rose-500)" },
        { cx: 30, cy: 110, r: 20, fill: "var(--color-rose-600)" },
        { cx: 60, cy: 95, r: 16, fill: "#f3ead9" },
        { cx: 38, cy: 70, r: 14, fill: "var(--color-rose-500)" },
      ].map((bloom, i) => (
        <g key={i}>
          <circle cx={bloom.cx} cy={bloom.cy} r={bloom.r} fill={bloom.fill} opacity="0.95" />
          <circle cx={bloom.cx} cy={bloom.cy} r={bloom.r * 0.6} fill="#000" opacity="0.08" />
          <circle cx={bloom.cx - bloom.r * 0.2} cy={bloom.cy - bloom.r * 0.2} r={bloom.r * 0.35} fill="#fff" opacity="0.15" />
        </g>
      ))}

      <ellipse cx="46" cy="186" rx="9" ry="5" fill="#8a9a6a" transform="rotate(-20 46 186)" />
      <ellipse cx="22" cy="138" rx="8" ry="4" fill="#8a9a6a" transform="rotate(40 22 138)" />
    </svg>
  );
}
