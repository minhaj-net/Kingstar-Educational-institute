import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import AboutHistorySection from "../components/AboutHistorySection";
import AboutFeaturesSection from "../components/AboutFeaturesSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Kingster University – our history, mission, and commitment to excellence in higher education since 1920.",
};

export default function AboutUsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        eyebrow="Know Us Better"
        title="About Us"
        image="/slide-3.jpg"
        breadcrumbs={[{ label: "About Us", href: "/about-us" }]}
      />

      {/* ── History + Pillars ── */}
      <AboutHistorySection />

      {/* ── Feature blocks + Partners ── */}
      <AboutFeaturesSection />
    </>
  );
}
