"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, BookOpen, Plus, X } from "lucide-react";
import type { Publication, PubData } from "../page";

const STORAGE_KEY = "admin_research_publications";
const TYPE_OPTIONS = ["Journal Article", "Conference Paper", "Book Chapter", "Technical Report", "Thesis"];
const TYPE_COLORS: Record<string, string> = {
  "Journal Article": "#4caf50",
  "Conference Paper": "#c8a84b",
  "Book Chapter": "#1a2e5a",
  "Technical Report": "#94a3b8",
  "Thesis": "#8b5cf6",
};

function Field({ label, name, value, onChange, placeholder = "", required = false, error = "" }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input type="text" name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className={`admin-input rounded-xl px-3 py-2.5 text-sm ${error ? "border-red-400" : ""}`} />
      {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3"
        style={{ color: "var(--text)", borderColor: "var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

export default function AddPublicationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<Omit<Publication, "id">>({
    type: "Journal Article", typeColor: "#4caf50", year: "", title: "",
    authors: "", journal: "", doi: "", tags: [], citations: 0, featured: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => {
      const next: typeof p = { ...p, [name]: value };
      if (name === "type") next.typeColor = TYPE_COLORS[value] ?? "#4caf50";
      if (name === "citations") return { ...p, citations: Number(value) };
      return next;
    });
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setForm((p) => ({ ...p, tags: [...p.tags, t] }));
    setTagInput("");
  }
  function removeTag(t: string) { setForm((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) })); }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.authors.trim()) e.authors = "Required";
    if (!form.year.trim()) e.year = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const current: PubData = raw ? JSON.parse(raw) : { stats: [], categories: [], publications: [], topJournals: [] };
      const maxId = current.publications.reduce((m, p) => Math.max(m, p.id), 0);
      const newPub: Publication = { ...form, id: maxId + 1 };
      const updated = { ...current, publications: [...current.publications, newPub] };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/research/publications");
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/research/publications"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Publication</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Add a new research publication</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/research/publications"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <BookOpen className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Publication"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">

            <Section title="Publication Details">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="title" value={form.title} onChange={handleChange}
                  placeholder="Full publication title"
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
                {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  Authors <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="authors" value={form.authors} onChange={handleChange}
                  placeholder="e.g. Smith J., Doe A., et al."
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.authors ? "border-red-400" : ""}`} />
                {errors.authors && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.authors}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Publication Type</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                    {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <Field label="Year" name="year" value={form.year} onChange={handleChange}
                  placeholder="e.g. 2024" required error={errors.year} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Journal / Venue" name="journal" value={form.journal} onChange={handleChange}
                  placeholder="e.g. Nature Biotechnology" />
                <Field label="DOI" name="doi" value={form.doi} onChange={handleChange}
                  placeholder="e.g. 10.1038/s41587-..." />
              </div>

              <Field label="Citations" name="citations" value={String(form.citations)} onChange={handleChange}
                placeholder="0" />
            </Section>

            <Section title="Tags">
              <div className="flex gap-2">
                <input type="text" value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  placeholder="Type a tag and press Enter or Add"
                  className="admin-input rounded-xl px-3 py-2.5 text-sm flex-1" />
                <button type="button" onClick={addTag}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ backgroundColor: "#4caf50" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {form.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {form.tags.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: "rgba(76,175,80,0.12)", color: "#4caf50" }}>
                      {t}
                      <button type="button" onClick={() => removeTag(t)}
                        className="opacity-60 hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>No tags added yet.</p>
              )}
            </Section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            <div className="admin-card rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Options</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured}
                  onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-green-500" />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>Featured Publication</p>
                  <p className="text-xs" style={{ color: "var(--text-faint)" }}>Highlighted on the publications page</p>
                </div>
              </label>
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Type Color Preview</p>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: form.typeColor }} />
                  <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{form.typeColor}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "Type",     value: form.type || "—" },
                { label: "Year",     value: form.year || "—" },
                { label: "Journal",  value: form.journal || "—" },
                { label: "Citations",value: String(form.citations) },
                { label: "Tags",     value: form.tags.length ? `${form.tags.length} added` : "None" },
                { label: "Featured", value: form.featured ? "Yes" : "No" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span style={{ color: "var(--text-faint)" }}>{label}</span>
                  <span className="font-medium" style={{ color: "var(--text)" }}>{value}</span>
                </div>
              ))}
            </div>

            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <BookOpen className="w-4 h-4" />}
              {saving ? "Saving…" : "Add Publication"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
