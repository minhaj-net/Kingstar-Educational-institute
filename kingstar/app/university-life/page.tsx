import type { Metadata } from "next";
import UniversityLifeHero from "./university-component/UniversityLifeHero";
import UniversityLifeContent from "./university-component/UniversityLifeContent";
import CampusExperience from "./university-component/CampusExperience";
import UniversityLifeGrid from "./university-component/UniversityLifeGrid";
import UniversityTestimonial from "./university-component/UniversityTestimonial";

export const metadata: Metadata = {
  title: "University Life",
  description:
    "Discover student life at Kingster University – clubs, housing, dining, events, and everything that makes campus life vibrant.",
};

export default function UniversityLifePage() {
  return (
    <>
      {/* ── University Life Hero ── */}
      <UniversityLifeHero />

      {/* ── Events, Activities, Transportation, Parking ── */}
      <UniversityLifeContent />

      {/* ── The Campus Experience (fixed bg) ── */}
      <CampusExperience />

      {/* ── Life Categories Grid ── */}
      <UniversityLifeGrid />

      {/* ── Testimonial ── */}
      <UniversityTestimonial />
    </>
  );
}
