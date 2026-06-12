"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, FileText, Loader, Plus, X } from "lucide-react";
import type { PressRelease } from "../../page";

const STORAGE_KEY = "admin_press_releases";
const CATEGORIES = ["Research", "Technology", "Academic", "Campus", "Athletics", "Alumni", "Events"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3"
        style={{ color: "var(--text)", borderColor: "var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, name, value, onChange, required = false, multiline = false, rows = 4 }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean; rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={rows} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
        : <input type="text" name={name} value={value} onChange={onChange} required={required}
            className="admin-input rounded-xl px-3 py-2.5 text-sm" />}
    </div>
  );
}

export default function EditPressReleasePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [form, setForm] = useState<PressRelease | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!id) return;
    function load(data: PressRelease[]) {
      const found = data.find((i) => i.id === id);
      if (!found) { setNotFound(true); return; }
      setForm({ ...found, tags: Array.isArray(found.tags) ? found.tags : [] });
    }
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) { try { load(JSON.parse(raw)); return; } catch { /* fall */ } }
    fetch("/press-releases.json")
      .then((r) => r.json())
      .then((d: PressRelease[]) => { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d)); load(d); })
      .catch(() => setNotFound(true));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => p ? { ...p, [name]: value } : p);
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && form && !form.tags.includes(t)) setForm((p) => p ? { ...p, tags: [...p.tags, t] } : p);
    setTagInput("");
  }
  function removeTag(t: string) { setForm((p) => p ? { ...p, tags: p.tags.filter((x) => x !== t) } : p); }

  function validate() {
    if (!form) return false;
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.date.trim()) e.date = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: PressRelease[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all.map((i) => i.id === id ? form! : i)));
      setSaving(false);
      router.push("/admin/press-releases");
    }, 500);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-lg font-semibold" style={{ color: "var(--text)" }}>Press release not found</p>
      <Link href="/admin/press-releases" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#4caf50" }}>← Back to Press Releases</Link>
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
            <Link href="/admin/press-releases" className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Edit Press Release</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Editing: <span style={{ color: "#4caf50" }}>#{id}</span> — {form.title.slice(0, 50)}{form.title.length > 50 ? "…" : ""}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/press-releases" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              Discard
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <FileText className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">

            <Section title="Release Details">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: "var(--text-muted)" }}>
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="title" value={form.title} onChange={handleChange}
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
                {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
              </div>
              <Field label="Slug" name="slug" value={form.slug} onChange={handleChange} />
              <Field label="Excerpt / Lead paragraph" name="excerpt" value={form.excerpt} onChange={handleChange} multiline rows={3} />
            </Section>

            <Section title="Full Release Body">
              <p className="text-xs -mt-1" style={{ color: "var(--text-faint)" }}>
                Separate paragraphs with a blank line.
              </p>
              <Field label="Body" name="body" value={form.body} onChange={handleChange} multiline rows={10} />
            </Section>

            <Section title="Tags">
              <div className="flex gap-2">
                <input type="text" value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  placeholder="Type a tag and press Enter"
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
                        className="opacity-60 hover:opacity-100"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>No tags.</p>
              )}
            </Section>
          </div>

          <div className="space-y-5">
            <div className="admin-card rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Release Meta</h3>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: "var(--text-muted)" }}>
                  Date <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="date" value={form.date} onChange={handleChange}
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.date ? "border-red-400" : ""}`} />
                {errors.date && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.date}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                  <option value="">Select</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Media Contact Email</label>
                <input name="contact" value={form.contact} onChange={handleChange}
                  className="admin-input rounded-xl px-3 py-2.5 text-sm" />
              </div>
            </div>

            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "ID",       value: `#${form.id}` },
                { label: "Date",     value: form.date     || "—" },
                { label: "Category", value: form.category || "—" },
                { label: "Contact",  value: form.contact  || "—" },
                { label: "Tags",     value: form.tags.length ? form.tags.join(", ") : "None" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm gap-2">
                  <span className="flex-shrink-0" style={{ color: "var(--text-faint)" }}>{label}</span>
                  <span className="font-medium truncate text-right" style={{ color: "var(--text)" }}>{value}</span>
                </div>
              ))}
            </div>

            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <FileText className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
