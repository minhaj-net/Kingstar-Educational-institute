"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Loader, UserCircle } from "lucide-react";
import { StatusBadge } from "../../../_components/DataTable";
import type { AlumniMember } from "../../page";

const categoryOptions = ["BLOG", "MASONRY", "RESEARCH", "ALUMNI", "NEWS", "ARTICLE"];

function Field({ label, name, value, onChange, required = false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input type="text" name={name} value={value} onChange={onChange} required={required}
        className="admin-input rounded-xl px-3 py-2.5 text-sm" />
    </div>
  );
}

export default function EditAlumniPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [form, setForm] = useState<AlumniMember | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = (data: AlumniMember[]) => {
      const found = data.find((m) => String(m.id) === String(id));
      if (!found) { setNotFound(true); return; }
      setForm(found);
    };
    const saved = sessionStorage.getItem("admin_alumni");
    if (saved) { load(JSON.parse(saved)); return; }
    fetch("/alumni-members.json").then((r) => r.json()).then((d: AlumniMember[]) => {
      sessionStorage.setItem("admin_alumni", JSON.stringify(d)); load(d);
    }).catch(() => setNotFound(true));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((p) => p ? { ...p, [name]: value } : p);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setTimeout(() => {
      const raw = sessionStorage.getItem("admin_alumni");
      const all: AlumniMember[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem("admin_alumni", JSON.stringify(all.map((m) => String(m.id) === String(id) ? form : m)));
      setSaving(false);
      router.push("/admin/alumni");
    }, 600);
  }

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p style={{ color: "var(--text)" }}>Alumni member not found.</p>
      <Link href="/admin/alumni" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#4caf50" }}>← Back</Link>
    </div>
  );

  if (!form) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="w-8 h-8 animate-spin" style={{ color: "#4caf50" }} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/alumni"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Edit Alumni Member</h1>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Editing: <span style={{ color: "#4caf50" }}>{form.name}</span></p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/alumni" className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>Discard</Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <UserCircle className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 admin-card rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>Member Information</h3>
            <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Date" name="date" value={form.date} onChange={handleChange} />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="admin-input rounded-xl px-3 py-2.5 text-sm" style={{ appearance: "none" }}>
                  <option value="">Select</option>
                  {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <Field label="Article Title" name="title" value={form.title} onChange={handleChange} required />
            <Field label="Slug" name="slug" value={form.slug} onChange={handleChange} />
            <Field label="Image URL" name="image" value={form.image} onChange={handleChange} />
            {form.image.startsWith("http") && (
              <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "160px" }}>
                <Image src={form.image} alt="preview" fill className="object-cover" unoptimized />
              </div>
            )}
          </div>
          <div className="space-y-5">
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Preview</h3>
              <div className="text-sm" style={{ color: "var(--text-faint)" }}>Name: <span style={{ color: "var(--text)" }}>{form.name}</span></div>
              <div className="text-sm flex items-center gap-2">Category: <StatusBadge value={form.category || "—"} /></div>
              <div className="text-sm" style={{ color: "var(--text-faint)" }}>Date: <span style={{ color: "var(--text)" }}>{form.date}</span></div>
            </div>
            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <UserCircle className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
