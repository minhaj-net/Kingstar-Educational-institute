import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Announcements | Kingster University",
  description: "Official announcements, notices, and updates from Kingster University.",
};

export default function AnnouncementsPage() {
  return (
    <main>
      <PageHero
        title="Announcements"
        eyebrow="Kingster University"
        image="/slide-4.jpg"
        breadcrumbs={[{ label: "Announcements", href: "/announcements" }]}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#1a2e5a] mb-4">Official Announcements</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Important notices regarding academic calendar, policy updates, and campus operations.
          Content coming soon.
        </p>
      </section>
    </main>
  );
}
