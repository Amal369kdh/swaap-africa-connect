import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type UserPlan = "none" | "gratuit" | "standard" | "premium";

interface Profile {
  display_name: string;
  country: string | null;
  plan: string;
  credits: number;
  xp: number;
  level: number;
}

interface UserContextType {
  plan: UserPlan;
  isConnected: boolean;
  userName: string;
  credits: number;
  xp: number;
  level: number;
  loading: boolean;
  user: User | null;
  setPlan: (plan: UserPlan) => void;
  login: (plan: UserPlan) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const PLAN_CREDITS: Record<UserPlan, number> = {
  none: 0,
  gratuit: 0,
  standard: 0,
  premium: 50,
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, country, plan, credits, xp, level")
      .eq("user_id", userId)
      .single();
    if (data) setProfile(data);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          // Defer profile fetch to avoid deadlocks
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const plan: UserPlan = profile?.plan as UserPlan ?? "none";
  const isConnected = !!user;

  const setPlan = async (newPlan: UserPlan) => {
    if (!user) return;
    const credits = PLAN_CREDITS[newPlan];
    await supabase
      .from("profiles")
      .update({ plan: newPlan, credits })
      .eq("user_id", user.id);
    await refreshProfile();
  };

  const login = (selectedPlan: UserPlan) => {
    // For real auth, this is handled by Auth page + setPlan
    setPlan(selectedPlan);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <UserContext.Provider
      value={{
        plan: isConnected ? plan : "none",
        isConnected,
        userName: profile?.display_name || "",
        credits: profile?.credits ?? 0,
        xp: profile?.xp ?? 0,
        level: profile?.level ?? 1,
        loading,
        user,
        setPlan,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
