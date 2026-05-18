import type { Metadata } from "next";
import PriceHero from "./price-component/PriceHero";
import PricingTable from "./price-component/PricingTable";

export const metadata: Metadata = {
  title: "Price Table",
  description:
    "Explore Kingster University's tuition and program pricing – transparent, flexible plans for every student.",
};

export default function PriceTablePage() {
  return (
    <>
      {/* ── Price Table Hero ── */}
      <PriceHero />

      {/* ── Pricing Table With Featured ── */}
      <PricingTable />
    </>
  );
}
