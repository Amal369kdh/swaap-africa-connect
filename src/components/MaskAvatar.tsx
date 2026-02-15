import { MaskGrade } from "@/lib/masks";

interface MaskAvatarProps {
  mask: MaskGrade;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-20 w-20 text-3xl",
};

const MaskAvatar = ({ mask, size = "md", showLabel = false, className = "" }: MaskAvatarProps) => {
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-full ${mask.bgClass} border ${mask.borderClass} flex items-center justify-center transition-all`}
        title={`${mask.name} — ${mask.description}`}
      >
        <span>{mask.emoji}</span>
      </div>
      {showLabel && (
        <div className="text-center">
          <p className={`text-[10px] font-bold ${mask.color}`}>{mask.name}</p>
          <p className="text-[9px] text-muted-foreground">{mask.subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default MaskAvatar;
