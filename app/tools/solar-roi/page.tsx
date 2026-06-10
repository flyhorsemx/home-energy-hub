import type { Metadata } from "next"
import SolarROIClient from "@/components/tools/SolarROIClient"

export const metadata: Metadata = {
  title: "Solar ROI Calculator 2026: Estimate Payback and Quote Assumptions",
  description:
    "Estimate solar payback, annual bill impact, and local incentive assumptions under current 2026 solar rules before requesting quotes.",
}

export default function SolarROIPage() {
  return <SolarROIClient />
}
