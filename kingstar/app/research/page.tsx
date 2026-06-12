import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import {
  FlaskConical, BookOpen, Microscope, Globe2, Users, TrendingUp,
  ArrowRight, ChevronRight, Award, Lightbulb, CheckCircle, Building2,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research Overview | Kingster University",
  description:
    "Discover world-class research at Kingster University — cutting-edge labs, interdisciplinary studies, and groundbreaking publications.",
};

// ─── Icon map (JSON stores icon names as strings) ────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  TrendingUp, FlaskConical, Microscope, BookOpen,
  Globe2, Lightbulb, Users, Building2, Award,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat        { value: string; label: string; icon: string; }
interface FocusArea   { icon: string; title: string; desc: string; color: string; count: string; }
interface Project     { tag: string; tagColor: string; title: string; pi: string; dept: string; funding: string; year: string; desc: string; }
interface Milestone   { year: string; event: string; }

interface ResearchData {
  stats: Stat[];
  missionPoints: string[];
  focusAreas: FocusArea[];
  featuredProjects: Project[];
  milestones: Milestone[];
  partners: string[];
}

// ─── Data fetch ───────────────────────────────────────────────────────────────

async function getData(): Promise<ResearchData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/research-overview.json`,
    { cache: "no-store" }
  );
  return res.json();
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ResearchOverviewPage() {
  const data = await getData();
  const { stats, missionPoints, focusAreas, featuredProjects, milestones, partners } = data;

  return (
    <main>
      <PageHero
        title="Research Overview"
        eyebrow="Advancing Knowledge"
        image="/slide-1.jpg"
        breadcrumbs={[
          { label: "Research", href: "/research" },
          { label: "Overview", href: "/research" },
        ]}
      />

      {/* ── Stats Bar ── */}
      <section className="bg-[#1a2e5a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ value, label, icon }) => {
              const Icon = iconMap[icon] ?? FlaskConical;
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

      {/* ── Mission ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50]">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a] leading-tight">
                Research That Changes <br className="hidden sm:block" /> the World
              </h2>
              <p className="text-gray-500 leading-relaxed">
                At Kingster University, research is the heartbeat of our institution. Our faculty, students,
                and external partners collaborate across disciplines to generate knowledge that directly
                addresses society&apos;s greatest challenges.
              </p>
              <ul className="space-y-3">
                {missionPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#4caf50] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/research/labs-centers"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-semibold rounded-sm transition-colors">
                  Explore Labs <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/research/publications"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#1a2e5a] text-[#1a2e5a] hover:bg-[#1a2e5a] hover:text-white text-sm font-semibold rounded-sm transition-colors">
                  View Publications
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden h-48 bg-gray-100">
                  <img src="/professor.jpg" alt="Professor" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl bg-[#4caf50] p-6 text-white text-center">
                  <p className="text-3xl font-bold">340+</p>
                  <p className="text-xs mt-1 text-white/80">Active Projects</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-xl bg-[#1a2e5a] p-6 text-white text-center">
                  <p className="text-3xl font-bold">89</p>
                  <p className="text-xs mt-1 text-white/60">Labs & Centers</p>
                </div>
                <div className="rounded-xl overflow-hidden h-48 bg-gray-100">
                  <img src="/slide-2.jpg" alt="Research" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Focus Areas ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Disciplines</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a]">Research Focus Areas</h2>
            <p className="text-gray-500 mt-4">Spanning science, technology, humanities, and beyond.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map(({ icon, title, desc, color, count }) => {
              const Icon = iconMap[icon] ?? FlaskConical;
              return (
                <div key={title} className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">{count}</span>
                  </div>
                  <h3 className="font-bold text-[#1a2e5a] mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color }}>
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-2">Spotlight</span>
              <h2 className="text-3xl font-bold text-[#1a2e5a]">Featured Research Projects</h2>
            </div>
            <Link href="/research/publications"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2e5a] hover:text-[#4caf50] transition-colors">
              All Publications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredProjects.map(({ tag, tagColor, title, pi, dept, funding, year, desc }) => (
              <div key={title} className="flex flex-col rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-2" style={{ backgroundColor: tagColor }} />
                <div className="p-7 flex flex-col gap-4 flex-1">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full w-fit"
                    style={{ backgroundColor: `${tagColor}15`, color: tagColor }}>
                    {tag}
                  </span>
                  <h3 className="font-bold text-[#1a2e5a] leading-snug">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{desc}</p>
                  <div className="space-y-1.5 text-xs text-gray-400 border-t border-gray-100 pt-4">
                    <p><span className="font-semibold text-[#1a2e5a]">PI:</span> {pi}</p>
                    <p><span className="font-semibold text-[#1a2e5a]">Dept:</span> {dept}</p>
                    <p><span className="font-semibold text-[#1a2e5a]">Funding:</span> {funding}</p>
                    <p><span className="font-semibold text-[#1a2e5a]">Period:</span> {year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="py-20 bg-[#1a2e5a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">History</span>
            <h2 className="text-3xl font-bold text-white">Research Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/20 hidden sm:block" />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#4caf50] flex items-center justify-center text-white font-bold text-sm">
                    {year}
                  </div>
                  <div className="flex-1 pt-4">
                    <p className="text-white/90 text-sm leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Collaborators</span>
          <h2 className="text-2xl font-bold text-[#1a2e5a] mb-10">Research Partners & Funders</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p) => (
              <span key={p} className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 shadow-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#4caf50]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join Our Research Community</h2>
          <p className="text-white/85 text-lg mb-10">
            Whether you are a prospective PhD student, postdoc, or industry partner — we welcome your collaboration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/research/labs-centers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#4caf50] text-sm font-bold rounded-sm hover:bg-gray-50 transition-colors">
              Explore Labs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold rounded-sm hover:bg-white/10 transition-colors">
              Contact Research Office
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
