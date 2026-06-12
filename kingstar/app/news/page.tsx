"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "../components/PageHero";
import {
  Clock, User, Tag, ArrowRight, Search, ChevronRight, Newspaper,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tag: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  featured: boolean;
}

// ─── Tag badge ────────────────────────────────────────────────────────────────

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    HOT:      { bg: "#ef444415", text: "#ef4444" },
    RESEARCH: { bg: "#4caf5015", text: "#4caf50" },
    EVENT:    { bg: "#c8a84b15", text: "#c8a84b" },
    UPDATES:  { bg: "#1a2e5a15", text: "#1a2e5a" },
  };
  const style = colors[tag] ?? { bg: "#6b728015", text: "#6b7280" };
  return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
      style={{ backgroundColor: style.bg, color: style.text }}>
      {tag}
    </span>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({ item }: { item: NewsItem }) {
  return (
    <article className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <TagBadge tag={item.tag} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-xs text-white/70 mb-1.5 block">{item.category}</span>
          <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 group-hover:text-[#4caf50] transition-colors">
            {item.title}
          </h3>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{item.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.readTime}</span>
          </div>
          <Link href={`/news/${item.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#4caf50] hover:text-[#43a047] transition-colors">
            Read more <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Regular news card ────────────────────────────────────────────────────────

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <TagBadge tag={item.tag} />
          <span className="text-xs text-gray-400">{item.category}</span>
        </div>
        <h3 className="font-bold text-[#1a2e5a] text-sm leading-snug line-clamp-2
          group-hover:text-[#4caf50] transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.readTime}</span>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Research", "Technology", "Campus Life", "Faculty", "Academics", "Admissions"];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/news.json")
      .then((r) => r.json())
      .then((d: NewsItem[]) => setNews(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = news.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = q === "" ||
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((n) => n.featured);
  const regular  = filtered.filter((n) => !n.featured);

  return (
    <main>
      <PageHero
        title="Latest News"
        eyebrow="Kingster University"
        image="/slide-3.jpg"
        breadcrumbs={[
          { label: "News", href: "/news" },
          { label: "Latest News", href: "/news" },
        ]}
      />

      {/* ── Search + Filter bar ── */}
      <section className="bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4caf50] transition-colors"
              />
            </div>
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeCategory === cat ? "#4caf50" : "#f3f4f6",
                    color: activeCategory === cat ? "white" : "#6b7280",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            /* Skeleton */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white border border-gray-100">
                  <div className="h-64 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <p className="font-semibold text-gray-500 text-lg">No news found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <>
              {/* Featured grid */}
              {featured.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50]">Featured</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((item) => <FeaturedCard key={item.id} item={item} />)}
                  </div>
                </div>
              )}

              {/* Regular list */}
              {regular.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-gray-400">
                      All News {activeCategory !== "All" ? `· ${activeCategory}` : ""}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">{regular.length} articles</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {regular.map((item) => <NewsCard key={item.id} item={item} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="py-16 bg-[#1a2e5a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">
            Stay Informed
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Never Miss a Kingster Update
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Subscribe to our weekly newsletter and get the latest news, research breakthroughs,
            and campus events delivered directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#4caf50] text-gray-800"
            />
            <button type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-semibold rounded-sm transition-colors">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* ── Quick links ── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "Blog & Articles", href: "/blogs" },
            { label: "Press Releases", href: "/press-releases" },
            { label: "Research News", href: "/research" },
            { label: "Events Calendar", href: "/celender" },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a2e5a] hover:text-[#4caf50] transition-colors">
              {label} <ChevronRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
