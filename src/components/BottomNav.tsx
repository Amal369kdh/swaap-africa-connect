import { Home, Repeat, Heart, Trophy, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Accueil", path: "/dashboard" },
  { icon: Repeat, label: "Troc", path: "/troc" },
  { icon: Heart, label: "Dons", path: "/dons" },
  { icon: Trophy, label: "Ligue", path: "/ligue" },
  { icon: User, label: "Profil", path: "/profil" },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${active ? "drop-shadow-[0_0_6px_hsl(28,100%,55%,0.5)]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
