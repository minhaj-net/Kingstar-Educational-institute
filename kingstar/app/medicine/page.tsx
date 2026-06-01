"use client";

import React from "react";
import MedicineHero from "./components/MedicineHero";
import MedicineDetails from "./components/MedicineDetails";
import BusinessExtraSection from "../business-administration/components/BusinessExtraSection";

export default function MedicinePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Content Container */}
      <div className="flex-grow">
        {/* Modern Hospital/Facility Hero */}
        <MedicineHero />
        
        {/* Core Medical Program Info & Contact Sidebar */}
        <MedicineDetails />

        {/* Global Academic Tabs & CTA Section */}
        <BusinessExtraSection />
      </div>

      {/* Spacing for Footer */}
      <div className="h-10 mb-10" />
    </main>
  );
}
