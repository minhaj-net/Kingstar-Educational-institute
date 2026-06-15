"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Bell, Plus, X } from "lucide-react";
import type { Announcement } from "../page";

const STORAGE_KEY = "admin_announcements";
const CATEGORIES = ["Academic","IT & Systems","Health & Safety","Campus Operations","Student Services","Research","Events","Finance"];
const PRIORITIES = ["Urgent","High","Medium","Low"];
const STATUSES   = ["Active","Upcoming","Expired"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3"
        style={{ color: "var(--text)", borderColor: "var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, name, value, onChange, required = false, multiline = false, rows = 4, error = "" }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean; rows?: number; error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} rows={rows} required={required}
            className={`admin-input rounded-xl px-3 py-2.5 text-sm resize-none ${error ? "border-red-400" : ""}`} />
        : <input type="text" name={name} value={value} onChange={onChange} required={required}
            className={`admin-input rounded-xl px-3 py-2.5 text-sm ${error ? "border-red-400" : ""}`} />}
      {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, options, onChange }: {
  label: string; name: string; value: string;
  options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</label>
      <select name={name} value={value} onChange={onChange}
        className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
        <option value="">Select {label}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function AddAnnouncementPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState<Omit<Announcement, "id">>({
    slug: "", title: "", category: "", priority: "Medium",
    status: "Active", date: "", expiresAt: "", author: "",
    excerpt: "", body: "", tags: [],
  });

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
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
    if (!form.author.trim()) e.author = "Required";
    if (!form.date.trim()) e.date = "Required";
    setErrors(e); return !Object.keys(e).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const all: Announcement[] = raw ? JSON.parse(raw) : [];
      const maxId = all.reduce((m, i) => Math.max(m, i.id), 0);
      const slug = form.slug.trim() || slugify(form.title);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...all, { ...form, slug, id: maxId + 1 }]));
      setSaving(false);
      router.push("/admin/announcements");
    }, 500);
  }

  // Priority color preview
  const priorityColors: Record<string, string> = {
    Urgent: "#ef4444", High: "#ca8a04", Medium: "#4caf50", Low: "#94a3b8",
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/announcements"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Add Announcement</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Create a new official announcement
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/announcements"
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
                : <Bell className="w-4 h-4" />}
              {saving ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left 2/3 */}
          <div className="xl:col-span-2 space-y-5">

            <Section title="Announcement Content">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="title" value={form.title}
                  onChange={(e) => { handleChange(e); setForm((p) => ({ ...p, slug: slugify(e.target.value) })); }}
                  placeholder="e.g. Academic Calendar Updates for Fall 2025"
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.title ? "border-red-400" : ""}`} />
                {errors.title && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.title}</p>}
              </div>
              <Field label="Slug (auto-generated)" name="slug" value={form.slug} onChange={handleChange} />
              <Field label="Excerpt / Short Summary" name="excerpt" value={form.excerpt} onChange={handleChange} multiline rows={3} />
            </Section>

            <Section title="Full Body">
              <p className="text-xs -mt-1" style={{ color: "var(--text-faint)" }}>
                Separate paragraphs with a blank line. Use bullet lists with • character.
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
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>No tags added yet.</p>
              )}
            </Section>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-5">

            <div className="admin-card rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Settings</h3>

              <SelectField label="Category" name="category" value={form.category}
                options={CATEGORIES} onChange={handleChange} />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Priority</label>
                <select name="priority" value={form.priority} onChange={handleChange}
                  className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                  {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {form.priority && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: priorityColors[form.priority] }} />
                    <span className="text-xs font-semibold" style={{ color: priorityColors[form.priority] }}>
                      {form.priority} priority
                    </span>
                  </div>
                )}
              </div>

              <SelectField label="Status" name="status" value={form.status}
                options={STATUSES} onChange={handleChange} />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                  Author <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input name="author" value={form.author} onChange={handleChange}
                  placeholder="e.g. Office of the Registrar"
                  className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.author ? "border-red-400" : ""}`} />
                {errors.author && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.author}</p>}
              </div>

              <Field label="Date Published" name="date" value={form.date} onChange={handleChange}
                required error={errors.date} placeholder="e.g. June 1, 2025" />

              <Field label="Expires At" name="expiresAt" value={form.expiresAt} onChange={handleChange}
                placeholder="e.g. September 30, 2025" />
            </div>

            {/* Summary */}
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "Category", value: form.category || "—" },
                { label: "Priority", value: form.priority || "—" },
                { label: "Status",   value: form.status   || "—" },
                { label: "Author",   value: form.author   || "—" },
                { label: "Date",     value: form.date     || "—" },
                { label: "Tags",     value: form.tags.length ? `${form.tags.length} added` : "None" },
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
                : <Bell className="w-4 h-4" />}
              {saving ? "Publishing…" : "Publish Announcement"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
