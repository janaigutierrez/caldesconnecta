import Link from "next/link";
import { Play, Search, MapPin, Briefcase, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    title: "Cerca per allò que necessites",
    text: "Escriu “brunch”, “ceràmica” o “vi” i et diem quin negoci de Caldes te l’ofereix.",
  },
  {
    icon: MapPin,
    title: "Troba’ls al mapa",
    text: "Tots els negocis situats al mapa del poble, amb adreça i horaris a un clic.",
  },
  {
    icon: Briefcase,
    title: "Descobreix qui contracta",
    text: "Els negocis que busquen personal ho marquen a la seva fitxa, ben visible.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto w-full px-4 py-6">
        <img src="/logo.svg" alt="Caldes Connecta" className="h-12 w-auto" />
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 pt-6 pb-14 text-center">
          <span className="inline-block bg-ch-primary/10 text-ch-primary text-xs font-semibold px-3 py-1 rounded-full mb-5">
            Caldes de Montbui
          </span>
          <h1 className="font-display text-5xl sm:text-6xl tracking-wide text-ch-text leading-tight text-balance">
            Tots els negocis de Caldes, a un clic.
          </h1>
          <p className="mt-5 text-ch-text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto text-balance">
            Restaurants, botigues, serveis i artesans del poble reunits en un
            sol directori. L&apos;estem construint amb els negocis del
            municipi — mentrestant, aquí tens un tast de com funcionarà.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-ch-primary text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-ch-primary-dark transition-colors shadow-sm"
            >
              Explora la demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Video placeholder */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="aspect-video w-full rounded-3xl border-2 border-dashed border-ch-border bg-ch-surface flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-ch-primary/10 flex items-center justify-center">
              <Play className="w-6 h-6 text-ch-primary ml-0.5" fill="currentColor" />
            </div>
            <p className="text-sm text-ch-text-muted">
              Vídeo de presentació — pròximament
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center sm:text-left">
                <div className="w-10 h-10 rounded-lg bg-ch-primary/10 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                  <Icon className="w-5 h-5 text-ch-primary" />
                </div>
                <h3 className="font-display text-xl tracking-wide text-ch-text mb-1">
                  {title}
                </h3>
                <p className="text-sm text-ch-text-muted leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-ch-surface border-t border-ch-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-ch-text-muted">
          <p>Caldes Connecta — el directori digital de Caldes de Montbui</p>
          <p className="mt-1 text-xs opacity-50">caldesconnecta.cat</p>
        </div>
      </footer>
    </div>
  );
}
