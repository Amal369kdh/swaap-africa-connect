import swaapLogo from "@/assets/swaap-logo.jpeg";
import { Bell, Flame, Coins } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={swaapLogo} alt="Swaap" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg font-bold text-gradient-swaap hidden sm:inline">
            SWAAP
          </span>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
            <Flame className="h-4 w-4 text-primary" />
            <span className="font-medium">15 Pass</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 hidden sm:flex">
            <Coins className="h-4 w-4 text-swaap-gold" />
            <span className="font-medium">450 Crédits</span>
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
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
            S
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
