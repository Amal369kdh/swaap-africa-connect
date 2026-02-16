import { Zap, Coins, ChevronRight, Sparkles, Award, Calendar } from "lucide-react";

const alerts = [
  { icon: Sparkles, text: "Défis Débloqués !", color: "text-primary" },
  { icon: Award, text: "Nouveau Badge Obtenu !", color: "text-swaap-gold" },
  { icon: Calendar, text: "Événement Spécial Demain : Double Impact !", color: "text-secondary" },
];

const PassMatchBoost = () => {
  return (
    <div className="rounded-lg bg-card p-4 gradient-border relative african-motif-corner african-diamond african-zigzag-top overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-swaap-gold" />
          <h2 className="font-display text-sm font-bold tracking-wide">Pass Match & Boost</h2>
        </div>
        <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Acheter +
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-md bg-muted/50 p-3 text-center">
          <Zap className="mx-auto mb-1 h-5 w-5 text-primary" />
          <p className="text-xs text-muted-foreground">Pass Match</p>
          <p className="font-display text-sm font-bold">15</p>
        </div>
        <div className="flex-1 rounded-md bg-muted/50 p-3 text-center">
          <Sparkles className="mx-auto mb-1 h-5 w-5 text-secondary" />
          <p className="text-xs text-muted-foreground">Boost x2</p>
          <p className="font-display text-sm font-bold">02</p>
        </div>
        <div className="flex-1 rounded-md bg-muted/50 p-3 text-center">
          <Coins className="mx-auto mb-1 h-5 w-5 text-swaap-gold" />
          <p className="text-xs text-muted-foreground">Crédits</p>
          <p className="font-display text-sm font-bold">450</p>
        </div>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.text}
            className="flex items-center gap-2.5 rounded-md bg-muted/50 px-3 py-2 hover:bg-muted transition-colors"
          >
            <alert.icon className={`h-4 w-4 flex-shrink-0 ${alert.color}`} />
            <span className="text-sm flex-1">{alert.text}</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassMatchBoost;
