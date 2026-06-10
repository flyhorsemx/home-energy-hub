"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, ArrowRight, Sun, DollarSign, TrendingUp } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

const STATE_RATES: Record<string, number> = {
  California: 0.27, Texas: 0.13, Florida: 0.14, Arizona: 0.13, Nevada: 0.14,
  "New York": 0.22, "New Jersey": 0.18, Colorado: 0.14, Georgia: 0.13, "North Carolina": 0.12,
  Other: 0.15,
}

const STATE_SUN: Record<string, number> = {
  California: 5.8, Texas: 5.2, Florida: 5.0, Arizona: 6.5, Nevada: 6.0,
  "New York": 4.0, "New Jersey": 4.2, Colorado: 5.0, Georgia: 4.8, "North Carolina": 4.6,
  Other: 4.5,
}

export default function SolarROIClient() {
  const [monthlyBill, setMonthlyBill] = useState(150)
  const [state, setState] = useState("California")
  const [systemSize, setSystemSize] = useState(7)
  const [calculated, setCalculated] = useState(false)

  const rate = STATE_RATES[state] || 0.15
  const sunHours = STATE_SUN[state] || 4.5
  const systemCostPerW = 2.85
  const systemCost = systemSize * 1000 * systemCostPerW
  const localIncentiveEstimate = 0
  const netCost = systemCost - localIncentiveEstimate
  const annualProduction = systemSize * sunHours * 365 * 0.80
  const annualSavings = annualProduction * rate
  const paybackYears = netCost / annualSavings
  const lifetime25Savings = annualSavings * 25 - netCost

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-12 px-4 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sun className="w-8 h-8" />
          <Calculator className="w-6 h-6 text-yellow-200" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Solar ROI Calculator</h1>
        <p className="text-yellow-100 text-sm max-w-xl mx-auto">
          Estimate solar payback, bill impact, and quote assumptions based on your state and usage.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Your Information</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Electric Bill: <span className="text-green-700 font-bold">${monthlyBill}</span>
                </label>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$50</span><span>$500</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {Object.keys(STATE_RATES).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  System Size: <span className="text-green-700 font-bold">{systemSize} kW</span>
                </label>
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={0.5}
                  value={systemSize}
                  onChange={(e) => setSystemSize(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>3 kW</span><span>15 kW</span>
                </div>
              </div>

              <button
                onClick={() => setCalculated(true)}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Calculate My ROI
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {calculated ? (
              <>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Your Solar ROI
                  </h2>
                  <div className="space-y-3">
                    {[
                      { label: "System Cost (before incentives)", value: `$${systemCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                      { label: "Local Incentive Estimate", value: localIncentiveEstimate > 0 ? `-$${localIncentiveEstimate.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "Verify locally", highlight: true },
                      { label: "Estimated Net Cost", value: `${netCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    ].map((r) => (
                      <div key={r.label} className={`flex justify-between py-2 border-b border-gray-100 text-sm ${r.highlight ? "text-green-700 font-semibold" : "text-gray-700"}`}>
                        <span>{r.label}</span>
                        <span className="font-bold">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: DollarSign, label: "Annual Savings", value: `$${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, color: "text-green-700" },
                    { icon: Calculator, label: "Payback Period", value: `${paybackYears.toFixed(1)} yrs`, color: "text-blue-700" },
                    { icon: TrendingUp, label: "25-Year Profit", value: `$${lifetime25Savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, color: "text-purple-700" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                      <p className={`text-xl font-extrabold ${color}`}>{value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                  <p className="text-sm font-semibold text-green-800 mb-2">
                    🎯 Ready to get accurate quotes for your home?
                  </p>
                  <p className="text-xs text-green-700 mb-4">
                    These estimates are based on average {state} data. A local installer will give you exact numbers for your specific home.
                  </p>
                  <ZipCodeForm category="solar" compact />
                </div>
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm h-full flex flex-col items-center justify-center">
                <Sun className="w-16 h-16 text-yellow-400 mb-4" />
                <p className="text-gray-500 text-sm">
                  Fill in your details and click &ldquo;Calculate My ROI&rdquo; to see your personalized solar savings estimate.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info section */}
        <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">How We Calculate Your Solar ROI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            {[
              { title: "System Cost", desc: "Based on average installed cost per watt in your state, including equipment and labor." },
              { title: "Energy Production", desc: "Calculated using your state's average peak sun hours and a standard 80% performance factor." },
              { title: "Savings Estimate", desc: "Annual savings based on current utility rates in your state. Rates typically increase 3-4% per year." },
            ].map((item) => (
              <div key={item.title}>
                <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/calculator" className="inline-flex items-center gap-1.5 text-sm text-green-700 font-medium hover:underline">
            Try our detailed Solar Savings Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
