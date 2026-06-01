"use client";

import React from "react";
import PhysicsHero from "./components/PhysicsHero";
import PhysicsDetails from "./components/PhysicsDetails";
import BusinessExtraSection from "../business-administration/components/BusinessExtraSection";

export default function PhysicsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Content Holder */}
      <div className="flex-grow">
        {/* Cinematic Scientific Hero */}
        <PhysicsHero />
        
        {/* Core Physics Program Info & Sidebar */}
        <PhysicsDetails />

        {/* Global Academic Tabs & Graduation CTA */}
        <BusinessExtraSection />
      </div>

      {/* Footer Consistency Strip */}
      <div className="h-10 mb-10" />
    </main>
  );
}
