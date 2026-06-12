"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column } from "../../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LabCluster {
  icon: string; name: string; color: string; labCount: number; desc: string; labs: string[];
}
export interface FeaturedLab {
  name: string; shortName: string; cluster: string; clusterColor: string;
  director: string; founded: string; staff: string; location: string;
  funding: string; desc: string; achievements: string[];
}
export interface Facility { name: string; desc: string; }
export interface LabContact { phone: string; email: string; location: string; hours: string; }

export interface LabsData {
  stats: { value: string; label: string; icon: string }[];
  clusters: LabCluster[];
  featuredLabs: FeaturedLab[];
  facilities: Facility[];
  contact: LabContact;
}

const STORAGE_KEY = "admin_research_labs";

// ─── Cluster columns ──────────────────────────────────────────────────────────

const clusterColumns: Column<LabCluster & { _id: number }>[] = [
  {
    key: "name", label: "Cluster Name", sortable: true,
    render: (v, row) => (
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: (row as LabCluster).color }} />
        <span className="font-medium text-sm" style={{ color: "var(--text)" }}>{String(v)}</span>
      </div>
    ),
  },
  {
    key: "labCount", label: "Labs", sortable: true,
    render: (v) => (
      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}>{String(v)} labs</span>
    ),
  },
  { key: "desc", label: "Description", hideOnMobile: true,
    render: (v) => (
      <span className="text-sm max-w-[280px] truncate block" style={{ color: "var(--text-muted)" }}
        title={String(v)}>{String(v)}</span>
    ),
  },
];

// ─── Featured lab columns ──────────────────────────────────────────────────────

const labColumns: Column<FeaturedLab & { _id: number }>[] = [
  {
    key: "shortName", label: "Code",
    render: (v, row) => (
      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: `${(row as FeaturedLab).clusterColor}15`, color: (row as FeaturedLab).clusterColor }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "name", label: "Lab Name", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[200px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  { key: "director", label: "Director", sortable: true, hideOnMobile: true },
  { key: "cluster", label: "Cluster", hideOnMobile: true },
  { key: "staff", label: "Staff", hideOnMobile: true },
  { key: "funding", label: "Funding", hideOnMobile: true },
  { key: "founded", label: "Founded", sortable: true, hideOnMobile: true },
];

// ─── Facility columns ─────────────────────────────────────────────────────────

const facilityColumns: Column<Facility & { _id: number }>[] = [
  {
    key: "name", label: "Facility Name", sortable: true,
    render: (v) => <span className="font-medium text-sm" style={{ color: "var(--text)" }}>{String(v)}</span>,
  },
  {
    key: "desc", label: "Description",
    render: (v) => (
      <span className="text-sm max-w-[340px] truncate block" style={{ color: "var(--text-muted)" }}
        title={String(v)}>{String(v)}</span>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LabsAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<LabsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"clusters" | "labs" | "facilities">("labs");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
      setLoading(false);
      return;
    }
    fetch("/research-labs.json")
      .then((r) => r.json())
      .then((d: LabsData) => {
        setData(d);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: LabsData) {
    setData(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  const clustersWithId  = (data?.clusters ?? []).map((c, i) => ({ ...c, _id: i }));
  const labsWithId      = (data?.featuredLabs ?? []).map((l, i) => ({ ...l, _id: i }));
  const facilitiesWithId= (data?.facilities ?? []).map((f, i) => ({ ...f, _id: i }));

  const tabs = [
    { key: "labs",       label: "Featured Labs",     count: labsWithId.length },
    { key: "clusters",   label: "Research Clusters", count: clustersWithId.length },
    { key: "facilities", label: "Core Facilities",   count: facilitiesWithId.length },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Labs & Research Centers</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
          Manage research clusters, featured labs, and core facilities
        </p>
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

      {/* Tab: Featured Labs */}
      {tab === "labs" && (
        <DataTable
          title=""
          columns={labColumns}
          data={labsWithId}
          loading={loading}
          onAdd={() => router.push("/admin/research/labs-centers/add-lab")}
          onEdit={(row) => router.push(`/admin/research/labs-centers/edit-lab/${row._id}`)}
          onDelete={(row) => {
            if (!data) return;
            persist({ ...data, featuredLabs: data.featuredLabs.filter((_, i) => i !== row._id) });
          }}
        />
      )}

      {/* Tab: Clusters */}
      {tab === "clusters" && (
        <DataTable
          title=""
          columns={clusterColumns}
          data={clustersWithId}
          loading={loading}
          onAdd={() => router.push("/admin/research/labs-centers/add-cluster")}
          onEdit={(row) => router.push(`/admin/research/labs-centers/edit-cluster/${row._id}`)}
          onDelete={(row) => {
            if (!data) return;
            persist({ ...data, clusters: data.clusters.filter((_, i) => i !== row._id) });
          }}
        />
      )}

      {/* Tab: Facilities */}
      {tab === "facilities" && (
        <DataTable
          title=""
          columns={facilityColumns}
          data={facilitiesWithId}
          loading={loading}
          onAdd={() => router.push("/admin/research/labs-centers/add-facility")}
          onEdit={(row) => router.push(`/admin/research/labs-centers/edit-facility/${row._id}`)}
          onDelete={(row) => {
            if (!data) return;
            persist({ ...data, facilities: data.facilities.filter((_, i) => i !== row._id) });
          }}
        />
      )}
    </div>
  );
}
