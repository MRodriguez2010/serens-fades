import type { Metadata } from "next";
import { ConceptDemo } from "../concept-demo";

export const metadata: Metadata = {
  title: "Modern Heritage Concept",
  description: "A functional stakeholder demo for the Modern Heritage website direction.",
};

export default function ModernHeritagePage() {
  return <ConceptDemo variant="heritage" />;
}
