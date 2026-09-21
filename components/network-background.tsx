/**
 * Abstract network/circuit motif used as a decorative background layer.
 * Purely presentational (aria-hidden), no imagery, respects
 * prefers-reduced-motion via the shared .animate-* / pulse utilities.
 */
export function NetworkBackground({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1200 800"
        className="h-full w-full opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00BFFF" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#168BFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="url(#lineGrad)" strokeWidth="1">
          <line x1="120" y1="140" x2="380" y2="260" />
          <line x1="380" y1="260" x2="640" y2="120" />
          <line x1="640" y1="120" x2="920" y2="220" />
          <line x1="380" y1="260" x2="420" y2="520" />
          <line x1="420" y1="520" x2="180" y2="620" />
          <line x1="420" y1="520" x2="700" y2="600" />
          <line x1="700" y1="600" x2="920" y2="220" />
          <line x1="700" y1="600" x2="980" y2="680" />
          <line x1="920" y1="220" x2="1080" y2="360" />
        </g>

        <g fill="#C9CDD5">
          {[
            [120, 140],
            [380, 260],
            [640, 120],
            [920, 220],
            [420, 520],
            [180, 620],
            [700, 600],
            [980, 680],
            [1080, 360],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 4 : 2.5} fillOpacity={0.7} />
          ))}
        </g>

        <circle cx="640" cy="120" r="60" fill="url(#nodeGlow)" className="animate-pulse-slow" />
        <circle cx="420" cy="520" r="80" fill="url(#nodeGlow)" className="animate-pulse-slow" />
      </svg>
    </div>
  );
}
