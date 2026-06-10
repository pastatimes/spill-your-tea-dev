import type { Metadata } from "next";
import { Geist, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kimberley van Ruiven · Spill Your Tea",
  description: "Ethische AI zonder bullshit. Door Kimberley van Ruiven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${geist.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
