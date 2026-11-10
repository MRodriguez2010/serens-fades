import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Seren's Fades", template: "%s | Seren's Fades" },
  description: "A mobile barber website and interactive design portfolio.",
  icons: { icon: "/assets/logo-monogram.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
