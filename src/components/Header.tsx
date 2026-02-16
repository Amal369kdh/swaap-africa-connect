import swaapLogo from "@/assets/swaap-logo.jpeg";
import { Bell, Flame, Coins, Crown, Zap, LogOut, MapPin } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { getMaskForPlan } from "@/lib/masks";
import MaskAvatar from "@/components/MaskAvatar";
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

interface HeaderProps {
  geo?: { country: string | null; flag: string | null; loading: boolean; denied: boolean };
}

const Header = ({ geo }: HeaderProps) => {
  const { plan, credits, isConnected, logout } = useUser();
  const navigate = useNavigate();
  const PlanIcon = planIcons[plan];
  const mask = getMaskForPlan(plan);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo + Geo */}
        <div className="flex items-center gap-3">
          <Link to={isConnected ? "/dashboard" : "/"} className="flex items-center gap-2">
            <img src={swaapLogo} alt="Swaap" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display text-lg font-bold text-gradient-swaap hidden sm:inline">
              SWAAP
            </span>
          </Link>
          {/* Country indicator */}
          {geo && !geo.loading && geo.country && (
            <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground">
              <MapPin className="h-3 w-3 text-primary" />
              <span>{geo.flag} {geo.country}</span>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-3 text-sm">
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
          {/* Mask avatar instead of generic circle */}
          <MaskAvatar mask={mask} size="sm" />
        </div>
      </div>
    </header>
  );
};

export default Header;
