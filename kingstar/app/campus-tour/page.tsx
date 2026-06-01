import type { Metadata } from "next";
import CampusTourHero from "./campus-component/CampusTourHero";
import CampusTourDetail from "./campus-component/CampusTourDetail";
import CampusTourFAQ from "./campus-component/CampusTourFAQ";
import CampusTourAppointment from "./campus-component/CampusTourAppointment";

export const metadata: Metadata = {
  title: "Campus Tour",
  description:
    "Book a campus tour at Kingster University and experience our world-class facilities, student life, and academic environment firsthand.",
};

export default function CampusTourPage() {
  return (
    <>
      {/* ── Campus Tour Hero ── */}
      <CampusTourHero />

      {/* ── Special Campus Tour Detail ── */}
      <CampusTourDetail />

      {/* ── FAQ + Visitor Info ── */}
      <CampusTourFAQ />

      {/* ── Campus Tour Time + Appointment Form ── */}
      <CampusTourAppointment />
    </>
  );
}
