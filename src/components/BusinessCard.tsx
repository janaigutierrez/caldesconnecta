import { MapPin, Briefcase } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/icons";
import type { Negoci } from "@/types";

interface BusinessCardProps {
  negoci: Negoci;
  isMatch: boolean;
  onOpen: () => void;
}

export default function BusinessCard({ negoci, isMatch, onOpen }: BusinessCardProps) {
  const Icon = CATEGORY_ICONS[negoci.categoria];

  return (
    <div
      onClick={isMatch ? onOpen : undefined}
      className={`group rounded-2xl border overflow-hidden transition-all duration-300 ${
        isMatch
          ? "bg-ch-surface border-ch-border hover:border-ch-primary/40 hover:shadow-lg hover:-translate-y-0.5 opacity-100 cursor-pointer"
          : "bg-ch-surface/60 border-ch-border/50 opacity-35"
      }`}
    >
      {/* Image / icon header */}
      <div className="relative aspect-16/10 bg-ch-surface-alt flex items-center justify-center overflow-hidden">
        <Icon className="w-10 h-10 text-ch-primary/15 transition-transform duration-300 group-hover:scale-110" />
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-ch-surface/90 backdrop-blur-sm text-ch-primary text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
          <Icon className="w-3 h-3" />
          {negoci.categoria}
        </span>
        {negoci.contractant && (
          <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 bg-ch-hiring text-white text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            <Briefcase className="w-3 h-3" />
            Contracta
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-lg tracking-wide text-ch-text group-hover:text-ch-primary transition-colors">
          {negoci.nom}
        </h3>
        <p className="mt-1 text-xs text-ch-text-muted line-clamp-2 leading-relaxed">
          {negoci.descripcio}
        </p>

        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ch-text-muted">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-ch-primary/60" />
          <span className="truncate">{negoci.adreca}</span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {negoci.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] px-1.5 py-0.5 rounded-md bg-ch-surface-alt text-ch-text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
