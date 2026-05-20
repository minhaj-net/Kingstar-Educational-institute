import type { Metadata } from "next";
import PortalHero from "./portal-component/PortalHero";

export const metadata: Metadata = {
  title: "Portal",
  description:
    "KU Student & Faculty Portal – access your courses, grades, library, email, and all campus services in one place.",
};

export default function PortalPage() {
  return <PortalHero />;
}
