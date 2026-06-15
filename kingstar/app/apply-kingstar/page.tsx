import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import ApplyHero from "./apply-component/ApplyHero";
import ApplyDetail from "./apply-component/ApplyDetail";
import ApplyServices from "./apply-component/ApplyServices";
import ApplyProcess from "./apply-component/ApplyProcess";
import type { ApplyNowData } from "./apply-component/types";

export const metadata: Metadata = {
  title: "Apply To Kingster",
  description:
    "Start your journey at Kingster University. Apply now for undergraduate, graduate, and professional programs.",
};

function getApplyData(): ApplyNowData {
  const filePath = join(process.cwd(), "public", "apply-now.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export default function ApplyKingstarPage() {
  const data = getApplyData();

  return (
    <>
      <ApplyHero data={data.hero} />
      <ApplyDetail data={data.detail} />
      <ApplyServices data={data.services} />
      <ApplyProcess data={data.process} admissionInfo={data.admissionInfo} />
    </>
  );
}
