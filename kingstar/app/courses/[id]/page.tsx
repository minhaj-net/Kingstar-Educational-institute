import { notFound } from "next/navigation";
import CourseDetail from "./course-detail-component/CourseDetail";
import coursesData from "../../../public/courses.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const courses = coursesData as any[];

export async function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) return { title: "Course Not Found" };
  return { title: course.title };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();
  return <CourseDetail course={course} />;
}
