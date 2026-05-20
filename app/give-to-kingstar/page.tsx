import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GiveHeroSection from "./components/GiveHeroSection";
import AboutFundSection from "./components/AboutFundSection";
import GiveDonationCTA from "./components/GiveDonationCTA";

export const metadata = {
    title: "Give to Kingstar | Support Our Future",
    description: "Your contributions help Kingstar University provide world-class education and resources to our students.",
};

export default function GiveToKingstarPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <div className="flex-grow">
                <GiveHeroSection />
                <AboutFundSection />

                {/* Donation CTA Section with overlapping design */}
                <div className="py-20 md:py-32">
                    <GiveDonationCTA />
                </div>
            </div>
        </main>
    );
}
