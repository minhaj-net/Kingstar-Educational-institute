"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Newspaper, Loader } from "lucide-react";
import ImageUploadField from "../../../../_components/ImageUploadField";
import type { NewsItem } from "../../page";

const STORAGE_KEY = "admin_news";
const CATEGORIES = ["Research","Technology","Campus Life","Faculty","Academics","Admissions","Events","Alumni"];
const TAGS = ["HOT","RESEARCH","EVENT","UPDATES","ARTICLE","STUDENT","ADMISSION","ALUMNI"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3"
        style={{ color: "var(--text)", borderColor: "var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, name, value, onChange, required = false, multiline = false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={4} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
        : <input type="text" name={name} value={value} onChange={onChange} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm" />}
    </div>
  );
}

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [form, setForm] = useState<NewsItem | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    function load(data: NewsItem[]) {
      const found = data.find((i) => i.id === id);
      if (!found) { setNotFound(true); return; }
      setForm({ ...found });
    }
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) { try { load(JSON.parse(raw)); return; } catch { /* fall */ } }
    fetch("/news.json")
      .then((r) => r.json())
      .then((d: NewsItem[]) => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d)); load(d); })
      .catch(() => setNotFound(true));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => p ? { ...p, [name]: value } : p);
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    if (!form) return false;
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.author.trim()) e.author = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: NewsItem[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all.map((i) => i.id === id ? form! : i)));
      setSaving(false);
      router.push("/admin/news");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Article not found</p>
      <Link href="/admin/news" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#4caf50" }}>← Back to News</Link>
    </div>
  );

  if (!form) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="w-8 h-8 animate-spin" style={{ color: "#4caf50" }} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/news" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Edit News Article</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Editing: <span style={{ color: "#4caf50" }}>#{id}</span> — {form.title.slice(0, 50)}{form.title.length > 50 ? "…" : ""}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/news" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Discard
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Newspaper className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">

            <Section title="Article Content">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: "var(--text-muted)" }}>
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="title" value={form.title} onChange={handleChange}
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
                {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
              </div>
              <Field label="Excerpt / Summary" name="excerpt" value={form.excerpt} onChange={handleChange} multiline />
              <Field label="Slug" name="slug" value={form.slug} onChange={handleChange} />
            </Section>

            <Section title="Meta Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}>
                    Author <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input name="author" value={form.author} onChange={handleChange}
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.author ? "border-red-400" : ""}`} />
                  {errors.author && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.author}</p>}
                </div>
                <Field label="Date" name="date" value={form.date} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                    <option value="">Select</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Tag</label>
                  <select name="tag" value={form.tag} onChange={handleChange}
                    className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                    <option value="">Select</option>
                    {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <Field label="Read Time" name="readTime" value={form.readTime} onChange={handleChange} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer mt-1">
                <input type="checkbox" checked={form.featured}
                  onChange={(e) => setForm((p) => p ? { ...p, featured: e.target.checked } : p)}
                  className="w-4 h-4 rounded accent-green-500" />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>Mark as Featured</p>
                  <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                    Featured articles appear prominently on the news page
                  </p>
                </div>
              </label>
            </Section>
          </div>

          <div className="space-y-5">
            <Section title="Featured Image">
              <ImageUploadField
                label="News"
                value={form.image}
                onChange={(url) => setForm((p) => p ? { ...p, image: url } : p)}
                previewHeight={160}
                placeholderIcon={<Newspaper className="w-8 h-8" style={{ color: "var(--text-faint)" }} />}
              />
            </Section>

            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "ID",       value: `#${form.id}` },
                { label: "Author",   value: form.author   || "—" },
                { label: "Category", value: form.category || "—" },
                { label: "Tag",      value: form.tag      || "—" },
                { label: "Date",     value: form.date     || "—" },
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
                : <Newspaper className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
