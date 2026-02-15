import { MapPin, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

const GeoAlert = ({ onRetry }: { onRetry?: () => void }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="mx-4 mt-2 rounded-lg border border-primary/30 bg-primary/5 p-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
          <AlertTriangle className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xs font-bold text-foreground mb-1">
            Position requise
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ta localisation est nécessaire pour t'assigner à ton Empire et accéder aux ressources de ta zone. Active la géolocalisation pour une expérience complète.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                onRetry?.();
                window.location.reload();
              }}
              className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <MapPin className="h-3 w-3" />
              Activer la position
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
            >
              Plus tard
            </button>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default GeoAlert;
