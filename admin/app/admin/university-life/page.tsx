"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

export interface ULItem {
  id: string; title: string; excerpt: string; image: string;
  category: string; description: string; body: string;
  highlights: string[]; hours: string; contact: string; gallery: string[];
}

const columns: Column<ULItem>[] = [
  {
    key: "image", label: "Photo",
    render: (v) => (
      <div className="w-12 h-9 rounded-lg overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}>
        {String(v) && <Image src={String(v)} alt="ul" fill sizes="48px" className="object-cover" unoptimized />}
      </div>
    ),
  },
  { key: "id", label: "ID", sortable: true,
    render: (v) => (
      <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>{String(v)}</span>
    ) },
  { key: "title", label: "Title", sortable: true,
    render: (v) => (
      <span className="font-semibold text-sm max-w-[200px] truncate block"
        style={{ color: "var(--text)" }} title={String(v)}>{String(v)}</span>
    ) },
  { key: "category", label: "Category", sortable: true,
    render: (v) => <StatusBadge value={String(v)} /> },
  { key: "hours", label: "Hours", hideOnMobile: true,
    render: (v) => (
      <span className="text-xs max-w-[180px] truncate block" style={{ color: "var(--text-muted)" }}
        title={String(v)}>{String(v)}</span>
    ) },
  { key: "contact", label: "Contact", sortable: true, hideOnMobile: true },
  { key: "highlights", label: "Highlights",
    render: (v) => (
      <span className="text-xs" style={{ color: "var(--text-faint)" }}>
        {Array.isArray(v) ? `${(v as string[]).length} items` : "0"}
      </span>
    ) },
];

export default function UniversityLifePage() {
  const router = useRouter();
  const [items, setItems] = useState<ULItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_university_life");
    if (saved) { setItems(JSON.parse(saved)); setLoading(false); return; }
    fetch("/university-life.json")
      .then((r) => r.json()).then((d: ULItem[]) => {
        setItems(d);
        sessionStorage.setItem("admin_university_life", JSON.stringify(d));
      }).catch(console.error).finally(() => setLoading(false));
  }, []);

  function persist(updated: ULItem[]) {
    setItems(updated);
    sessionStorage.setItem("admin_university_life", JSON.stringify(updated));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>University Life</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{items.length} items</p>
        </div>
        <Link href="/admin/university-life/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}>
          <Plus className="w-4 h-4" /> Add Item
        </Link>
      </div>
      <DataTable title="" columns={columns} data={items} loading={loading}
        onEdit={(row) => router.push(`/admin/university-life/edit/${row.id}`)}
        onDelete={(row) => persist(items.filter((i) => i.id !== row.id))} />
    </div>
  );
}
