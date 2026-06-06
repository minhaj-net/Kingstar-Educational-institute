"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Loader, Newspaper } from "lucide-react";
import type { Blog } from "../../page";

const STORAGE_KEY = "admin_blogs";
const categoryOptions = ["Academics","Research","Events","Technology","Athletics","Campus Life","Alumni","Admissions"];
const tagOptions = ["HOT","RESEARCH","EVENT","ARTICLE","UPDATES","STUDENT","ADMISSION","ALUMNI"];

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3" style={{ color:"var(--text)", borderColor:"var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, name, value, onChange, required=false, multiline=false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
        {label}{required && <span style={{ color:"#ef4444" }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={4} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
        : <input type="text" name={name} value={value} onChange={onChange} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm" />}
    </div>
  );
}

export default function EditBlogPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const router = useRouter();
  const [form, setForm] = useState<Blog | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    function load(data: Blog[]) {
      const found = data.find((b) => String(b.id) === String(id));
      if (!found) { setNotFound(true); return; }
      setForm({ ...found });
    }
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Blog[] = JSON.parse(saved);
        const found = parsed.find((b) => String(b.id) === String(id));
        if (found) { load(parsed); return; }
      } catch { sessionStorage.removeItem(STORAGE_KEY); }
    }
    fetch("/blogs.json")
      .then((r) => r.json())
      .then((data: Blog[]) => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); load(data); })
      .catch(() => setNotFound(true));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => (p ? { ...p, [name]: value } : p));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function validate() {
    if (!form) return false;
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.author.trim()) e.author = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: Blog[] = raw ? JSON.parse(raw) : [];
      const updated = all.map((b) => String(b.id) === String(id) ? form : b);
      if (!updated.find((b) => String(b.id) === String(form.id))) updated.push(form);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/blogs");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color:"var(--text)" }}>Blog not found (ID: {id})</p>
      <Link href="/admin/blogs" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor:"#4caf50" }}>← Back</Link>
    </div>
  );

  if (!form) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="w-8 h-8 animate-spin" style={{ color:"#4caf50" }} />
    </div>
  );

  const imagePreview = !!form.image?.startsWith("http");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/blogs" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor:"var(--bg-input)", color:"var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color:"var(--text)" }}>Edit Blog Post</h1>
              <p className="text-xs mt-0.5" style={{ color:"var(--text-faint)" }}>
                Editing: <span style={{ color:"#4caf50" }}>{form.title.slice(0,50)}{form.title.length>50?"…":""}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/blogs" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor:"var(--border)", color:"var(--text-muted)", backgroundColor:"var(--bg-input)" }}>Discard</Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor:"#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor="#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor="#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Newspaper className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">
            <FormSection title="Post Content">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
                  Title <span style={{ color:"#ef4444" }}>*</span>
                </label>
                <input name="title" value={form.title} onChange={handleChange}
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title?"border-red-400":""}`} />
                {errors.title && <p className="text-xs" style={{ color:"#ef4444" }}>{errors.title}</p>}
              </div>
              <Field label="Excerpt / Summary" name="excerpt" value={form.excerpt} onChange={handleChange} multiline />
              <Field label="Slug" name="slug" value={form.slug} onChange={handleChange} />
            </FormSection>

            <FormSection title="Meta Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1" style={{ color:"var(--text-muted)" }}>
                    Author <span style={{ color:"#ef4444" }}>*</span>
                  </label>
                  <input name="author" value={form.author} onChange={handleChange}
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.author?"border-red-400":""}`} />
                  {errors.author && <p className="text-xs" style={{ color:"#ef4444" }}>{errors.author}</p>}
                </div>
                <Field label="Date" name="date" value={form.date} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color:"var(--text-muted)" }}>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance:"none" }}>
                    <option value="">Select</option>
                    {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color:"var(--text-muted)" }}>Tag</label>
                  <select name="tag" value={form.tag} onChange={handleChange}
                    className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance:"none" }}>
                    <option value="">Select</option>
                    {tagOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <Field label="Read Time" name="readTime" value={form.readTime} onChange={handleChange} />
              </div>
            </FormSection>
          </div>

          <div className="space-y-5">
            <FormSection title="Featured Image">
              <Field label="Image URL" name="image" value={form.image||""} onChange={handleChange} />
              {imagePreview ? (
                <div className="relative w-full rounded-xl overflow-hidden" style={{ height:"160px" }}>
                  <Image src={form.image} alt="preview" fill className="object-cover" unoptimized />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl py-8"
                  style={{ backgroundColor:"var(--bg-input)", border:"2px dashed var(--border)" }}>
                  <Newspaper className="w-8 h-8" style={{ color:"var(--text-faint)" }} />
                  <p className="text-xs mt-2" style={{ color:"var(--text-faint)" }}>Paste URL above</p>
                </div>
              )}
            </FormSection>
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color:"var(--text)" }}>Summary</h3>
              {[
                { label:"Author",    value: form.author   ||"—" },
                { label:"Category",  value: form.category ||"—" },
                { label:"Tag",       value: form.tag      ||"—" },
                { label:"Date",      value: form.date     ||"—" },
                { label:"Read Time", value: form.readTime ||"—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span style={{ color:"var(--text-faint)" }}>{label}</span>
                  <span className="font-medium" style={{ color:"var(--text)" }}>{value}</span>
                </div>
              ))}
            </div>
            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor:"#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor="#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor="#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Newspaper className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
