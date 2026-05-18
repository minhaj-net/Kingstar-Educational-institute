import type { Metadata } from "next";
import AthleticsHero from "./athletics-component/AthleticsHero";
import AthleticsContent from "./athletics-component/AthleticsContent";
import AthleticsTestimonial from "./athletics-component/AthleticsTestimonial";
import AthleticsStory from "./athletics-component/AthleticsStory";

export const metadata: Metadata = {
  title: "Athletics",
  description:
    "Explore Kingster University Athletics – sports teams, facilities, schedules, and how to get involved in KU's athletic programs.",
};

export default function AthleticsPage() {
  return (
    <>
      {/* ── Athletics Hero ── */}
      <AthleticsHero />

      {/* ── Athletics Content: Intro + News + Events ── */}
      <AthleticsContent />

      {/* ── Testimonial + Partners ── */}
      <AthleticsTestimonial />

      {/* ── KU Team Story + How To Participate ── */}
      <AthleticsStory />
    </>
  );
}
