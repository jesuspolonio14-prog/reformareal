import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://reformareal.com"),
  title: {
    default: "ReformaReal · Comparador de reformas en tu ciudad",
    template: "%s | ReformaReal",
  },
  description:
    "Obtén una estimación del precio de tu reforma en 2 minutos. Compara hasta 3 presupuestos de reformistas verificados en tu ciudad. Gratis y sin registrarte.",
  keywords: [
    "reforma madrid", "presupuesto reforma madrid", "reformas integrales madrid",
    "precio reforma piso madrid", "reformistas madrid", "reformas cocina madrid",
    "reforma baño madrid", "presupuesto obra madrid", "reformistas verificados",
    "reforma barcelona", "presupuesto reforma españa", "reformistas verificados españa",
    "reforma integral españa", "precio reforma piso",
  ],
  authors: [{ name: "ReformaReal" }],
  creator: "ReformaReal",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://reformareal.com",
    siteName: "ReformaReal",
    title: "ReformaReal · Comparador de reformas en tu ciudad",
    description:
      "Estima el precio de tu reforma en 2 minutos. Hasta 3 presupuestos de reformistas verificados, comparables y desglosados.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ReformaReal — Presupuestos de reforma en España",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReformaReal · Comparador de reformas en tu ciudad",
    description: "Estima el precio de tu reforma en 2 minutos. Reformistas verificados.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://reformareal.com",
  },
  verification: {
    google: "gt9certFZY1On9p992xMSAmyjyz_s8sQ6IhsMix8Jo0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans">{children}<Analytics /></body>
    </html>
  );
}
