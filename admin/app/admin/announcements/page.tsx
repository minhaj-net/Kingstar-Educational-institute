"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Announcement {
  id: number;
  title: string;
  slug: string;
  category: string;
  priority: string;
  status: string;
  date: string;
  expiresAt: string;
  author: string;
  excerpt: string;
  body: string;
  tags: string[];
}

const STORAGE_KEY = "admin_announcements";

// ─── Columns ──────────────────────────────────────────────────────────────────

const columns: Column<Announcement>[] = [
  {
    key: "priority", label: "Priority",
    render: (v) => {
      const colors: Record<string, { bg: string; color: string }> = {
        Urgent: { bg: "rgba(239,68,68,0.12)",  color: "#ef4444" },
        High:   { bg: "rgba(234,179,8,0.12)",  color: "#ca8a04" },
        Medium: { bg: "rgba(76,175,80,0.12)",  color: "#4caf50" },
        Low:    { bg: "rgba(100,116,139,0.12)",color: "#94a3b8" },
      };
      const c = colors[String(v)] ?? colors.Low;
      return (
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: c.bg, color: c.color }}>{String(v)}</span>
      );
    },
  },
  {
    key: "title", label: "Title", sortable: true,
    render: (v) => (
      <span className="font-medium text-sm max-w-[260px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ),
  },
  { key: "category", label: "Category", sortable: true, hideOnMobile: true },
  { key: "status", label: "Status", render: (v) => <StatusBadge value={String(v)} /> },
  { key: "author", label: "Author", hideOnMobile: true },
  { key: "date", label: "Date", sortable: true, hideOnMobile: true },
  { key: "expiresAt", label: "Expires", hideOnMobile: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnnouncementsAdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) { setItems(JSON.parse(saved)); setLoading(false); return; }
    fetch("/announcements.json")
      .then((r) => r.json())
      .then((d: Announcement[]) => {
        setItems(d);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: Announcement[]) {
    setItems(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Announcements</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            {items.length} announcements total ·{" "}
            {items.filter((i) => i.status === "Active").length} active
          </p>
        </div>
        <Link href="/admin/announcements/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          <Plus className="w-4 h-4" /> Add Announcement
        </Link>
      </div>

      <DataTable
        title=""
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(row) => router.push(`/admin/announcements/edit/${row.id}`)}
        onDelete={(row) => persist(items.filter((i) => i.id !== row.id))}
      />
    </div>
  );
}
