import type { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import AdmissionSection from "./components/AdmissionSection";
import AboutSection from "./components/AboutSection";
import NewsSection from "./components/NewsSection";
import VideoTourSection from "./components/VideoTourSection";
import WhyChooseSection from "./components/WhyChooseSection";
import ProgramsEventsSection from "./components/ProgramsEventsSection";
import CourseSearchSection from "./components/CourseSearchSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Kingster University – Explore 180+ majors, world-class faculty, and a vibrant campus life.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AdmissionSection />
      <AboutSection />
      <NewsSection />
      <VideoTourSection />
      <WhyChooseSection />
      <ProgramsEventsSection />
      <CourseSearchSection />
    </>
  );
}
