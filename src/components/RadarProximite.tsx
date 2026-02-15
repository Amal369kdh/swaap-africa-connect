import { MapPin, ChevronRight, Bike, Gamepad2, ShoppingBag } from "lucide-react";
import { MASK_GRADES } from "@/lib/masks";
import MaskAvatar from "@/components/MaskAvatar";

const items = [
  { icon: Bike, label: "Vélo à échanger", distance: "1.2 km", maskIdx: 0 },
  { icon: Gamepad2, label: "PS4 à troquer", distance: "2.5 km", maskIdx: 2 },
  { icon: ShoppingBag, label: "Sac à donner", distance: "0.8 km", maskIdx: 1 },
];

const RadarProximite = () => {
  return (
    <div className="rounded-lg bg-card p-4 gradient-border">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="font-display text-sm font-bold tracking-wide">Radar de Proximité</h2>
      </div>

      {/* Radar visualization with mask avatars */}
      <div className="relative mx-auto mb-4 flex h-40 w-40 items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full border border-primary/10" />
        <div className="absolute h-28 w-28 rounded-full border border-primary/20" />
        <div className="absolute h-16 w-16 rounded-full border border-primary/30" />
        <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
        {/* Floating mask avatars on radar */}
        {[45, 150, 260].map((deg, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              transform: `rotate(${deg}deg) translateX(55px) rotate(-${deg}deg)`,
            }}
          >
            <MaskAvatar mask={MASK_GRADES[i % MASK_GRADES.length]} size="sm" />
          </div>
        ))}
        <div className="absolute bottom-2 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          Zone de Confiance
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MaskAvatar mask={MASK_GRADES[item.maskIdx]} size="sm" />
              <div>
                <span className="text-sm">{item.label}</span>
                <p className="text-[9px] text-muted-foreground">{MASK_GRADES[item.maskIdx].name}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {item.distance}
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
        Explorer
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default RadarProximite;
