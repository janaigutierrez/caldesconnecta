import type { Tab } from "@/types";

interface TabNavProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: { key: Tab; label: string }[] = [
  { key: "negocis",   label: "Negocis" },
  { key: "productes", label: "Productes" },
  { key: "mapa",      label: "Mapa" },
];

export default function TabNav({ activeTab, onChange }: TabNavProps) {
  return (
    <nav className="bg-ch-surface border-b border-ch-border sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center">
          {TABS.map(({ key, label }, idx) => (
            <div key={key} className="flex items-center">
              {idx > 0 && (
                <span className="text-ch-border mx-1 select-none">|</span>
              )}
              <button
                onClick={() => onChange(key)}
                className={`px-5 py-3.5 text-sm font-medium transition-colors relative ${
                  activeTab === key
                    ? "text-ch-primary"
                    : "text-ch-text-muted hover:text-ch-text"
                }`}
              >
                {label}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ch-primary rounded-t" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
