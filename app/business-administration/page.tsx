"use client";

import React from "react";
import BusinessHero from "./components/BusinessHero";
import BusinessDetails from "./components/BusinessDetails";
import BusinessExtraSection from "./components/BusinessExtraSection";

export default function BusinessAdministrationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Content */}
      <div className="flex-grow">
        {/* Animated Hero Section */}
        <BusinessHero />
        
        {/* Course Details & Sidebar Section */}
        <BusinessDetails />

        {/* Extra Info & CTA Sections */}
        <BusinessExtraSection />
      </div>

      {/* Spacing for Footer if needed */}
      <div className="h-10 bg-white" />
    </main>
  );
}
