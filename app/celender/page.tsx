import type { Metadata } from "next";
import CalendarHero from "./celender-component/CalendarHero";
import CalendarGrid from "./celender-component/CalendarGrid";

export const metadata: Metadata = {
  title: "Event Calendar",
  description:
    "Browse upcoming events at Kingster University – conferences, webinars, festivals, alumni gatherings, and more.",
};

export default function CalendarPage() {
  return (
    <>
      <CalendarHero />
      <CalendarGrid />
    </>
  );
}
