import { AlertTriangle } from "lucide-react";

const NotificationBanner = () => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 border border-primary/30 p-3 flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-swaap-gold flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold">
          Alertes Pic d'Activité
        </p>
        <p className="text-xs text-muted-foreground">
          Week-end <span className="text-primary font-semibold">Double Impact</span> ! Points doublés ce samedi et dimanche.
        </p>
      </div>
    </div>
  );
};

export default NotificationBanner;
