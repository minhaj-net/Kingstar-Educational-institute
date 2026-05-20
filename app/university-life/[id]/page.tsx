import { notFound } from "next/navigation";
import type { Metadata } from "next";
import UniversityLifeDetail from "./university-detail-component/UniversityLifeDetail";
import lifeData from "../../../public/university-life.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const items = lifeData as any[];

export async function generateStaticParams() {
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = items.find((i) => i.id === id);
  if (!item) return { title: "Not Found" };
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = items.find((i) => i.id === id);
  if (!item) notFound();
  return <UniversityLifeDetail item={item} />;
}
