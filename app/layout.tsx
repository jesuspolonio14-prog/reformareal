import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://reformareal.com"),
  title: {
    default: "ReformaReal · Comparador de reformas en Madrid",
    template: "%s | ReformaReal",
  },
  description:
    "Obtén una estimación del precio de tu reforma en 2 minutos. Compara hasta 3 presupuestos de reformistas verificados en Madrid. Gratis y sin registrarte.",
  keywords: [
    "reforma madrid", "presupuesto reforma madrid", "reformas integrales madrid",
    "precio reforma piso madrid", "reformistas madrid", "reformas cocina madrid",
    "reforma baño madrid", "presupuesto obra madrid", "reformistas verificados",
  ],
  authors: [{ name: "ReformaReal" }],
  creator: "ReformaReal",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://reformareal.com",
    siteName: "ReformaReal",
    title: "ReformaReal · Comparador de reformas en Madrid",
    description:
      "Estima el precio de tu reforma en 2 minutos. Hasta 3 presupuestos de reformistas verificados, comparables y desglosados.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ReformaReal — Presupuestos de reforma en Madrid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReformaReal · Comparador de reformas en Madrid",
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
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
