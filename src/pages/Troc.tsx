import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MapPin, Bike, Gamepad2, ShoppingBag, Shirt, BookOpen, ChevronRight, Filter, Search } from "lucide-react";

const items = [
  { icon: Bike, label: "Vélo urbain", owner: "Amadou K.", distance: "1.2 km", badge: "Échangeur" },
  { icon: Gamepad2, label: "PS4 + 2 manettes", owner: "Fatou S.", distance: "2.5 km", badge: "Débutant" },
  { icon: ShoppingBag, label: "Sac à main cuir", owner: "Marie L.", distance: "0.8 km", badge: "Élite" },
  { icon: Shirt, label: "Lot vêtements enfant", owner: "Ibrahim D.", distance: "3.1 km", badge: "Échangeur" },
  { icon: BookOpen, label: "Manuels scolaires CM2", owner: "Awa T.", distance: "1.8 km", badge: "Débutant" },
];

const Troc = () => {
  return (
    <div className="min-h-screen bg-background african-pattern-bg pb-20 md:pb-6">
      <Header />
      <main className="container px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="text-center animate-fade-in">
          <MapPin className="mx-auto h-10 w-10 text-primary mb-2" />
          <h1 className="font-display text-2xl font-bold text-gradient-swaap">Troc Local</h1>
          <p className="text-sm text-muted-foreground mt-1">Échangez en toute confiance près de chez vous</p>
        </section>

        {/* Search & Filter */}
        <div className="flex gap-2 animate-fade-in" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <div className="flex-1 flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un objet..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
            />
          </div>
          <button className="rounded-lg bg-card border border-border px-3 py-2.5 hover:bg-muted transition-colors">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Radar visual */}
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center animate-fade-in" style={{ animationDelay: "0.25s", opacity: 0 }}>
          <div className="absolute h-32 w-32 rounded-full border border-primary/10" />
          <div className="absolute h-20 w-20 rounded-full border border-primary/20" />
          <div className="absolute h-10 w-10 rounded-full border border-primary/30" />
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
          <div className="absolute bottom-0 rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
            Zone de Confiance
          </div>
        </div>

        {/* Items list */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.35s", opacity: 0 }}>
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg bg-card p-3 gradient-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.label}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.owner}</span>
                  <span>·</span>
                  <span className="text-primary">{item.badge}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                <MapPin className="h-3 w-3" />
                {item.distance}
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Publier une Annonce
        </button>

        {/* V2/V3 locked */}
        <div className="rounded-lg bg-card/50 p-4 border border-border/30 opacity-40 pointer-events-none">
          <p className="text-xs text-muted-foreground text-center font-medium">
            🔒 Phase 3 — QR Codes, Récepteurs de Confiance, Fly Connect
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Troc;
