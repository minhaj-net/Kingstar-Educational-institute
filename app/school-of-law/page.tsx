"use client";

import React from "react";
import LawHero from "./components/LawHero";
import LawDetails from "./components/LawDetails";
import BusinessExtraSection from "../business-administration/components/BusinessExtraSection";

export default function SchoolOfLawPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Page Content Container */}
            <div className="flex-grow">
                {/* B&W Themed Architecture Hero */}
                <LawHero />

                {/* Department Info & Program Details */}
                <LawDetails />
            </div>

            <BusinessExtraSection></BusinessExtraSection>
            {/* Footer Spacing */}
            <div className="h-10 invisible sm:visible mb-10" />

        </main>
    );
}
