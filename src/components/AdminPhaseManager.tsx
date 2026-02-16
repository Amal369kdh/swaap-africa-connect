import { useState } from "react";
import { usePlatform } from "@/contexts/PlatformContext";
import { Settings, Flame, Zap, Globe, Save, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminPhaseManager = () => {
  const { phase, config, updatePhase, updateThresholds } = usePlatform();
  const [saving, setSaving] = useState(false);
  const [thresholds, setThresholds] = useState({
    users: config?.alert_threshold_users ?? 100,
    credits: config?.alert_threshold_credits ?? 500,
    annonces: config?.alert_threshold_annonces ?? 50,
  });

  const phases = [
    { id: 1, label: "Phase 1", subtitle: "Côte d'Ivoire", icon: Flame, desc: "Troc + Dons uniquement" },
    { id: 2, label: "Phase 2", subtitle: "Expansion", icon: Zap, desc: "+ Ligue des Nations, Radar" },
    { id: 3, label: "Phase 3", subtitle: "International", icon: Globe, desc: "Toutes fonctionnalités" },
  ];

  const handlePhaseChange = async (newPhase: number) => {
    setSaving(true);
    await updatePhase(newPhase);
    toast({ title: "Phase mise à jour", description: `Phase ${newPhase} activée` });
    setSaving(false);
  };

  const handleSaveThresholds = async () => {
    setSaving(true);
    await updateThresholds({
      alert_threshold_users: thresholds.users,
      alert_threshold_credits: thresholds.credits,
      alert_threshold_annonces: thresholds.annonces,
    });
    toast({ title: "Seuils mis à jour" });
    setSaving(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Phase selector */}
      <div className="rounded-lg bg-card border border-border p-4">
        <h3 className="font-display text-sm font-bold mb-3 flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          Phase Constitutionnelle
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePhaseChange(p.id)}
              disabled={saving}
              className={`rounded-lg p-3 text-left border transition-all ${
                phase === p.id
                  ? "border-primary bg-primary/10 glow-orange"
                  : "border-border hover:border-primary/30 bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <p.icon className={`h-4 w-4 ${phase === p.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-display text-xs font-bold">{p.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{p.subtitle}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Alert Thresholds */}
      <div className="rounded-lg bg-card border border-border p-4">
        <h3 className="font-display text-sm font-bold mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-swaap-gold" />
          Seuils d'alerte KPI
        </h3>
        <div className="space-y-3">
          {[
            { label: "Utilisateurs", key: "users" as const, value: thresholds.users },
            { label: "Crédits en circulation", key: "credits" as const, value: thresholds.credits },
            { label: "Annonces actives", key: "annonces" as const, value: thresholds.annonces },
          ].map((t) => (
            <div key={t.key} className="flex items-center gap-3">
              <span className="text-xs w-32">{t.label}</span>
              <input
                type="number"
                value={t.value}
                onChange={(e) => setThresholds((prev) => ({ ...prev, [t.key]: parseInt(e.target.value) || 0 }))}
                className="flex-1 rounded-md bg-muted border border-border px-2 py-1.5 text-xs outline-none focus:border-primary"
              />
            </div>
          ))}
          <button
            onClick={handleSaveThresholds}
            disabled={saving}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPhaseManager;
