import { Shield, Star, Award, Crown } from "lucide-react";

const badges = [
  { icon: Shield, label: "Débutant", unlocked: true },
  { icon: Star, label: "Échangeur", unlocked: true },
  { icon: Award, label: "Élite", unlocked: true },
  { icon: Crown, label: "Légende", unlocked: false },
];

const ProgressionUser = () => {
  return (
    <div className="rounded-lg bg-card p-4 gradient-border">
      <div className="flex items-center gap-2 mb-4">
        <Award className="h-5 w-5 text-swaap-gold" />
        <h2 className="font-display text-sm font-bold tracking-wide">Votre Progression</h2>
      </div>

      {/* Level indicator */}
      <div className="mb-4 text-center">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-swaap-gold glow-orange">
          <span className="font-display text-lg font-bold text-primary-foreground">12</span>
        </div>
        <p className="text-sm font-semibold">Élite Troqueur</p>
        <p className="text-xs text-muted-foreground">Niv. 12</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Niv. 12</span>
          <span>Niv. 13</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: "65%" }}
          />
        </div>
        <p className="mt-1 text-xs text-muted-foreground text-right">650 / 1000 XP</p>
      </div>

      {/* Badges */}
      <div className="flex justify-center gap-3">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className={`flex flex-col items-center gap-1 ${
              badge.unlocked ? "" : "opacity-30"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                badge.unlocked
                  ? "bg-gradient-to-br from-primary/20 to-secondary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <badge.icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] text-muted-foreground">{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressionUser;
