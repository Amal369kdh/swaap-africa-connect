import { Heart, ChevronRight, AlertTriangle, Home, BookOpen } from "lucide-react";

const needs = [
  { icon: AlertTriangle, label: "Nourriture pour Abidjan", urgent: true },
  { icon: Home, label: "Recherche lits pour enfants", urgent: false },
  { icon: BookOpen, label: "Fournitures scolaires demandées", urgent: false },
];

const DonsSolidarite = () => {
  return (
    <div className="rounded-lg bg-card p-4 gradient-border">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-primary" />
        <h2 className="font-display text-sm font-bold tracking-wide">Dons & Solidarité</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="flex-1 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Publier un Besoin
        </button>
        <button className="flex-1 rounded-md border border-border py-2 text-sm font-medium hover:bg-muted transition-colors">
          Proposer un Don
        </button>
      </div>

      <div className="space-y-2.5">
        {needs.map((need) => (
          <div
            key={need.label}
            className="flex items-center gap-2.5 rounded-md bg-muted/50 px-3 py-2.5 hover:bg-muted transition-colors"
          >
            <need.icon
              className={`h-4 w-4 flex-shrink-0 ${need.urgent ? "text-swaap-gold" : "text-muted-foreground"}`}
            />
            <span className="text-sm flex-1">
              {need.urgent && <span className="font-semibold text-primary">Urgent : </span>}
              {need.label}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-secondary/20 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary/30">
        Voir +
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default DonsSolidarite;
