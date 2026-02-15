import { Flame, ArrowRight, Repeat, Heart, Users, TrendingUp, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import swaapLogo from "@/assets/swaap-logo.jpeg";

const empires = [
  { name: "Empire du Mali", lit: true },
  { name: "Empire Songhaï", lit: true },
  { name: "Royaume Ashanti", lit: false },
  { name: "Empire du Ghana", lit: false },
  { name: "Royaume du Kongo", lit: false },
];

const previewItems = [
  { type: "troc", label: "iPhone 12 contre Samsung A54", city: "Abidjan", time: "Il y a 5 min" },
  { type: "troc", label: "Vélo VTT contre tablette", city: "Dakar", time: "Il y a 12 min" },
  { type: "don", label: "Livres scolaires (lot de 15)", city: "Bamako", time: "Il y a 20 min" },
];

const Landing = () => {
  const { isConnected } = useUser();
  const navigate = useNavigate();

  // If already connected, redirect to dashboard
  if (isConnected) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background african-pattern-bg">
      {/* Header minimal */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src={swaapLogo} alt="Swaap" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-display text-sm font-bold text-gradient-swaap">SWAAP</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/forfaits"
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              S'inscrire
            </Link>
            <Link
              to="/forfaits"
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 space-y-8">
        {/* Hero with collective flame */}
        <section className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center glow-orange">
            <Flame className="h-12 w-12 text-primary animate-pulse-glow" />
          </div>
          <h1 className="font-display text-xl md:text-3xl font-bold text-gradient-swaap leading-tight">
            La flamme africaine
            <br />
            du partage
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Échange, donne, progresse. Rejoins la communauté qui construit l'avenir ensemble.
          </p>
          <Link
            to="/forfaits"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors glow-orange"
          >
            Rejoindre la communauté
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Live stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {[
            { icon: Users, label: "Membres actifs", value: "1 247" },
            { icon: Repeat, label: "Trocs réalisés", value: "3 892" },
            { icon: Heart, label: "Dons collectés", value: "1 156" },
            { icon: TrendingUp, label: "Score collectif", value: "42 500" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-card border border-border p-3 text-center">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Empires (partially lit) */}
        <section className="rounded-lg bg-card border border-border p-4 animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <h2 className="font-display text-sm font-bold tracking-wide mb-3 text-center">
            Empires Historiques
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            {empires.map((empire) => (
              <div
                key={empire.name}
                className={`rounded-md px-3 py-2 text-xs font-medium text-center transition-all ${
                  empire.lit
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-muted/30 text-muted-foreground/40 border border-border/30"
                }`}
              >
                {empire.name}
                {empire.lit && <Flame className="h-3 w-3 inline ml-1" />}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-3">
            Les empires s'illuminent avec la progression collective de la communauté
          </p>
        </section>

        {/* Preview of trocs/dons (read-only) */}
        <section className="rounded-lg bg-card border border-border p-4 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-sm font-bold tracking-wide flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              Activité en cours
            </h2>
            <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">
              Aperçu
            </span>
          </div>
          <div className="space-y-2">
            {previewItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2.5"
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.type === "troc" ? "bg-primary/15" : "bg-secondary/15"
                }`}>
                  {item.type === "troc" ? (
                    <Repeat className="h-4 w-4 text-primary" />
                  ) : (
                    <Heart className="h-4 w-4 text-secondary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.city} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <Link
              to="/forfaits"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Inscris-toi pour participer
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* CTA bottom */}
        <section className="text-center py-6 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <p className="text-sm text-muted-foreground mb-3">Prêt à rejoindre le mouvement ?</p>
          <Link
            to="/forfaits"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-swaap-gold to-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity glow-orange"
          >
            Voir les forfaits
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Landing;
