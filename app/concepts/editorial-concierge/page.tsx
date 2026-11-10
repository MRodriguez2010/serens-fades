import type { Metadata } from "next";
import { ConceptDemo } from "../concept-demo";

export const metadata: Metadata = {
  title: "Editorial Concierge Concept",
  description: "A functional stakeholder demo for the Editorial Concierge website direction.",
};

export default function EditorialConciergePage() {
  return <ConceptDemo variant="editorial" />;
}
