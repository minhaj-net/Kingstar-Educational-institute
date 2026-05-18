import type { Metadata } from "next";
import ScholarshipsHero from "./scholarships-component/ScholarshipsHero";
import ScholarshipsContent from "./scholarships-component/ScholarshipsContent";
import ScholarshipsContactFAQ from "./scholarships-component/ScholarshipsContactFAQ";

export const metadata: Metadata = {
  title: "Scholarships",
  description:
    "Explore Kingster University scholarships and fellowships – gift aid that does not need to be repaid, including university, federal, state, and outside scholarships.",
};

export default function ScholarshipsPage() {
  return (
    <>
      {/* ── Scholarships Hero ── */}
      <ScholarshipsHero />

      {/* ── Scholarships Sources + Requirements + Featured Student ── */}
      <ScholarshipsContent />

      {/* ── Contact For Scholarship + FAQ ── */}
      <ScholarshipsContactFAQ />
    </>
  );
}
