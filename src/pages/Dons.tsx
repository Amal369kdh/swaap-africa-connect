import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Heart, AlertTriangle, Home, BookOpen, ChevronRight, Plus, MessageCircle } from "lucide-react";

const needs = [
  { icon: AlertTriangle, label: "Nourriture pour Abidjan", author: "ONG SolidAfrik", urgent: true, likes: 24 },
  { icon: Home, label: "Recherche lits pour enfants", author: "Association Foyer", urgent: false, likes: 12 },
  { icon: BookOpen, label: "Fournitures scolaires demandées", author: "École Cocody", urgent: false, likes: 38 },
  { icon: Heart, label: "Vêtements bébé 0-6 mois", author: "Marie K.", urgent: true, likes: 15 },
];

const Dons = () => {
  return (
    <div className="min-h-screen bg-background african-pattern-bg pb-20 md:pb-6">
      <Header />
      <main className="container px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="text-center animate-fade-in">
          <Heart className="mx-auto h-10 w-10 text-primary mb-2" />
          <h1 className="font-display text-2xl font-bold text-gradient-swaap">Dons & Solidarité</h1>
          <p className="text-sm text-muted-foreground mt-1">Publiez un besoin ou proposez un don</p>
        </section>

        {/* Action buttons */}
        <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            Publier un Besoin
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-medium hover:bg-muted transition-colors">
            <Heart className="h-4 w-4" />
            Proposer un Don
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
          <div className="flex-1 rounded-lg bg-card p-3 gradient-border text-center">
            <p className="font-display text-lg font-bold text-primary">127</p>
            <p className="text-xs text-muted-foreground">Dons ce mois</p>
          </div>
          <div className="flex-1 rounded-lg bg-card p-3 gradient-border text-center">
            <p className="font-display text-lg font-bold text-secondary">43</p>
            <p className="text-xs text-muted-foreground">Besoins actifs</p>
          </div>
          <div className="flex-1 rounded-lg bg-card p-3 gradient-border text-center">
            <p className="font-display text-lg font-bold text-swaap-gold">89%</p>
            <p className="text-xs text-muted-foreground">Satisfaction</p>
          </div>
        </div>

        {/* Needs list */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.35s", opacity: 0 }}>
          <h2 className="font-display text-sm font-bold tracking-wide">Besoins Communautaires</h2>
          {needs.map((need) => (
            <div
              key={need.label}
              className="rounded-lg bg-card p-3 gradient-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  need.urgent ? "bg-primary/15" : "bg-muted"
                }`}>
                  <need.icon className={`h-4 w-4 ${need.urgent ? "text-swaap-gold" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {need.urgent && <span className="text-primary font-semibold">Urgent : </span>}
                    {need.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{need.author}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
              </div>
              <div className="flex items-center gap-4 mt-2 ml-12 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Heart className="h-3 w-3" /> {need.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageCircle className="h-3 w-3" /> Répondre
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* V2 locked */}
        <div className="rounded-lg bg-card/50 p-4 border border-border/30 opacity-40 pointer-events-none">
          <p className="text-xs text-muted-foreground text-center font-medium">
            🔒 Phase 2 — IA modération, résumé automatique, interactions avancées
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Dons;
