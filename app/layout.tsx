import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/app/components/site-shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lämpökamu | Lämpöpumput ja asiantuntija-apu",
  description: "Lämpökamu tarjoaa luotettavia ilmalämpöpumppuja ja ilmavesilämpöpumppuja suomalaisiin koteihin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className="h-full antialiased">
      <body className={`${inter.className} min-h-full bg-gray-50`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
