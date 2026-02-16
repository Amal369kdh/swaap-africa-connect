import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Trophy, MapPin, Gift, Star } from "lucide-react";
import swaapLogo from "@/assets/swaap-logo.jpeg";

const notifications = [
  { icon: Heart, text: "+3 Dons", color: "text-primary" },
  { icon: Users, text: "2 Inscrits", color: "text-secondary" },
  { icon: Trophy, text: "Ligue Active", color: "text-swaap-gold" },
  { icon: MapPin, text: "1 Match", color: "text-primary" },
  { icon: Gift, text: "Don reçu", color: "text-secondary" },
  { icon: Star, text: "Badge !", color: "text-swaap-gold" },
];

// Phase config: controls complexity & speed
const PHASE = 1;
const MAX_NOTIFS = PHASE === 1 ? 3 : PHASE === 2 ? 5 : 6;

// SVG arc segment generator
const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

// Phase-based ring configs
const phaseRings = {
  1: [
    // Layer B - outer arcs (counter-clockwise)
    { radius: 100, segments: [{ start: 0, end: 80 }, { start: 120, end: 200 }, { start: 240, end: 320 }], stroke: "hsl(var(--primary))", width: 2, opacity: 0.6, direction: -1, speed: 30 },
    // Layer A - inner arcs (clockwise)
    { radius: 80, segments: [{ start: 10, end: 60 }, { start: 130, end: 180 }, { start: 250, end: 300 }], stroke: "hsl(var(--secondary))", width: 1.5, opacity: 0.4, direction: 1, speed: 40 },
  ],
  2: [
    { radius: 105, segments: [{ start: 0, end: 70 }, { start: 90, end: 160 }, { start: 180, end: 250 }, { start: 270, end: 340 }], stroke: "hsl(var(--primary))", width: 2.5, opacity: 0.7, direction: -1, speed: 25 },
    { radius: 88, segments: [{ start: 20, end: 80 }, { start: 140, end: 200 }, { start: 260, end: 320 }], stroke: "hsl(var(--secondary))", width: 2, opacity: 0.5, direction: 1, speed: 35 },
    { radius: 72, segments: [{ start: 0, end: 50 }, { start: 120, end: 170 }, { start: 240, end: 290 }], stroke: "hsl(var(--swaap-gold))", width: 1.5, opacity: 0.4, direction: -1, speed: 45 },
  ],
  3: [
    { radius: 110, segments: [{ start: 0, end: 60 }, { start: 72, end: 132 }, { start: 144, end: 204 }, { start: 216, end: 276 }, { start: 288, end: 348 }], stroke: "hsl(var(--primary))", width: 3, opacity: 0.8, direction: -1, speed: 20 },
    { radius: 95, segments: [{ start: 10, end: 65 }, { start: 100, end: 155 }, { start: 190, end: 245 }, { start: 280, end: 335 }], stroke: "hsl(var(--secondary))", width: 2.5, opacity: 0.6, direction: 1, speed: 28 },
    { radius: 80, segments: [{ start: 0, end: 50 }, { start: 120, end: 170 }, { start: 240, end: 290 }], stroke: "hsl(var(--swaap-gold))", width: 2, opacity: 0.5, direction: -1, speed: 38 },
    { radius: 68, segments: [{ start: 30, end: 70 }, { start: 150, end: 190 }, { start: 270, end: 310 }], stroke: "hsl(var(--primary))", width: 1.5, opacity: 0.35, direction: 1, speed: 50 },
  ],
};

const currentRings = phaseRings[PHASE as keyof typeof phaseRings];

// Dot markers on rings
const getDots = (phase: number) => {
  if (phase === 1) return [
    { radius: 100, angle: 80, size: 3, color: "hsl(var(--primary))" },
    { radius: 100, angle: 200, size: 3, color: "hsl(var(--primary))" },
    { radius: 100, angle: 320, size: 3, color: "hsl(var(--primary))" },
  ];
  if (phase === 2) return [
    { radius: 105, angle: 70, size: 3.5, color: "hsl(var(--primary))" },
    { radius: 105, angle: 160, size: 3.5, color: "hsl(var(--primary))" },
    { radius: 105, angle: 250, size: 3.5, color: "hsl(var(--primary))" },
    { radius: 88, angle: 80, size: 2.5, color: "hsl(var(--secondary))" },
    { radius: 88, angle: 200, size: 2.5, color: "hsl(var(--secondary))" },
  ];
  return [
    { radius: 110, angle: 60, size: 4, color: "hsl(var(--primary))" },
    { radius: 110, angle: 132, size: 4, color: "hsl(var(--primary))" },
    { radius: 110, angle: 204, size: 4, color: "hsl(var(--primary))" },
    { radius: 110, angle: 276, size: 4, color: "hsl(var(--primary))" },
    { radius: 95, angle: 65, size: 3, color: "hsl(var(--secondary))" },
    { radius: 95, angle: 155, size: 3, color: "hsl(var(--secondary))" },
    { radius: 95, angle: 245, size: 3, color: "hsl(var(--secondary))" },
    { radius: 80, angle: 50, size: 2.5, color: "hsl(var(--swaap-gold))" },
    { radius: 80, angle: 170, size: 2.5, color: "hsl(var(--swaap-gold))" },
  ];
};

const AnimatedLogo = () => {
  const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);
  const [currentNotif, setCurrentNotif] = useState(0);
  const cx = 120;
  const cy = 120;
  const viewSize = 240;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotif((prev) => {
        const next = (prev + 1) % MAX_NOTIFS;
        setVisibleNotifs((vis) => {
          if (vis.includes(next)) return vis;
          if (vis.length >= MAX_NOTIFS) return vis;
          return [...vis, next];
        });
        return next;
      });
    }, 3000);
    const firstTimer = setTimeout(() => setVisibleNotifs([0]), 1500);
    return () => { clearInterval(interval); clearTimeout(firstTimer); };
  }, []);

  const dots = getDots(PHASE);

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      {/* Phase indicator */}
      <div className="mb-4 flex items-center gap-2">
        {[1, 2, 3].map((p) => (
          <div
            key={p}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${
              p === PHASE
                ? "bg-primary/20 text-primary border border-primary/40"
                : p < PHASE
                ? "bg-muted text-muted-foreground"
                : "bg-muted/30 text-muted-foreground/40"
            }`}
          >
            Phase {p}
          </div>
        ))}
      </div>

      {/* Logo container */}
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
        {/* SVG Rings - the living mechanism */}
        <svg
          viewBox={`0 0 ${viewSize} ${viewSize}`}
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Glow filters */}
            <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.6" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="hsl(var(--secondary))" floodOpacity="0.5" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feFlood floodColor="hsl(var(--swaap-gold))" floodOpacity="0.5" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rotating ring layers */}
          {currentRings.map((ring, ringIdx) => {
            const filterName = ring.stroke.includes("primary") ? "glow-orange"
              : ring.stroke.includes("secondary") ? "glow-violet"
              : "glow-gold";

            return (
              <motion.g
                key={ringIdx}
                animate={{ rotate: ring.direction * 360 }}
                transition={{
                  duration: ring.speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ originX: `${cx}px`, originY: `${cy}px`, transformOrigin: `${cx}px ${cy}px` }}
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
              </motion.g>
            );
          })}

          {/* Dot markers on outermost ring */}
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: currentRings[0].speed, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            {dots.map((dot, i) => {
              const pos = polarToCartesian(cx, cy, dot.radius, dot.angle);
              return (
                <circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r={dot.size}
                  fill={dot.color}
                  opacity={0.8}
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.5}s`}
                  />
                </circle>
              );
            })}
          </motion.g>
        </svg>

        {/* Central logo - static, with glow */}
        <div className="relative z-10 h-20 w-20 rounded-full overflow-hidden glow-orange ring-2 ring-primary/30">
          <img src={swaapLogo} alt="Swaap" className="h-full w-full object-cover" />
        </div>

        {/* Floating notifications */}
        {notifications.slice(0, MAX_NOTIFS).map((notif, i) => {
          const angle = (i * (360 / MAX_NOTIFS)) - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = 140;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isVisible = visibleNotifs.includes(i);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute z-20 flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 px-2 py-1 text-[9px] font-medium shadow-md"
              style={{
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 12px)`,
              }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                className="flex items-center gap-1"
              >
                <notif.icon className={`h-2.5 w-2.5 flex-shrink-0 ${notif.color}`} />
                <span className="whitespace-nowrap">{notif.text}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Community pulse text */}
      <p className="mt-4 text-xs text-muted-foreground animate-pulse-glow">
        Communauté en mouvement...
      </p>
    </div>
  );
};

export default AnimatedLogo;
