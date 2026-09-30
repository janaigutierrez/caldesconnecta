"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, Briefcase, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import FilterBar from "@/components/FilterBar";
import BusinessCard from "@/components/BusinessCard";
import Modal from "@/components/Modal";
import { NEGOCIS, CATEGORIES } from "@/data/negocis";
import { CATEGORY_ICONS } from "@/lib/icons";
import type { Tab, Categoria } from "@/types";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const QUICK_TAGS = [
  "brunch",
  "gelat",
  "vi",
  "embotits",
  "cuina catalana",
  "pastisseria",
  "ceràmica",
];

export default function Home() {
  const [activeTab, setActiveTab]           = useState<Tab>("negocis");
  const [activeCategory, setActiveCategory] = useState<Categoria>("Tots");
  const [negocisQuery, setNegocisQuery]     = useState("");
  const [productesQuery, setProductesQuery] = useState("");
  const [hiringOnly, setHiringOnly]         = useState(false);
  const [expandedId, setExpandedId]         = useState<number | null>(null);

  /* Filtered for Negocis tab — searches by business name */
  const filteredNegocis = useMemo(() => {
    let r = NEGOCIS;
    if (activeCategory !== "Tots")
      r = r.filter((n) => n.categoria === activeCategory);
    if (negocisQuery.trim()) {
      const q = negocisQuery.toLowerCase();
      r = r.filter((n) => n.nom.toLowerCase().includes(q));
    }
    if (hiringOnly) r = r.filter((n) => n.contractant);
    return r;
  }, [activeCategory, negocisQuery, hiringOnly]);

  /* Filtered for Productes tab — searches by tags and description */
  const filteredProductes = useMemo(() => {
    if (!productesQuery.trim()) return [];
    const q = productesQuery.toLowerCase();
    return NEGOCIS.filter(
      (n) =>
        n.tags.some((t) => t.toLowerCase().includes(q)) ||
        n.descripcio.toLowerCase().includes(q)
    );
  }, [productesQuery]);

  const openCard  = useCallback((id: number) => setExpandedId(id), []);
  const closeCard = () => setExpandedId(null);
  const selectedNegoci = NEGOCIS.find((n) => n.id === expandedId) ?? null;

  useEffect(() => {
    document.body.style.overflow = expandedId !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [expandedId]);

  const hasNegocisFilter =
    activeCategory !== "Tots" || negocisQuery.trim() !== "" || hiringOnly;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Demo banner */}
      <div className="bg-ch-surface-alt border-b border-ch-border">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-2 text-sm flex-wrap">
          <span className="bg-ch-primary text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
            DEMO
          </span>
          <span className="text-ch-text-muted">
            Vista prèvia amb negocis d&apos;exemple — el directori real encara no està actiu.
          </span>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1 text-ch-primary text-xs font-medium hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Tornar a l&apos;inici
          </Link>
        </div>
      </div>

      <TabNav activeTab={activeTab} onChange={setActiveTab} />

      {hasNegocisFilter && activeTab === "negocis" && (
        <FilterBar
          category={activeCategory}
          query={negocisQuery}
          hiring={hiringOnly}
          onClear={() => {
            setActiveCategory("Tots");
            setNegocisQuery("");
            setHiringOnly(false);
          }}
        />
      )}

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">

        {/* ── Negocis ── */}
        {activeTab === "negocis" && (
          <div key="negocis" className="animate-tab">
            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-ch-primary text-white shadow-sm"
                        : "bg-ch-surface text-ch-text-muted border border-ch-border hover:border-ch-primary/40 hover:text-ch-text"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat}
                  </button>
                );
              })}

              <span className="w-px h-5 bg-ch-border mx-1" />

              <button
                onClick={() => setHiringOnly((v) => !v)}
                aria-pressed={hiringOnly}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  hiringOnly
                    ? "bg-ch-hiring text-white shadow-sm"
                    : "bg-ch-surface text-ch-text-muted border border-ch-border hover:border-ch-hiring/40 hover:text-ch-text"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Contracten
              </button>
            </div>

            {/* Search by name */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ch-text-muted" />
              <input
                type="text"
                placeholder="Cerca per nom de negoci..."
                value={negocisQuery}
                onChange={(e) => setNegocisQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ch-border bg-ch-surface text-sm placeholder:text-ch-text-muted focus:outline-none focus:ring-2 focus:ring-ch-primary/25 focus:border-ch-primary transition"
              />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {NEGOCIS.map((n) => (
                <BusinessCard
                  key={n.id}
                  negoci={n}
                  isMatch={filteredNegocis.includes(n)}
                  onOpen={() => openCard(n.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Productes ── */}
        {activeTab === "productes" && (
          <div key="productes" className="animate-tab">
            <div className="max-w-2xl mx-auto mb-8">
              <h2 className="font-display text-4xl tracking-wide mb-2 text-center text-ch-text">
                Què busques a Caldes?
              </h2>
              <p className="text-ch-text-muted text-sm text-center mb-5">
                Escriu un producte o servei i et diem on trobar-lo.
              </p>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ch-text-muted" />
                <input
                  type="text"
                  placeholder='Ex: "brunch", "gelat artesà", "vi"...'
                  value={productesQuery}
                  onChange={(e) => setProductesQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-ch-border bg-ch-surface text-base placeholder:text-ch-text-muted focus:outline-none focus:ring-2 focus:ring-ch-primary/25 focus:border-ch-primary transition"
                />
              </div>

              {/* Quick tags */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {QUICK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setProductesQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-ch-surface border border-ch-border text-xs text-ch-text-muted hover:border-ch-primary/40 hover:text-ch-primary transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            {productesQuery.trim() ? (
              filteredProductes.length > 0 ? (
                <div>
                  <p className="text-sm text-ch-text-muted mb-4">
                    {filteredProductes.length} resultat
                    {filteredProductes.length !== 1 ? "s" : ""} per &ldquo;
                    {productesQuery}&rdquo;
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProductes.map((n) => (
                      <BusinessCard
                        key={n.id}
                        negoci={n}
                        isMatch
                        onOpen={() => openCard(n.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-10 h-10 text-ch-text-muted/25 mx-auto mb-3" />
                  <p className="text-ch-text-muted">
                    Cap resultat per &ldquo;{productesQuery}&rdquo;
                  </p>
                  <p className="text-ch-text-muted text-sm mt-1">
                    Prova amb una altra paraula clau
                  </p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <Search className="w-10 h-10 text-ch-text-muted/25 mx-auto mb-3" />
                <p className="text-ch-text-muted">
                  Escriu alguna cosa per començar
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Mapa ── */}
        {activeTab === "mapa" && (
          <div key="mapa" className="animate-tab">
            <div
              className="rounded-2xl border border-ch-border overflow-hidden shadow-sm"
              style={{ height: 450 }}
            >
              <MapView businesses={filteredNegocis} onPinClick={openCard} />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-ch-text-muted mb-3">
                {filteredNegocis.length} negoci
                {filteredNegocis.length !== 1 ? "s" : ""} al mapa
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredNegocis.map((n) => {
                  const Icon = CATEGORY_ICONS[n.categoria];
                  return (
                    <button
                      key={n.id}
                      onClick={() => openCard(n.id)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-ch-surface border border-ch-border hover:border-ch-primary/30 transition text-left w-full"
                    >
                      <div className="w-8 h-8 rounded-lg bg-ch-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-ch-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{n.nom}</p>
                        <p className="text-xs text-ch-text-muted">{n.adreca}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedNegoci && (
        <Modal negoci={selectedNegoci} onClose={closeCard} />
      )}

      <footer className="bg-ch-surface border-t border-ch-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-ch-text-muted">
          <p>Caldes Connecta — Directori digital de Caldes de Montbui</p>
          <p className="mt-1 text-xs opacity-50">Prototip · caldesconnecta.cat</p>
        </div>
      </footer>
    </div>
  );
}
