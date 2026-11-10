import type { Metadata } from "next";
import { ConceptDemo } from "../concept-demo";

export const metadata: Metadata = {
  title: "Doorstep Journey Concept",
  description: "A functional stakeholder demo for the Doorstep Journey website direction.",
};

export default function DoorstepJourneyPage() {
  return <ConceptDemo variant="journey" />;
}
