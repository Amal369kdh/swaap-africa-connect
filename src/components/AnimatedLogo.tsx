import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Trophy, MapPin, Gift, Star } from "lucide-react";
import swaapLogo from "@/assets/swaap-logo.jpeg";

interface AnimatedLogoProps {
  phase?: number;
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

// Phase-based ring configs — scaled for 300px viewBox
const phaseRings = {
  1: [
    { radius: 130, segments: [{ start: 0, end: 80 }, { start: 120, end: 200 }, { start: 240, end: 320 }], stroke: "hsl(var(--primary))", width: 3, opacity: 0.7, direction: -1, speed: 30 },
    { radius: 110, segments: [{ start: 10, end: 60 }, { start: 130, end: 180 }, { start: 250, end: 300 }], stroke: "hsl(var(--secondary))", width: 2.5, opacity: 0.5, direction: 1, speed: 40 },
  ],
  2: [
    { radius: 138, segments: [{ start: 0, end: 70 }, { start: 90, end: 160 }, { start: 180, end: 250 }, { start: 270, end: 340 }], stroke: "hsl(var(--primary))", width: 3.5, opacity: 0.8, direction: -1, speed: 25 },
    { radius: 120, segments: [{ start: 20, end: 80 }, { start: 140, end: 200 }, { start: 260, end: 320 }], stroke: "hsl(var(--secondary))", width: 2.5, opacity: 0.6, direction: 1, speed: 35 },
    { radius: 105, segments: [{ start: 0, end: 50 }, { start: 120, end: 170 }, { start: 240, end: 290 }], stroke: "hsl(var(--swaap-gold))", width: 2, opacity: 0.45, direction: -1, speed: 45 },
  ],
  3: [
    { radius: 142, segments: [{ start: 0, end: 60 }, { start: 72, end: 132 }, { start: 144, end: 204 }, { start: 216, end: 276 }, { start: 288, end: 348 }], stroke: "hsl(var(--primary))", width: 4, opacity: 0.85, direction: -1, speed: 20 },
    { radius: 128, segments: [{ start: 10, end: 65 }, { start: 100, end: 155 }, { start: 190, end: 245 }, { start: 280, end: 335 }], stroke: "hsl(var(--secondary))", width: 3, opacity: 0.65, direction: 1, speed: 28 },
    { radius: 112, segments: [{ start: 0, end: 50 }, { start: 120, end: 170 }, { start: 240, end: 290 }], stroke: "hsl(var(--swaap-gold))", width: 2.5, opacity: 0.55, direction: -1, speed: 38 },
    { radius: 100, segments: [{ start: 30, end: 70 }, { start: 150, end: 190 }, { start: 270, end: 310 }], stroke: "hsl(var(--primary))", width: 2, opacity: 0.4, direction: 1, speed: 50 },
  ],
};

const AnimatedLogo = ({ phase = 1 }: AnimatedLogoProps) => {
  const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);
  const maxNotifs = phase === 1 ? 3 : phase === 2 ? 5 : 6;
  const cx = 150;
  const cy = 150;
  const viewSize = 300;
  const currentRings = phaseRings[phase as keyof typeof phaseRings] ?? phaseRings[1];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleNotifs((vis) => {
        if (vis.length >= maxNotifs) return vis;
        const next = vis.length;
        return [...vis, next];
      });
    }, 2500);
    const firstTimer = setTimeout(() => setVisibleNotifs([0]), 1000);
    return () => { clearInterval(interval); clearTimeout(firstTimer); };
  }, [maxNotifs]);

  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      {/* Phase indicator */}
      <div className="mb-3 flex items-center gap-2">
        {[1, 2, 3].map((p) => (
          <div
            key={p}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${
              p === phase
                ? "bg-primary/20 text-primary border border-primary/40"
                : p < phase
                ? "bg-muted text-muted-foreground"
                : "bg-muted/30 text-muted-foreground/40"
            }`}
          >
            Phase {p}
          </div>
        ))}
      </div>

      {/* Logo container — much bigger */}
      <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>
        {/* SVG Rings */}
        <svg
          viewBox={`0 0 ${viewSize} ${viewSize}`}
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="hsl(28 100% 55%)" floodOpacity="0.6" />
              <feComposite in2="blur" operator="in" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="hsl(270 80% 55%)" floodOpacity="0.5" />
              <feComposite in2="blur" operator="in" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feFlood floodColor="hsl(42 100% 60%)" floodOpacity="0.5" />
              <feComposite in2="blur" operator="in" />
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Circular clip for central image */}
            <clipPath id="logo-clip">
              <circle cx={cx} cy={cy} r={70} />
            </clipPath>
          </defs>

          {/* Rotating ring layers */}
          {currentRings.map((ring, ringIdx) => {
            const filterName = ring.stroke.includes("primary") ? "glow-orange"
              : ring.stroke.includes("secondary") ? "glow-violet"
              : "glow-gold";

            return (
              <motion.g
                key={`${phase}-${ringIdx}`}
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
              </motion.g>
            );
          })}

          {/* Pulsating dots on rings */}
          {currentRings.map((ring, ringIdx) => (
            <motion.g
              key={`dots-${phase}-${ringIdx}`}
              animate={{ rotate: ring.direction * 360 }}
              transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              {ring.segments.map((seg, segIdx) => {
                const pos = polarToCartesian(cx, cy, ring.radius, seg.end);
                return (
                  <circle key={segIdx} cx={pos.x} cy={pos.y} r={ring.width + 1} fill={ring.stroke} opacity={0.8}>
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin={`${segIdx * 0.5}s`} />
                  </circle>
                );
              })}
            </motion.g>
          ))}

          {/* Central image — BIG, inside the rings */}
          <circle cx={cx} cy={cy} r={72} fill="none" stroke="hsl(28 100% 55%)" strokeWidth="2" opacity="0.5" />
          <circle cx={cx} cy={cy} r={74} fill="none" stroke="hsl(270 80% 55%)" strokeWidth="1" opacity="0.3" />
          <image
            href={swaapLogo}
            x={cx - 70}
            y={cy - 70}
            width={140}
            height={140}
            clipPath="url(#logo-clip)"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Inner glow ring around image */}
          <motion.circle
            cx={cx} cy={cy} r={75}
            fill="none"
            stroke="hsl(28 100% 55%)"
            strokeWidth="1.5"
            opacity={0.4}
            animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        </svg>

        {/* Floating notifications */}
        {notifications.slice(0, maxNotifs).map((notif, i) => {
          const angle = (i * (360 / maxNotifs)) - 90;
          const rad = (angle * Math.PI) / 180;
          const notifRadius = 175;
          const x = Math.cos(rad) * notifRadius;
          const y = Math.sin(rad) * notifRadius;
          const isVisible = visibleNotifs.includes(i);

          return (
            <motion.div
              key={i}
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

      {/* Community pulse text */}
      <p className="mt-2 text-xs text-muted-foreground animate-pulse-glow">
        Communauté en mouvement...
      </p>
    </div>
  );
};

export default AnimatedLogo;
