import { Trophy, ChevronRight } from "lucide-react";
import { MASK_GRADES } from "@/lib/masks";
import MaskAvatar from "@/components/MaskAvatar";

const countries = [
  { name: "Côte d'Ivoire", flag: "🇨🇮", score: 10452, topMask: 2 },
  { name: "Sénégal", flag: "🇸🇳", score: 8890, topMask: 1 },
  { name: "Mali", flag: "🇲🇱", score: 7525, topMask: 0 },
];

const LigueDesNations = () => {
  return (
    <div className="rounded-lg bg-card p-4 gradient-border">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-swaap-gold" />
        <h2 className="font-display text-sm font-bold tracking-wide">Ligue des Nations</h2>
      </div>

      <div className="space-y-3">
        {countries.map((country, i) => (
          <div
            key={country.name}
            className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}.</span>
              <span className="text-lg">{country.flag}</span>
              <span className="text-sm font-medium">{country.name}</span>
              <MaskAvatar mask={MASK_GRADES[country.topMask]} size="sm" />
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-swaap-gold" />
              <span className="text-sm font-bold text-primary">
                {country.score.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-secondary/20 py-2 text-sm font-medium text-secondary transition-colors hover:bg-secondary/30">
        Voir le Classement
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default LigueDesNations;
