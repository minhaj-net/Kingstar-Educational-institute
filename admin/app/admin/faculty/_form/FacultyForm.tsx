"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Plus, X, UserCircle } from "lucide-react";

interface Skill { name: string; level: number; }
export interface Faculty {
  id: string; name: string; role: string; email: string; phone: string;
  room: string; image: string; biography: string;
  qualifications: string[]; education: string[];
  publications: string[]; skills: Skill[];
}

export const EMPTY_FACULTY: Faculty = {
  id: "", name: "", role: "", email: "", phone: "",
  room: "", image: "", biography: "",
  qualifications: [], education: [], publications: [],
  skills: [],
};

const roleOptions = [
  "Professor", "Associate Professor", "Assistant Professor",
  "Adjunct Professor", "Visiting Professor", "Lecturer", "Research Fellow",
];

// ─── Reusable helpers ─────────────────────────────────────────────────────────

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-sm font-bold border-b pb-3"
        style={{ color: "var(--text)", borderColor: "var(--border)" }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label, name, value, onChange, placeholder = "", multiline = false, required = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string; multiline?: boolean; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      {multiline ? (
        <textarea name={name} value={value} onChange={onChange} rows={4}
          placeholder={placeholder} required={required}
          className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none" />
      ) : (
        <input type="text" name={name} value={value} onChange={onChange}
          placeholder={placeholder} required={required}
          className="admin-input rounded-xl px-3 py-2.5 text-sm" />
      )}
    </div>
  );
}

function ListEditor({
  label, items, onAdd, onRemove, placeholder,
}: {
  label: string; items: string[]; placeholder: string;
  onAdd: (val: string) => void; onRemove: (val: string) => void;
}) {
  const [input, setInput] = useState("");
  function add() {
    const v = input.trim();
    if (v && !items.includes(v)) onAdd(v);
    setInput("");
  }
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</label>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className="admin-input rounded-xl px-3 py-2 text-sm flex-1" />
        <button type="button" onClick={add}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-1">
          {items.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-2 px-3 py-2 rounded-lg text-xs"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <span className="flex-1">{item}</span>
              <button type="button" onClick={() => onRemove(item)}
                className="opacity-50 hover:opacity-100 flex-shrink-0">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function FacultyForm({
  initial, mode,
}: {
  initial: Faculty;
  mode: "add" | "edit";
}) {
  const router = useRouter();
  const [form, setForm] = useState<Faculty>(initial);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function addToList(field: keyof Faculty, val: string) {
    setForm((prev) => ({ ...prev, [field]: [...(prev[field] as string[]), val] }));
  }
  function removeFromList(field: keyof Faculty, val: string) {
    setForm((prev) => ({ ...prev, [field]: (prev[field] as string[]).filter((x) => x !== val) }));
  }

  function addSkill(name: string) {
    if (!name.trim() || form.skills.some((s) => s.name === name.trim())) return;
    setForm((prev) => ({ ...prev, skills: [...prev.skills, { name: name.trim(), level: 80 }] }));
  }
  function removeSkill(name: string) {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.name !== name) }));
  }
  function updateSkillLevel(name: string, level: number) {
    setForm((prev) => ({
      ...prev, skills: prev.skills.map((s) => s.name === name ? { ...s, level } : s),
    }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Required";
    if (!form.role.trim())  e.role  = "Required";
    if (!form.email.trim()) e.email = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);

    // Auto-generate id from name if empty
    const saved = {
      ...form,
      id: form.id.trim() || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    };

    setTimeout(() => {
      const raw = sessionStorage.getItem("admin_faculty");
      const all: Faculty[] = raw ? JSON.parse(raw) : [];
      let updated: Faculty[];
      if (mode === "edit") {
        updated = all.map((f) => f.id === initial.id ? saved : f);
        if (!updated.find((f) => f.id === saved.id)) updated.push(saved);
      } else {
        updated = [...all, saved];
      }
      sessionStorage.setItem("admin_faculty", JSON.stringify(updated));
      setSaving(false);
      router.push("/admin/faculty");
    }, 600);
  }

  const imagePreview = form.image.startsWith("http");

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin/faculty"
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-input)", color: "var(--text-muted)" }}>
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                {mode === "add" ? "Add Faculty Member" : "Edit Faculty Member"}
              </h1>
              {mode === "edit" && (
                <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                  Editing: <span style={{ color: "#4caf50" }}>{initial.name}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/faculty"
              className="px-4 py-2.5 rounded-xl text-sm font-medium border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}>
              {mode === "edit" ? "Discard" : "Cancel"}
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#4caf50" }}
              onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <UserCircle className="w-4 h-4" />}
              {saving ? "Saving…" : mode === "add" ? "Add Member" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left 2/3 */}
          <div className="xl:col-span-2 space-y-6">

            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}>
                    Full Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="e.g. John Hagensy, PhD"
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.name ? "border-red-400" : ""}`} />
                  {errors.name && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}>
                    Role <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select name="role" value={form.role} onChange={handleChange}
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.role ? "border-red-400" : ""}`}
                    style={{ appearance: "none" }}>
                    <option value="">Select role</option>
                    {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.role && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.role}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}>
                    Email <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="name@kingsteruni.edu"
                    className={`admin-input rounded-xl px-3 py-2.5 text-sm ${errors.email ? "border-red-400" : ""}`} />
                  {errors.email && <p className="text-xs" style={{ color: "#ef4444" }}>{errors.email}</p>}
                </div>
                <Field label="Phone" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+1-000-000-0000" />
              </div>
              <Field label="Office / Room" name="room" value={form.room} onChange={handleChange}
                placeholder="e.g. Room 102, A Building" />
            </FormSection>

            <FormSection title="Biography">
              <Field label="Biography" name="biography" value={form.biography}
                onChange={handleChange} multiline
                placeholder="Brief professional biography…" />
            </FormSection>

            <FormSection title="Qualifications & Education">
              <ListEditor label="Qualifications" items={form.qualifications}
                onAdd={(v) => addToList("qualifications", v)}
                onRemove={(v) => removeFromList("qualifications", v)}
                placeholder="e.g. PhD, Accounting, Texas A&M University" />
              <ListEditor label="Education" items={form.education}
                onAdd={(v) => addToList("education", v)}
                onRemove={(v) => removeFromList("education", v)}
                placeholder="e.g. Ph.D., Finance, MIT, 2005" />
            </FormSection>

            <FormSection title="Publications">
              <ListEditor label="Publications" items={form.publications}
                onAdd={(v) => addToList("publications", v)}
                onRemove={(v) => removeFromList("publications", v)}
                placeholder="e.g. Market Behavior in Emerging Economies" />
            </FormSection>

            <FormSection title="Skills">
              {(() => {
                const [skillInput, setSkillInput] = useState("");
                return (
                  <>
                    <div className="flex gap-2">
                      <input type="text" value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput); setSkillInput(""); } }}
                        placeholder="e.g. FINANCIAL MODELING"
                        className="admin-input rounded-xl px-3 py-2 text-sm flex-1" />
                      <button type="button" onClick={() => { addSkill(skillInput); setSkillInput(""); }}
                        className="px-3 py-2 rounded-xl text-sm font-semibold text-white"
                        style={{ backgroundColor: "#4caf50" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#43a047")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}>
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {form.skills.map((skill) => (
                      <div key={skill.name} className="flex flex-col gap-1.5 p-3 rounded-xl"
                        style={{ backgroundColor: "var(--bg-input)" }}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold tracking-wide" style={{ color: "var(--text)" }}>
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold" style={{ color: "#4caf50" }}>{skill.level}%</span>
                            <button type="button" onClick={() => removeSkill(skill.name)}
                              className="opacity-50 hover:opacity-100"><X className="w-3 h-3" style={{ color: "var(--text-muted)" }} /></button>
                          </div>
                        </div>
                        <input type="range" min={0} max={100} value={skill.level}
                          onChange={(e) => updateSkillLevel(skill.name, Number(e.target.value))}
                          className="w-full accent-green-500 h-1.5 rounded-full cursor-pointer" />
                      </div>
                    ))}
                  </>
                );
              })()}
            </FormSection>

          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">

            <FormSection title="Profile Photo">
              <Field label="Image URL" name="image" value={form.image} onChange={handleChange}
                placeholder="https://images.unsplash.com/…" />
              {imagePreview ? (
                <div className="relative w-full overflow-hidden rounded-xl" style={{ height: "200px" }}>
                  <Image src={form.image} alt="preview" fill className="object-cover object-top" unoptimized />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl py-10 gap-2"
                  style={{ backgroundColor: "var(--bg-input)", border: "2px dashed var(--border)" }}>
                  <UserCircle className="w-10 h-10" style={{ color: "var(--text-faint)" }} />
                  <p className="text-xs" style={{ color: "var(--text-faint)" }}>Paste an image URL above</p>
                </div>
              )}
            </FormSection>

            {/* Summary */}
            <div className="admin-card rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>Summary</h3>
              {[
                { label: "Role",         value: form.role  || "—" },
                { label: "Email",        value: form.email || "—" },
                { label: "Quals",        value: form.qualifications.length ? `${form.qualifications.length}` : "0" },
                { label: "Publications", value: form.publications.length  ? `${form.publications.length}` : "0" },
                { label: "Skills",       value: form.skills.length        ? `${form.skills.length}`        : "0" },
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
              {saving
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <UserCircle className="w-4 h-4" />}
              {saving ? "Saving…" : mode === "add" ? "Add Member" : "Save Changes"}
            </button>

          </div>
        </div>
      </div>
    </form>
  );
}
