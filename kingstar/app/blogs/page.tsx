import type { Metadata } from "next";
import BlogHero from "./blog-component/BlogHero";
import BlogContent from "./blog-component/BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest news, research articles, and updates from Kingster University.",
};

export default function BlogsPage() {
  return (
    <>
      {/* ── Blog Hero ── */}
      <BlogHero />

      {/* ── Blog posts + Sidebar ── */}
      <BlogContent />
    </>
  );
}
