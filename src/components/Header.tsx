export default function Header() {
  return (
    <header className="bg-ch-surface border-b border-ch-border">
      <div className="max-w-5xl mx-auto px-4 py-5 sm:py-7">
        <img
          src="/logo.svg"
          alt="Caldes Connecta"
          className="h-14 sm:h-20 w-auto"
        />
        <p className="text-sm text-ch-text-muted mt-1.5">
          Directori digital de Caldes de Montbui
        </p>
      </div>
    </header>
  );
}
