"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  hideOnMobile?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<T = any> {
  title: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const PAGE_SIZE = 10;

// ─── Status badge helper ──────────────────────────────────

export function StatusBadge({ value }: { value: string }) {
  const v = String(value).toLowerCase();
  let bg = "rgba(100,116,139,0.12)";
  let color = "var(--text-muted)";

  if (["active", "published", "open", "available"].includes(v)) {
    bg = "rgba(76,175,80,0.12)";
    color = "#4caf50";
  } else if (["pending", "draft", "upcoming"].includes(v)) {
    bg = "rgba(234,179,8,0.12)";
    color = "#ca8a04";
  }

  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full capitalize whitespace-nowrap"
      style={{ backgroundColor: bg, color }}
    >
      {value}
    </span>
  );
}

// ─── Skeleton row ─────────────────────────────────────────

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div
            className="h-4 rounded animate-pulse"
            style={{ backgroundColor: "var(--border)", width: i === 0 ? "60%" : "80%" }}
          />
        </td>
      ))}
    </tr>
  );
}

// ─── Main component ───────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T = any>({
  title,
  columns,
  data,
  loading = false,
  onAdd,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<T | null>(null);

  // Filter
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) => {
      const r = row as Record<string, unknown>;
      return Object.values(r).some((v) => {
        if (Array.isArray(v)) return v.join(" ").toLowerCase().includes(q);
        return String(v ?? "").toLowerCase().includes(q);
      });
    });
  }, [data, search]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const ar = a as Record<string, unknown>;
      const br = b as Record<string, unknown>;
      const av = String(ar[sortKey] ?? "");
      const bv = String(br[sortKey] ?? "");
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageData = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  function SortIcon({ colKey }: { colKey: string }) {
    if (sortKey !== colKey) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-[#4caf50]" />
    ) : (
      <ChevronDown className="w-3 h-3 text-[#4caf50]" />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
            {title}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}
            {search ? ` matching "${search}"` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-faint)" }}
            />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="admin-input pl-9 pr-3 py-2 text-sm rounded-xl w-48 focus:w-64 transition-all duration-200"
            />
          </div>
          {/* Add */}
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          )}
        </div>
      </div>

      {/* Table card */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr style={{ backgroundColor: "var(--thead-bg)" }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left px-4 py-3 text-xs font-semibold select-none ${
                      col.hideOnMobile ? "hidden md:table-cell" : ""
                    }`}
                    style={{ color: "var(--text-faint)" }}
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(col.key)}
                        className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                      >
                        {col.label}
                        <SortIcon colKey={col.key} />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={columns.length} />
                ))
              ) : pageData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "var(--bg-input)" }}
                      >
                        <Inbox className="w-7 h-7" style={{ color: "var(--text-faint)" }} />
                      </div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        No records found
                      </p>
                      {search && (
                        <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                          Try a different search term
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                pageData.map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="border-t admin-table-row transition-colors"
                    style={{
                      borderColor: "var(--divider)",
                      backgroundColor: idx % 2 === 0 ? "transparent" : "var(--thead-bg)",
                    }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-sm ${
                          col.hideOnMobile ? "hidden md:table-cell" : ""
                        }`}
                        style={{ color: "var(--text-muted)" }}
                      >
                        {col.render
                          ? col.render((row as Record<string, unknown>)[col.key], row)
                          : String((row as Record<string, unknown>)[col.key] ?? "")}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              title="Edit"
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                              style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3b82f6" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(59,130,246,0.2)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(59,130,246,0.1)")
                              }
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => setConfirmDelete(row)}
                              title="Delete"
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                              style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.2)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)")
                              }
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && sorted.length > PAGE_SIZE && (
          <div
            className="flex items-center justify-between px-4 py-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>
              Showing {(safePage - 1) * PAGE_SIZE + 1}–
              {Math.min(safePage * PAGE_SIZE, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p = i + 1;
                if (totalPages > 5) {
                  p = Math.max(1, Math.min(safePage - 2, totalPages - 4)) + i;
                }
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors"
                    style={
                      p === safePage
                        ? { backgroundColor: "#4caf50", color: "#fff" }
                        : { backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }
                    }
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm dialog */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            key="confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="admin-card rounded-2xl p-6 w-full max-w-sm"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(239,68,68,0.12)" }}
                >
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-semibold" style={{ color: "var(--text)" }}>
                  Delete record?
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  This action cannot be undone.
                </p>
                <div className="flex gap-3 w-full mt-2">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2 rounded-xl text-sm font-medium border transition-colors"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                      backgroundColor: "var(--bg-input)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onDelete?.(confirmDelete);
                      setConfirmDelete(null);
                    }}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
