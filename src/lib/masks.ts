import { UserPlan } from "@/contexts/UserContext";

export interface MaskGrade {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  emoji: string;
  tier: "debutant" | "intermediaire" | "avance";
  requiredPlan: UserPlan;
  color: string;
  bgClass: string;
  borderClass: string;
}

export const MASK_GRADES: MaskGrade[] = [
  {
    id: "dogon",
    name: "Masque Dogon",
    subtitle: "Bois",
    description: "Le premier pas du bâtisseur",
    emoji: "🎭",
    tier: "debutant",
    requiredPlan: "gratuit",
    color: "text-muted-foreground",
    bgClass: "bg-muted/50",
    borderClass: "border-border",
  },
  {
    id: "amazone",
    name: "Amazone du Bénin",
    subtitle: "Bio Guerra",
    description: "Symbole de protection et de résistance",
    emoji: "⚔️",
    tier: "intermediaire",
    requiredPlan: "standard",
    color: "text-primary",
    bgClass: "bg-primary/10",
    borderClass: "border-primary/30",
  },
  {
    id: "idia",
    name: "Reine Idia",
    subtitle: "Or Ashanti",
    description: "Sommet de la puissance et de l'influence",
    emoji: "👑",
    tier: "avance",
    requiredPlan: "premium",
    color: "text-swaap-gold",
    bgClass: "bg-swaap-gold/10",
    borderClass: "border-swaap-gold/30",
  },
];

export function getMaskForPlan(plan: UserPlan): MaskGrade {
  if (plan === "premium") return MASK_GRADES[2];
  if (plan === "standard") return MASK_GRADES[1];
  return MASK_GRADES[0];
}

export function getMaskForIndex(index: number): MaskGrade {
  return MASK_GRADES[Math.min(index, MASK_GRADES.length - 1)];
}
