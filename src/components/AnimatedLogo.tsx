import { useEffect, useState } from "react";
import swaapLogo from "@/assets/swaap-logo.jpeg";
import { Heart, Users, Trophy, MapPin, Gift, Star } from "lucide-react";

const notifications = [
  { icon: Heart, text: "+3 Dons", color: "text-primary" },
  { icon: Users, text: "2 Inscrits", color: "text-secondary" },
  { icon: Trophy, text: "Ligue Active", color: "text-swaap-gold" },
  { icon: MapPin, text: "1 Match", color: "text-primary" },
  { icon: Gift, text: "Don reçu", color: "text-secondary" },
  { icon: Star, text: "Badge !", color: "text-swaap-gold" },
];

// Phase 1: only 3 notifications visible, logo simplified
const PHASE = 1;
const MAX_NOTIFS = PHASE === 1 ? 3 : PHASE === 2 ? 5 : 6;

const AnimatedLogo = () => {
  const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);
  const [currentNotif, setCurrentNotif] = useState(0);

  useEffect(() => {
    // Show notifications one by one, cycling through available ones
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
    
    // Show first one immediately
    const firstTimer = setTimeout(() => {
      setVisibleNotifs([0]);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimer);
    };
  }, []);

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

      {/* Logo container - Phase 1: simplified, sparse */}
      <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
        {/* Outer rotating ring - thin for Phase 1 */}
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
        
        {/* Inner counter-rotating ring */}
        <div className="absolute inset-4 rounded-full border border-secondary/20 animate-spin-reverse" />
        
        {/* Phase 1: subtle decorative dots (fewer) */}
        {[0, 120, 240].map((deg) => (
          <div
            key={deg}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/40 animate-spin-slow"
            style={{
              transform: `rotate(${deg}deg) translateX(108px)`,
              transformOrigin: "center",
            }}
          />
        ))}

        {/* Static center logo with flame glow */}
        <div className="relative z-10 h-24 w-24 rounded-full overflow-hidden glow-orange">
          <img src={swaapLogo} alt="Swaap" className="h-full w-full object-cover" />
        </div>

        {/* Floating notifications - Phase 1: only MAX_NOTIFS shown, small and sparse */}
        {notifications.slice(0, MAX_NOTIFS).map((notif, i) => {
          const angle = (i * (360 / MAX_NOTIFS)) - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = 120;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isVisible = visibleNotifs.includes(i);

          return (
            <div
              key={i}
              className={`absolute z-20 flex items-center gap-1 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 px-2 py-1 text-[9px] font-medium shadow-md transition-all duration-1000 ${
                isVisible
                  ? "opacity-90 scale-100 animate-float-notif"
                  : "opacity-0 scale-50"
              }`}
              style={{
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 12px)`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <notif.icon className={`h-2.5 w-2.5 flex-shrink-0 ${notif.color}`} />
              <span className="whitespace-nowrap">{notif.text}</span>
            </div>
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
