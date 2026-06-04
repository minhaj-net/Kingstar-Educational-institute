"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DataTable, { Column, StatusBadge } from "../_components/DataTable";
import Modal from "../_components/Modal";

interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  category: string;
  image: string;
}

const EMPTY: GalleryItem = {
  id: 0,
  title: "",
  caption: "",
  category: "",
  image: "",
};

const columns: Column<GalleryItem>[] = [
  {
    key: "id",
    label: "ID",
    sortable: true,
    render: (v) => (
      <span className="text-xs font-medium" style={{ color: "var(--text-faint)" }}>
        #{String(v)}
      </span>
    ),
  },
  {
    key: "image",
    label: "Image",
    render: (v) => (
      <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0"
        style={{ backgroundColor: "var(--bg-input)" }}>
        {String(v) ? (
          <Image
            src={String(v)}
            alt="thumbnail"
            fill
            sizes="40px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: "var(--border)" }} />
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
        className="font-medium text-sm"
        style={{ color: "var(--text)" }}
      >
        {String(v)}
      </span>
    ),
  },
  {
    key: "caption",
    label: "Caption",
    hideOnMobile: true,
    render: (v) => (
      <span
        className="text-sm max-w-[200px] truncate block"
        style={{ color: "var(--text-muted)" }}
        title={String(v)}
      >
        {String(v)}
      </span>
    ),
  },
  {
    key: "category",
    label: "Category",
    sortable: true,
    render: (v) => <StatusBadge value={String(v)} />,
  },
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
          rows={2}
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

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<GalleryItem>(EMPTY);

  useEffect(() => {
    fetch("/gallery.json")
      .then((r) => r.json())
      .then((d: GalleryItem[]) => setItems(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY, id: Date.now() });
    setModalOpen(true);
  }

  function openEdit(row: GalleryItem) {
    setEditing(row);
    setForm({ ...row });
    setModalOpen(true);
  }

  function handleDelete(row: GalleryItem) {
    setItems((prev) => prev.filter((i) => i.id !== row.id));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    if (editing) {
      setItems((prev) => prev.map((i) => (i.id === editing.id ? form : i)));
    } else {
      setItems((prev) => [...prev, form]);
    }
    setModalOpen(false);
  }

  return (
    <>
      <DataTable
        title="Gallery"
        columns={columns}
        data={items}
        loading={loading}
        onAdd={openAdd}
        onEdit={(row) => openEdit(row)}
        onDelete={(row) => handleDelete(row)}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Gallery Item" : "Add Gallery Item"}
      >
        <div className="space-y-4">
          <FormField label="Title" name="title" value={form.title} onChange={handleChange} />
          <FormField label="Caption" name="caption" value={form.caption} onChange={handleChange} multiline />
          <FormField label="Category" name="category" value={form.category} onChange={handleChange} />
          <FormField label="Image URL" name="image" value={form.image} onChange={handleChange} />
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
              {editing ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
