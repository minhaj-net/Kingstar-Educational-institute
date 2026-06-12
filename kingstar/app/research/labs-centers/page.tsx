import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import {
  Microscope, FlaskConical, Cpu, Leaf, HeartPulse, Globe2,
  Users, BookOpen, MapPin, Phone, Mail, ArrowRight,
  ChevronRight, Award, Zap, Building2,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Labs & Research Centers | Kingster University",
  description:
    "Explore Kingster University's 89 state-of-the-art research labs and interdisciplinary centers.",
};

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  FlaskConical, Users, Award, Building2,
  HeartPulse, Cpu, Leaf, Globe2, Zap, Microscope,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat       { value: string; label: string; icon: string; }
interface Cluster    { icon: string; name: string; color: string; labCount: number; desc: string; labs: string[]; }
interface FeaturedLab {
  name: string; shortName: string; cluster: string; clusterColor: string;
  director: string; founded: string; staff: string; location: string;
  funding: string; desc: string; achievements: string[];
}
interface Facility   { name: string; desc: string; }
interface Contact    { phone: string; email: string; location: string; hours: string; }

interface LabsData {
  stats: Stat[];
  clusters: Cluster[];
  featuredLabs: FeaturedLab[];
  facilities: Facility[];
  contact: Contact;
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function getData(): Promise<LabsData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/research-labs.json`,
    { cache: "no-store" }
  );
  return res.json();
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LabsCentersPage() {
  const data = await getData();
  const { stats, clusters, featuredLabs, facilities, contact } = data;

  const contactItems = [
    { icon: Phone,   label: "Research Office", val: contact.phone },
    { icon: Mail,    label: "Email",            val: contact.email },
    { icon: MapPin,  label: "Location",         val: contact.location },
    { icon: BookOpen,label: "Office Hours",     val: contact.hours },
  ];

  return (
    <main>
      <PageHero
        title="Labs & Research Centers"
        eyebrow="World-Class Infrastructure"
        image="/slide-2.jpg"
        breadcrumbs={[
          { label: "Research", href: "/research" },
          { label: "Labs & Centers", href: "/research/labs-centers" },
        ]}
      />

      {/* ── Stats ── */}
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

      {/* ── Intro ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Our Infrastructure</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a] mb-5">
            89 Labs. 6 Research Clusters. <br className="hidden sm:block" /> One Mission.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Kingster University&apos;s research infrastructure spans six interdisciplinary clusters, housing
            89 labs and centers equipped with cutting-edge instrumentation. Every facility is designed
            to foster collaboration across departments, disciplines, and international borders.
          </p>
        </div>
      </section>

      {/* ── Research Clusters ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Organization</span>
            <h2 className="text-3xl font-bold text-[#1a2e5a]">Research Clusters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {clusters.map(({ icon, name, color, labCount, desc, labs }) => {
              const Icon = iconMap[icon] ?? FlaskConical;
              return (
                <div key={name} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="h-1.5" style={{ backgroundColor: color }} />
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}15` }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <h3 className="font-bold text-[#1a2e5a] leading-snug text-sm">{name}</h3>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full ml-2 whitespace-nowrap"
                          style={{ backgroundColor: `${color}15`, color }}>
                          {labCount} labs
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    <ul className="space-y-1.5">
                      {labs.map((lab) => (
                        <li key={lab} className="flex items-center gap-2 text-xs text-gray-600">
                          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color }} />
                          {lab}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Labs ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Spotlight</span>
            <h2 className="text-3xl font-bold text-[#1a2e5a]">Featured Labs & Centers</h2>
          </div>
          <div className="space-y-8">
            {featuredLabs.map(({ name, shortName, cluster, clusterColor, director, founded, staff, location, funding, desc, achievements }) => (
              <div key={name} className="grid grid-cols-1 lg:grid-cols-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="lg:col-span-1 p-8 flex flex-col justify-between"
                  style={{ backgroundColor: `${clusterColor}08`, borderRight: `1px solid ${clusterColor}20` }}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: clusterColor }}>{cluster}</span>
                    <h3 className="text-xl font-bold text-[#1a2e5a] mt-2 mb-1">{name}</h3>
                    <span className="inline-block text-sm font-mono font-bold px-3 py-1 rounded-full mt-1"
                      style={{ backgroundColor: `${clusterColor}15`, color: clusterColor }}>
                      {shortName}
                    </span>
                  </div>
                  <div className="mt-6 space-y-2.5">
                    {[
                      { icon: Users,    label: "Director",  val: director },
                      { icon: BookOpen, label: "Founded",   val: founded },
                      { icon: Users,    label: "Staff",     val: staff },
                      { icon: MapPin,   label: "Location",  val: location },
                      { icon: Award,    label: "Funding",   val: funding },
                    ].map(({ icon: I, label, val }) => (
                      <div key={label} className="flex items-start gap-2">
                        <I className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
                        <div>
                          <span className="text-gray-400 text-xs">{label}: </span>
                          <span className="text-gray-700 text-xs font-medium">{val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2 p-8 flex flex-col gap-5 bg-white">
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a2e5a] mb-3">Key Achievements</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: clusterColor }} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                      style={{ color: clusterColor }}>
                      Visit Lab Website <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Facilities ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Shared Infrastructure</span>
            <h2 className="text-3xl font-bold text-[#1a2e5a]">Core Facilities</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              Shared instrumentation available to all KU researchers, industry partners, and visiting scholars.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map(({ name, desc }) => (
              <div key={name} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#4caf50]/10 flex items-center justify-center flex-shrink-0">
                  <Microscope className="w-4 h-4 text-[#4caf50]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a2e5a] text-sm mb-1">{name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Research Office ── */}
      <section className="py-16 bg-[#1a2e5a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Access & Partnerships</span>
              <h2 className="text-3xl font-bold text-white mb-4">Interested in Using Our Facilities?</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                External researchers, industry partners, and visiting scholars are welcome to apply
                for access to our core facilities and collaborate on joint projects.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-semibold rounded-sm transition-colors">
                Contact Research Office <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactItems.map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-[#4caf50]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#4caf50]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">{label}</p>
                    <p className="text-sm text-white font-medium">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
