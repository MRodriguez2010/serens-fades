import type { Metadata } from "next";
import { AssetReviewHub } from "../asset-review-hub";

export const metadata: Metadata = { title: "Design review" };
export default function DesignReview() { return <AssetReviewHub />; }
