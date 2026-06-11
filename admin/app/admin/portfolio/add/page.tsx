"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Plus, X, Briefcase } from "lucide-react";
import ImageUploadField from "../../_components/ImageUploadField";
import type { PortfolioItem } from "../page";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3
        className="text-sm font-bold border-b pb-3"
        style={{ color: "var(--text)", borderColor: "var(--border)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
        {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`admin-input rounded-xl px-3 py-2.5 text-sm ${error ? "border-red-400" : ""}`}
      />
      {error && (
        <p className="text-xs" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddPortfolioPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    title: "",
    image: "",
    slug: "",
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  // ── Handlers ──
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-generate slug from title
      if (name === "title") {
        next.slug = slugify(value);
      }
      return next;
    });
    if (errors[name]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    }
  }

  function addCategory() {
    const cat = categoryInput.trim();
    if (cat && !categories.includes(cat)) {
      setCategories((prev) => [...prev, cat]);
    }
    setCategoryInput("");
  }

  function removeCategory(cat: string) {
    setCategories((prev) => prev.filter((c) => c !== cat));
  }

  // ── Validation ──
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ──
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setTimeout(() => {
      const existing = sessionStorage.getItem("admin_portfolio");
      const all: PortfolioItem[] = existing ? JSON.parse(existing) : [];
      const newId = all.length > 0 ? Math.max(...all.map((i) => i.id)) + 1 : 1;

      const newItem: PortfolioItem = {
        id: newId,
        title: form.title.trim(),
        categories,
        image: form.image.trim(),
        slug: form.slug.trim(),
      };

      const updated = [...all, newItem];
      sessionStorage.setItem("admin_portfolio", JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/portfolio");
    }, 600);
  }

  const imagePreview = form.image.startsWith("http");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/portfolio"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                Add Portfolio Item
              </h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Fill in details then click Publish
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/portfolio"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-input)",
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) =>
                !saving && (e.currentTarget.style.backgroundColor = "#43a047")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#4caf50")
              }
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Briefcase className="w-4 h-4" />
              )}
              {saving ? "Publishing…" : "Publish Item"}
            </button>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── Left 2/3 ── */}
          <div className="xl:col-span-2 space-y-6">

            {/* Basic info */}
            <FormSection title="Basic Information">
              <Field
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Charity & Voluntary For Social"
                required
                error={errors.title}
              />
              <Field
                label="Slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="e.g. charity-voluntary-social"
                required
                error={errors.slug}
              />
              <p className="text-xs -mt-2" style={{ color: "var(--text-faint)" }}>
                Slug is auto-generated from the title. You can edit it manually.
              </p>
            </FormSection>

            {/* Categories */}
            <FormSection title="Categories">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                  placeholder="Type a category and press Enter or click Add"
                  className="admin-input rounded-xl px-3 py-2.5 text-sm flex-1"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#4caf50" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#43a047")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#4caf50")
                  }
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {categories.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(76,175,80,0.12)",
                        color: "#4caf50",
                      }}
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => removeCategory(cat)}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                  No categories added yet.
                </p>
              )}
            </FormSection>

          </div>

          {/* ── Right 1/3 ── */}
          <div className="space-y-6">

            {/* Image */}
            <FormSection title="Portfolio Image">
              <ImageUploadField
                label="Portfolio"
                value={form.image}
                onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
                previewHeight={180}
                placeholderIcon={<Briefcase className="w-8 h-8" style={{ color: "var(--text-faint)" }} />}
              />
            </FormSection>

            {/* Summary */}
            <div
              className="admin-card rounded-2xl p-5 space-y-3"
            >
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
                Summary
              </h3>
              {[
                { label: "Title", value: form.title || "—" },
                { label: "Slug", value: form.slug || "—" },
                {
                  label: "Categories",
                  value:
                    categories.length > 0
                      ? `${categories.length} added`
                      : "None",
                },
                { label: "Image", value: imagePreview ? "Set" : "Not set" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-sm"
                >
                  <span style={{ color: "var(--text-faint)" }}>{label}</span>
                  <span
                    className="font-medium truncate max-w-[140px] text-right"
                    style={{ color: "var(--text)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) =>
                !saving && (e.currentTarget.style.backgroundColor = "#43a047")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#4caf50")
              }
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Briefcase className="w-4 h-4" />
              )}
              {saving ? "Publishing…" : "Publish Item"}
            </button>

          </div>
        </div>
      </div>
    </form>
  );
}
