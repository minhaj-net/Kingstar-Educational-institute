import type { Metadata } from "next";
import ApplyHero from "./apply-component/ApplyHero";
import ApplyDetail from "./apply-component/ApplyDetail";
import ApplyServices from "./apply-component/ApplyServices";
import ApplyProcess from "./apply-component/ApplyProcess";

export const metadata: Metadata = {
  title: "Apply To Kingster",
  description:
    "Start your journey at Kingster University. Apply now for undergraduate, graduate, and professional programs.",
};

export default function ApplyKingstarPage() {
  return (
    <>
      {/* ── Apply Hero ── */}
      <ApplyHero />

      {/* ── Detail About How To Apply ── */}
      <ApplyDetail />

      {/* ── Services + Fixed Background Image ── */}
      <ApplyServices />

      {/* ── Application Process + Things To Know + When To Apply ── */}
      <ApplyProcess />
    </>
  );
}
