import type { Metadata } from "next";
import { ConceptDemo } from "./concepts/concept-demo";

export const metadata: Metadata = {
  title: { absolute: "Seren's Fades | Mobile Barber in Dallas–Fort Worth" },
  description:
    "Premium mobile fades, beard trims, lineups, and kids cuts across Dallas–Fort Worth.",
};

export default function Home() {
  return <ConceptDemo variant="heritage" presentation="published" />;
}
