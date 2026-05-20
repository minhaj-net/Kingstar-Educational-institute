"use client";

import React from "react";
import HospitalityHero from "./components/HospitalityHero";
import HospitalityDetails from "./components/HospitalityDetails";
import BusinessExtraSection from "../business-administration/components/BusinessExtraSection";

export default function HospitalityManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Content Container */}
      <div className="flex-grow">
        {/* Luxury Interior Themed Hero */}
        <HospitalityHero />
        
        {/* Department Info & Program Breakdown */}
        <HospitalityDetails />

        {/* Global Academic Tabs & Success CTA Section */}
        <BusinessExtraSection />
      </div>

      {/* Footer Consistency Spacing */}
      <div className="h-10 mb-10" />
    </main>
  );
}
