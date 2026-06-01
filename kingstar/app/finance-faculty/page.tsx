"use client";

import React from "react";
import FacultyHero from "./components/FacultyHero";
import FacultyListSection from "./components/FacultyListSection";

export default function FinanceFacultyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Darkened Navy Academic Hero */}
      <FacultyHero />

      {/* Main Faculty List Directory & Sidebar */}
      <FacultyListSection />

      {/* Footer Spacing Strip */}
      <div className="h-10 mb-10" />
    </main>
  );
}
