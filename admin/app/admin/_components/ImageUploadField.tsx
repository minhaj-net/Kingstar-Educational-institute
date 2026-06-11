"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link2, Paperclip, X } from "lucide-react";

interface Props {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  previewHeight?: number;
  placeholderIcon?: React.ReactNode;
  name?: string;
}

/**
 * ImageUploadField
 * ─────────────────
 * Two ways to set an image:
 *  1. Paste/type a URL in the text input
 *  2. Click "Choose File" to pick a local file → converted to a data-URL for preview
 *
 * The resulting value is always a string (URL or base64 data-URL).
 */
export default function ImageUploadField({
  label = "Image",
  value,
  onChange,
  previewHeight = 160,
  placeholderIcon,
  name = "image",
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const hasPreview = value.startsWith("http") || value.startsWith("data:");

  // ── Handle file picked from explorer ──
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-3">
      {/* ── URL input row ── */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-semibold flex items-center gap-1.5"
          style={{ color: "var(--text-muted)" }}
        >
          <Link2 className="w-3.5 h-3.5" />
          {label} URL
        </label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/…"
          className="admin-input rounded-xl px-3 py-2.5 text-sm"
        />
      </div>

      {/* ── OR divider ── */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-xs font-medium" style={{ color: "var(--text-faint)" }}>
          or
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
      </div>

      {/* ── File picker button ── */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium border-2 border-dashed transition-all duration-200"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-muted)",
          backgroundColor: "var(--bg-input)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#4caf50";
          e.currentTarget.style.color = "#4caf50";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--text-muted)";
        }}
      >
        <Paperclip className="w-4 h-4" />
        Choose from file explorer
      </button>

      {/* ── Preview ── */}
      {hasPreview ? (
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{ height: `${previewHeight}px` }}
        >
          <Image
            src={value}
            alt="preview"
            fill
            className="object-cover"
            unoptimized
          />
          {/* Remove button */}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg transition-opacity"
            style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center rounded-xl gap-2 cursor-pointer transition-all duration-200"
          style={{
            height: `${previewHeight}px`,
            backgroundColor: "var(--bg-input)",
            border: "2px dashed var(--border)",
          }}
          onClick={() => fileRef.current?.click()}
        >
          {placeholderIcon ?? (
            <Paperclip className="w-8 h-8" style={{ color: "var(--text-faint)" }} />
          )}
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            Paste URL above or click to browse
          </p>
        </div>
      )}
    </div>
  );
}
