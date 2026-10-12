/**
 * Lightweight ambient network backdrop shared by home and inner-page heroes.
 * SVG + CSS only: no canvas, animation dependency, timers or pointer tracking.
 * Decorative only, with reduced-motion support in globals.css.
 */
const particles = [
  [95, 92, 3, 0], [265, 170, 2, 1], [475, 90, 3, 2], [770, 155, 2, 3],
  [1080, 105, 3, 1], [150, 385, 2, 2], [335, 465, 3, 0], [610, 365, 2, 3],
  [850, 445, 3, 1], [1100, 590, 2, 2], [200, 690, 2, 3], [710, 690, 3, 0],
] as const;

export function NetworkBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`} aria-hidden="true">
      <div className="ambient-haze ambient-haze-one" />
      <div className="ambient-haze ambient-haze-two" />
      <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full opacity-80" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="cp-ambient-lines" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity=".38" />
            <stop offset="100%" stopColor="#00BFFF" stopOpacity=".12" />
          </linearGradient>
          <radialGradient id="cp-ambient-node">
            <stop offset="0%" stopColor="#168BFF" stopOpacity=".55" />
            <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="ambient-network" fill="none" stroke="url(#cp-ambient-lines)" strokeWidth="1">
          <path d="M120 140 380 260 640 120 920 220 1080 360 M380 260 420 520 180 620 M420 520 700 600 920 220 M700 600 980 680" />
          <path d="M95 92 265 170 475 90 770 155 1080 105 M150 385 335 465 610 365 850 445 1100 590" strokeDasharray="3 14" opacity=".4" />
        </g>
        <g className="ambient-orbit" transform="translate(940 390)" fill="none" stroke="#168BFF" strokeWidth="1">
          <circle r="155" strokeOpacity=".16" strokeDasharray="4 15" />
          <circle r="106" stroke="#7C3AED" strokeOpacity=".24" strokeDasharray="80 45 12 40" />
          <ellipse rx="188" ry="70" transform="rotate(-28)" strokeOpacity=".12" />
          <circle cx="106" r="4" fill="#00BFFF" stroke="none" fillOpacity=".7" />
        </g>
        <g fill="#C9CDD5">
          {([[120,140],[380,260],[640,120],[920,220],[420,520],[180,620],[700,600],[980,680],[1080,360]] as const).map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 3.5 : 2} fillOpacity=".5" />
          ))}
        </g>
        <circle cx="640" cy="120" r="75" fill="url(#cp-ambient-node)" className="ambient-node-glow" />
        <circle cx="420" cy="520" r="95" fill="url(#cp-ambient-node)" className="ambient-node-glow" />
        {particles.map(([cx,cy,r,delay],i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? "#00BFFF" : "#A78BFA"} className={`ambient-particle ambient-particle-${delay}`} />
        ))}
        <g fill="none" stroke="#A78BFA" strokeOpacity=".17" strokeWidth="1.5" className="ambient-geometry">
          <path d="m185 265 18-10 18 10v21l-18 10-18-10z" />
          <path d="m1030 140 25-14 25 14v28l-25 14-25-14z" />
          <path d="m535 680 20-12 20 12v24l-20 12-20-12z" />
        </g>
      </svg>
    </div>
  );
}
