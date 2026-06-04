"use client";

import { useEffect, useState } from "react";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";
import Modal from "../_components/Modal";

interface Blog {
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

const EMPTY: Blog = {
  id: 0,
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  tag: "",
  date: "",
  author: "",
  image: "",
  readTime: "",
};

const columns: Column<Blog>[] = [
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
  { key: "author", label: "Author", sortable: true },
  { key: "category", label: "Category", sortable: true },
  {
    key: "tag",
    label: "Tag",
    render: (v) => <StatusBadge value={String(v)} />,
  },
  { key: "date", label: "Date", sortable: true, hideOnMobile: true },
  { key: "readTime", label: "Read Time", hideOnMobile: true },
];

function FormField({
  label,
  name,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className="admin-input rounded-xl px-3 py-2 text-sm resize-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="admin-input rounded-xl px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<Blog>(EMPTY);

  useEffect(() => {
    fetch("/blogs.json")
      .then((r) => r.json())
      .then((d: Blog[]) => setBlogs(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY, id: Date.now() });
    setModalOpen(true);
  }

  function openEdit(row: Blog) {
    setEditing(row);
    setForm({ ...row });
    setModalOpen(true);
  }

  function handleDelete(row: Blog) {
    setBlogs((prev) => prev.filter((b) => b.id !== row.id));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    if (editing) {
      setBlogs((prev) => prev.map((b) => (b.id === editing.id ? form : b)));
    } else {
      setBlogs((prev) => [...prev, form]);
    }
    setModalOpen(false);
  }

  return (
    <>
      <DataTable
        title="Blog Posts"
        columns={columns}
        data={blogs}
        loading={loading}
        onAdd={openAdd}
        onEdit={(row) => openEdit(row)}
        onDelete={(row) => handleDelete(row)}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Blog Post" : "Add Blog Post"}
      >
        <div className="space-y-4">
          <FormField label="Title" name="title" value={form.title} onChange={handleChange} />
          <FormField label="Excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} multiline />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Category" name="category" value={form.category} onChange={handleChange} />
            <FormField label="Tag" name="tag" value={form.tag} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Author" name="author" value={form.author} onChange={handleChange} />
            <FormField label="Date" name="date" value={form.date} onChange={handleChange} />
          </div>
          <FormField label="Read Time" name="readTime" value={form.readTime} onChange={handleChange} />
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-input)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
              {editing ? "Save Changes" : "Add Post"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
