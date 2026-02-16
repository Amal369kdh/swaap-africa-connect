import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";
import { usePlatform } from "@/contexts/PlatformContext";
import { getMaskForPlan } from "@/lib/masks";
import MaskAvatar from "@/components/MaskAvatar";
import AdminPhaseManager from "@/components/AdminPhaseManager";
import {
  Users, TrendingUp, Repeat, AlertTriangle, Shield, Trash2,
  Ban, ChevronDown, ChevronUp, BarChart3, Eye, MapPin, Search,
  RefreshCw, Loader2, Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileRow {
  id: string;
  user_id: string;
  display_name: string;
  country: string | null;
  plan: string;
  credits: number;
  xp: number;
  level: number;
  created_at: string;
}

interface AnnonceRow {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  exchange_for: string;
  status: string;
  created_at: string;
  profiles?: { display_name: string; plan: string } | null;
}

type Tab = "kpis" | "users" | "annonces" | "alerts" | "phases";

const Admin = () => {
  const { user } = useUser();
  const { config } = usePlatform();
  const [tab, setTab] = useState<Tab>("kpis");
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [annonces, setAnnonces] = useState<AnnonceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchUsers, setSearchUsers] = useState("");
  const [searchAnnonces, setSearchAnnonces] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const [profRes, annRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("annonces").select("*, profiles!annonces_user_id_fkey(display_name, plan)").order("created_at", { ascending: false }),
    ]);
    setProfiles((profRes.data as ProfileRow[]) ?? []);
    setAnnonces((annRes.data as any[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // KPI calculations
  const totalUsers = profiles.length;
  const premiumUsers = profiles.filter((p) => p.plan === "premium").length;
  const standardUsers = profiles.filter((p) => p.plan === "standard").length;
  const freeUsers = profiles.filter((p) => p.plan === "gratuit").length;
  const totalAnnonces = annonces.length;
  const activeAnnonces = annonces.filter((a) => a.status === "active").length;
  const totalCredits = profiles.reduce((s, p) => s + p.credits, 0);
  const avgLevel = totalUsers ? (profiles.reduce((s, p) => s + p.level, 0) / totalUsers).toFixed(1) : "0";

  // Countries stats
  const countryCounts: Record<string, number> = {};
  profiles.forEach((p) => {
    const c = p.country || "Non défini";
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  });
  const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Fraud alerts
  const suspiciousProfiles = profiles.filter((p) => p.credits > 200 || p.level > 50);

  // KPI threshold alerts
  const kpiAlerts: { label: string; value: number; threshold: number; exceeded: boolean }[] = config ? [
    { label: "Utilisateurs", value: totalUsers, threshold: config.alert_threshold_users, exceeded: totalUsers >= config.alert_threshold_users },
    { label: "Crédits en circ.", value: totalCredits, threshold: config.alert_threshold_credits, exceeded: totalCredits >= config.alert_threshold_credits },
    { label: "Annonces actives", value: activeAnnonces, threshold: config.alert_threshold_annonces, exceeded: activeAnnonces >= config.alert_threshold_annonces },
  ] : [];

  // Filtered data
  const filteredUsers = profiles.filter((p) =>
    !searchUsers || p.display_name.toLowerCase().includes(searchUsers.toLowerCase())
  );
  const filteredAnnonces = annonces.filter((a) =>
    !searchAnnonces || a.title.toLowerCase().includes(searchAnnonces.toLowerCase())
  );

  const handleBanUser = async (userId: string) => {
    // Set plan to gratuit and credits to 0
    await supabase.from("profiles").update({ plan: "gratuit", credits: 0 }).eq("user_id", userId);
    toast({ title: "Utilisateur restreint", description: "Forfait remis à gratuit, crédits à 0." });
    fetchData();
  };

  const handleDeleteAnnonce = async (annonceId: string) => {
    await supabase.from("annonces").delete().eq("id", annonceId);
    toast({ title: "Annonce supprimée" });
    fetchData();
  };

  const handleChangePlan = async (userId: string, newPlan: string) => {
    const credits = newPlan === "premium" ? 50 : 0;
    await supabase.from("profiles").update({ plan: newPlan, credits }).eq("user_id", userId);
    toast({ title: "Forfait modifié", description: `Nouveau forfait : ${newPlan}` });
    fetchData();
  };

  const tabs = [
    { id: "kpis" as Tab, label: "KPIs", icon: BarChart3 },
    { id: "phases" as Tab, label: "Phases", icon: Settings },
    { id: "users" as Tab, label: "Utilisateurs", icon: Users },
    { id: "annonces" as Tab, label: "Annonces", icon: Repeat },
    { id: "alerts" as Tab, label: "Alertes", icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-background african-pattern-bg pb-20 md:pb-6">
      <Header />
      <main className="container px-4 py-6 space-y-6">
        {/* Title */}
        <section className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-display text-xl font-bold text-gradient-swaap">Administration</h1>
              <p className="text-xs text-muted-foreground">Pilotage de la plateforme</p>
            </div>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="rounded-md bg-muted p-2 hover:bg-muted/80 transition-colors"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </button>
        </section>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-muted p-1 animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                tab === t.id ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* KPIs Tab */}
        {tab === "kpis" && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Utilisateurs", value: totalUsers, icon: Users, color: "text-primary" },
                { label: "Annonces actives", value: activeAnnonces, icon: Repeat, color: "text-secondary" },
                { label: "Crédits en circ.", value: totalCredits, icon: TrendingUp, color: "text-swaap-gold" },
                { label: "Niveau moyen", value: avgLevel, icon: BarChart3, color: "text-primary" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-lg bg-card border border-border p-3 text-center">
                  <kpi.icon className={`h-5 w-5 ${kpi.color} mx-auto mb-1`} />
                  <p className="font-display text-lg font-bold text-foreground">{kpi.value}</p>
                  <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Plan distribution */}
            <div className="rounded-lg bg-card border border-border p-4">
              <h3 className="font-display text-sm font-bold mb-3">Répartition forfaits</h3>
              <div className="space-y-2">
                {[
                  { label: "Gratuit", count: freeUsers, color: "bg-muted-foreground" },
                  { label: "Standard", count: standardUsers, color: "bg-primary" },
                  { label: "Premium", count: premiumUsers, color: "bg-swaap-gold" },
                ].map((plan) => (
                  <div key={plan.label} className="flex items-center gap-3">
                    <span className="text-xs w-16">{plan.label}</span>
                    <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${plan.color} transition-all`}
                        style={{ width: `${totalUsers ? (plan.count / totalUsers) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold w-8 text-right">{plan.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top countries */}
            <div className="rounded-lg bg-card border border-border p-4">
              <h3 className="font-display text-sm font-bold mb-3">Top pays</h3>
              {topCountries.length === 0 ? (
                <p className="text-xs text-muted-foreground">Aucune donnée</p>
              ) : (
                <div className="space-y-2">
                  {topCountries.map(([country, count], i) => (
                    <div key={country} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                        <MapPin className="h-3 w-3 text-primary" />
                        {country}
                      </span>
                      <span className="font-semibold text-primary">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phases Tab */}
        {tab === "phases" && <AdminPhaseManager />}

        {/* Users Tab */}
        {tab === "users" && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchUsers}
                onChange={(e) => setSearchUsers(e.target.value)}
                placeholder="Rechercher un utilisateur..."
                className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
                maxLength={100}
              />
            </div>

            <p className="text-xs text-muted-foreground">{filteredUsers.length} utilisateur(s)</p>

            {filteredUsers.map((p) => {
              const mask = getMaskForPlan(p.plan as any);
              return (
                <div key={p.id} className="rounded-lg bg-card border border-border p-3">
                  <div className="flex items-center gap-3">
                    <MaskAvatar mask={mask} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.display_name || "Sans nom"}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className={`rounded-full px-2 py-0.5 ${mask.bgClass} ${mask.color}`}>{p.plan}</span>
                        <span>Niv. {p.level}</span>
                        <span>{p.credits} crédits</span>
                        {p.country && <span>· {p.country}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <select
                        value={p.plan}
                        onChange={(e) => handleChangePlan(p.user_id, e.target.value)}
                        className="rounded bg-muted px-2 py-1 text-[10px] border border-border"
                      >
                        <option value="gratuit">Gratuit</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                      </select>
                      <button
                        onClick={() => handleBanUser(p.user_id)}
                        className="rounded bg-destructive/10 p-1.5 hover:bg-destructive/20 transition-colors"
                        title="Restreindre"
                      >
                        <Ban className="h-3.5 w-3.5 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Annonces Tab */}
        {tab === "annonces" && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchAnnonces}
                onChange={(e) => setSearchAnnonces(e.target.value)}
                placeholder="Rechercher une annonce..."
                className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
                maxLength={100}
              />
            </div>

            <p className="text-xs text-muted-foreground">{filteredAnnonces.length} annonce(s)</p>

            {filteredAnnonces.map((a) => {
              const ownerPlan = (a.profiles?.plan as any) ?? "gratuit";
              const mask = getMaskForPlan(ownerPlan);
              return (
                <div key={a.id} className="rounded-lg bg-card border border-border p-3">
                  <div className="flex items-start gap-3">
                    <MaskAvatar mask={mask} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{a.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{a.description}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
                        <span>{a.profiles?.display_name || "?"}</span>
                        <span>· {a.city}</span>
                        <span>· {a.category}</span>
                        <span className={`rounded-full px-1.5 py-0.5 ${a.status === "active" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {a.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteAnnonce(a.id)}
                      className="rounded bg-destructive/10 p-1.5 hover:bg-destructive/20 transition-colors shrink-0"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Alerts Tab */}
        {tab === "alerts" && (
          <div className="space-y-4 animate-fade-in">
            {/* KPI Threshold Alerts */}
            {kpiAlerts.some((a) => a.exceeded) && (
              <div className="rounded-lg bg-swaap-gold/10 border border-swaap-gold/30 p-4">
                <h3 className="font-display text-sm font-bold mb-2 flex items-center gap-2 text-swaap-gold">
                  <TrendingUp className="h-4 w-4" />
                  Seuils KPI atteints
                </h3>
                <div className="space-y-2">
                  {kpiAlerts.filter((a) => a.exceeded).map((a) => (
                    <div key={a.label} className="flex items-center justify-between text-xs rounded-md bg-swaap-gold/5 p-2 border border-swaap-gold/20">
                      <span className="font-medium">{a.label}</span>
                      <span className="font-display font-bold text-swaap-gold">{a.value} / {a.threshold}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Ajustez les seuils dans l'onglet Phases</p>
              </div>
            )}
            <div className="rounded-lg bg-card border border-border p-4">
              <h3 className="font-display text-sm font-bold mb-1 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-swaap-gold" />
                Détection d'anomalies
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Comptes avec crédits &gt; 200 ou niveau &gt; 50
              </p>

              {suspiciousProfiles.length === 0 ? (
                <div className="text-center py-6">
                  <Shield className="h-8 w-8 text-primary/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Aucune anomalie détectée</p>
                  <p className="text-[10px] text-muted-foreground/60">La plateforme est saine ✓</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {suspiciousProfiles.map((p) => {
                    const mask = getMaskForPlan(p.plan as any);
                    return (
                      <div key={p.id} className="flex items-center gap-3 rounded-md bg-destructive/5 border border-destructive/20 p-2.5">
                        <MaskAvatar mask={mask} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{p.display_name || "Sans nom"}</p>
                          <p className="text-[10px] text-destructive">
                            {p.credits > 200 && `${p.credits} crédits`}
                            {p.credits > 200 && p.level > 50 && " · "}
                            {p.level > 50 && `Niveau ${p.level}`}
                          </p>
                        </div>
                        <button
                          onClick={() => handleBanUser(p.user_id)}
                          className="rounded bg-destructive/10 px-2.5 py-1 text-[10px] font-semibold text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          Restreindre
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Activity summary */}
            <div className="rounded-lg bg-card border border-border p-4">
              <h3 className="font-display text-sm font-bold mb-3">Résumé activité</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center rounded-md bg-muted/50 p-3">
                  <p className="font-display text-lg font-bold text-primary">{totalAnnonces}</p>
                  <p className="text-[10px] text-muted-foreground">Total annonces</p>
                </div>
                <div className="text-center rounded-md bg-muted/50 p-3">
                  <p className="font-display text-lg font-bold text-secondary">{activeAnnonces}</p>
                  <p className="text-[10px] text-muted-foreground">Actives</p>
                </div>
                <div className="text-center rounded-md bg-muted/50 p-3">
                  <p className="font-display text-lg font-bold text-swaap-gold">{premiumUsers}</p>
                  <p className="text-[10px] text-muted-foreground">Utilisateurs Premium</p>
                </div>
                <div className="text-center rounded-md bg-muted/50 p-3">
                  <p className="font-display text-lg font-bold text-foreground">{suspiciousProfiles.length}</p>
                  <p className="text-[10px] text-muted-foreground">Alertes actives</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Admin;
