import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Template: "Page Name | Kingster University"
  // Individual pages override the `title` field; this acts as the fallback.
  title: {
    default: "Kingster University",
    template: "%s | Kingster University",
  },
  description:
    "Kingster University – One of the largest, most diverse universities in the USA with over 90,000 students and programs across 180 countries.",
  keywords: [
    "Kingster University",
    "university",
    "higher education",
    "admissions",
    "academics",
    "campus life",
  ],
  authors: [{ name: "Kingster University" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Kingster University",
    description:
      "Excellence in Education – Kingster University offers world-class programs across 180 countries.",
    type: "website",
    locale: "en_US",
    siteName: "Kingster University",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
