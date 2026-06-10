import type { Metadata } from "next"
import RebatesClient from "@/components/tools/RebatesClient"

export const metadata: Metadata = {
  title: "Home Energy Rebate Finder 2026: State, Utility, and DOE Programs",
  description:
    "Check current 2026 home energy rebate categories by state and utility, including HVAC, insulation, solar, battery, and weatherization programs.",
}

export default function RebatesPage() {
  return <RebatesClient />
}
