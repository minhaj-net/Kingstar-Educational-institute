"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

export interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  category: string;
  image: string;
}

const STORAGE_KEY = "admin_gallery";

const columns: Column<GalleryItem>[] = [
  {
    key: "image", label: "Photo",
    render: (v) => (
      <div className="w-12 h-9 rounded-lg overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}>
        {String(v) && <Image src={String(v)} alt="thumb" fill sizes="48px" className="object-cover" unoptimized />}
      </div>
    ),
  },
  {
    key: "id", label: "ID",
    render: (v) => <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>#{String(v)}</span>,
  },
  {
    key: "title", label: "Title", sortable: true,
    render: (v) => <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>{String(v)}</span>,
  },
  {
    key: "caption", label: "Caption", hideOnMobile: true,
    render: (v) => (
      <span className="text-sm max-w-[200px] truncate block" style={{ color: "var(--text-muted)" }} title={String(v)}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "category", label: "Category", sortable: true,
    render: (v) => <StatusBadge value={String(v)} />,
  },
];

export default function GalleryPage() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setItems(JSON.parse(saved)); setLoading(false); return; }
      catch { sessionStorage.removeItem(STORAGE_KEY); }
    }
    fetch("/gallery.json")
      .then((r) => r.json())
      .then((d: GalleryItem[]) => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
        setItems(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: GalleryItem[]) {
    setItems(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Gallery</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{items.length} photos</p>
        </div>
        <Link href="/admin/gallery/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}>
          <Plus className="w-4 h-4" /> Add Photo
        </Link>
      </div>
      <DataTable
        title=""
        columns={columns}
        data={items}
        loading={loading}
        onEdit={(row) => router.push(`/admin/gallery/edit/${row.id}`)}
        onDelete={(row) => persist(items.filter((i) => i.id !== row.id))}
      />
    </div>
  );
}
