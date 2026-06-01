import type { Metadata } from "next";
import AlumniHero from "./alumni-component/AlumniHero";
import AlumniContent from "./alumni-component/AlumniContent";
import AlumniAbout from "./alumni-component/AlumniAbout";
import AlumniBenefits from "./alumni-component/AlumniBenefits";

export const metadata: Metadata = {
  title: "Alumni",
  description:
    "Join the Kingster University Alumni Network – over 150,000 graduates worldwide. Stay connected, access resources, and give back to your alma mater.",
};

export default function AlumniPage() {
  return (
    <>
      {/* ── Alumni Hero ── */}
      <AlumniHero />

      {/* ── Alumni Events + Updates ── */}
      <AlumniContent />

      {/* ── Kingster Alumni About band ── */}
      <AlumniAbout />

      {/* ── Benefits & Privileges ── */}
      <AlumniBenefits />
    </>
  );
}
