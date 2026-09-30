import { Briefcase } from "lucide-react";
import type { Categoria } from "@/types";

interface FilterBarProps {
  category: Categoria;
  query: string;
  hiring: boolean;
  onClear: () => void;
}

export default function FilterBar({ category, query, hiring, onClear }: FilterBarProps) {
  const hasCategory = category !== "Tots";
  const hasQuery = query.trim() !== "";
  if (!hasCategory && !hasQuery && !hiring) return null;

  return (
    <div className="bg-ch-surface-alt border-b border-ch-border">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 text-sm">
        <span className="text-ch-text-muted">Filtre actiu:</span>
        {hasCategory && (
          <span className="bg-ch-primary/10 text-ch-primary px-2.5 py-0.5 rounded-full text-xs font-medium">
            {category}
          </span>
        )}
        {hasQuery && (
          <span className="bg-ch-accent/40 text-ch-primary-dark px-2.5 py-0.5 rounded-full text-xs font-medium">
            &ldquo;{query}&rdquo;
          </span>
        )}
        {hiring && (
          <span className="inline-flex items-center gap-1 bg-ch-hiring-bg text-ch-hiring px-2.5 py-0.5 rounded-full text-xs font-medium">
            <Briefcase className="w-3 h-3" />
            Contracta
          </span>
        )}
        <button
          onClick={onClear}
          className="ml-auto text-ch-text-muted hover:text-ch-primary text-xs underline"
        >
          Esborra filtres
        </button>
      </div>
    </div>
  );
}
