import { Home, Repeat, Heart, Trophy, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Accueil", active: true },
  { icon: Repeat, label: "Troc", active: false },
  { icon: Heart, label: "Dons", active: false },
  { icon: Trophy, label: "Ligue", active: false },
  { icon: User, label: "Profil", active: false },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
              item.active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className={`h-5 w-5 ${item.active ? "drop-shadow-[0_0_6px_hsl(28,100%,55%,0.5)]" : ""}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
