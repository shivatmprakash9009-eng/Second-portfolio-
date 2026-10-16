import type { Metadata, Viewport } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anurag | Front-End Developer",
  description:
    "Portfolio of Anurag, a self-taught front-end developer building modern, responsive and user-friendly websites and web apps.",
};

export const viewport: Viewport = {
  themeColor: "#070314",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${josefin.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
