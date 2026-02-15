import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Shield, Star, Award, Crown, Zap, Coins, Settings, ChevronRight } from "lucide-react";
import swaapLogo from "@/assets/swaap-logo.jpeg";

const badges = [
  { icon: Shield, label: "Débutant", unlocked: true },
  { icon: Star, label: "Échangeur", unlocked: true },
  { icon: Award, label: "Élite", unlocked: true },
  { icon: Crown, label: "Légende", unlocked: false },
];

const stats = [
  { label: "Trocs réussis", value: "23" },
  { label: "Dons validés", value: "8" },
  { label: "Score personnel", value: "2 450" },
  { label: "Rang national", value: "#142" },
];

const menuItems = [
  { label: "Mes Annonces", icon: ChevronRight },
  { label: "Historique Crédits", icon: ChevronRight },
  { label: "Sécurité & Vérification", icon: ChevronRight },
  { label: "Paramètres", icon: Settings },
];

const Profil = () => {
  return (
    <div className="min-h-screen bg-background african-pattern-bg pb-20 md:pb-6">
      <Header />
      <main className="container px-4 py-6 space-y-6">
        {/* Profile header */}
        <section className="text-center animate-fade-in">
          <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
            <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-gradient-swaap">S</span>
            </div>
          </div>
          <h1 className="font-display text-xl font-bold">Samba Diallo</h1>
          <p className="text-sm text-muted-foreground">Abidjan, Côte d'Ivoire 🇨🇮</p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            <Award className="h-3.5 w-3.5" />
            Élite Troqueur · Niv. 12
          </div>
        </section>

        {/* XP Progress */}
        <div className="rounded-lg bg-card p-4 gradient-border animate-fade-in" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Niv. 12</span>
            <span>Niv. 13</span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: "65%" }} />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground text-right">650 / 1 000 XP</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-card p-3 gradient-border text-center">
              <p className="font-display text-lg font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Badges & Pass */}
        <div className="rounded-lg bg-card p-4 gradient-border animate-fade-in" style={{ animationDelay: "0.35s", opacity: 0 }}>
          <h2 className="font-display text-sm font-bold tracking-wide mb-3">Badges & Récompenses</h2>
          <div className="flex justify-center gap-4 mb-4">
            {badges.map((badge) => (
              <div key={badge.label} className={`flex flex-col items-center gap-1 ${badge.unlocked ? "" : "opacity-30"}`}>
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${
                  badge.unlocked
                    ? "bg-gradient-to-br from-primary/20 to-secondary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <badge.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-muted-foreground">{badge.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-muted/50 py-2 text-xs">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">15 Pass</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-1.5 rounded-md bg-muted/50 py-2 text-xs">
              <Coins className="h-3.5 w-3.5 text-swaap-gold" />
              <span className="font-medium">450 Crédits</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="rounded-lg bg-card gradient-border overflow-hidden animate-fade-in" style={{ animationDelay: "0.45s", opacity: 0 }}>
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`flex w-full items-center justify-between px-4 py-3.5 text-sm hover:bg-muted transition-colors ${
                i < menuItems.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <span>{item.label}</span>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Profil;
