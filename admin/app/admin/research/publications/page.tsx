"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { Column, StatusBadge } from "../../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Publication {
  id: number;
  type: string;
  typeColor: string;
  year: string;
  title: string;
  authors: string;
  journal: string;
  doi: string;
  tags: string[];
  citations: number;
  featured: boolean;
}

export interface PubData {
  stats: { value: string; label: string; icon: string }[];
  categories: { label: string; count: number }[];
  publications: Publication[];
  topJournals: { name: string; impact: string }[];
}

const STORAGE_KEY = "admin_research_publications";

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: Column<Publication>[] = [
  {
    key: "featured", label: "Featured",
    render: (v) => v
      ? <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}>Yes</span>
      : <span className="text-xs text-gray-400">—</span>,
  },
  {
    key: "type", label: "Type",
    render: (v, row) => (
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{ backgroundColor: `${(row as Publication).typeColor}15`, color: (row as Publication).typeColor }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "title", label: "Title", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[240px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  { key: "authors", label: "Authors", sortable: true, hideOnMobile: true },
  { key: "journal", label: "Journal", hideOnMobile: true },
  { key: "year", label: "Year", sortable: true },
  {
    key: "citations", label: "Citations", sortable: true,
    render: (v) => (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: "rgba(76,175,80,0.08)", color: "#4caf50" }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "tags", label: "Tags", hideOnMobile: true,
    render: (v) => {
      const tags = Array.isArray(v) ? (v as string[]) : [];
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((t) => (
            <span key={t} className="text-xs px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-faint)" }}>{t}</span>
          ))}
          {tags.length > 2 && (
            <span className="text-xs" style={{ color: "var(--text-faint)" }}>+{tags.length - 2}</span>
          )}
        </div>
      );
    },
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PublicationsAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<PubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setData(JSON.parse(saved));
      setLoading(false);
      return;
    }
    fetch("/research-publications.json")
      .then((r) => r.json())
      .then((d: PubData) => {
        // Assign IDs if missing
        const withIds = { ...d, publications: d.publications.map((p, i) => ({ ...p, id: p.id ?? i + 1 })) };
        setData(withIds);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(withIds));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(pubs: Publication[]) {
    if (!data) return;
    const updated = { ...data, publications: pubs };
    setData(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function handleEdit(row: Publication) {
    router.push(`/admin/research/publications/edit/${row.id}`);
  }

  function handleDelete(row: Publication) {
    persist((data?.publications ?? []).filter((p) => p.id !== row.id));
  }

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Publications</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            {data?.publications.length ?? 0} publications total
          </p>
        </div>
      </div>

      <DataTable
        title=""
        columns={columns}
        data={data?.publications ?? []}
        loading={loading}
        onAdd={() => router.push("/admin/research/publications/add")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
