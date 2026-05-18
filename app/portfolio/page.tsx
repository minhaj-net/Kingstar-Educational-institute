import type { Metadata } from "next";
import PortfolioHero from "./portfolio-component/PortfolioHero";
import PortfolioGrid from "./portfolio-component/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Kingster University's portfolio – showcasing our academic achievements, research projects, and campus initiatives.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* ── Portfolio Hero ── */}
      <PortfolioHero />

      {/* ── Portfolio Grid with category filter ── */}
      <PortfolioGrid />
    </>
  );
}
