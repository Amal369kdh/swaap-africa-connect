import { useEffect, useState, useRef } from "react";
import { Flame, ArrowRight, Repeat, Heart, Users, TrendingUp, Eye, MapPin, Sparkles, Trophy, Gift, Crown, Star } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { usePlatform } from "@/contexts/PlatformContext";
import { MASK_GRADES } from "@/lib/masks";
import MaskAvatar from "@/components/MaskAvatar";
import AnimatedLogo from "@/components/AnimatedLogo";
import swaapLogo from "@/assets/swaap-logo.jpeg";

// Ligue preview data
const ligueCountries = [
  { name: "Côte d'Ivoire", flag: "🇨🇮", score: 10452, rank: 1 },
  { name: "Sénégal", flag: "🇸🇳", score: 8890, rank: 2 },
  { name: "Mali", flag: "🇲🇱", score: 7525, rank: 3 },
  { name: "Cameroun", flag: "🇨🇲", score: 6210, rank: 4 },
  { name: "Guinée", flag: "🇬🇳", score: 4880, rank: 5 },
];

const empires = [
  { name: "Empire du Mali", flag: "🇲🇱", lit: true, score: 10452, color: "from-primary to-swaap-gold" },
  { name: "Empire Songhaï", flag: "🇳🇪", lit: true, score: 8890, color: "from-secondary to-primary" },
  { name: "Royaume Ashanti", flag: "🇬🇭", lit: false, score: 0, color: "" },
  { name: "Empire du Ghana", flag: "🇬🇭", lit: false, score: 0, color: "" },
  { name: "Royaume du Kongo", flag: "🇨🇬", lit: false, score: 0, color: "" },
];

// Dons impact data
const donsImpact = [
  { label: "Livres scolaires distribués", count: 342, icon: "📚", city: "Abidjan" },
  { label: "Repas offerts", count: 128, icon: "🍲", city: "Dakar" },
  { label: "Vêtements donnés", count: 567, icon: "👕", city: "Bamako" },
];

const previewItems = [
  { type: "troc", label: "iPhone 12 contre Samsung A54", city: "Abidjan", time: "Il y a 5 min", mask: 0 },
  { type: "troc", label: "Vélo VTT contre tablette", city: "Dakar", time: "Il y a 12 min", mask: 1 },
  { type: "don", label: "Livres scolaires (lot de 15)", city: "Bamako", time: "Il y a 20 min", mask: 2 },
];

// Animated counter hook
const useAnimatedCounter = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const Landing = () => {
  const { isConnected, loading } = useUser();
  const { phase, isAdmin } = usePlatform();
  const [selectedEmpire, setSelectedEmpire] = useState<number | null>(null);

  // Animated counters
  const members = useAnimatedCounter(1247);
  const trocs = useAnimatedCounter(3892);
  const dons = useAnimatedCounter(1156);
  const score = useAnimatedCounter(42500);


  if (!loading && isConnected) {
    return <Navigate to="/dashboard" replace />;
  }


  return (
    <div className="min-h-screen bg-background african-pattern-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src={swaapLogo} alt="Swaap" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-display text-sm font-bold text-gradient-swaap">SWAAP</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              S'inscrire
            </Link>
            <Link
              to="/auth"
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 space-y-8">
        {/* Hero with animated logo */}
        <section className="text-center space-y-4 animate-fade-in">
          <AnimatedLogo phase={phase} isAdmin={isAdmin} />
          <h1 className="font-display text-xl md:text-3xl font-bold text-gradient-swaap leading-tight">
            La flamme africaine
            <br />
            du partage
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Échange, donne, progresse. Rejoins la communauté qui construit l'avenir ensemble.
          </p>
          <p className="text-[10px] text-muted-foreground/60 animate-pulse-glow">
            🔥 La flamme grandit avec chaque nouveau membre
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors glow-orange"
          >
            Rejoindre la communauté
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        {/* ===== LIGUE DES NATIONS — Section vedette ===== */}
        <section className="rounded-xl bg-card border border-primary/20 p-5 animate-fade-in relative african-motif-corner african-zigzag-top overflow-hidden" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-swaap-gold" />
              <div>
                <h2 className="font-display text-base font-bold tracking-wide">Ligue des Nations</h2>
                <p className="text-[10px] text-muted-foreground">Classement en direct · Saison 1</p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary animate-pulse-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              EN DIRECT
            </div>
          </div>

          {/* Classement */}
          <div className="space-y-2 mb-4">
            {ligueCountries.map((country) => (
              <div
                key={country.name}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                  country.rank === 1
                    ? "bg-swaap-gold/10 border border-swaap-gold/20"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-display text-sm font-bold w-5 text-center ${
                    country.rank === 1 ? "text-swaap-gold" : country.rank <= 3 ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {country.rank}
                  </span>
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium">{country.name}</span>
                  {country.rank === 1 && <Crown className="h-3.5 w-3.5 text-swaap-gold" />}
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                  <span className="font-display text-sm font-bold text-primary">
                    {country.score.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-[10px] text-muted-foreground">
              🔥 Week-end <span className="text-primary font-semibold">Double Impact</span> — points doublés ce samedi !
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-md bg-primary/15 border border-primary/30 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/25 transition-colors"
            >
              <Trophy className="h-3.5 w-3.5" />
              Représente ton pays
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* ===== DONS & IMPACT — Accroche émotionnelle ===== */}
        <section className="rounded-xl bg-card border border-secondary/20 p-5 animate-fade-in relative african-motif-corner african-cross overflow-hidden" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="h-6 w-6 text-secondary" />
            <h2 className="font-display text-base font-bold tracking-wide">Ton don change des vies</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Chaque échange et chaque don finance un impact réel dans la communauté.
          </p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {donsImpact.map((don) => (
              <div key={don.label} className="rounded-lg bg-secondary/5 border border-secondary/10 p-3 text-center">
                <span className="text-2xl">{don.icon}</span>
                <p className="font-display text-lg font-bold text-foreground mt-1">{don.count}</p>
                <p className="text-[9px] text-muted-foreground leading-tight">{don.label}</p>
                <p className="text-[8px] text-secondary mt-0.5">{don.city}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-secondary/5 border border-secondary/15 p-3 mb-3">
            <p className="text-xs text-center">
              <span className="text-secondary font-semibold">« Quand tu échanges, tu aides. »</span>
              <br />
              <span className="text-[10px] text-muted-foreground">
                Une partie de chaque transaction est convertie en dons pour ceux qui en ont besoin.
              </span>
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-md bg-secondary/15 border border-secondary/30 px-4 py-2 text-xs font-semibold text-secondary hover:bg-secondary/25 transition-colors"
            >
              <Heart className="h-3.5 w-3.5" />
              Participer aux dons
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* ===== Teaser cadeaux — subtil ===== */}
        <section className="rounded-lg bg-gradient-to-r from-swaap-gold/5 via-primary/5 to-secondary/5 border border-swaap-gold/15 p-4 animate-fade-in" style={{ animationDelay: "0.35s", opacity: 0 }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-swaap-gold/10">
              <Gift className="h-5 w-5 text-swaap-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold flex items-center gap-1.5">
                Des surprises arrivent...
                <Sparkles className="h-3.5 w-3.5 text-swaap-gold" />
              </p>
              <p className="text-[10px] text-muted-foreground">
                Plus tu es actif, plus tu as de chances de recevoir des cadeaux de la communauté.
              </p>
            </div>
          </div>
        </section>

        {/* Animated live stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
          {[
            { icon: Users, label: "Membres actifs", value: members.count, ref: members.ref, suffix: "" },
            { icon: Repeat, label: "Trocs réalisés", value: trocs.count, ref: trocs.ref, suffix: "" },
            { icon: Heart, label: "Dons collectés", value: dons.count, ref: dons.ref, suffix: "" },
            { icon: TrendingUp, label: "Score collectif", value: score.count, ref: score.ref, suffix: "" },
          ].map((stat) => (
            <div key={stat.label} ref={stat.ref} className="rounded-lg bg-card border border-border p-3 text-center hover:border-primary/30 transition-colors group">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <p className="font-display text-lg font-bold text-foreground">
                {stat.value.toLocaleString()}{stat.suffix}
              </p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Interactive empires */}
        <section className="rounded-lg bg-card border border-border p-4 animate-fade-in" style={{ animationDelay: "0.45s", opacity: 0 }}>
          <h2 className="font-display text-sm font-bold tracking-wide mb-1 text-center">
            Empires Historiques
          </h2>
          <p className="text-[10px] text-muted-foreground text-center mb-4">
            Touche un empire pour voir sa progression
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {empires.map((empire, i) => (
              <button
                key={empire.name}
                onClick={() => setSelectedEmpire(selectedEmpire === i ? null : i)}
                className={`rounded-lg px-3 py-2 text-xs font-medium text-center transition-all duration-300 border ${
                  empire.lit
                    ? selectedEmpire === i
                      ? "bg-primary/25 text-primary border-primary/50 scale-105 glow-orange"
                      : "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                    : "bg-muted/20 text-muted-foreground/40 border-border/30 cursor-default"
                }`}
              >
                <span className="text-base mr-1">{empire.flag}</span>
                {empire.name}
                {empire.lit && <Flame className="h-3 w-3 inline ml-1" />}
              </button>
            ))}
          </div>

          {selectedEmpire !== null && empires[selectedEmpire].lit && (
            <div className="mt-4 rounded-lg bg-muted/30 p-4 animate-fade-in border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{empires[selectedEmpire].flag}</span>
                  <div>
                    <p className="font-display text-xs font-bold">{empires[selectedEmpire].name}</p>
                    <p className="text-[10px] text-muted-foreground">Empire actif</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-sm font-bold text-primary">{empires[selectedEmpire].score.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">points</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${empires[selectedEmpire].color} transition-all duration-1000`}
                  style={{ width: `${Math.min(100, (empires[selectedEmpire].score / 12000) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Prochain niveau : 12 000 points
              </p>
            </div>
          )}
        </section>

        {/* Mask grades preview */}
        <section className="rounded-lg bg-card border border-border p-4 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <h2 className="font-display text-sm font-bold tracking-wide mb-1 text-center">
            Grades & Masques
          </h2>
          <p className="text-[10px] text-muted-foreground text-center mb-4">
            Débloque des masques historiques selon ton niveau
          </p>
          <div className="flex justify-center gap-6">
            {MASK_GRADES.map((mask) => (
              <MaskAvatar key={mask.id} mask={mask} size="lg" showLabel />
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {["Gratuit", "Standard", "Premium"].map((label, i) => (
              <span key={label} className={`text-[9px] rounded-full px-2 py-0.5 ${
                i === 0 ? "bg-muted text-muted-foreground"
                : i === 1 ? "bg-primary/10 text-primary"
                : "bg-swaap-gold/10 text-swaap-gold"
              }`}>
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* Preview activity */}
        <section className="rounded-lg bg-card border border-border p-4 animate-fade-in" style={{ animationDelay: "0.55s", opacity: 0 }}>
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
                className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2.5 hover:bg-muted/50 transition-colors"
              >
                <MaskAvatar mask={MASK_GRADES[item.mask]} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />
                    {item.city} · {item.time}
                  </p>
                </div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.type === "troc" ? "bg-primary/15" : "bg-secondary/15"
                }`}>
                  {item.type === "troc" ? (
                    <Repeat className="h-3 w-3 text-primary" />
                  ) : (
                    <Heart className="h-3 w-3 text-secondary" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Inscris-toi pour participer
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>

        {/* CTA bottom */}
        <section className="text-center py-6 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
          <p className="text-sm text-muted-foreground mb-3">Prêt à rejoindre le mouvement ?</p>
          <Link
            to="/auth"
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
