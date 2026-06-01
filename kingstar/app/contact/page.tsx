import type { Metadata } from "next";
import ContactHero from "./contact-component/ContactHero";
import ContactForm from "./contact-component/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Kingster University. We are here to answer your questions about admissions, programs, and campus life.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Contact Hero ── */}
      <ContactHero />

      {/* ── Contact Form + Location + Map + Social ── */}
      <ContactForm />
    </>
  );
}
