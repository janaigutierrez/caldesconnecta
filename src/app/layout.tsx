import type { Metadata } from "next";
import { Roboto, Bebas_Neue } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

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
    <html lang="ca" className={`antialiased ${roboto.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
