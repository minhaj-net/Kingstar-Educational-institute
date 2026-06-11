import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import {
  Microscope, FlaskConical, Cpu, Leaf, HeartPulse, Globe2,
  Users, BookOpen, MapPin, Phone, Mail, ArrowRight,
  ChevronRight, Award, Zap, Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Labs & Research Centers | Kingster University",
  description:
    "Explore Kingster University's 89 state-of-the-art research labs and interdisciplinary centers pushing the boundaries of science and innovation.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "89", label: "Labs & Centers", icon: FlaskConical },
  { value: "420+", label: "Research Staff", icon: Users },
  { value: "$420M", label: "Annual Funding", icon: Award },
  { value: "6", label: "Major Research Clusters", icon: Building2 },
];

const clusters = [
  {
    icon: HeartPulse,
    name: "Biomedical & Health Sciences",
    color: "#4caf50",
    labCount: 18,
    desc: "Advancing human health through genomics, drug discovery, neuroscience, and clinical trials.",
    labs: [
      "Center for Genomic Medicine",
      "KU Neuroscience Institute",
      "Drug Discovery & Development Lab",
      "Clinical Trials Unit",
      "Immunology & Infectious Disease Center",
    ],
  },
  {
    icon: Cpu,
    name: "AI, Data & Computing",
    color: "#1a2e5a",
    labCount: 22,
    desc: "Pioneering machine learning, computer vision, cybersecurity, and human-computer interaction.",
    labs: [
      "KU Artificial Intelligence Lab",
      "Center for Cybersecurity Research",
      "Human-Computer Interaction Lab",
      "Quantum Computing Initiative",
      "Data Science & Analytics Center",
    ],
  },
  {
    icon: Leaf,
    name: "Climate & Sustainability",
    color: "#c8a84b",
    labCount: 14,
    desc: "Addressing climate change, renewable energy, and ecological systems at regional and global scales.",
    labs: [
      "Climate Science Research Center",
      "Renewable Energy Lab",
      "Marine & Coastal Ecology Lab",
      "Urban Sustainability Institute",
      "Carbon Capture Research Unit",
    ],
  },
  {
    icon: FlaskConical,
    name: "Physical & Chemical Sciences",
    color: "#4caf50",
    labCount: 17,
    desc: "Groundbreaking discoveries in materials science, photonics, nanotechnology, and quantum chemistry.",
    labs: [
      "Advanced Materials Lab",
      "Photonics & Optics Center",
      "Nanofabrication Facility",
      "Theoretical Chemistry Lab",
      "Plasma Physics Research Unit",
    ],
  },
  {
    icon: Globe2,
    name: "Social Sciences & Policy",
    color: "#1a2e5a",
    labCount: 10,
    desc: "Evidence-based research on public policy, urban planning, behavioral economics, and global governance.",
    labs: [
      "Center for Public Policy Studies",
      "Urban Development Research Lab",
      "Behavioral Economics Lab",
      "Global Governance Institute",
      "Health Policy Analysis Center",
    ],
  },
  {
    icon: Zap,
    name: "Engineering & Innovation",
    color: "#c8a84b",
    labCount: 8,
    desc: "Translational engineering from robotics and structural design to aerospace and smart infrastructure.",
    labs: [
      "Robotics & Automation Lab",
      "Structural Engineering Research Center",
      "Aerospace Systems Lab",
      "Smart Infrastructure Initiative",
      "Bioengineering & Biomechanics Lab",
    ],
  },
];

const featuredLabs = [
  {
    name: "KU Artificial Intelligence Lab",
    shortName: "KU-AIL",
    cluster: "AI, Data & Computing",
    clusterColor: "#1a2e5a",
    director: "Prof. David Kwon",
    founded: "2010",
    staff: "62 researchers",
    location: "Engineering Tower, Floor 8–10",
    funding: "$38M (active grants)",
    desc: "One of the top-10 AI labs in North America, KU-AIL conducts fundamental and applied research across machine learning, NLP, computer vision, and the ethics of autonomous systems.",
    achievements: [
      "Nature Machine Intelligence publication (2024)",
      "Best Paper Award — NeurIPS 2023",
      "4 active DARPA contracts",
      "Partnership with Google DeepMind",
    ],
  },
  {
    name: "Center for Genomic Medicine",
    shortName: "CGM",
    cluster: "Biomedical & Health Sciences",
    clusterColor: "#4caf50",
    director: "Prof. Elena Vasquez",
    founded: "2005",
    staff: "84 researchers",
    location: "Medical Sciences Building, Wing C",
    funding: "$67M (NIH + private)",
    desc: "A world leader in translational genomics, CGM bridges the gap between basic genome science and clinical application — from rare disease diagnosis to precision cancer therapy.",
    achievements: [
      "Science magazine cover feature (2024)",
      "12 FDA Breakthrough Therapy designations supported",
      "3 spinout biotech companies",
      "Genome sequencing of 50,000+ patients",
    ],
  },
  {
    name: "Climate Science Research Center",
    shortName: "CSRC",
    cluster: "Climate & Sustainability",
    clusterColor: "#c8a84b",
    director: "Prof. Amara Diallo",
    founded: "1998",
    staff: "41 researchers",
    location: "Environmental Sciences Complex",
    funding: "$22M (EPA + EU Horizon)",
    desc: "CSRC integrates satellite remote sensing, climate modeling, and field ecology to produce actionable climate data used by governments and the IPCC.",
    achievements: [
      "Contributing authors to IPCC AR6 Report",
      "EPA Center of Excellence designation",
      "Largest urban carbon database in North America",
      "Policy briefs adopted by 9 state governments",
    ],
  },
];

const facilities = [
  { name: "Electron Microscopy Suite", desc: "Sub-angstrom resolution TEM/SEM facility with cryo-EM capability." },
  { name: "High-Performance Computing Cluster", desc: "5,000+ GPU cluster for large-scale AI and simulation workloads." },
  { name: "BSL-3 Biocontainment Lab", desc: "Certified facility for high-risk pathogen research." },
  { name: "Nanofabrication Cleanroom", desc: "Class 100 cleanroom for semiconductor and nanodevice fabrication." },
  { name: "Wind Tunnel Facility", desc: "Subsonic and supersonic wind tunnels for aerospace and structural research." },
  { name: "MRI Research Suite", desc: "7-Tesla research MRI scanner dedicated to neuroscience studies." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LabsCentersPage() {
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
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center gap-3 px-6 py-8 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#4caf50]" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white leading-none">{value}</p>
                  <p className="text-xs text-white/60 mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">Our Infrastructure</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a] mb-5">
            89 Labs. 6 Research Clusters. <br className="hidden sm:block" /> One Mission.
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
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
            {clusters.map(({ icon: Icon, name, color, labCount, desc, labs }) => (
              <div key={name} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: color }} />
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#1a2e5a] leading-snug text-sm">{name}</h3>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full ml-2"
                          style={{ backgroundColor: `${color}15`, color }}>
                          {labCount} labs
                        </span>
                      </div>
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
            ))}
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
                {/* Left accent panel */}
                <div className="lg:col-span-1 p-8 flex flex-col justify-between" style={{ backgroundColor: `${clusterColor}08`, borderRight: `1px solid ${clusterColor}20` }}>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: clusterColor }}>{cluster}</span>
                    <h3 className="text-xl font-bold text-[#1a2e5a] mt-2 mb-1">{name}</h3>
                    <span className="inline-block text-sm font-mono font-bold px-3 py-1 rounded-full mt-1"
                      style={{ backgroundColor: `${clusterColor}15`, color: clusterColor }}>
                      {shortName}
                    </span>
                  </div>
                  <div className="mt-6 space-y-2.5 text-sm">
                    {[
                      { icon: Users, label: "Director", val: director },
                      { icon: BookOpen, label: "Founded", val: founded },
                      { icon: Users, label: "Staff", val: staff },
                      { icon: MapPin, label: "Location", val: location },
                      { icon: Award, label: "Funding", val: funding },
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
                {/* Right content */}
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
                  <Microscope className="w-4.5 h-4.5 text-[#4caf50]" />
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
              <h2 className="text-3xl font-bold text-white mb-4">
                Interested in Using Our Facilities?
              </h2>
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
              {[
                { icon: Phone, label: "Research Office", val: "+1 (343) 523-5622" },
                { icon: Mail, label: "Email", val: "research@kingster.edu" },
                { icon: MapPin, label: "Location", val: "Research Park, Building R1" },
                { icon: BookOpen, label: "Office Hours", val: "Mon–Fri, 9am–5pm" },
              ].map(({ icon: Icon, label, val }) => (
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
