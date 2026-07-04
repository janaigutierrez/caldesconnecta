import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caldes Connecta — Directori digital de Caldes de Montbui",
  description:
    "Troba tots els negocis locals de Caldes de Montbui en un sol lloc. Restaurants, botigues, serveis i artesania del municipi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className="antialiased">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
