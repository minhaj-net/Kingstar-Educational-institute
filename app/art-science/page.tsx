"use client";

import React from "react";
import ArtScienceHero from "./components/ArtScienceHero";
import ArtScienceDetails from "./components/ArtScienceDetails";
import BusinessExtraSection from "../business-administration/components/BusinessExtraSection";

export default function ArtSciencePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Content Container */}
      <div className="flex-grow">
        {/* Artistic/Classical Academic Hero */}
        <ArtScienceHero />
        
        {/* Program Exploration & Sidebar Info */}
        <ArtScienceDetails />

        {/* Global Academic Tabs & CTA Wrapper */}
        <BusinessExtraSection />
      </div>

      {/* Spacing for layout consistency */}
      <div className="h-10 mb-10" />
    </main>
  );
}
