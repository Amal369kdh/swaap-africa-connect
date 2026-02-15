import swaapLogo from "@/assets/swaap-logo.jpeg";
import { Bell, Flame, Coins, Crown, Zap, LogOut } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

const planLabels = {
  none: "",
  gratuit: "Gratuit",
  standard: "Standard",
  premium: "Premium",
};

const planIcons = {
  none: null,
  gratuit: null,
  standard: Zap,
  premium: Crown,
};

const Header = () => {
  const { plan, credits, isConnected, logout } = useUser();
  const navigate = useNavigate();
  const PlanIcon = planIcons[plan];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={isConnected ? "/dashboard" : "/"} className="flex items-center gap-3">
          <img src={swaapLogo} alt="Swaap" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg font-bold text-gradient-swaap hidden sm:inline">
            SWAAP
          </span>
        </Link>

        {/* Stats bar */}
        <div className="flex items-center gap-3 text-sm">
          {/* Plan badge */}
          {plan !== "none" && plan !== "gratuit" && (
            <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
              plan === "premium"
                ? "bg-swaap-gold/15 text-swaap-gold"
                : "bg-primary/15 text-primary"
            }`}>
              {PlanIcon && <PlanIcon className="h-3.5 w-3.5" />}
              <span className="text-xs font-semibold">{planLabels[plan]}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
            <Flame className="h-4 w-4 text-primary" />
            <span className="font-medium">15 Pass</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 hidden sm:flex">
            <Coins className="h-4 w-4 text-swaap-gold" />
            <span className="font-medium">{credits} Crédits</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="relative rounded-full bg-muted p-2.5 transition-colors hover:bg-muted/80">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full bg-muted p-2.5 transition-colors hover:bg-destructive/20 hidden sm:block"
            title="Se déconnecter"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
            S
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
