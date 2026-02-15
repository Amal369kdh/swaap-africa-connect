import { createContext, useContext, useState, ReactNode } from "react";

export type UserPlan = "none" | "gratuit" | "standard" | "premium";

interface UserContextType {
  plan: UserPlan;
  isConnected: boolean;
  userName: string;
  credits: number;
  setPlan: (plan: UserPlan) => void;
  login: (plan: UserPlan) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const PLAN_CREDITS: Record<UserPlan, number> = {
  none: 0,
  gratuit: 0,
  standard: 0,
  premium: 50,
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlanState] = useState<UserPlan>("none");
  const [credits, setCredits] = useState(0);

  const isConnected = plan !== "none";

  const setPlan = (newPlan: UserPlan) => {
    setPlanState(newPlan);
    setCredits(PLAN_CREDITS[newPlan]);
  };

  const login = (selectedPlan: UserPlan) => {
    setPlan(selectedPlan);
  };

  const logout = () => {
    setPlanState("none");
    setCredits(0);
  };

  return (
    <UserContext.Provider
      value={{
        plan,
        isConnected,
        userName: "Samba Diallo",
        credits,
        setPlan,
        login,
        logout,
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
