import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { getMaskForPlan } from "@/lib/masks";
import MaskAvatar from "@/components/MaskAvatar";
import { MapPin, Plus, Search, Filter, ChevronRight, X, Repeat, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  { value: "electronique", label: "Électronique" },
  { value: "vetements", label: "Vêtements" },
  { value: "livres", label: "Livres" },
  { value: "sport", label: "Sport" },
  { value: "maison", label: "Maison" },
  { value: "autre", label: "Autre" },
];

interface Annonce {
  id: string;
  title: string;
  description: string;
  category: string;
  exchange_for: string;
  city: string;
  status: string;
  created_at: string;
  user_id: string;
  profiles?: { display_name: string; plan: string } | null;
}

const Troc = () => {
  const { user, plan } = useUser();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("autre");
  const [exchangeFor, setExchangeFor] = useState("");
  const [city, setCity] = useState("");

  const fetchAnnonces = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("annonces")
      .select("*, profiles!annonces_user_id_fkey(display_name, plan)")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching annonces:", error);
    } else {
      setAnnonces((data as any[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (plan === "gratuit") {
      toast({ title: "Accès limité", description: "Passe au forfait Standard pour publier des annonces.", variant: "destructive" });
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();
    const trimmedExchange = exchangeFor.trim();
    const trimmedCity = city.trim();

    if (!trimmedTitle || !trimmedExchange || !trimmedCity) {
      toast({ title: "Champs requis", description: "Remplis tous les champs obligatoires.", variant: "destructive" });
      return;
    }
    if (trimmedTitle.length > 100 || trimmedDesc.length > 500 || trimmedExchange.length > 100 || trimmedCity.length > 50) {
      toast({ title: "Texte trop long", description: "Vérifie la longueur des champs.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("annonces").insert({
      user_id: user.id,
      title: trimmedTitle,
      description: trimmedDesc,
      category,
      exchange_for: trimmedExchange,
      city: trimmedCity,
    });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Annonce publiée ! 🎉" });
      setTitle(""); setDescription(""); setCategory("autre"); setExchangeFor(""); setCity("");
      setShowForm(false);
      fetchAnnonces();
    }
    setSubmitting(false);
  };

  const filtered = annonces.filter((a) => {
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.exchange_for.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = !filterCat || a.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background african-pattern-bg pb-20 md:pb-6">
      <Header />
      <main className="container px-4 py-6 space-y-6">
        {/* Hero */}
        <section className="text-center animate-fade-in">
          <Repeat className="mx-auto h-10 w-10 text-primary mb-2" />
          <h1 className="font-display text-2xl font-bold text-gradient-swaap">Troc Local</h1>
          <p className="text-sm text-muted-foreground mt-1">Échangez en toute confiance près de chez vous</p>
        </section>

        {/* Search & Filter */}
        <div className="flex gap-2 animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div className="flex-1 flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un objet..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
              maxLength={100}
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="rounded-lg bg-card border border-border px-3 py-2.5 text-sm text-foreground"
          >
            <option value="">Tous</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Publish button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors animate-fade-in"
          style={{ animationDelay: "0.15s", opacity: 0 }}
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Annuler" : "Publier une Annonce"}
        </button>

        {/* Publish form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-lg bg-card border border-border p-4 space-y-3 animate-fade-in">
            <h2 className="font-display text-sm font-bold">Nouvelle annonce</h2>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Titre *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: iPhone 12 Pro"
                className="w-full rounded-md bg-muted px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="État, détails..."
                className="w-full rounded-md bg-muted px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-20"
                maxLength={500}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md bg-muted px-3 py-2 text-sm outline-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Ville *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Abidjan"
                  className="w-full rounded-md bg-muted px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                  maxLength={50}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">En échange de *</label>
              <input
                type="text"
                value={exchangeFor}
                onChange={(e) => setExchangeFor(e.target.value)}
                placeholder="Ex: Samsung A54 ou équivalent"
                className="w-full rounded-md bg-muted px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                maxLength={100}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-gradient-to-r from-primary to-secondary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 glow-orange"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Publier"}
            </button>
          </form>
        )}

        {/* Annonces list */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
              <p className="text-xs text-muted-foreground mt-2">Chargement...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 rounded-lg bg-card border border-border">
              <Repeat className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Aucune annonce pour le moment</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Sois le premier à publier !</p>
            </div>
          ) : (
            filtered.map((annonce) => {
              const ownerPlan = (annonce.profiles?.plan as any) ?? "gratuit";
              const mask = getMaskForPlan(ownerPlan);
              const catLabel = CATEGORIES.find((c) => c.value === annonce.category)?.label ?? annonce.category;
              const isOwn = annonce.user_id === user?.id;

              return (
                <div
                  key={annonce.id}
                  className={`rounded-lg bg-card p-3 gradient-border hover:bg-muted/50 transition-colors ${isOwn ? "border-l-2 border-l-primary" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <MaskAvatar mask={mask} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{annonce.title}</p>
                      {annonce.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{annonce.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1.5 flex-wrap">
                        <span className="rounded-full bg-muted px-2 py-0.5">{catLabel}</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="h-2.5 w-2.5" />
                          {annonce.city}
                        </span>
                        <span>·</span>
                        <span>{annonce.profiles?.display_name || "Utilisateur"}</span>
                        {isOwn && <span className="text-primary font-semibold">· Toi</span>}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] text-muted-foreground">Échange contre</p>
                      <p className="text-xs font-medium text-primary">{annonce.exchange_for}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Phase 3 locked */}
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
