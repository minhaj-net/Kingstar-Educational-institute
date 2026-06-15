"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CareerJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  department: string;
  posted: string;
}

export interface CareerEvent {
  id: number;
  day: string;
  month: string;
  title: string;
  desc: string;
  location: string;
}

export interface CareerTestimonial {
  id: number;
  name: string;
  role: string;
  year: string;
  quote: string;
  rating: number;
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEYS = {
  jobs:         "admin_career_jobs",
  events:       "admin_career_events",
  testimonials: "admin_career_testimonials",
} as const;

// ─── Column definitions ───────────────────────────────────────────────────────

const jobColumns: Column<CareerJob>[] = [
  {
    key: "title", label: "Position", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[220px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  { key: "company", label: "Organization", sortable: true },
  { key: "type",    label: "Type", render: (v) => <StatusBadge value={String(v)} /> },
  { key: "department", label: "Department", hideOnMobile: true },
  { key: "location",   label: "Location",   hideOnMobile: true },
  { key: "posted",     label: "Posted",     hideOnMobile: true },
];

const eventColumns: Column<CareerEvent>[] = [
  {
    key: "title", label: "Event", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[220px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  {
    key: "day", label: "Date",
    render: (v, row) => (
      <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
        {String(v)} {(row as CareerEvent).month}
      </span>
    ),
  },
  { key: "location", label: "Location", hideOnMobile: true },
  {
    key: "desc", label: "Description", hideOnMobile: true,
    render: (v) => (
      <span className="text-xs max-w-[240px] truncate block"
        style={{ color: "var(--text-muted)" }} title={String(v)}>{String(v)}</span>
    ),
  },
];

const testimonialColumns: Column<CareerTestimonial>[] = [
  {
    key: "name", label: "Name", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm" style={{ color: "var(--text)" }}>{String(v)}</span>
    ),
  },
  { key: "role",  label: "Current Role", sortable: true },
  { key: "year",  label: "Batch", hideOnMobile: true },
  {
    key: "rating", label: "Rating",
    render: (v) => (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: "rgba(200,168,75,0.15)", color: "#c8a84b" }}>
        {"★".repeat(Number(v))}
      </span>
    ),
  },
  {
    key: "quote", label: "Quote", hideOnMobile: true,
    render: (v) => (
      <span className="text-xs italic max-w-[260px] truncate block"
        style={{ color: "var(--text-muted)" }} title={String(v)}>"{String(v)}"</span>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = "jobs" | "events" | "testimonials";

export default function CareerAdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("jobs");

  const [jobs,         setJobs]         = useState<CareerJob[]>([]);
  const [events,       setEvents]       = useState<CareerEvent[]>([]);
  const [testimonials, setTestimonials] = useState<CareerTestimonial[]>([]);
  const [loading,      setLoading]      = useState(true);

  // Load all three datasets
  useEffect(() => {
    const load = async () => {
      const loadOne = async <T,>(key: string, url: string): Promise<T[]> => {
        const saved = sessionStorage.getItem(key);
        if (saved) return JSON.parse(saved);
        const d: T[] = await fetch(url).then((r) => r.json());
        sessionStorage.setItem(key, JSON.stringify(d));
        return d;
      };
      const [j, e, t] = await Promise.all([
        loadOne<CareerJob>(KEYS.jobs,         "/career-jobs.json"),
        loadOne<CareerEvent>(KEYS.events,     "/career-events.json"),
        loadOne<CareerTestimonial>(KEYS.testimonials, "/career-testimonials.json"),
      ]);
      setJobs(j); setEvents(e); setTestimonials(t);
      setLoading(false);
    };
    load().catch(console.error);
  }, []);

  function persistJobs(updated: CareerJob[]) {
    setJobs(updated);
    sessionStorage.setItem(KEYS.jobs, JSON.stringify(updated));
  }
  function persistEvents(updated: CareerEvent[]) {
    setEvents(updated);
    sessionStorage.setItem(KEYS.events, JSON.stringify(updated));
  }
  function persistTestimonials(updated: CareerTestimonial[]) {
    setTestimonials(updated);
    sessionStorage.setItem(KEYS.testimonials, JSON.stringify(updated));
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "jobs",         label: "Job Listings",  count: jobs.length },
    { key: "events",       label: "Career Events", count: events.length },
    { key: "testimonials", label: "Testimonials",  count: testimonials.length },
  ];

  const addHref: Record<Tab, string> = {
    jobs:         "/admin/career/jobs/add",
    events:       "/admin/career/events/add",
    testimonials: "/admin/career/testimonials/add",
  };
  const addLabel: Record<Tab, string> = {
    jobs:         "Add Job",
    events:       "Add Event",
    testimonials: "Add Testimonial",
  };

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Career Services</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            Manage job listings, career events, and alumni testimonials
          </p>
        </div>
        <Link href={addHref[tab]}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          <Plus className="w-4 h-4" /> {addLabel[tab]}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b" style={{ borderColor: "var(--border)" }}>
        {tabs.map(({ key, label, count }) => (
          <button key={key} onClick={() => setTab(key)}
            className="px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px"
            style={{
              borderColor: tab === key ? "#4caf50" : "transparent",
              color: tab === key ? "#4caf50" : "var(--text-muted)",
            }}>
            {label}
            <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-faint)" }}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "jobs" && (
        <DataTable
          title=""
          columns={jobColumns}
          data={jobs}
          loading={loading}
          onEdit={(row) => router.push(`/admin/career/jobs/edit/${row.id}`)}
          onDelete={(row) => persistJobs(jobs.filter((j) => j.id !== row.id))}
        />
      )}

      {tab === "events" && (
        <DataTable
          title=""
          columns={eventColumns}
          data={events}
          loading={loading}
          onEdit={(row) => router.push(`/admin/career/events/edit/${row.id}`)}
          onDelete={(row) => persistEvents(events.filter((e) => e.id !== row.id))}
        />
      )}

      {tab === "testimonials" && (
        <DataTable
          title=""
          columns={testimonialColumns}
          data={testimonials}
          loading={loading}
          onEdit={(row) => router.push(`/admin/career/testimonials/edit/${row.id}`)}
          onDelete={(row) => persistTestimonials(testimonials.filter((t) => t.id !== row.id))}
        />
      )}
    </div>
  );
}
