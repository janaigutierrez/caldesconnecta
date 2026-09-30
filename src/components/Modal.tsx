import { Clock, Phone, MapPin, ExternalLink, X, Briefcase } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/icons";
import type { Negoci } from "@/types";

interface ModalProps {
  negoci: Negoci;
  onClose: () => void;
}

export default function Modal({ negoci, onClose }: ModalProps) {
  const Icon = CATEGORY_ICONS[negoci.categoria];

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 animate-backdrop" />

      <div
        className="relative bg-ch-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Tanca"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition"
        >
          <X className="w-4 h-4 text-ch-text-muted" />
        </button>

        {/* Image placeholder */}
        <div className="aspect-video bg-ch-surface-alt flex items-center justify-center">
          <Icon className="w-12 h-12 text-ch-primary/20" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-ch-primary bg-ch-primary/10 px-2.5 py-1 rounded-full">
                <Icon className="w-3 h-3" />
                {negoci.categoria}
              </span>
              {negoci.contractant && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ch-hiring bg-ch-hiring-bg px-2.5 py-1 rounded-full">
                  <Briefcase className="w-3 h-3" />
                  Contracta
                </span>
              )}
            </div>
            <h2 className="font-display text-3xl tracking-wide text-ch-text">{negoci.nom}</h2>
            <p className="text-sm text-ch-text-muted mt-1 leading-relaxed">
              {negoci.descripcio}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3 border-t border-ch-border pt-4">
            {negoci.horaris && (
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-ch-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-medium text-ch-text-muted uppercase tracking-wide">
                    Horaris
                  </p>
                  <p className="text-sm text-ch-text mt-0.5">{negoci.horaris}</p>
                </div>
              </div>
            )}
            {negoci.telefon && (
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-ch-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-medium text-ch-text-muted uppercase tracking-wide">
                    Telèfon
                  </p>
                  <a
                    href={`tel:${negoci.telefon.replace(/\s/g, "")}`}
                    className="text-sm text-ch-text mt-0.5 hover:text-ch-primary transition-colors"
                  >
                    {negoci.telefon}
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-ch-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-medium text-ch-text-muted uppercase tracking-wide">
                  Adreça
                </p>
                <p className="text-sm text-ch-text mt-0.5">{negoci.adreca}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {negoci.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full bg-ch-surface-alt text-ch-text-muted border border-ch-border"
              >
                {t}
              </span>
            ))}
          </div>

          {negoci.web && (
            <a
              href={negoci.web}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-ch-primary text-white text-sm font-medium rounded-xl hover:bg-ch-primary-dark transition"
            >
              Visita la web
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
