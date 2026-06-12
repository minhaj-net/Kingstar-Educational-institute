"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PressRelease {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  contact: string;
  excerpt: string;
  body: string;
  tags: string[];
}

const STORAGE_KEY = "admin_press_releases";

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: Column<PressRelease>[] = [
  {
    key: "title", label: "Title", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[260px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  { key: "category", label: "Category", sortable: true, render: (v) => <StatusBadge value={String(v)} /> },
  { key: "date", label: "Date", sortable: true, hideOnMobile: true },
  { key: "contact", label: "Contact", hideOnMobile: true },
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
          {tags.length > 2 && <span className="text-xs" style={{ color: "var(--text-faint)" }}>+{tags.length - 2}</span>}
        </div>
      );
    },
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PressReleasesAdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) { setItems(JSON.parse(saved)); setLoading(false); return; }
    fetch("/press-releases.json")
      .then((r) => r.json())
      .then((d: PressRelease[]) => {
        setItems(d);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: PressRelease[]) {
    setItems(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Press Releases</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            {items.length} releases total
          </p>
        </div>
        <Link href="/admin/press-releases/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          <Plus className="w-4 h-4" /> Add Release
        </Link>
      </div>

      <DataTable
        title=""
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(row) => router.push(`/admin/press-releases/edit/${row.id}`)}
        onDelete={(row) => persist(items.filter((i) => i.id !== row.id))}
      />
    </div>
  );
}
