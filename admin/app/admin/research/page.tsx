"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ResearchStat     { value: string; label: string; icon: string; }
export interface ResearchFocus    { icon: string; title: string; desc: string; color: string; count: string; }
export interface ResearchProject  {
  tag: string; tagColor: string; title: string;
  pi: string; dept: string; funding: string; year: string; desc: string;
}
export interface ResearchMilestone { year: string; event: string; }

export interface ResearchOverviewData {
  stats: ResearchStat[];
  missionPoints: string[];
  focusAreas: ResearchFocus[];
  featuredProjects: ResearchProject[];
  milestones: ResearchMilestone[];
  partners: string[];
}

const STORAGE_KEY = "admin_research_overview";

// ─── Column definitions ───────────────────────────────────────────────────────

const projectColumns: Column<ResearchProject & { _id: number }>[] = [
  {
    key: "tag", label: "Tag",
    render: (v) => <StatusBadge value={String(v)} />,
  },
  {
    key: "title", label: "Title", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[220px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  { key: "pi", label: "Principal Investigator", sortable: true, hideOnMobile: true },
  { key: "dept", label: "Department", hideOnMobile: true },
  { key: "funding", label: "Funding", hideOnMobile: true },
  { key: "year", label: "Period", hideOnMobile: true },
];

const focusColumns: Column<ResearchFocus & { _id: number }>[] = [
  {
    key: "title", label: "Focus Area", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm" style={{ color: "var(--text)" }}>{String(v)}</span>
    ),
  },
  { key: "count", label: "Projects", sortable: true },
  {
    key: "desc", label: "Description", hideOnMobile: true,
    render: (v) => (
      <span className="text-sm max-w-[300px] truncate block" style={{ color: "var(--text-muted)" }}
        title={String(v)}>{String(v)}</span>
    ),
  },
];

const milestoneColumns: Column<ResearchMilestone & { _id: number }>[] = [
  { key: "year", label: "Year", sortable: true,
    render: (v) => (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}>{String(v)}</span>
    ),
  },
  { key: "event", label: "Milestone / Event", sortable: true,
    render: (v) => (
      <span className="text-sm" style={{ color: "var(--text)" }}>{String(v)}</span>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResearchOverviewAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<ResearchOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"projects" | "focus" | "milestones" | "partners">("projects");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
      setLoading(false);
      return;
    }
    fetch("/research-overview.json")
      .then((r) => r.json())
      .then((d: ResearchOverviewData) => {
        setData(d);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: ResearchOverviewData) {
    setData(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // ── Project handlers ──
  function handleEditProject(row: ResearchProject & { _id: number }) {
    router.push(`/admin/research/projects/edit/${row._id}`);
  }
  function handleDeleteProject(row: ResearchProject & { _id: number }) {
    if (!data) return;
    persist({ ...data, featuredProjects: data.featuredProjects.filter((_, i) => i !== row._id) });
  }

  // ── Focus area handlers ──
  function handleEditFocus(row: ResearchFocus & { _id: number }) {
    router.push(`/admin/research/focus/edit/${row._id}`);
  }
  function handleDeleteFocus(row: ResearchFocus & { _id: number }) {
    if (!data) return;
    persist({ ...data, focusAreas: data.focusAreas.filter((_, i) => i !== row._id) });
  }

  // ── Milestone handlers ──
  function handleEditMilestone(row: ResearchMilestone & { _id: number }) {
    router.push(`/admin/research/milestones/edit/${row._id}`);
  }
  function handleDeleteMilestone(row: ResearchMilestone & { _id: number }) {
    if (!data) return;
    persist({ ...data, milestones: data.milestones.filter((_, i) => i !== row._id) });
  }

  const projectsWithId  = (data?.featuredProjects ?? []).map((p, i) => ({ ...p, _id: i }));
  const focusWithId     = (data?.focusAreas ?? []).map((f, i) => ({ ...f, _id: i }));
  const milestonesWithId= (data?.milestones ?? []).map((m, i) => ({ ...m, _id: i }));

  const tabs = [
    { key: "projects",   label: "Featured Projects", count: projectsWithId.length },
    { key: "focus",      label: "Focus Areas",       count: focusWithId.length },
    { key: "milestones", label: "Milestones",        count: milestonesWithId.length },
    { key: "partners",   label: "Partners",          count: data?.partners.length ?? 0 },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Research Overview</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            Manage research projects, focus areas, milestones, and partners
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b" style={{ borderColor: "var(--border)" }}>
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className="px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px"
            style={{
              borderColor: tab === key ? "#4caf50" : "transparent",
              color: tab === key ? "#4caf50" : "var(--text-muted)",
            }}
          >
            {label}
            <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-faint)" }}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "projects" && (
        <DataTable
          title=""
          columns={projectColumns}
          data={projectsWithId}
          loading={loading}
          onAdd={() => router.push("/admin/research/projects/add")}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      )}

      {tab === "focus" && (
        <DataTable
          title=""
          columns={focusColumns}
          data={focusWithId}
          loading={loading}
          onAdd={() => router.push("/admin/research/focus/add")}
          onEdit={handleEditFocus}
          onDelete={handleDeleteFocus}
        />
      )}

      {tab === "milestones" && (
        <DataTable
          title=""
          columns={milestoneColumns}
          data={milestonesWithId}
          loading={loading}
          onAdd={() => router.push("/admin/research/milestones/add")}
          onEdit={handleEditMilestone}
          onDelete={handleDeleteMilestone}
        />
      )}

      {tab === "partners" && (
        <div className="admin-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Research Partners & Funders</h3>
            <button
              onClick={() => router.push("/admin/research/partners/add")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
              + Add Partner
            </button>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 rounded-xl animate-pulse" style={{ backgroundColor: "var(--bg-input)" }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(data?.partners ?? []).map((partner, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                  style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}>
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{partner}</span>
                  <button
                    onClick={() => {
                      if (!data) return;
                      persist({ ...data, partners: data.partners.filter((_, pi) => pi !== i) });
                    }}
                    className="ml-2 text-xs transition-colors flex-shrink-0"
                    style={{ color: "#ef4444" }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
