import { useEffect, useState } from "react";
import swaapLogo from "@/assets/swaap-logo.jpeg";
import { Heart, Users, Trophy, MapPin, Gift, Star } from "lucide-react";

const notifications = [
  { icon: Heart, text: "+12 Nouveaux Dons", delay: 0 },
  { icon: Users, text: "8 Inscrits cette heure", delay: 2 },
  { icon: Trophy, text: "Ligue : Côte d'Ivoire #1", delay: 4 },
  { icon: MapPin, text: "Radar Proximité actif", delay: 6 },
  { icon: Gift, text: "Match trouvé !", delay: 8 },
  { icon: Star, text: "Cagnotte Nationale", delay: 10 },
];

const AnimatedLogo = () => {
  const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);

  useEffect(() => {
    const timers = notifications.map((_, i) =>
      setTimeout(() => {
        setVisibleNotifs((prev) => [...prev, i]);
      }, (i + 1) * 2500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-12">
      {/* Title */}
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-swaap mb-1">
        Swaap
      </h1>
      <p className="text-sm text-muted-foreground mb-8">Souveraineté & Partage</p>

      {/* Logo container */}
      <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow" />
        {/* Inner counter-rotating ring */}
        <div className="absolute inset-3 rounded-full border-2 border-secondary/30 animate-spin-reverse" />
        {/* Decorative dots on ring */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            className="absolute h-2 w-2 rounded-full bg-primary/50 animate-spin-slow"
            style={{
              transform: `rotate(${deg}deg) translateX(118px)`,
              transformOrigin: "center",
            }}
          />
        ))}

        {/* Static center logo */}
        <div className="relative z-10 h-28 w-28 rounded-full overflow-hidden glow-orange">
          <img src={swaapLogo} alt="Swaap" className="h-full w-full object-cover" />
        </div>

        {/* Floating notifications around the logo */}
        {notifications.map((notif, i) => {
          const angle = (i * 60) - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = 140;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isVisible = visibleNotifs.includes(i);

          return (
            <div
              key={i}
              className={`absolute z-20 flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border px-2.5 py-1.5 text-[10px] font-medium shadow-lg transition-all duration-700 animate-float-notif ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
              style={{
                left: `calc(50% + ${x}px - 60px)`,
                top: `calc(50% + ${y}px - 14px)`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <notif.icon className="h-3 w-3 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">{notif.text}</span>
            </div>
          );
        })}
      </div>

      {/* Subtitle */}
      <h2 className="mt-8 font-display text-2xl sm:text-3xl font-bold text-gradient-swaap">
        Swaap
      </h2>
      <p className="text-sm text-muted-foreground">Souveraineté & Partage</p>
    </div>
  );
};

export default AnimatedLogo;
