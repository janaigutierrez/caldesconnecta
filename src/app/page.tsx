"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

/* ───────── Types ───────── */
type Tab = "llistat" | "cercador" | "mapa";
type Categoria = "Tots" | "Restauració" | "Comerç" | "Serveis" | "Artesania";

interface Negoci {
  id: number;
  nom: string;
  categoria: Exclude<Categoria, "Tots">;
  descripcio: string;
  web: string;
  telefon: string;
  horaris: string;
  adreca: string;
  imatge: string;
  lat: number;
  lng: number;
  tags: string[];
}

/* ───────── Mock Data ───────── */
const NEGOCIS: Negoci[] = [
  {
    id: 1,
    nom: "Cal Termal",
    categoria: "Restauració",
    descripcio: "Restaurant de cuina catalana amb productes de proximitat.",
    web: "#",
    telefon: "938 65 00 00",
    horaris: "Dl-Ds 12:00–16:00, 20:00–23:00",
    adreca: "Carrer Major, 12",
    imatge: "",
    lat: 41.6325,
    lng: 2.1685,
    tags: ["menú diari", "cuina catalana", "arròs", "brasa", "vi", "terrassa"],
  },
  {
    id: 2,
    nom: "La Botiga del Carrer",
    categoria: "Comerç",
    descripcio: "Productes locals, regals artesanals i cosmètica natural.",
    web: "#",
    telefon: "938 65 11 11",
    horaris: "Dl-Ds 10:00–13:30, 17:00–20:00",
    adreca: "Plaça de l'Àngel, 3",
    imatge: "",
    lat: 41.6330,
    lng: 2.1670,
    tags: ["regals", "cosmètica", "productes locals", "sabons", "espelmes"],
  },
  {
    id: 3,
    nom: "Termes Victòria",
    categoria: "Serveis",
    descripcio: "Centre termal amb massatges, circuits d'aigües i teràpies.",
    web: "#",
    telefon: "938 65 22 22",
    horaris: "Dl-Dg 9:00–21:00",
    adreca: "Av. del Balneari, 7",
    imatge: "",
    lat: 41.6340,
    lng: 2.1715,
    tags: ["termes", "massatge", "spa", "relax", "aigües termals", "circuit"],
  },
  {
    id: 4,
    nom: "Forn de Pa Caldense",
    categoria: "Comerç",
    descripcio: "Pa artesanal, coques, pastissos i dolços tradicionals.",
    web: "#",
    telefon: "938 65 33 33",
    horaris: "Dl-Ds 7:00–14:00, 17:00–20:00",
    adreca: "Carrer de la Font del Lleó, 5",
    imatge: "",
    lat: 41.6310,
    lng: 2.1660,
    tags: ["pa", "coca", "pastís", "forn", "dolços", "ensaïmada"],
  },
  {
    id: 5,
    nom: "Ceràmiques del Remei",
    categoria: "Artesania",
    descripcio: "Taller de ceràmica artesanal amb peces úniques fetes a mà.",
    web: "#",
    telefon: "938 65 44 44",
    horaris: "Dm-Ds 10:00–13:00, 16:00–19:00",
    adreca: "Carrer del Remei, 18",
    imatge: "",
    lat: 41.6305,
    lng: 2.1700,
    tags: ["ceràmica", "artesania", "taller", "plats", "gerros", "regals"],
  },
  {
    id: 6,
    nom: "Cafè de la Plaça",
    categoria: "Restauració",
    descripcio:
      "Cafeteria amb esmorzars, chai latte, pastissos i brunch de cap de setmana.",
    web: "#",
    telefon: "938 65 55 55",
    horaris: "Dl-Dg 8:00–20:00",
    adreca: "Plaça de la Font del Lleó, 1",
    imatge: "",
    lat: 41.6320,
    lng: 2.1645,
    tags: [
      "cafè",
      "chai latte",
      "esmorzar",
      "brunch",
      "pastís",
      "te",
      "terrassa",
    ],
  },
];

const CATEGORIES: Categoria[] = [
  "Tots",
  "Restauració",
  "Comerç",
  "Serveis",
  "Artesania",
];

const CATEGORY_ICONS: Record<Categoria, string> = {
  Tots: "⊞",
  Restauració: "🍽",
  Comerç: "🛍",
  Serveis: "⚙",
  Artesania: "🎨",
};

/* ───────── Component ───────── */
export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("llistat");
  const [activeCategory, setActiveCategory] = useState<Categoria>("Tots");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let result = NEGOCIS;

    if (activeCategory !== "Tots") {
      result = result.filter((n) => n.categoria === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.nom.toLowerCase().includes(q) ||
          n.categoria.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const hasFilter = activeCategory !== "Tots" || searchQuery.trim() !== "";

  const clearFilters = () => {
    setActiveCategory("Tots");
    setSearchQuery("");
  };

  const openCard = useCallback((id: number) => setExpandedId(id), []);
  const closeCard = () => setExpandedId(null);

  const selectedNegoci = NEGOCIS.find((n) => n.id === expandedId) ?? null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (expandedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expandedId]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-ch-primary to-ch-primary-dark text-white">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-20 -right-12 w-72 h-72 rounded-full bg-ch-accent/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-7 sm:py-9">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm flex items-center justify-center text-xl sm:text-2xl font-extrabold shadow-lg shadow-black/10">
              CC
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Caldes Connecta
              </h1>
              <p className="text-sm sm:text-base text-white/85 mt-0.5">
                Directori digital de Caldes de Montbui
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Pròximament banner ── */}
      <div className="bg-ch-accent/20 border-b border-ch-accent/30">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 bg-ch-accent text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
            PRÒXIMAMENT
          </span>
          <span className="text-ch-text-muted">
            Estem preparant el directori complet. Això és una previsualització
            del projecte.
          </span>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <nav className="bg-ch-surface border-b border-ch-border sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center">
            {(
              [
                { key: "llistat", label: "Llistat" },
                { key: "cercador", label: "Cercador" },
                { key: "mapa", label: "Mapa" },
              ] as const
            ).map(({ key, label }, idx) => (
              <div key={key} className="flex items-center">
                {idx > 0 && (
                  <span className="text-ch-border mx-1 select-none">|</span>
                )}
                <button
                  onClick={() => setActiveTab(key)}
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

      {/* ── Active Filter Bar ── */}
      {hasFilter && (
        <div className="bg-ch-surface-alt border-b border-ch-border">
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 text-sm">
            <span className="text-ch-text-muted">Filtre actiu:</span>
            {activeCategory !== "Tots" && (
              <span className="bg-ch-primary/10 text-ch-primary px-2.5 py-0.5 rounded-full text-xs font-medium">
                {activeCategory}
              </span>
            )}
            {searchQuery.trim() && (
              <span className="bg-ch-secondary/10 text-ch-secondary px-2.5 py-0.5 rounded-full text-xs font-medium">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
            <button
              onClick={clearFilters}
              className="ml-auto text-ch-text-muted hover:text-ch-primary text-xs underline"
            >
              Esborra filtres
            </button>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {/* ─── Tab: Llistat ─── */}
        {activeTab === "llistat" && (
          <div key="llistat" className="animate-tab">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-ch-primary text-white shadow-sm"
                      : "bg-ch-surface text-ch-text-muted border border-ch-border hover:border-ch-primary/40 hover:text-ch-text"
                  }`}
                >
                  <span>{CATEGORY_ICONS[cat]}</span>
                  {cat}
                </button>
              ))}
            </div>

            {/* Search within list */}
            <div className="relative mb-6">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ch-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Cerca per nom de negoci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ch-border bg-ch-surface text-sm placeholder:text-ch-text-muted focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary transition"
              />
            </div>

            {/* Business cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEGOCIS.map((negoci) => {
                const isMatch = filtered.includes(negoci);
                return (
                  <BusinessCard
                    key={negoci.id}
                    negoci={negoci}
                    isMatch={isMatch}
                    onOpen={() => openCard(negoci.id)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Tab: Cercador ─── */}
        {activeTab === "cercador" && (
          <div key="cercador" className="animate-tab">
            <div className="max-w-2xl mx-auto mb-8">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Què busques a Caldes?
              </h2>
              <p className="text-ch-text-muted text-sm text-center mb-5">
                Escriu qualsevol producte, servei o article i et mostrarem on
                trobar-lo.
              </p>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ch-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder='Ex: "chai latte", "ceràmica", "massatge"...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-ch-border bg-ch-surface text-base placeholder:text-ch-text-muted focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary transition"
                />
              </div>

              {/* Quick search tags */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {[
                  "chai latte",
                  "pa artesanal",
                  "massatge",
                  "ceràmica",
                  "terrassa",
                  "brunch",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-ch-surface border border-ch-border text-xs text-ch-text-muted hover:border-ch-primary/40 hover:text-ch-primary transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Search results */}
            {searchQuery.trim() ? (
              <div>
                <p className="text-sm text-ch-text-muted mb-4">
                  {filtered.length} resultat{filtered.length !== 1 ? "s" : ""}{" "}
                  per &ldquo;{searchQuery}&rdquo;
                </p>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((negoci) => (
                      <BusinessCard
                        key={negoci.id}
                        negoci={negoci}
                        isMatch={true}
                        onOpen={() => openCard(negoci.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-ch-text-muted text-lg mb-1">
                      Cap resultat trobat
                    </p>
                    <p className="text-ch-text-muted text-sm">
                      Prova amb una altra paraula clau
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-ch-text-muted">
                <div className="text-4xl mb-3 opacity-30">🔍</div>
                <p>Escriu alguna cosa per començar a buscar</p>
              </div>
            )}
          </div>
        )}

        {/* ─── Tab: Mapa ─── */}
        {activeTab === "mapa" && (
          <div key="mapa" className="animate-tab">
            {/* Real map */}
            <div className="rounded-2xl border border-ch-border overflow-hidden shadow-sm" style={{ height: 450 }}>
              <MapView businesses={filtered} onPinClick={openCard} />
            </div>

            {/* List below map */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-ch-text-muted mb-3">
                {filtered.length} negoci{filtered.length !== 1 ? "s" : ""} al
                mapa
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((negoci) => (
                  <div
                    key={negoci.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-ch-surface border border-ch-border hover:border-ch-primary/30 transition cursor-pointer"
                    onClick={() => openCard(negoci.id)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-ch-primary/10 flex items-center justify-center text-ch-primary text-sm">
                      {CATEGORY_ICONS[negoci.categoria]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {negoci.nom}
                      </p>
                      <p className="text-xs text-ch-text-muted">
                        {negoci.adreca}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Modal ── */}
      {selectedNegoci && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          onClick={closeCard}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 animate-backdrop" />

          {/* Modal card */}
          <div
            className="relative bg-ch-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeCard}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="aspect-[16/9] bg-gradient-to-br from-ch-surface-alt to-ch-border/30 flex items-center justify-center">
              <span className="text-5xl opacity-20">
                {CATEGORY_ICONS[selectedNegoci.categoria]}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Header */}
              <div>
                <span className="inline-block text-xs font-medium text-ch-primary bg-ch-primary/10 px-2.5 py-1 rounded-full mb-2">
                  {selectedNegoci.categoria}
                </span>
                <h2 className="text-xl font-bold text-ch-text">
                  {selectedNegoci.nom}
                </h2>
                <p className="text-sm text-ch-text-muted mt-1">
                  {selectedNegoci.descripcio}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3 border-t border-ch-border pt-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-ch-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-ch-text-muted uppercase tracking-wide">Horaris</p>
                    <p className="text-sm text-ch-text mt-0.5">{selectedNegoci.horaris}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-ch-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-ch-text-muted uppercase tracking-wide">Telèfon</p>
                    <p className="text-sm text-ch-text mt-0.5">{selectedNegoci.telefon}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-ch-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-ch-text-muted uppercase tracking-wide">Adreça</p>
                    <p className="text-sm text-ch-text mt-0.5">{selectedNegoci.adreca}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={selectedNegoci.web}
                className="flex items-center justify-center gap-2 w-full py-3 bg-ch-primary text-white text-sm font-medium rounded-xl hover:bg-ch-primary-dark transition"
              >
                Visita la web
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="bg-ch-surface border-t border-ch-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-ch-text-muted">
          <p>Caldes Connecta — Directori digital de Caldes de Montbui</p>
          <p className="mt-1 text-xs opacity-60">Prototip · caldeshub.cat</p>
        </div>
      </footer>
    </div>
  );
}

/* ───────── Business Card (simplified — no inline expand) ───────── */
function BusinessCard({
  negoci,
  isMatch,
  onOpen,
}: {
  negoci: Negoci;
  isMatch: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={isMatch ? onOpen : undefined}
      className={`group rounded-2xl border overflow-hidden transition-all duration-300 ${
        isMatch
          ? "bg-ch-surface border-ch-border hover:border-ch-primary/40 hover:shadow-lg hover:-translate-y-0.5 opacity-100 cursor-pointer"
          : "bg-ch-surface/60 border-ch-border/50 opacity-40"
      }`}
    >
      {/* Image / icon header */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-ch-surface-alt to-ch-border/30 flex items-center justify-center overflow-hidden">
        <span className="text-4xl opacity-25 transition-transform duration-300 group-hover:scale-110">
          {CATEGORY_ICONS[negoci.categoria]}
        </span>
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 bg-ch-surface/90 backdrop-blur-sm text-ch-primary text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
          <span aria-hidden>{CATEGORY_ICONS[negoci.categoria]}</span>
          {negoci.categoria}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm text-ch-text group-hover:text-ch-primary transition-colors">
          {negoci.nom}
        </h3>
        <p className="mt-1 text-xs text-ch-text-muted line-clamp-2 leading-relaxed">
          {negoci.descripcio}
        </p>

        {/* Address */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ch-text-muted">
          <svg className="w-3.5 h-3.5 flex-shrink-0 text-ch-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{negoci.adreca}</span>
        </div>

        {/* Tags */}
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
