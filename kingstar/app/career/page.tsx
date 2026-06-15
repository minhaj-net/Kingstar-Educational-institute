import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import {
  Briefcase,
  GraduationCap,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  ChevronRight,
  Search,
  Building2,
  Award,
  BookOpen,
  Handshake,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Career Services | Kingster University",
  description:
    "Launch your future with Kingster's career services — job placement, internships, career fairs, and professional development resources.",
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const stats = [
  { value: "88%", label: "Graduate Employment Rate", icon: TrendingUp },
  { value: "320+", label: "Recruiting Organizations", icon: Building2 },
  { value: "2,400+", label: "Students Placed (2024)", icon: Users },
  { value: "48K", label: "Avg. Starting Salary (BDT/mo)", icon: Award },
];

const services = [
  {
    icon: Search,
    title: "Job & Internship Portal",
    description:
      "Access curated job and internship listings from 320+ partner organizations including local corporations, NGOs, development agencies, and multinational firms operating in Bangladesh.",
    color: "#4caf50",
  },
  {
    icon: BookOpen,
    title: "CV & Cover Letter Clinic",
    description:
      "Individual coaching with career counselors to build professional CVs and cover letters aligned with industry expectations in Bangladesh and abroad.",
    color: "#1a2e5a",
  },
  {
    icon: Users,
    title: "Mock Interviews",
    description:
      "Structured practice interviews conducted by HR professionals and industry practitioners to help students build confidence and sharpen their communication skills.",
    color: "#c8a84b",
  },
  {
    icon: Handshake,
    title: "Industry Networking",
    description:
      "Regular industry connect sessions, alumni talks, and employer information sessions to help students build professional networks before graduation.",
    color: "#4caf50",
  },
  {
    icon: GraduationCap,
    title: "Higher Study Advising",
    description:
      "Guidance on postgraduate applications, scholarship opportunities, IELTS/GRE preparation, and connecting with faculty for recommendation letters.",
    color: "#1a2e5a",
  },
  {
    icon: TrendingUp,
    title: "Skill Development Programs",
    description:
      "Short courses, workshops, and certification programs in leadership, communication, digital literacy, and entrepreneurship to enhance employability.",
    color: "#c8a84b",
  },
];

const jobListings = [
  {
    title: "Lecturer, Department of Computer Science",
    company: "Kingster University",
    location: "Dhaka, Bangladesh",
    type: "Faculty",
    department: "Computer Science & Engineering",
    posted: "2 days ago",
  },
  {
    title: "Research Assistant — Biomedical Lab",
    company: "Kingster University",
    location: "Dhaka, Bangladesh",
    type: "Research",
    department: "School of Medicine",
    posted: "1 week ago",
  },
  {
    title: "Management Trainee",
    company: "BRAC Bank Limited",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    department: "Banking & Finance",
    posted: "3 days ago",
  },
  {
    title: "Business Analyst Intern",
    company: "Grameenphone",
    location: "Dhaka, Bangladesh",
    type: "Internship",
    department: "Business & Strategy",
    posted: "5 days ago",
  },
  {
    title: "Junior Software Engineer",
    company: "Brain Station 23",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    department: "Software Engineering",
    posted: "2 days ago",
  },
  {
    title: "Program Associate",
    company: "UNDP Bangladesh",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    department: "Development & Policy",
    posted: "4 days ago",
  },
];

const upcomingEvents = [
  {
    date: { day: "15", month: "JUL" },
    title: "Annual Career Fair 2025",
    desc: "Meet 60+ recruiters from top corporations, NGOs, and government agencies.",
    location: "KU Auditorium — Main Campus",
  },
  {
    date: { day: "22", month: "JUL" },
    title: "CV Writing Workshop",
    desc: "Hands-on workshop with HR professionals from leading Bangladeshi firms.",
    location: "Career Center, Room 204",
  },
  {
    date: { day: "30", month: "JUL" },
    title: "Alumni Talk: Life After KU",
    desc: "Successful KU graduates share their journeys across industries.",
    location: "Seminar Hall — Academic Block B",
  },
];

const testimonials = [
  {
    name: "Tasnim Rahman",
    role: "Software Engineer, Pathao",
    year: "Class of 2023",
    quote:
      "The career center's mock interview sessions and CV clinic gave me the confidence I needed. I got placed at Pathao within two months of graduation.",
    rating: 5,
  },
  {
    name: "Rafiqul Islam",
    role: "Credit Analyst, Dutch-Bangla Bank",
    year: "Class of 2022",
    quote:
      "The annual career fair directly connected me with my current employer. The preparation workshops made all the difference in standing out during interviews.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Program Officer, BRAC",
    year: "Class of 2024",
    quote:
      "Career Services helped me pivot from corporate to the development sector. The advisors understood my goals and connected me with the right opportunities.",
    rating: 5,
  },
];

const steps = [
  { step: "01", title: "Register on KU Careers", desc: "Create your profile on the KU Careers portal with your academic and professional details." },
  { step: "02", title: "Meet a Career Advisor", desc: "Book a free consultation session with a dedicated career counselor." },
  { step: "03", title: "Attend Events & Fairs", desc: "Participate in career fairs, industry talks, and networking sessions." },
  { step: "04", title: "Apply & Get Placed", desc: "Apply to curated openings with our support and secure your ideal position." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareerPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <PageHero
        title="Career Services"
        eyebrow="Launch Your Future"
        image="/campus_building.png"
        breadcrumbs={[{ label: "Career Services", href: "/career" }]}
      />

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
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
                  <p className="text-xs text-white/60 mt-1 leading-snug">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO — Why KU Career Services
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div className="space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50]">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a] leading-tight">
                Your Career Journey <br className="hidden sm:block" />
                Starts Here
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Kingster University&apos;s Career Services Center is dedicated to empowering students and
                alumni at every stage of their professional journey. From securing your first internship
                to landing a faculty position or joining a top organization — we provide the tools,
                connections, and guidance you need to thrive in Bangladesh and globally.
              </p>
              <ul className="space-y-3">
                {[
                  "Personalized one-on-one career counseling",
                  "Access to 320+ partner organizations & employers",
                  "Semester-wise career fairs and industry connect sessions",
                  "KU Careers online job board updated regularly",
                  "Alumni mentorship and networking program",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#4caf50] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4caf50] hover:bg-[#43a047] text-white text-sm font-semibold rounded-sm transition-colors duration-200"
              >
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right image grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden h-48 bg-gray-100">
                  <img src="/students.jpg" alt="Students" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden h-32 bg-[#1a2e5a] flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <p className="text-3xl font-bold">88%</p>
                    <p className="text-xs text-white/70 mt-1">Employment Rate</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-xl overflow-hidden h-32 bg-[#4caf50] flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <p className="text-3xl font-bold">320+</p>
                    <p className="text-xs text-white/80 mt-1">Partner Organizations</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden h-48 bg-gray-100">
                  <img src="/campus_building.png" alt="Campus" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a]">
              Comprehensive Career Services
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Everything you need to transition from student to professional — all under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-base font-bold text-[#1a2e5a] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color }}>
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">
              Getting Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a]">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, title, desc }, i) => (
              <div key={step} className="relative text-center">
                {/* Connector line (not on last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-1/2 w-full h-px bg-gray-200 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-[#4caf50] bg-white flex items-center justify-center">
                    <span className="text-lg font-bold text-[#4caf50]">{step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a2e5a] mb-1">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          JOB LISTINGS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-2">
                Opportunities
              </span>
              <h2 className="text-3xl font-bold text-[#1a2e5a]">Latest Job Openings</h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2e5a] hover:text-[#4caf50] transition-colors duration-200"
            >
              View All Jobs <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {jobListings.map((job) => (
              <div
                key={job.title + job.company}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4.5 h-4.5 text-[#1a2e5a]" />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: job.type === "Internship" ? "rgba(200,168,75,0.12)" : "rgba(76,175,80,0.12)",
                      color: job.type === "Internship" ? "#c8a84b" : "#4caf50",
                    }}
                  >
                    {job.type}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-bold text-[#1a2e5a] mb-0.5">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.posted}
                  </span>
                </div>

                {/* CTA */}
                <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Posted {job.posted}</span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#4caf50] hover:text-[#43a047] transition-colors"
                  >
                    Apply Now <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          UPCOMING EVENTS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">
              Mark Your Calendar
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a2e5a]">
              Upcoming Career Events
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map(({ date, title, desc, location }) => (
              <div
                key={title}
                className="flex gap-5 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#1a2e5a] flex flex-col items-center justify-center text-white">
                  <span className="text-lg font-bold leading-none">{date.day}</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5 text-white/70">{date.month}</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-[#1a2e5a] text-sm leading-snug">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  <span className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <MapPin className="w-3 h-3 text-[#4caf50]" /> {location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-[#1a2e5a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4caf50] mb-3">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Hear From Our Alumni
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, year, quote, rating }) => (
              <div
                key={name}
                className="bg-white/5 border border-white/10 rounded-xl p-7 flex flex-col gap-5 hover:bg-white/10 transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c8a84b] text-[#c8a84b]" />
                  ))}
                </div>

                <p className="text-white/80 text-sm leading-relaxed italic flex-1">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#4caf50] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-white/50 text-xs">{role} · {year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-[#4caf50]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Launch Your Career?
          </h2>
          <p className="text-white/85 text-lg mb-10 leading-relaxed">
            Book a free session with a career counselor today and take the first step
            toward your professional future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/apply-kingstar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#4caf50] text-sm font-bold rounded-sm hover:bg-gray-50 transition-colors duration-200"
            >
              Book an Appointment <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-bold rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
