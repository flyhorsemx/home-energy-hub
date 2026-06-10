import type { Metadata } from "next"
import UpgradePlannerClient from "@/components/tools/UpgradePlannerClient"

export const metadata: Metadata = {
  title: "Home Upgrade Planner 2026: Rank Solar, HVAC, Windows & Insulation",
  description:
    "Answer four questions to compare high-ROI home upgrades, local quote options, and current rebate assumptions for solar, HVAC, windows, roofing, and insulation.",
}

export default function UpgradePlannerPage() {
  return <UpgradePlannerClient />
}
