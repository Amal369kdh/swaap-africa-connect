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

// Dons impact data
const donsImpact = [
  { label: "Livres scolaires", count: 342, icon: "📚", city: "Abidjan" },
  { label: "Repas offerts", count: 128, icon: "🍲", city: "Dakar" },
  { label: "Vêtements donnés", count: 567, icon: "👕", city: "Bamako" },
];

const previewItems = [
  { type: "troc", label: "iPhone 12 contre Samsung A54", city: "Abidjan", time: "5 min", mask: 0 },
  { type: "troc", label: "Vélo VTT contre tablette", city: "Dakar", time: "12 min", mask: 1 },
  { type: "don", label: "Livres scolaires (lot de 15)", city: "Bamako", time: "20 min", mask: 2 },
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

  // Animated counters
  const members = useAnimatedCounter(1247);
  const trocs = useAnimatedCounter(3892);
  const dons = useAnimatedCounter(1156);

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

      <main className="container px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* ===== HERO — compact ===== */}
        <section className="text-center space-y-3 animate-fade-in pt-2">
          <AnimatedLogo phase={phase} isAdmin={isAdmin} />
          <h1 className="font-display text-xl md:text-2xl font-bold text-gradient-swaap leading-tight">
            La flamme africaine du partage
          </h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Échange, donne, progresse. Rejoins la communauté qui construit l'avenir ensemble.
          </p>
        </section>

        {/* ===== LIGUE DES NATIONS — juste après le hero ===== */}
        <section className="rounded-xl bg-card border border-primary/20 p-4 animate-fade-in relative african-motif-corner african-zigzag-top overflow-hidden" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-swaap-gold" />
              <div>
                <h2 className="font-display text-sm font-bold tracking-wide">Ligue des Nations</h2>
                <p className="text-[10px] text-muted-foreground">Classement en direct · Saison 1</p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary animate-pulse-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              LIVE
            </div>
          </div>

          <div className="space-y-1.5 mb-3">
            {ligueCountries.map((country) => (
              <div
                key={country.name}
                className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                  country.rank === 1
                    ? "bg-swaap-gold/10 border border-swaap-gold/20"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`font-display text-xs font-bold w-4 text-center ${
                    country.rank === 1 ? "text-swaap-gold" : country.rank <= 3 ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {country.rank}
                  </span>
                  <span className="text-base">{country.flag}</span>
                  <span className="text-xs font-medium">{country.name}</span>
                  {country.rank === 1 && <Crown className="h-3 w-3 text-swaap-gold" />}
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-primary" />
                  <span className="font-display text-xs font-bold text-primary">
                    {country.score.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
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

        {/* ===== DONS & IMPACT — juste après la Ligue ===== */}
        <section className="rounded-xl bg-card border border-secondary/20 p-4 animate-fade-in relative african-motif-corner overflow-hidden" style={{ animationDelay: "0.25s", opacity: 0 }}>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-secondary" />
            <div>
              <h2 className="font-display text-sm font-bold tracking-wide">Impact réel</h2>
              <p className="text-[10px] text-muted-foreground">Chaque échange finance un impact concret</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {donsImpact.map((don) => (
              <div key={don.label} className="rounded-lg bg-secondary/5 border border-secondary/10 p-2.5 text-center">
                <span className="text-xl">{don.icon}</span>
                <p className="font-display text-base font-bold text-foreground mt-0.5">{don.count}</p>
                <p className="text-[9px] text-muted-foreground leading-tight">{don.label}</p>
                <p className="text-[8px] text-secondary">{don.city}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-secondary/5 border border-secondary/15 p-2.5 text-center">
            <p className="text-xs text-secondary font-semibold">« Quand tu échanges, tu aides. »</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Une partie de chaque transaction est convertie en dons.
            </p>
          </div>
        </section>

        {/* ===== Stats animées + Teaser cadeaux — side by side feel ===== */}
        <div className="grid grid-cols-3 gap-2 animate-fade-in" style={{ animationDelay: "0.35s", opacity: 0 }}>
          {[
            { icon: Users, label: "Membres", value: members.count, ref: members.ref },
            { icon: Repeat, label: "Trocs", value: trocs.count, ref: trocs.ref },
            { icon: Heart, label: "Dons", value: dons.count, ref: dons.ref },
          ].map((stat) => (
            <div key={stat.label} ref={stat.ref} className="rounded-lg bg-card border border-border p-2.5 text-center group hover:border-primary/30 transition-colors">
              <stat.icon className="h-4 w-4 text-primary mx-auto mb-0.5 group-hover:scale-110 transition-transform" />
              <p className="font-display text-base font-bold text-foreground">
                {stat.value.toLocaleString()}
              </p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ===== Teaser cadeaux — subtil ===== */}
        <section className="rounded-lg bg-gradient-to-r from-swaap-gold/5 via-primary/5 to-secondary/5 border border-swaap-gold/15 p-3 animate-fade-in flex items-center gap-3" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-swaap-gold/10 flex-shrink-0">
            <Gift className="h-4 w-4 text-swaap-gold" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold flex items-center gap-1">
              Des surprises arrivent...
              <Sparkles className="h-3 w-3 text-swaap-gold" />
            </p>
            <p className="text-[10px] text-muted-foreground">
              Plus tu es actif, plus tu gagnes de récompenses.
            </p>
          </div>
        </section>

        {/* ===== Activité live ===== */}
        <section className="rounded-lg bg-card border border-border p-4 animate-fade-in" style={{ animationDelay: "0.45s", opacity: 0 }}>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="font-display text-xs font-bold tracking-wide flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-primary" />
              Activité en cours
            </h2>
            <span className="text-[9px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">Aperçu</span>
          </div>
          <div className="space-y-1.5">
            {previewItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 rounded-md bg-muted/30 px-2.5 py-2 hover:bg-muted/50 transition-colors"
              >
                <MaskAvatar mask={MASK_GRADES[item.mask]} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{item.label}</p>
                  <p className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="h-2.5 w-2.5" />
                    {item.city} · {item.time}
                  </p>
                </div>
                <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.type === "troc" ? "bg-primary/15" : "bg-secondary/15"
                }`}>
                  {item.type === "troc" ? (
                    <Repeat className="h-2.5 w-2.5 text-primary" />
                  ) : (
                    <Heart className="h-2.5 w-2.5 text-secondary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Masques — aperçu rapide ===== */}
        <section className="rounded-lg bg-card border border-border p-4 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <h2 className="font-display text-xs font-bold tracking-wide mb-3 text-center">
            Grades & Masques
          </h2>
          <div className="flex justify-center gap-6">
            {MASK_GRADES.map((mask) => (
              <MaskAvatar key={mask.id} mask={mask} size="lg" showLabel />
            ))}
          </div>
        </section>

        {/* ===== CTA final — émotionnel ===== */}
        <section className="text-center py-4 animate-fade-in" style={{ animationDelay: "0.55s", opacity: 0 }}>
          <p className="text-xs text-muted-foreground mb-1">🔥 La flamme grandit avec chaque nouveau membre</p>
          <p className="font-display text-sm font-semibold text-foreground mb-4">
            Rejoins {members.count.toLocaleString()} membres qui changent les choses
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-swaap-gold px-8 py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity glow-orange shadow-lg"
          >
            <Flame className="h-4 w-4" />
            Commencer maintenant
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Landing;
