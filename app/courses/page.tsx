import type { Metadata } from "next";
import CoursesPage from "./courses-component/CoursesPage";

export const metadata: Metadata = {
  title: "Courses",
  description: "Search and browse Kingster University courses.",
};

export default function Page() {
  return <CoursesPage />;
}
