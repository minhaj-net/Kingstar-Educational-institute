"use client";

import React from "react";
import FinanceHero from "./components/FinanceHero";
import FinanceContentSection from "./components/FinanceContentSection";
import FinanceCurriculum from "./components/FinanceCurriculum";
import BusinessExtraSection from "../business-administration/components/BusinessExtraSection";

export default function FinancePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Page Content Holder */}
            <div className="flex-grow">
                {/* Professional Financial Business Hero */}
                <FinanceHero />

                {/* Detailed Body & Sidebar Content */}
                <FinanceContentSection />

                {/* Dynamic Course Curriculum List */}
                <FinanceCurriculum />

            </div>

            {/* Spacing for Footer consistency */}
            <div className="h-10 mb-10" />
        </main>
    );
}
