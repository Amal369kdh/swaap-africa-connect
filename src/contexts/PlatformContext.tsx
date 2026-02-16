import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/contexts/UserContext";

interface PlatformConfig {
  id: string;
  current_phase: number;
  alert_threshold_users: number;
  alert_threshold_credits: number;
  alert_threshold_annonces: number;
}

interface PlatformContextType {
  phase: number;
  config: PlatformConfig | null;
  loading: boolean;
  isAdmin: boolean;
  refreshConfig: () => Promise<void>;
  updatePhase: (phase: number) => Promise<void>;
  updateThresholds: (thresholds: Partial<Pick<PlatformConfig, 'alert_threshold_users' | 'alert_threshold_credits' | 'alert_threshold_annonces'>>) => Promise<void>;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
  const { user, isConnected } = useUser();
  const [config, setConfig] = useState<PlatformConfig | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    const { data } = await supabase
      .from("platform_config")
      .select("*")
      .limit(1)
      .single();
    if (data) setConfig(data as PlatformConfig);
    setLoading(false);
  };

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    setIsAdmin(!!data);
  };

  useEffect(() => {
    if (isConnected) {
      fetchConfig();
      if (user) checkAdmin(user.id);
    } else {
      // Even non-authenticated users on landing need the phase for the logo
      fetchConfig();
    }
  }, [isConnected, user]);

  const refreshConfig = async () => { await fetchConfig(); };

  const updatePhase = async (phase: number) => {
    if (!config) return;
    await supabase
      .from("platform_config")
      .update({ current_phase: phase, updated_by: user?.id })
      .eq("id", config.id);
    await fetchConfig();
  };

  const updateThresholds = async (thresholds: Partial<Pick<PlatformConfig, 'alert_threshold_users' | 'alert_threshold_credits' | 'alert_threshold_annonces'>>) => {
    if (!config) return;
    await supabase
      .from("platform_config")
      .update({ ...thresholds, updated_by: user?.id })
      .eq("id", config.id);
    await fetchConfig();
  };

  return (
    <PlatformContext.Provider value={{
      phase: config?.current_phase ?? 1,
      config,
      loading,
      isAdmin,
      refreshConfig,
      updatePhase,
      updateThresholds,
    }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used within PlatformProvider");
  return context;
};

// Phase feature mapping based on roadmap
// Phase 1: Côte d'Ivoire - Troc + Dons + Profil
// Phase 2: Expansion - + Ligue des Nations + Radar
// Phase 3: International - Tout débloqué
export const PHASE_FEATURES: Record<number, string[]> = {
  1: ["/dashboard", "/troc", "/dons", "/profil", "/forfaits"],
  2: ["/dashboard", "/troc", "/dons", "/profil", "/forfaits", "/ligue"],
  3: ["/dashboard", "/troc", "/dons", "/profil", "/forfaits", "/ligue"],
};

export const isFeatureUnlocked = (path: string, phase: number, isAdmin: boolean): boolean => {
  if (isAdmin) return true;
  const allowed = PHASE_FEATURES[phase] ?? PHASE_FEATURES[1];
  return allowed.includes(path);
};
