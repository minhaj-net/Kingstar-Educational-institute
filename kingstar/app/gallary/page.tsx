import type { Metadata } from "next";
import GallaryHero from "./gallary-component/GallaryHero";
import GallaryLayouts from "./gallary-component/GallaryLayouts";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the Kingster University photo gallery – campus life, events, graduation ceremonies, and more.",
};

export default function GallaryPage() {
  return (
    <>
      {/* ── Gallery Hero ── */}
      <GallaryHero />

      {/* ── All 6 Gallery Layouts ── */}
      <GallaryLayouts />
    </>
  );
}
