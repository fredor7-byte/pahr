import type { Metadata } from "next";
import localFont from "next/font/local";
import { generateOrganizationJsonLd } from "@/lib/jsonld";
import "./globals.css";

const angeltaScript = localFont({
  src: "../../public/fonts/angelta-script.ttf",
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pahr | Golf Apparel",
    template: "%s | Pahr",
  },
  description:
    "Ropa de golf con estilo vintage moderno. Hoodies, franelas, polos y pantalones diseñados para el green y más allá.",
  keywords: ["golf", "ropa de golf", "Venezuela", "Pahr", "golf apparel"],
  openGraph: {
    type: "website",
    locale: "es_VE",
    siteName: "Pahr",
    title: "Pahr | Golf Apparel",
    description:
      "Ropa de golf con estilo vintage moderno. Diseñada para el green y más allá.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${angeltaScript.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationJsonLd()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
