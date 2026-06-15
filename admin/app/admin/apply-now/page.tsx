"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, X, Save, Loader, RefreshCw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProcessStep  { num: number; title: string; body: string; }
interface ServiceItem  { icon: string; title: string; body: string; }
interface DeadlineRow  { type: string; application: string; decision: string; }

interface ApplyData {
  hero: { eyebrow: string; title: string; backgroundImage: string; };
  detail: { heading: string; breadcrumbLabel: string; col1: string; col2: string; };
  services: { backgroundImage: string; items: ServiceItem[]; };
  process: { heading: string; steps: ProcessStep[]; };
  admissionInfo: {
    thingsToKnow: { heading: string; intro: string; requirementsLabel: string; requirements: string[]; btn1: string; btn2: string; };
    whenToApply: { heading: string; tableHeaders: string[]; deadlines: DeadlineRow[]; };
    whereToSubmit: { heading: string; intro: string; address: string; };
  };
}

const SESSION_KEY = "admin_apply_now";
const ICON_OPTIONS = ["BookOpen", "Globe", "GraduationCap", "Building2", "Star", "Heart", "Users", "Award"];

// ─── Small reusable components ────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="admin-card rounded-2xl p-6 flex flex-col gap-5">
      <h3 className="text-sm font-bold border-b pb-3" style={{ color: "var(--text)", borderColor: "var(--border)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, multiline = false, rows = 3, placeholder = "",
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  multiline?: boolean; rows?: number; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="admin-input rounded-xl px-3 py-2.5 text-sm resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="admin-input rounded-xl px-3 py-2.5 text-sm"
        />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ApplyNowAdminPage() {
  const [data, setData]       = useState<ApplyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  // ── Load ──
  useEffect(() => {
    const cached = sessionStorage.getItem(SESSION_KEY);
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }
    fetch("/apply-now.json")
      .then((r) => r.json())
      .then((d: ApplyData) => {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(d));
        setData(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  function reset() {
    sessionStorage.removeItem(SESSION_KEY);
    setLoading(true);
    fetch("/apply-now.json")
      .then((r) => r.json())
      .then((d: ApplyData) => {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(d));
        setData(d);
      })
      .finally(() => setLoading(false));
  }

  // ── Save (persists to sessionStorage; extend to API call as needed) ──
  function handleSave() {
    if (!data) return;
    setSaving(true);
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 600);
  }

  // ── Generic deep updater helpers ──
  function setHero(key: keyof ApplyData["hero"], val: string) {
    setData((p) => p ? { ...p, hero: { ...p.hero, [key]: val } } : p);
  }
  function setDetail(key: keyof ApplyData["detail"], val: string) {
    setData((p) => p ? { ...p, detail: { ...p.detail, [key]: val } } : p);
  }
  function setServicesImg(val: string) {
    setData((p) => p ? { ...p, services: { ...p.services, backgroundImage: val } } : p);
  }
  function setServiceItem(i: number, key: keyof ServiceItem, val: string) {
    setData((p) => {
      if (!p) return p;
      const items = p.services.items.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
      return { ...p, services: { ...p.services, items } };
    });
  }
  function addServiceItem() {
    setData((p) => {
      if (!p) return p;
      return { ...p, services: { ...p.services, items: [...p.services.items, { icon: "BookOpen", title: "", body: "" }] } };
    });
  }
  function removeServiceItem(i: number) {
    setData((p) => {
      if (!p) return p;
      return { ...p, services: { ...p.services, items: p.services.items.filter((_, idx) => idx !== i) } };
    });
  }

  function setProcessHeading(val: string) {
    setData((p) => p ? { ...p, process: { ...p.process, heading: val } } : p);
  }
  function setStep(i: number, key: keyof Omit<ProcessStep, "num">, val: string) {
    setData((p) => {
      if (!p) return p;
      const steps = p.process.steps.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
      return { ...p, process: { ...p.process, steps } };
    });
  }
  function addStep() {
    setData((p) => {
      if (!p) return p;
      const n = p.process.steps.length + 1;
      return { ...p, process: { ...p.process, steps: [...p.process.steps, { num: n, title: "", body: "" }] } };
    });
  }
  function removeStep(i: number) {
    setData((p) => {
      if (!p) return p;
      const steps = p.process.steps.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, num: idx + 1 }));
      return { ...p, process: { ...p.process, steps } };
    });
  }

  // things to know
  function setTTK(key: string, val: string) {
    setData((p) => p ? { ...p, admissionInfo: { ...p.admissionInfo, thingsToKnow: { ...p.admissionInfo.thingsToKnow, [key]: val } } } : p);
  }
  function setRequirement(i: number, val: string) {
    setData((p) => {
      if (!p) return p;
      const requirements = p.admissionInfo.thingsToKnow.requirements.map((r, idx) => idx === i ? val : r);
      return { ...p, admissionInfo: { ...p.admissionInfo, thingsToKnow: { ...p.admissionInfo.thingsToKnow, requirements } } };
    });
  }
  function addRequirement() {
    setData((p) => {
      if (!p) return p;
      return { ...p, admissionInfo: { ...p.admissionInfo, thingsToKnow: { ...p.admissionInfo.thingsToKnow, requirements: [...p.admissionInfo.thingsToKnow.requirements, ""] } } };
    });
  }
  function removeRequirement(i: number) {
    setData((p) => {
      if (!p) return p;
      return { ...p, admissionInfo: { ...p.admissionInfo, thingsToKnow: { ...p.admissionInfo.thingsToKnow, requirements: p.admissionInfo.thingsToKnow.requirements.filter((_, idx) => idx !== i) } } };
    });
  }

  // when to apply
  function setWTA(key: string, val: string) {
    setData((p) => p ? { ...p, admissionInfo: { ...p.admissionInfo, whenToApply: { ...p.admissionInfo.whenToApply, [key]: val } } } : p);
  }
  function setDeadline(i: number, key: keyof DeadlineRow, val: string) {
    setData((p) => {
      if (!p) return p;
      const deadlines = p.admissionInfo.whenToApply.deadlines.map((d, idx) => idx === i ? { ...d, [key]: val } : d);
      return { ...p, admissionInfo: { ...p.admissionInfo, whenToApply: { ...p.admissionInfo.whenToApply, deadlines } } };
    });
  }
  function addDeadline() {
    setData((p) => {
      if (!p) return p;
      return { ...p, admissionInfo: { ...p.admissionInfo, whenToApply: { ...p.admissionInfo.whenToApply, deadlines: [...p.admissionInfo.whenToApply.deadlines, { type: "", application: "", decision: "" }] } } };
    });
  }
  function removeDeadline(i: number) {
    setData((p) => {
      if (!p) return p;
      return { ...p, admissionInfo: { ...p.admissionInfo, whenToApply: { ...p.admissionInfo.whenToApply, deadlines: p.admissionInfo.whenToApply.deadlines.filter((_, idx) => idx !== i) } } };
    });
  }

  // where to submit
  function setWTS(key: string, val: string) {
    setData((p) => p ? { ...p, admissionInfo: { ...p.admissionInfo, whereToSubmit: { ...p.admissionInfo.whereToSubmit, [key]: val } } } : p);
  }

  // ─────────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="w-8 h-8 animate-spin" style={{ color: "#4caf50" }} />
      </div>
    );
  }
  if (!data) return <p className="p-8" style={{ color: "var(--text)" }}>Failed to load data.</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Apply Now Page</h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
            Edit all content shown on the frontend Apply To Kingster page
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset to JSON
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60 transition-colors"
            style={{ backgroundColor: saved ? "#2e7d32" : "#4caf50" }}
            onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = saved ? "#2e7d32" : "#4caf50")}
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ══════════ 1. HERO ══════════ */}
      <Section title="🖼 Hero Section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Eyebrow Text" value={data.hero.eyebrow} onChange={(v) => setHero("eyebrow", v)} placeholder="Admission" />
          <Field label="Page Title" value={data.hero.title} onChange={(v) => setHero("title", v)} placeholder="Apply To Kingster" />
        </div>
        <Field label="Background Image Path" value={data.hero.backgroundImage} onChange={(v) => setHero("backgroundImage", v)} placeholder="/slide-3.jpg" />
      </Section>

      {/* ══════════ 2. DETAIL ══════════ */}
      <Section title="📄 Detail Section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Section Heading" value={data.detail.heading} onChange={(v) => setDetail("heading", v)} />
          <Field label="Breadcrumb Label" value={data.detail.breadcrumbLabel} onChange={(v) => setDetail("breadcrumbLabel", v)} />
        </div>
        <Field label="Left Column Text" value={data.detail.col1} onChange={(v) => setDetail("col1", v)} multiline rows={4} />
        <Field label="Right Column Text" value={data.detail.col2} onChange={(v) => setDetail("col2", v)} multiline rows={4} />
      </Section>

      {/* ══════════ 3. SERVICES ══════════ */}
      <Section title="🃏 Services Cards">
        <Field label="Parallax Background Image" value={data.services.backgroundImage} onChange={setServicesImg} placeholder="/slide-3.jpg" />

        <div className="flex flex-col gap-4">
          {data.services.items.map((svc, i) => (
            <div
              key={i}
              className="rounded-xl p-4 flex flex-col gap-3 relative"
              style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}
            >
              <button
                type="button"
                onClick={() => removeServiceItem(i)}
                className="absolute top-3 right-3 opacity-50 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-xs font-bold" style={{ color: "var(--text-faint)" }}>Card {i + 1}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Icon</label>
                  <select
                    value={svc.icon}
                    onChange={(e) => setServiceItem(i, "icon", e.target.value)}
                    className="admin-input rounded-xl px-3 py-2.5 text-sm"
                    style={{ appearance: "none" }}
                  >
                    {ICON_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Title" value={svc.title} onChange={(v) => setServiceItem(i, "title", v)} />
                </div>
              </div>
              <Field label="Body Text" value={svc.body} onChange={(v) => setServiceItem(i, "body", v)} multiline rows={2} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addServiceItem}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border w-fit"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}
        >
          <Plus className="w-4 h-4" /> Add Service Card
        </button>
      </Section>

      {/* ══════════ 4. APPLICATION PROCESS ══════════ */}
      <Section title="📋 Application Process Steps">
        <Field label="Section Heading" value={data.process.heading} onChange={setProcessHeading} />

        <div className="flex flex-col gap-4">
          {data.process.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl p-4 flex flex-col gap-3 relative"
              style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}
            >
              <button
                type="button"
                onClick={() => removeStep(i)}
                className="absolute top-3 right-3 opacity-50 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-xs font-bold" style={{ color: "#4caf50" }}>Step {step.num}</p>
              <Field label="Title" value={step.title} onChange={(v) => setStep(i, "title", v)} />
              <Field label="Body" value={step.body} onChange={(v) => setStep(i, "body", v)} multiline rows={2} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addStep}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border w-fit"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}
        >
          <Plus className="w-4 h-4" /> Add Step
        </button>
      </Section>

      {/* ══════════ 5. THINGS TO KNOW ══════════ */}
      <Section title="✅ Things To Know First">
        <Field label="Heading" value={data.admissionInfo.thingsToKnow.heading} onChange={(v) => setTTK("heading", v)} />
        <Field label="Intro Paragraph" value={data.admissionInfo.thingsToKnow.intro} onChange={(v) => setTTK("intro", v)} multiline rows={3} />
        <Field label="Requirements Label" value={data.admissionInfo.thingsToKnow.requirementsLabel} onChange={(v) => setTTK("requirementsLabel", v)} />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Requirements List</label>
          {data.admissionInfo.thingsToKnow.requirements.map((req, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={req}
                onChange={(e) => setRequirement(i, e.target.value)}
                rows={2}
                className="admin-input rounded-xl px-3 py-2 text-sm flex-1 resize-none"
              />
              <button
                type="button"
                onClick={() => removeRequirement(i)}
                className="mt-2 opacity-50 hover:opacity-100 flex-shrink-0"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border w-fit"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}
          >
            <Plus className="w-3.5 h-3.5" /> Add Requirement
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Button 1 Text" value={data.admissionInfo.thingsToKnow.btn1} onChange={(v) => setTTK("btn1", v)} />
          <Field label="Button 2 Text" value={data.admissionInfo.thingsToKnow.btn2} onChange={(v) => setTTK("btn2", v)} />
        </div>
      </Section>

      {/* ══════════ 6. WHEN TO APPLY ══════════ */}
      <Section title="📅 When To Apply — Deadlines Table">
        <Field label="Section Heading" value={data.admissionInfo.whenToApply.heading} onChange={(v) => setWTA("heading", v)} />

        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Deadline Rows</label>
          {data.admissionInfo.whenToApply.deadlines.map((row, i) => (
            <div
              key={i}
              className="rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center relative"
              style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border)" }}
            >
              <button
                type="button"
                onClick={() => removeDeadline(i)}
                className="absolute top-2 right-2 opacity-50 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1 min-w-0">
                <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-faint)" }}>Type</label>
                <input value={row.type} onChange={(e) => setDeadline(i, "type", e.target.value)}
                  className="admin-input rounded-lg px-2.5 py-1.5 text-sm w-full" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-faint)" }}>Application Deadline</label>
                <input value={row.application} onChange={(e) => setDeadline(i, "application", e.target.value)}
                  className="admin-input rounded-lg px-2.5 py-1.5 text-sm w-full" />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <label className="text-xs font-semibold mb-1 block" style={{ color: "var(--text-faint)" }}>Decision Date</label>
                <input value={row.decision} onChange={(e) => setDeadline(i, "decision", e.target.value)}
                  className="admin-input rounded-lg px-2.5 py-1.5 text-sm w-full" />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addDeadline}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border w-fit"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "var(--bg-input)" }}
          >
            <Plus className="w-3.5 h-3.5" /> Add Row
          </button>
        </div>
      </Section>

      {/* ══════════ 7. WHERE TO SUBMIT ══════════ */}
      <Section title="📮 Where To Submit Documents">
        <Field label="Section Heading" value={data.admissionInfo.whereToSubmit.heading} onChange={(v) => setWTS("heading", v)} />
        <Field label="Intro Text" value={data.admissionInfo.whereToSubmit.intro} onChange={(v) => setWTS("intro", v)} />
        <Field label="Mailing Address (use line breaks)" value={data.admissionInfo.whereToSubmit.address} onChange={(v) => setWTS("address", v)} multiline rows={4} />
      </Section>

      {/* ── Bottom save ── */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#4caf50" }}
          onMouseEnter={(e) => !saving && (e.currentTarget.style.backgroundColor = "#43a047")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
        >
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

    </div>
  );
}
