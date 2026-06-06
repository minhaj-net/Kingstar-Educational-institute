"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";

export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tag: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

const STORAGE_KEY = "admin_blogs";

const columns: Column<Blog>[] = [
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
            alt="blog"
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
    key: "title",
    label: "Title",
    sortable: true,
    render: (v) => (
      <span
        className="font-medium text-sm max-w-[200px] truncate block"
        style={{ color: "var(--text)" }}
        title={String(v)}
      >
        {String(v)}
      </span>
    ),
  },
  { key: "author", label: "Author", sortable: true, hideOnMobile: true },
  { key: "category", label: "Category", sortable: true, hideOnMobile: true },
  { key: "tag", label: "Tag", render: (v) => <StatusBadge value={String(v)} /> },
  { key: "date", label: "Date", sortable: true, hideOnMobile: true },
  { key: "readTime", label: "Read Time", hideOnMobile: true },
];

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Always re-sync from sessionStorage on mount so edits from edit-page are reflected
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBlogs(JSON.parse(saved));
      setLoading(false);
      return;
    }
    fetch("/blogs.json")
      .then((r) => r.json())
      .then((d: Blog[]) => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d));
        setBlogs(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function persist(updated: Blog[]) {
    setBlogs(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function handleDelete(row: Blog) {
    persist(blogs.filter((b) => b.id !== row.id));
  }

  function handleEdit(row: Blog) {
    router.push(`/admin/blogs/edit/${row.id}`);
  }

  return (
    <DataTable
      title="Blog / News"
      columns={columns}
      data={blogs}
      loading={loading}
      onAdd={() => router.push("/admin/blogs/add")}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
