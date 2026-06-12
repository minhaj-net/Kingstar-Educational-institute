"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "../components/PageHero";
import {
  Calendar, Mail, Search, ChevronRight, Tag, Download,
  Newspaper, ArrowRight, FileText,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PressRelease {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  contact: string;
  excerpt: string;
  body: string;
  tags: string[];
}

// ─── Expanded PR card ─────────────────────────────────────────────────────────

function PRCard({ item }: { item: PressRelease }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#4caf50] to-[#1a2e5a]" />

      <div className="p-6 sm:p-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}>
                {item.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="w-3 h-3" /> {item.date}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1a2e5a] leading-snug">
              {item.title}
            </h3>
          </div>

          {/* Download button */}
          <button
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-colors flex-shrink-0"
            style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#4caf50";
              e.currentTarget.style.color = "#4caf50";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.color = "#6b7280";
            }}
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </button>
        </div>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.excerpt}</p>

        {/* Expandable body */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="prose prose-sm max-w-none">
              {item.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3">{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" /> {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Media contact */}
            <a href={`mailto:${item.contact}`}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#4caf50] transition-colors">
              <Mail className="w-3 h-3" /> {item.contact}
            </a>

            {/* Read full / collapse */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4caf50] hover:text-[#43a047] transition-colors"
            >
              {expanded ? "Show less" : "Read full release"}
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Research", "Technology", "Academic", "Campus"];

export default function PressReleasesPage() {
  const [releases, setReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/press-releases.json")
      .then((r) => r.json())
      .then((d: PressRelease[]) => setReleases(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = releases.filter((pr) => {
    const matchCat = activeCategory === "All" || pr.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = q === "" ||
      pr.title.toLowerCase().includes(q) ||
      pr.excerpt.toLowerCase().includes(q) ||
      pr.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <main>
      <PageHero
        title="Press Releases"
        eyebrow="Media Center"
        image="/slide-4.jpg"
        breadcrumbs={[
          { label: "News", href: "/news" },
          { label: "Press Releases", href: "/press-releases" },
        ]}
      />

      {/* ── Stats bar ── */}
      <section className="bg-[#1a2e5a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "6+", label: "Releases This Year" },
              { value: "12", label: "Media Contacts" },
              { value: "94", label: "Press Mentions (2024)" },
              { value: "48h", label: "Response Time" },
            ].map(({ value, label }) => (
              <div key={label} className="px-6 py-8 text-center">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-white/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media contact banner ── */}
      <section className="bg-[#4caf50]/10 border-b border-[#4caf50]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#4caf50] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a2e5a]">Media Inquiries</p>
                <p className="text-xs text-gray-500">For press inquiries, interview requests, or high-res assets:</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a href="mailto:media@kingster.edu"
                className="flex items-center gap-1.5 font-semibold text-[#4caf50] hover:text-[#43a047] transition-colors">
                <Mail className="w-4 h-4" /> media@kingster.edu
              </a>
              <Link href="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a2e5a] hover:text-[#4caf50] transition-colors">
                Contact Us <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search + Filter ── */}
      <section className="bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search press releases…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4caf50] transition-colors"
              />
            </div>
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

      {/* ── Press releases list ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-8 space-y-4">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <p className="font-semibold text-gray-500 text-lg">No press releases found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  {filtered.length} press release{filtered.length !== 1 ? "s" : ""}
                  {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                </p>
              </div>
              <div className="space-y-5">
                {filtered.map((pr) => <PRCard key={pr.id} item={pr} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Media kit CTA ── */}
      <section className="py-16 bg-[#1a2e5a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">
                Media Resources
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Download the KU Media Kit
              </h2>
              <p className="text-white/70 leading-relaxed">
                Access official logos, brand guidelines, campus photography, faculty headshots,
                and fact sheets for media use.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-bold rounded-sm transition-colors">
                <Download className="w-4 h-4" /> Download Media Kit
              </button>
              <Link href="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-white/30 hover:border-white text-white text-sm font-bold rounded-sm transition-colors">
                <Mail className="w-4 h-4" /> Contact PR Office
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cross links ── */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "Latest News",       href: "/news" },
            { label: "Blog & Articles",   href: "/blogs" },
            { label: "Research Updates",  href: "/research" },
            { label: "Events Calendar",   href: "/celender" },
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
