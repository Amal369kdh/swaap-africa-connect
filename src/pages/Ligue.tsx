import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Trophy, ChevronRight, TrendingUp, Calendar, Users } from "lucide-react";

const countries = [
  { name: "Côte d'Ivoire", flag: "🇨🇮", score: 10452, trend: "+12%" },
  { name: "Sénégal", flag: "🇸🇳", score: 8890, trend: "+8%" },
  { name: "Mali", flag: "🇲🇱", score: 7525, trend: "+5%" },
  { name: "Guinée", flag: "🇬🇳", score: 5210, trend: "+3%" },
  { name: "Burkina Faso", flag: "🇧🇫", score: 4180, trend: "+2%" },
  { name: "Togo", flag: "🇹🇬", score: 3020, trend: "+1%" },
];

const Ligue = () => {
  return (
    <div className="min-h-screen bg-background african-pattern-bg pb-20 md:pb-6">
      <Header />
      <main className="container px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="text-center animate-fade-in">
          <Trophy className="mx-auto h-10 w-10 text-swaap-gold mb-2" />
          <h1 className="font-display text-2xl font-bold text-gradient-swaap">Ligue des Nations</h1>
          <p className="text-sm text-muted-foreground mt-1">Score = (Transactions + Dons) / Utilisateurs actifs</p>
        </section>

        {/* Season info */}
        <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <div className="flex-1 rounded-lg bg-card p-3 gradient-border text-center">
            <Calendar className="mx-auto h-5 w-5 text-primary mb-1" />
            <p className="text-xs text-muted-foreground">Saison en cours</p>
            <p className="font-display text-sm font-bold">Saison 1</p>
          </div>
          <div className="flex-1 rounded-lg bg-card p-3 gradient-border text-center">
            <Users className="mx-auto h-5 w-5 text-secondary mb-1" />
            <p className="text-xs text-muted-foreground">Participants</p>
            <p className="font-display text-sm font-bold">1 247</p>
          </div>
          <div className="flex-1 rounded-lg bg-card p-3 gradient-border text-center">
            <TrendingUp className="mx-auto h-5 w-5 text-swaap-gold mb-1" />
            <p className="text-xs text-muted-foreground">Prochaine remise</p>
            <p className="font-display text-sm font-bold">45j</p>
          </div>
        </div>

        {/* Notification Double Impact */}
        <div className="rounded-lg bg-primary/10 border border-primary/30 p-3 flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
          <span className="text-lg">🔥</span>
          <div>
            <p className="text-sm font-semibold">Week-end Double Impact</p>
            <p className="text-xs text-muted-foreground">Points doublés ce samedi et dimanche !</p>
          </div>
        </div>

        {/* Rankings */}
        <div className="rounded-lg bg-card p-4 gradient-border space-y-3 animate-fade-in" style={{ animationDelay: "0.35s", opacity: 0 }}>
          <h2 className="font-display text-sm font-bold tracking-wide mb-3">Classement National</h2>
          {countries.map((country, i) => (
            <div
              key={country.name}
              className={`flex items-center justify-between rounded-md px-3 py-3 transition-colors hover:bg-muted ${
                i === 0 ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-display text-sm font-bold w-6 text-center ${
                  i === 0 ? "text-swaap-gold" : i === 1 ? "text-muted-foreground" : "text-muted-foreground/60"
                }`}>
                  {i + 1}
                </span>
                <span className="text-xl">{country.flag}</span>
                <div>
                  <span className="text-sm font-medium">{country.name}</span>
                  <span className="ml-2 text-[10px] text-secondary">{country.trend}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className={`h-3.5 w-3.5 ${i === 0 ? "text-swaap-gold" : "text-muted-foreground"}`} />
                <span className="font-display text-sm font-bold text-primary">
                  {country.score.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* V2/V3 features grayed out */}
        <div className="rounded-lg bg-card/50 p-4 border border-border/30 opacity-40 pointer-events-none animate-fade-in" style={{ animationDelay: "0.45s", opacity: 0 }}>
          <p className="text-xs text-muted-foreground text-center font-medium">
            🔒 Phase 2 — Badges culturels, pics d'activité avancés, campagnes sociales
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Ligue;
