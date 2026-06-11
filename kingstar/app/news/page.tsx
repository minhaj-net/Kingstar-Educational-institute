import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "News | Kingster University",
  description: "Stay up to date with the latest news and stories from Kingster University.",
};

export default function NewsPage() {
  return (
    <main>
      <PageHero
        title="News"
        eyebrow="Kingster University"
        image="/slide-3.jpg"
        breadcrumbs={[{ label: "News", href: "/news" }]}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#1a2e5a] mb-4">University News</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Breaking news, faculty achievements, campus updates, and more. Content coming soon.
        </p>
      </section>
    </main>
  );
}
