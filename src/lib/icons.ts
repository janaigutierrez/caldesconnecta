import {
  LayoutGrid,
  UtensilsCrossed,
  ShoppingBag,
  Wrench,
  Palette,
  type LucideIcon,
} from "lucide-react";
import type { Categoria } from "@/types";

export const CATEGORY_ICONS: Record<Categoria, LucideIcon> = {
  Tots: LayoutGrid,
  Restauració: UtensilsCrossed,
  Comerç: ShoppingBag,
  Serveis: Wrench,
  Artesania: Palette,
};
