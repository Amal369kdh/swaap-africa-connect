import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, Trophy, MapPin, Gift, Star } from "lucide-react";
import swaapLogo from "@/assets/swaap-logo.jpeg";

interface AnimatedLogoProps {
  phase?: number;
  isAdmin?: boolean;
  onPhasePreview?: (phase: number) => void;
}

const notifications = [
  { icon: Heart, text: "+3 Dons", color: "text-primary" },
  { icon: Users, text: "2 Inscrits", color: "text-secondary" },
  { icon: Trophy, text: "Ligue Active", color: "text-swaap-gold" },
  { icon: MapPin, text: "1 Match", color: "text-primary" },
  { icon: Gift, text: "Don reçu", color: "text-secondary" },
  { icon: Star, text: "Badge !", color: "text-swaap-gold" },
];

// SVG arc helpers
const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

// Phase-based configs
const phaseConfig = {
  1: {
    // Phase 1: Logo small, dark, rotating slowly
    logoRadius: 70,
    logoOpacity: 0.5,
    logoRotateSpeed: 50,
    logoRotates: true,
    clipReveal: 0.45,
    rings: [
      { radius: 130, segments: [{ start: 0, end: 80 }, { start: 120, end: 200 }, { start: 240, end: 320 }], stroke: "hsl(28 100% 55%)", width: 3, opacity: 0.7, direction: -1, speed: 35 },
      { radius: 110, segments: [{ start: 10, end: 60 }, { start: 130, end: 180 }, { start: 250, end: 300 }], stroke: "hsl(270 80% 55%)", width: 2.5, opacity: 0.45, direction: 1, speed: 45 },
    ],
    maxNotifs: 3,
    glowIntensity: 0.3,
    borderRings: 1,
  },
  2: {
    // Phase 2: Logo bigger, brighter, still rotating
    logoRadius: 90,
    logoOpacity: 0.75,
    logoRotateSpeed: 40,
    logoRotates: true,
    clipReveal: 0.7,
    rings: [
      { radius: 138, segments: [{ start: 0, end: 70 }, { start: 90, end: 160 }, { start: 180, end: 250 }, { start: 270, end: 340 }], stroke: "hsl(28 100% 55%)", width: 3.5, opacity: 0.8, direction: -1, speed: 28 },
      { radius: 120, segments: [{ start: 20, end: 80 }, { start: 140, end: 200 }, { start: 260, end: 320 }], stroke: "hsl(270 80% 55%)", width: 2.5, opacity: 0.6, direction: 1, speed: 35 },
      { radius: 105, segments: [{ start: 0, end: 50 }, { start: 120, end: 170 }, { start: 240, end: 290 }], stroke: "hsl(42 100% 60%)", width: 2, opacity: 0.45, direction: -1, speed: 50 },
    ],
    maxNotifs: 5,
    glowIntensity: 0.5,
    borderRings: 2,
  },
  3: {
    // Phase 3: Logo full, bright, STATIC
    logoRadius: 110,
    logoOpacity: 1,
    logoRotateSpeed: 0,
    logoRotates: false,
    clipReveal: 1,
    rings: [
      { radius: 142, segments: [{ start: 0, end: 60 }, { start: 72, end: 132 }, { start: 144, end: 204 }, { start: 216, end: 276 }, { start: 288, end: 348 }], stroke: "hsl(28 100% 55%)", width: 4, opacity: 0.85, direction: -1, speed: 22 },
      { radius: 128, segments: [{ start: 10, end: 65 }, { start: 100, end: 155 }, { start: 190, end: 245 }, { start: 280, end: 335 }], stroke: "hsl(270 80% 55%)", width: 3, opacity: 0.65, direction: 1, speed: 30 },
      { radius: 112, segments: [{ start: 0, end: 50 }, { start: 120, end: 170 }, { start: 240, end: 290 }], stroke: "hsl(42 100% 60%)", width: 2.5, opacity: 0.55, direction: -1, speed: 40 },
      { radius: 100, segments: [{ start: 30, end: 70 }, { start: 150, end: 190 }, { start: 270, end: 310 }], stroke: "hsl(28 100% 55%)", width: 2, opacity: 0.4, direction: 1, speed: 55 },
    ],
    maxNotifs: 6,
    glowIntensity: 0.7,
    borderRings: 3,
  },
};

const AnimatedLogo = ({ phase = 1, isAdmin = false, onPhasePreview }: AnimatedLogoProps) => {
  const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);
  const [previewPhase, setPreviewPhase] = useState<number | null>(null);
  const activePhase = previewPhase ?? phase;
  const cfg = phaseConfig[activePhase as keyof typeof phaseConfig] ?? phaseConfig[1];
  const cx = 150;
  const cy = 150;
  const viewSize = 300;

  useEffect(() => {
    setVisibleNotifs([]);
    const interval = setInterval(() => {
      setVisibleNotifs((vis) => {
        if (vis.length >= cfg.maxNotifs) return vis;
        return [...vis, vis.length];
      });
    }, 2500);
    const firstTimer = setTimeout(() => setVisibleNotifs([0]), 800);
    return () => { clearInterval(interval); clearTimeout(firstTimer); };
  }, [activePhase, cfg.maxNotifs]);

  const handlePhaseClick = (p: number) => {
    if (isAdmin) {
      setPreviewPhase(p === previewPhase ? null : p);
      onPhasePreview?.(p);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      {/* Phase indicator */}
      <div className="mb-3 flex items-center gap-2">
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => handlePhaseClick(p)}
            disabled={!isAdmin}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${
              p === activePhase
                ? "bg-primary/20 text-primary border border-primary/40"
                : p < activePhase
                ? "bg-muted text-muted-foreground"
                : "bg-muted/30 text-muted-foreground/40"
            } ${isAdmin ? "cursor-pointer hover:bg-primary/15" : "cursor-default"}`}
          >
            Phase {p}
          </button>
        ))}
        {previewPhase !== null && (
          <span className="text-[9px] text-swaap-gold font-medium ml-1">
            (aperçu admin)
          </span>
        )}
      </div>

      {/* Logo container */}
      <div className="relative flex items-center justify-center" style={{ width: 360, height: 360 }}>
        <AnimatePresence mode="wait">
          <motion.svg
            key={activePhase}
            viewBox={`0 0 ${viewSize} ${viewSize}`}
            className="absolute inset-0 w-full h-full"
            style={{ overflow: "visible" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <defs>
              <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="hsl(28 100% 55%)" floodOpacity={cfg.glowIntensity} />
                <feComposite in2="blur" operator="in" />
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="hsl(270 80% 55%)" floodOpacity={cfg.glowIntensity * 0.8} />
                <feComposite in2="blur" operator="in" />
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feFlood floodColor="hsl(42 100% 60%)" floodOpacity={cfg.glowIntensity * 0.7} />
                <feComposite in2="blur" operator="in" />
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Circular clip for logo - sized by phase */}
              <clipPath id={`logo-clip-${activePhase}`}>
                <circle cx={cx} cy={cy} r={cfg.logoRadius} />
              </clipPath>
              {/* Radial gradient mask for partial reveal */}
              <radialGradient id={`reveal-mask-${activePhase}`}>
                <stop offset={`${cfg.clipReveal * 80}%`} stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity={cfg.clipReveal < 1 ? 0.15 : 1} />
              </radialGradient>
              <mask id={`logo-mask-${activePhase}`}>
                <circle cx={cx} cy={cy} r={cfg.logoRadius} fill={`url(#reveal-mask-${activePhase})`} />
              </mask>
            </defs>

            {/* Rotating ring layers */}
            {cfg.rings.map((ring, ringIdx) => {
              const filterName = ring.stroke.includes("28") ? "glow-orange"
                : ring.stroke.includes("270") ? "glow-violet"
                : "glow-gold";

              return (
                <motion.g
                  key={`ring-${activePhase}-${ringIdx}`}
                  animate={{ rotate: ring.direction * 360 }}
                  transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  {ring.segments.map((seg, segIdx) => (
                    <path
                      key={segIdx}
                      d={describeArc(cx, cy, ring.radius, seg.start, seg.end)}
                      fill="none"
                      stroke={ring.stroke}
                      strokeWidth={ring.width}
                      strokeLinecap="round"
                      opacity={ring.opacity}
                      filter={`url(#${filterName})`}
                    />
                  ))}
                  {/* Dot at end of each segment */}
                  {ring.segments.map((seg, segIdx) => {
                    const pos = polarToCartesian(cx, cy, ring.radius, seg.end);
                    return (
                      <circle key={`dot-${segIdx}`} cx={pos.x} cy={pos.y} r={ring.width + 0.5} fill={ring.stroke} opacity={0.8}>
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin={`${segIdx * 0.4}s`} />
                      </circle>
                    );
                  })}
                </motion.g>
              );
            })}

            {/* Border rings around the logo */}
            {Array.from({ length: cfg.borderRings }).map((_, i) => (
              <circle
                key={`border-${i}`}
                cx={cx}
                cy={cy}
                r={cfg.logoRadius + 2 + i * 4}
                fill="none"
                stroke={i === 0 ? "hsl(28 100% 55%)" : i === 1 ? "hsl(270 80% 55%)" : "hsl(42 100% 60%)"}
                strokeWidth={1.5 - i * 0.3}
                opacity={0.5 - i * 0.1}
              />
            ))}

            {/* THE LOGO — conditionally rotating based on phase */}
            {cfg.logoRotates ? (
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: cfg.logoRotateSpeed, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <image
                  href={swaapLogo}
                  x={cx - cfg.logoRadius}
                  y={cy - cfg.logoRadius}
                  width={cfg.logoRadius * 2}
                  height={cfg.logoRadius * 2}
                  clipPath={`url(#logo-clip-${activePhase})`}
                  mask={`url(#logo-mask-${activePhase})`}
                  preserveAspectRatio="xMidYMid slice"
                  opacity={cfg.logoOpacity}
                />
              </motion.g>
            ) : (
              <g>
                <image
                  href={swaapLogo}
                  x={cx - cfg.logoRadius}
                  y={cy - cfg.logoRadius}
                  width={cfg.logoRadius * 2}
                  height={cfg.logoRadius * 2}
                  clipPath={`url(#logo-clip-${activePhase})`}
                  mask={`url(#logo-mask-${activePhase})`}
                  preserveAspectRatio="xMidYMid slice"
                  opacity={cfg.logoOpacity}
                />
              </g>
            )}

            {/* Pulsating glow ring around logo */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={cfg.logoRadius + 1}
              fill="none"
              stroke="hsl(28 100% 55%)"
              strokeWidth="2"
              animate={{ 
                scale: [1, 1.04, 1], 
                opacity: [cfg.glowIntensity * 0.5, cfg.glowIntensity, cfg.glowIntensity * 0.5] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              filter="url(#glow-orange)"
            />
          </motion.svg>
        </AnimatePresence>

        {/* Floating notifications */}
        {notifications.slice(0, cfg.maxNotifs).map((notif, i) => {
          const angle = (i * (360 / cfg.maxNotifs)) - 90;
          const rad = (angle * Math.PI) / 180;
          const notifRadius = 185;
          const x = Math.cos(rad) * notifRadius;
          const y = Math.sin(rad) * notifRadius;
          const isVisible = visibleNotifs.includes(i);

          return (
            <motion.div
              key={`notif-${activePhase}-${i}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute z-20 flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 px-2.5 py-1.5 text-[10px] font-medium shadow-md"
              style={{
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 14px)`,
              }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                className="flex items-center gap-1"
              >
                <notif.icon className={`h-3 w-3 flex-shrink-0 ${notif.color}`} />
                <span className="whitespace-nowrap">{notif.text}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Community pulse */}
      <p className="mt-2 text-xs text-muted-foreground animate-pulse-glow">
        Communauté en mouvement...
      </p>
    </div>
  );
};

export default AnimatedLogo;
