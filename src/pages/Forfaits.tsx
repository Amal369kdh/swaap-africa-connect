import { Check, X, Flame, Zap, Crown, Star, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, type UserPlan } from "@/contexts/UserContext";
import BottomNav from "@/components/BottomNav";

interface Feature {
  label: string;
  free: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}

const features: Feature[] = [
  { label: "Voir les trocs & dons", free: true, standard: true, premium: true },
  { label: "Participer aux trocs", free: false, standard: true, premium: true },
  { label: "Publier des annonces", free: false, standard: true, premium: true },
  { label: "Proposer des dons", free: false, standard: true, premium: true },
  { label: "Flamme personnelle", free: false, standard: true, premium: true },
  { label: "Progression & badges", free: false, standard: "Lente", premium: "Accélérée" },
  { label: "Visibilité publications", free: false, standard: "Limitée", premium: "Maximale" },
  { label: "Crédits inclus", free: false, standard: false, premium: "50 crédits" },
  { label: "Boosts disponibles", free: false, standard: "Chers", premium: "Tarif réduit" },
  { label: "Déblocage personnages", free: false, standard: false, premium: true },
  { label: "Sweeps & challenges", free: "Aperçu", standard: true, premium: true },
  { label: "Achat crédits supplémentaires", free: false, standard: false, premium: "Avec limites" },
];

const FeatureValue = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check className="h-4 w-4 text-primary mx-auto" />;
  if (value === false) return <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-primary font-medium">{value}</span>;
};

const Forfaits = () => {
  const { setPlan, isConnected } = useUser();
  const navigate = useNavigate();

  const handleChoose = async (plan: UserPlan) => {
    await setPlan(plan);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background african-pattern-bg pb-20 md:pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center gap-3 px-4">
          <Link to={isConnected ? "/dashboard" : "/"} className="rounded-full bg-muted p-2 hover:bg-muted/80 transition-colors">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="font-display text-sm font-bold tracking-wide">Choisir un Forfait</h1>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2 animate-fade-in">
          <Flame className="h-10 w-10 text-primary mx-auto animate-pulse-glow" />
          <h2 className="font-display text-lg font-bold text-gradient-swaap">
            Rejoins la communauté
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Choisis ton niveau d'accès et commence à échanger, donner et progresser.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {/* Gratuit */}
          <div className="rounded-lg bg-card border border-border p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-display text-sm font-bold">Gratuit</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Découvre Swaap sans engagement</p>
            <div className="mb-5">
              <span className="font-display text-2xl font-bold text-foreground">0</span>
              <span className="text-sm text-muted-foreground ml-1">FCFA</span>
            </div>
            <ul className="space-y-2.5 mb-6 flex-1">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>Voir les trocs & dons</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>Aperçu des sweeps</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Participation impossible</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Pas de progression</span>
              </li>
            </ul>
            <button
              onClick={() => handleChoose("gratuit")}
              className="w-full rounded-md border border-border bg-muted py-2.5 text-sm font-semibold text-foreground hover:bg-muted/80 transition-colors"
            >
              Commencer
            </button>
          </div>

          {/* Standard 600 FCFA */}
          <div className="rounded-lg bg-card p-5 flex flex-col gradient-border relative">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-display text-sm font-bold text-primary">Standard</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Participe et progresse à ton rythme</p>
            <div className="mb-5">
              <span className="font-display text-2xl font-bold text-foreground">600</span>
              <span className="text-sm text-muted-foreground ml-1">FCFA</span>
            </div>
            <ul className="space-y-2.5 mb-6 flex-1">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>Accès complet au dashboard</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>Publier, proposer, participer</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span>Flamme personnelle</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Progression lente</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Boosts plus chers</span>
              </li>
            </ul>
            <button
              onClick={() => handleChoose("standard")}
              className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Choisir Standard
            </button>
          </div>

          {/* Premium 1000 FCFA */}
          <div className="rounded-lg bg-card p-5 flex flex-col relative overflow-hidden border border-swaap-gold/30">
            <div className="absolute top-0 right-0 bg-swaap-gold text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">
              POPULAIRE
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="h-5 w-5 text-swaap-gold" />
              <h3 className="font-display text-sm font-bold text-swaap-gold">Premium</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Accélère ta progression et ton impact</p>
            <div className="mb-5">
              <span className="font-display text-2xl font-bold text-foreground">1 000</span>
              <span className="text-sm text-muted-foreground ml-1">FCFA</span>
            </div>
            <ul className="space-y-2.5 mb-6 flex-1">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-swaap-gold flex-shrink-0" />
                <span>Tout le Standard +</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-swaap-gold flex-shrink-0" />
                <span>50 crédits inclus</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-swaap-gold flex-shrink-0" />
                <span>Boosts à tarif réduit</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-swaap-gold flex-shrink-0" />
                <span>Déblocage personnages</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-3.5 w-3.5 text-swaap-gold flex-shrink-0" />
                <span>Progression accélérée</span>
              </li>
            </ul>
            <button
              onClick={() => handleChoose("premium")}
              className="w-full rounded-md bg-gradient-to-r from-swaap-gold to-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity glow-orange"
            >
              Choisir Premium
            </button>
          </div>
        </div>

        {/* Comparison table */}
        <div className="rounded-lg bg-card border border-border overflow-hidden animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <div className="p-4 border-b border-border">
            <h3 className="font-display text-sm font-bold">Comparaison détaillée</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">Fonctionnalité</th>
                  <th className="text-center p-3 text-muted-foreground font-medium w-20">Gratuit</th>
                  <th className="text-center p-3 text-primary font-medium w-20">600</th>
                  <th className="text-center p-3 text-swaap-gold font-medium w-20">1000</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f.label} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                    <td className="p-3 text-foreground">{f.label}</td>
                    <td className="p-3 text-center"><FeatureValue value={f.free} /></td>
                    <td className="p-3 text-center"><FeatureValue value={f.standard} /></td>
                    <td className="p-3 text-center"><FeatureValue value={f.premium} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Credits explainer */}
        <div className="rounded-lg bg-card border border-border p-4 space-y-3 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <h3 className="font-display text-sm font-bold flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Comment fonctionnent les crédits ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Booster une publication", cost: "5 crédits" },
              { label: "Participer à un sweep", cost: "10 crédits" },
              { label: "Débloquer un personnage", cost: "15-30 crédits" },
              { label: "Accélérer une étape historique", cost: "20 crédits" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                <span className="text-sm">{item.label}</span>
                <span className="text-xs font-semibold text-primary">{item.cost}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            ⚖️ Limites : max 3 boosts/jour, achat crédits plafonné, déblocage personnages limité pour garantir l'équilibre.
          </p>
        </div>
      </main>

      {isConnected && <BottomNav />}
    </div>
  );
};

export default Forfaits;
