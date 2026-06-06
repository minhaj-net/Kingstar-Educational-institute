"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import DataTable, { Column } from "../_components/DataTable";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PortfolioItem {
  id: number;
  title: string;
  categories: string[];
  image: string;
  slug: string;
}

// ─── Column definitions ───────────────────────────────────────────────────────

const columns: Column<PortfolioItem>[] = [
  {
    key: "image",
    label: "Thumb",
    render: (v) => (
      <div
        className="w-12 h-9 rounded-lg overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}
      >
        {String(v) && (
          <Image
            src={String(v)}
            alt="portfolio"
            fill
            sizes="48px"
            className="object-cover"
            unoptimized
          />
        )}
      </div>
    ),
  },
  {
    key: "id",
    label: "ID",
    sortable: true,
    render: (v) => (
      <span
        className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
        style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}
      >
        #{String(v)}
      </span>
    ),
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
    render: (v) => (
      <span
        className="font-medium text-sm max-w-[220px] truncate block"
        style={{ color: "var(--text)" }}
        title={String(v)}
      >
        {String(v)}
      </span>
    ),
  },
  {
    key: "categories",
    label: "Categories",
    sortable: false,
    hideOnMobile: true,
    render: (v) => {
      const cats = Array.isArray(v) ? (v as string[]) : [];
      return (
        <div className="flex flex-wrap gap-1">
          {cats.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{
                backgroundColor: "rgba(76,175,80,0.12)",
                color: "#4caf50",
              }}
            >
              {cat}
            </span>
          ))}
          {cats.length > 3 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-faint)" }}
            >
              +{cats.length - 3}
            </span>
          )}
        </div>
      );
    },
  },
  {
    key: "slug",
    label: "Slug",
    sortable: true,
    hideOnMobile: true,
    render: (v) => (
      <span
        className="text-xs font-mono px-2 py-0.5 rounded-lg max-w-[180px] truncate block"
        style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}
        title={String(v)}
      >
        {String(v)}
      </span>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_portfolio");
    if (saved) {
      setItems(JSON.parse(saved));
      setLoading(false);
      return;
    }
    fetch("/portfolio.json")
      .then((r) => r.json())
      .then((d: PortfolioItem[]) => {
        setItems(d);
        sessionStorage.setItem("admin_portfolio", JSON.stringify(d));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: PortfolioItem[]) {
    setItems(updated);
    sessionStorage.setItem("admin_portfolio", JSON.stringify(updated));
  }

  function handleEdit(row: PortfolioItem) {
    router.push(`/admin/portfolio/edit/${row.id}`);
  }

  function handleDelete(row: PortfolioItem) {
    persist(items.filter((i) => i.id !== row.id));
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
            Portfolio
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            {items.length} items total
          </p>
        </div>
        <Link
          href="/admin/portfolio/add"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
        >
          <Plus className="w-4 h-4" />
          Add Portfolio
        </Link>
      </div>

      {/* Table */}
      <DataTable
        title=""
        columns={columns}
        data={items}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
