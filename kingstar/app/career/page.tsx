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
  { value: "94%", label: "Job Placement Rate", icon: TrendingUp },
  { value: "1,200+", label: "Employer Partners", icon: Building2 },
  { value: "3,800+", label: "Students Placed Yearly", icon: Users },
  { value: "$68K", label: "Average Starting Salary", icon: Award },
];

const services = [
  {
    icon: Search,
    title: "Job & Internship Search",
    description:
      "Access thousands of curated job and internship postings from top employers across every industry through our exclusive KU Careers portal.",
    color: "#4caf50",
  },
  {
    icon: BookOpen,
    title: "Resume & Cover Letter",
    description:
      "One-on-one coaching sessions with our career advisors to craft standout resumes and compelling cover letters tailored to your dream role.",
    color: "#1a2e5a",
  },
  {
    icon: Users,
    title: "Mock Interviews",
    description:
      "Practice interviews with industry professionals and receive real-time feedback to help you walk into any interview room with confidence.",
    color: "#c8a84b",
  },
  {
    icon: Handshake,
    title: "Employer Networking",
    description:
      "Connect with hiring managers and alumni through our exclusive networking events, career fairs, and employer info sessions held throughout the year.",
    color: "#4caf50",
  },
  {
    icon: GraduationCap,
    title: "Graduate School Prep",
    description:
      "Guidance on graduate school applications, personal statements, entrance exams, and connecting with faculty for strong recommendations.",
    color: "#1a2e5a",
  },
  {
    icon: TrendingUp,
    title: "Professional Development",
    description:
      "Workshops, certifications, and leadership programs designed to build the professional skills employers demand most in today's market.",
    color: "#c8a84b",
  },
];

const jobListings = [
  {
    title: "Financial Analyst",
    company: "Goldman Sachs",
    location: "New York, NY",
    type: "Full-time",
    department: "Finance",
    posted: "2 days ago",
  },
  {
    title: "Software Engineer Intern",
    company: "Google",
    location: "Mountain View, CA",
    type: "Internship",
    department: "Technology",
    posted: "1 day ago",
  },
  {
    title: "Marketing Coordinator",
    company: "Nike",
    location: "Portland, OR",
    type: "Full-time",
    department: "Marketing",
    posted: "3 days ago",
  },
  {
    title: "Research Associate",
    company: "Pfizer",
    location: "Boston, MA",
    type: "Full-time",
    department: "Research",
    posted: "5 days ago",
  },
  {
    title: "UX Design Intern",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Internship",
    department: "Design",
    posted: "1 week ago",
  },
  {
    title: "Business Development Rep",
    company: "Salesforce",
    location: "San Francisco, CA",
    type: "Full-time",
    department: "Business",
    posted: "4 days ago",
  },
];

const upcomingEvents = [
  {
    date: { day: "14", month: "JUL" },
    title: "Summer Career Fair 2025",
    desc: "Meet 80+ employers across Finance, Tech, Healthcare & more.",
    location: "Main Campus — Hall A",
  },
  {
    date: { day: "21", month: "JUL" },
    title: "Resume Workshop",
    desc: "Live coaching session with certified career advisors.",
    location: "Career Center, Room 204",
  },
  {
    date: { day: "28", month: "JUL" },
    title: "Mock Interview Day",
    desc: "Back-to-back 30-min sessions with industry recruiters.",
    location: "Business School — B Wing",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer at Google",
    year: "Class of 2023",
    quote:
      "The career center helped me refine my resume and prep for technical interviews. I landed my dream job at Google within 3 months of graduation.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Investment Analyst at JPMorgan",
    year: "Class of 2022",
    quote:
      "The networking events they organized were invaluable. I met my hiring manager at a KU career fair and got an offer on the spot.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Product Manager at Microsoft",
    year: "Class of 2024",
    quote:
      "From mock interviews to salary negotiation coaching — the career team supported me every step of the way. Couldn't be more grateful.",
    rating: 5,
  },
];

const steps = [
  { step: "01", title: "Create Your Profile", desc: "Sign up on KU Careers portal and complete your professional profile." },
  { step: "02", title: "Meet Your Advisor", desc: "Book a free one-on-one session with a dedicated career advisor." },
  { step: "03", title: "Explore Opportunities", desc: "Browse job listings, internships, and upcoming career events." },
  { step: "04", title: "Apply & Get Hired", desc: "Submit applications with our support and land your ideal role." },
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
                alumni at every stage of their professional journey. From your first internship to
                executive-level roles, we provide the tools, connections, and guidance you need to thrive.
              </p>
              <ul className="space-y-3">
                {[
                  "Personalized one-on-one career coaching",
                  "Access to 1,200+ employer partnerships",
                  "Year-round career fairs and networking events",
                  "Online job board updated daily",
                  "Alumni mentorship program",
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
                    <p className="text-3xl font-bold">94%</p>
                    <p className="text-xs text-white/70 mt-1">Placement Rate</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-xl overflow-hidden h-32 bg-[#4caf50] flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <p className="text-3xl font-bold">1,200+</p>
                    <p className="text-xs text-white/80 mt-1">Employer Partners</p>
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
            Book a free session with a career advisor today and take the first step
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
