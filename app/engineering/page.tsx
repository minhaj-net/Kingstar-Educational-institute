"use client";

import React from "react";
import EngineeringHero from "./components/EngineeringHero";
import EngineeringDetails from "./components/EngineeringDetails";
import BusinessExtraSection from "../business-administration/components/BusinessExtraSection";

export default function EngineeringPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Content */}
      <div className="flex-grow">
        {/* Modern Architecture Hero */}
        <EngineeringHero />
        
        {/* Core Program Info & Sidebar */}
        <EngineeringDetails />

        {/* Universal Extra Info/Tabs Section */}
        <BusinessExtraSection />
      </div>

      {/* Spacing for Footer */}
      <div className="h-10 mb-10" />
    </main>
  );
}
