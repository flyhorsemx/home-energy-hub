import type { Metadata } from "next"
import SolarCalculator from "@/components/tools/SolarCalculator"

export const metadata: Metadata = {
  title: "Solar Savings Calculator — How Much Can You Save?",
  description:
    "Use our free solar savings calculator to estimate your payback period, 20-year savings, and federal tax credit. Get a personalized quote in 60 seconds.",
}

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Free Tool
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Solar Savings Calculator</h1>
          <p className="text-gray-500 text-lg">
            Enter your details below to see your estimated savings, payback period, and how much the 30% federal tax credit is worth for your home.
          </p>
        </div>

        <SolarCalculator />

        <p className="text-xs text-gray-400 text-center mt-8">
          Estimates based on national averages. Actual savings vary by location, roof angle, shading, and utility rates.
          Always obtain professional site assessments before making purchasing decisions.
        </p>
      </div>
    </div>
  )
}
