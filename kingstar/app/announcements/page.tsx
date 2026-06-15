"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "../components/PageHero";
import {
  Bell, Calendar, User, ChevronRight, Search,
  AlertTriangle, Info, AlertCircle, Clock, Tag,
  ArrowRight, BookOpen, ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Announcement {
  id: number;
  title: string;
  slug: string;
  category: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Active" | "Upcoming" | "Expired";
  date: string;
  expiresAt: string;
  author: string;
  excerpt: string;
  body: string;
  tags: string[];
}

// ─── Priority config ──────────────────────────────────────────────────────────

const PRIORITY_CONFIG = {
  Urgent: { bg: "rgba(239,68,68,0.12)",  color: "#ef4444", icon: AlertTriangle },
  High:   { bg: "rgba(234,179,8,0.12)",  color: "#ca8a04", icon: AlertCircle },
  Medium: { bg: "rgba(76,175,80,0.12)",  color: "#4caf50", icon: Info },
  Low:    { bg: "rgba(100,116,139,0.12)",color: "#64748b", icon: Info },
};

const STATUS_CONFIG = {
  Active:   { bg: "rgba(76,175,80,0.12)",  color: "#4caf50",  dot: "#4caf50" },
  Upcoming: { bg: "rgba(200,168,75,0.12)", color: "#c8a84b",  dot: "#c8a84b" },
  Expired:  { bg: "rgba(100,116,139,0.12)",color: "#94a3b8",  dot: "#94a3b8" },
};

const CATEGORIES = ["All", "Academic", "IT & Systems", "Health & Safety", "Campus Operations", "Student Services", "Research"];

// ─── Announcement Card ────────────────────────────────────────────────────────

function AnnouncementCard({ item }: { item: Announcement }) {
  const [expanded, setExpanded] = useState(false);
  const pCfg = PRIORITY_CONFIG[item.priority];
  const sCfg = STATUS_CONFIG[item.status];
  const PIcon = pCfg.icon;

  return (
    <article
      className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      style={{ borderColor: item.priority === "Urgent" ? "#ef4444" : "#f1f5f9",
               borderLeftWidth: "4px",
               borderLeftColor: pCfg.color }}
    >
      <div className="p-6 sm:p-7">
        {/* Top badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Priority */}
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: pCfg.bg, color: pCfg.color }}>
            <PIcon className="w-3 h-3" />
            {item.priority}
          </span>
          {/* Status */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: sCfg.bg, color: sCfg.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sCfg.dot }} />
            {item.status}
          </span>
          {/* Category */}
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#1a2e5a] leading-snug mb-2">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.excerpt}</p>

        {/* Expanded body */}
        {expanded && (
          <div className="mt-2 mb-4 pt-4 border-t border-gray-100 space-y-3">
            {item.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
            ))}
            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    <Tag className="w-2.5 h-2.5" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
            {item.status !== "Expired" && (
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Expires: {item.expiresAt}</span>
            )}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors self-start sm:self-auto"
            style={{ color: pCfg.color }}
          >
            {expanded ? "Show less" : "Read full announcement"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriority, setActivePriority] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");

  useEffect(() => {
    fetch("/announcements.json")
      .then((r) => r.json())
      .then((d: Announcement[]) => setItems(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = q === "" ||
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchPrio = activePriority === "All" || item.priority === activePriority;
    const matchStatus = activeStatus === "All" || item.status === activeStatus;
    return matchSearch && matchCat && matchPrio && matchStatus;
  });

  // Separate urgent/high from others for visual hierarchy
  const urgent  = filtered.filter((i) => i.priority === "Urgent" && i.status === "Active");
  const rest    = filtered.filter((i) => !(i.priority === "Urgent" && i.status === "Active"));

  // Stats
  const activeCount   = items.filter((i) => i.status === "Active").length;
  const upcomingCount = items.filter((i) => i.status === "Upcoming").length;
  const urgentCount   = items.filter((i) => i.priority === "Urgent" || i.priority === "High").length;

  return (
    <main>
      <PageHero
        title="Announcements"
        eyebrow="Official Notices"
        image="/slide-4.jpg"
        breadcrumbs={[{ label: "Announcements", href: "/announcements" }]}
      />

      {/* ── Stats banner ── */}
      <section className="bg-[#1a2e5a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { value: activeCount,   label: "Active Notices",    color: "#4caf50" },
              { value: upcomingCount, label: "Upcoming",          color: "#c8a84b" },
              { value: urgentCount,   label: "High / Urgent",     color: "#ef4444" },
            ].map(({ value, label, color }) => (
              <div key={label} className="px-6 py-8 text-center">
                <p className="text-2xl sm:text-3xl font-bold" style={{ color }}>{value}</p>
                <p className="text-xs text-white/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <section className="bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements…"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4caf50] transition-colors"
            />
          </div>

          {/* Filter chips row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* Category */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-gray-400 mr-1">Category:</span>
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeCategory === cat ? "#1a2e5a" : "#f3f4f6",
                    color: activeCategory === cat ? "white" : "#6b7280",
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Status */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-gray-400 mr-1">Status:</span>
              {["All", "Active", "Upcoming", "Expired"].map((s) => (
                <button key={s} onClick={() => setActiveStatus(s)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeStatus === s ? "#4caf50" : "#f3f4f6",
                    color: activeStatus === s ? "white" : "#6b7280",
                  }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Priority */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-gray-400 mr-1">Priority:</span>
              {["All", "Urgent", "High", "Medium", "Low"].map((p) => (
                <button key={p} onClick={() => setActivePriority(p)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activePriority === p ? "#c8a84b" : "#f3f4f6",
                    color: activePriority === p ? "white" : "#6b7280",
                  }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-7 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <p className="font-semibold text-gray-500 text-lg">No announcements found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Result count */}
              <p className="text-sm text-gray-400">
                Showing <span className="font-semibold text-[#1a2e5a]">{filtered.length}</span> announcement{filtered.length !== 1 ? "s" : ""}
              </p>

              {/* Urgent/High notices first with separator */}
              {urgent.length > 0 && (
                <>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500">Urgent Notices</span>
                    <div className="flex-1 h-px bg-red-200" />
                  </div>
                  {urgent.map((item) => <AnnouncementCard key={item.id} item={item} />)}
                  {rest.length > 0 && (
                    <div className="flex items-center gap-3 pt-2">
                      <Bell className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">All Announcements</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>
                  )}
                </>
              )}

              {rest.map((item) => <AnnouncementCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── Info box ── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
            style={{ backgroundColor: "rgba(76,175,80,0.06)", border: "1px solid rgba(76,175,80,0.2)" }}>
            <div className="w-12 h-12 rounded-xl bg-[#4caf50] flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1a2e5a] mb-1">Stay Up to Date</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Official announcements are posted here as they are issued by university offices.
                For urgent notifications, also check your Kingster email and the student/faculty portal.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://portal.kingster.edu" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4caf50] hover:text-[#43a047] transition-colors">
                  <BookOpen className="w-4 h-4" /> Student Portal
                </a>
                <Link href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a2e5a] hover:text-[#4caf50] transition-colors">
                  Contact Us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-[#1a2e5a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Need to Submit an Official Notice?
          </h2>
          <p className="text-white/70 mb-8 text-sm leading-relaxed max-w-xl mx-auto">
            University offices and department heads can submit official announcements for review
            and publication through the communications portal.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-bold rounded-sm transition-colors">
            Submit an Announcement <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
