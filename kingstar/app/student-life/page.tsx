import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Student Life | Kingster University",
  description: "Discover student clubs, housing, wellness, and campus activities at Kingster University.",
};

export default function StudentLifePage() {
  return (
    <main>
      <PageHero
        title="Student Life"
        eyebrow="Kingster University"
        image="/slide-2.jpg"
        breadcrumbs={[{ label: "Student Life", href: "/student-life" }]}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#1a2e5a] mb-4">Life at Kingster</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          From student clubs and sports to dining and housing — discover all the ways to make
          the most of your time at Kingster. Content coming soon.
        </p>
      </section>
    </main>
  );
}
