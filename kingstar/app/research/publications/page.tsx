"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import {
  BookOpen, FileText, Award, TrendingUp, ChevronRight,
  ArrowRight, ExternalLink, Search, Filter, Download,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat        { value: string; label: string; icon: string; }
interface Category    { label: string; count: number; }
interface Publication {
  type: string; typeColor: string; year: string;
  title: string; authors: string; journal: string;
  doi: string; tags: string[]; citations: number; featured: boolean;
}
interface Journal     { name: string; impact: string; }

interface PubData {
  stats: Stat[];
  categories: Category[];
  publications: Publication[];
  topJournals: Journal[];
}

const statIconMap: Record<string, React.ElementType> = {
  FileText, TrendingUp, Award, BookOpen,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PublicationsPage() {
  const [data, setData] = useState<PubData | null>(null);
  const [search, setSearch] = useState("");
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [activeType, setActiveType] = useState("All Publications");

  useEffect(() => {
    fetch("/research-publications.json")
      .then((r) => r.json())
      .then((d: PubData) => setData(d))
      .catch(console.error);
  }, []);

  const publications = data?.publications ?? [];

  const filtered = publications.filter((pub) => {
    const q = search.toLowerCase();
    const matchSearch =
      q === "" ||
      pub.title.toLowerCase().includes(q) ||
      pub.authors.toLowerCase().includes(q) ||
      pub.tags.some((t) => t.toLowerCase().includes(q));
    const matchYear = !activeYear || pub.year === activeYear;
    const typeMap: Record<string, string[]> = {
      "Journal Articles":       ["Journal Article"],
      "Conference Papers":      ["Conference Paper"],
      "Books & Chapters":       ["Book Chapter"],
      "Technical Reports":      ["Technical Report"],
      "Theses & Dissertations": ["Thesis"],
    };
    const allowed = typeMap[activeType];
    const matchType = activeType === "All Publications" || (allowed?.includes(pub.type) ?? false);
    return matchSearch && matchYear && matchType;
  });

  // ── Loading skeleton ──
  if (!data) {
    return (
      <main>
        <PageHero
          title="Publications"
          eyebrow="Research Output"
          image="/slide-3.jpg"
          breadcrumbs={[
            { label: "Research", href: "/research" },
            { label: "Publications", href: "/research/publications" },
          ]}
        />
        <div className="bg-[#1a2e5a] py-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded-xl bg-white animate-pulse border border-gray-100" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        title="Publications"
        eyebrow="Research Output"
        image="/slide-3.jpg"
        breadcrumbs={[
          { label: "Research", href: "/research" },
          { label: "Publications", href: "/research/publications" },
        ]}
      />

      {/* ── Stats ── */}
      <section className="bg-[#1a2e5a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {data.stats.map(({ value, label, icon }) => {
              const Icon = statIconMap[icon] ?? TrendingUp;
              return (
                <div key={label} className="flex flex-col sm:flex-row items-center gap-3 px-6 py-8 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#4caf50]" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-white leading-none">{value}</p>
                    <p className="text-xs text-white/60 mt-1">{label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Search + Filter ── */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, author, keyword…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4caf50] transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {["2024", "2023", "2022"].map((y) => (
                <button
                  key={y}
                  onClick={() => setActiveYear(activeYear === y ? null : y)}
                  className="px-3 py-1.5 text-xs font-medium border rounded-full transition-colors"
                  style={{
                    borderColor: activeYear === y ? "#4caf50" : "#e5e7eb",
                    color: activeYear === y ? "#4caf50" : "#6b7280",
                    backgroundColor: activeYear === y ? "rgba(76,175,80,0.08)" : "transparent",
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a2e5a] text-white text-sm font-semibold rounded-sm hover:bg-[#162448] transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-40">
                <h3 className="text-sm font-bold text-[#1a2e5a] mb-4 pb-3 border-b border-gray-100">
                  Publication Type
                </h3>
                <ul className="space-y-1">
                  {data.categories.map(({ label, count }) => (
                    <li key={label}>
                      <button
                        onClick={() => setActiveType(label)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors"
                        style={{
                          backgroundColor: activeType === label ? "#4caf50" : "transparent",
                          color: activeType === label ? "white" : "#4b5563",
                          fontWeight: activeType === label ? "600" : "400",
                        }}
                      >
                        <span>{label}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: activeType === label ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                            color: activeType === label ? "white" : "#9ca3af",
                          }}
                        >
                          {count.toLocaleString()}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-[#1a2e5a] uppercase tracking-wider mb-3">Top Journals</h4>
                  <ul className="space-y-2">
                    {data.topJournals.map(({ name, impact }) => (
                      <li key={name} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 leading-snug">{name}</span>
                        <span className="text-[#4caf50] font-semibold ml-2 whitespace-nowrap">{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* List */}
            <div className="lg:col-span-3 space-y-4">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
                  <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="font-semibold text-gray-500">No publications found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter.</p>
                </div>
              ) : (
                filtered.map((pub) => (
                  <div
                    key={pub.title}
                    className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4 ${
                      pub.featured ? "border-[#4caf50]/30" : "border-gray-100"
                    }`}
                  >
                    {pub.featured && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50]" />
                        <span className="text-xs font-bold text-[#4caf50] uppercase tracking-wider">Featured</span>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: `${pub.typeColor}15`, color: pub.typeColor }}>
                        {pub.type}
                      </span>
                      <span className="text-xs text-gray-400">{pub.year}</span>
                      {pub.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a2e5a] leading-snug mb-1">{pub.title}</h3>
                      <p className="text-sm text-gray-500">{pub.authors}</p>
                      <p className="text-sm text-gray-400 italic mt-0.5">{pub.journal}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> {pub.citations} citations
                        </span>
                        <span className="font-mono hidden sm:inline">DOI: {pub.doi}</span>
                      </div>
                      <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4caf50] hover:text-[#43a047] transition-colors">
                        View Paper <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))
              )}

              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">Showing {filtered.length} results</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "...", 804].map((p, i) => (
                    <button key={i} className="w-8 h-8 rounded-lg text-xs font-medium transition-colors"
                      style={p === 1
                        ? { backgroundColor: "#4caf50", color: "white" }
                        : { backgroundColor: "white", border: "1px solid #e5e7eb", color: "#6b7280" }}>
                      {p}
                    </button>
                  ))}
                  <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#4caf50] transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#1a2e5a]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Want to Collaborate on Research?</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Our faculty welcome industry partnerships, joint grants, and interdisciplinary collaborations.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-bold rounded-sm transition-colors">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
