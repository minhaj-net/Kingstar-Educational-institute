"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DataTable, { Column } from "../_components/DataTable";
import Modal from "../_components/Modal";

interface PortfolioItem {
  id: number;
  title: string;
  categories: string[];
  image: string;
  slug: string;
}

const EMPTY: PortfolioItem = {
  id: 0,
  title: "",
  categories: [],
  image: "",
  slug: "",
};

const columns: Column<PortfolioItem>[] = [
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
        className="font-medium text-sm max-w-[200px] truncate block"
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
    render: (v) => (
      <div className="flex flex-wrap gap-1">
        {(v as string[]).map((cat) => (
          <span
            key={cat}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(26,46,90,0.1)", color: "#1a2e5a" }}
          >
            {cat}
          </span>
        ))}
      </div>
    ),
    hideOnMobile: true,
  },
  { key: "slug", label: "Slug", hideOnMobile: true },
];

function FormField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="admin-input rounded-xl px-3 py-2 text-sm"
      />
    </div>
  );
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<PortfolioItem>(EMPTY);
  const [categoriesInput, setCategoriesInput] = useState("");

  useEffect(() => {
    fetch("/portfolio.json")
      .then((r) => r.json())
      .then((d: PortfolioItem[]) => setItems(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY, id: Date.now() });
    setCategoriesInput("");
    setModalOpen(true);
  }

  function openEdit(row: PortfolioItem) {
    setEditing(row);
    setForm({ ...row });
    setCategoriesInput(row.categories.join(", "));
    setModalOpen(true);
  }

  function handleDelete(row: PortfolioItem) {
    setItems((prev) => prev.filter((i) => i.id !== row.id));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const finalForm = {
      ...form,
      categories: categoriesInput.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (editing) {
      setItems((prev) => prev.map((i) => (i.id === editing.id ? finalForm : i)));
    } else {
      setItems((prev) => [...prev, finalForm]);
    }
    setModalOpen(false);
  }

  return (
    <>
      <DataTable
        title="Portfolio"
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
        title={editing ? "Edit Portfolio Item" : "Add Portfolio Item"}
      >
        <div className="space-y-4">
          <FormField label="Title" name="title" value={form.title} onChange={handleChange} />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              Categories (comma-separated)
            </label>
            <input
              type="text"
              value={categoriesInput}
              onChange={(e) => setCategoriesInput(e.target.value)}
              placeholder="e.g. Charity, Social"
              className="admin-input rounded-xl px-3 py-2 text-sm"
            />
          </div>
          <FormField label="Image URL" name="image" value={form.image} onChange={handleChange} />
          <FormField label="Slug" name="slug" value={form.slug} onChange={handleChange} />
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
