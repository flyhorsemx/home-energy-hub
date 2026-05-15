"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sun, DollarSign, TrendingDown, Zap, ArrowRight } from "lucide-react"

const STATE_INCENTIVES: Record<string, number> = {
  CA: 1500, NY: 1000, MA: 1000, TX: 0, FL: 0, CO: 500,
  AZ: 1000, NJ: 800, IL: 750, WA: 500,
}

function calcSolar(monthlyBill: number, systemSize: number, state: string) {
  const annualBill = monthlyBill * 12
  const solarProduction = systemSize * 1350 * 0.85 // kWh/yr (avg sun hours × efficiency)
  const avgRatePerKwh = 0.143 // national avg 2025
  const annualSavings = Math.min(solarProduction * avgRatePerKwh, annualBill)

  const grossCost = systemSize * 2800 // $/kW installed
  const federalCredit = grossCost * 0.30
  const stateCredit = STATE_INCENTIVES[state] || 0
  const netCost = grossCost - federalCredit - stateCredit

  const paybackYears = netCost / annualSavings
  const savings20yr = annualSavings * 20 - netCost

  return { grossCost, federalCredit, stateCredit, netCost, annualSavings, paybackYears, savings20yr, systemSize }
}

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
]

export default function SolarCalculator() {
  const router = useRouter()
  const [monthlyBill, setMonthlyBill] = useState(150)
  const [systemSize, setSystemSize] = useState(8)
  const [state, setState] = useState("CA")
  const [zip, setZip] = useState("")
  const [showResults, setShowResults] = useState(false)

  const results = calcSolar(monthlyBill, systemSize, state)

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Inputs */}
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Electric Bill: <span className="text-green-700">{fmt(monthlyBill)}</span>
          </label>
          <input
            type="range" min={50} max={500} step={10} value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>$50</span><span>$500+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estimated System Size: <span className="text-green-700">{systemSize} kW</span>
          </label>
          <input
            type="range" min={4} max={20} step={1} value={systemSize}
            onChange={(e) => setSystemSize(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>4 kW</span><span>20 kW</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Average home needs 6–10 kW. Rule of thumb: ~1 kW per $20/mo of electric bill.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500"
            >
              {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">ZIP Code</label>
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="e.g. 90210"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors"
        >
          <Sun className="w-5 h-5" /> Calculate My Solar Savings
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="border-t border-gray-100 bg-gradient-to-br from-green-50 to-white p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">Your Estimated Solar Savings</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: DollarSign, label: "System Cost", value: fmt(results.grossCost), sub: "before credits", color: "text-gray-700" },
              { icon: TrendingDown, label: "Federal Credit (30%)", value: fmt(results.federalCredit), sub: "tax credit", color: "text-green-700" },
              { icon: Zap, label: "Net Cost", value: fmt(results.netCost), sub: "after all credits", color: "text-blue-700" },
              { icon: Sun, label: "Annual Savings", value: fmt(results.annualSavings), sub: "per year", color: "text-yellow-700" },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                <p className={`text-xl font-extrabold ${color}`}>{value}</p>
                <p className="text-xs font-medium text-gray-600">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-700">Payback Period</span>
              <span className="text-xl font-extrabold text-green-700">{results.paybackYears.toFixed(1)} years</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-700">20-Year Net Savings</span>
              <span className="text-xl font-extrabold text-green-700">{fmt(results.savings20yr)}</span>
            </div>
            {STATE_INCENTIVES[state] > 0 && (
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">{state} State Incentive</span>
                <span className="text-xl font-extrabold text-blue-700">{fmt(STATE_INCENTIVES[state])}</span>
              </div>
            )}
          </div>

          <div className="bg-green-700 text-white rounded-xl p-5 text-center">
            <p className="font-bold text-lg mb-1">See Real Quotes for Your Home</p>
            <p className="text-green-100 text-sm mb-4">Local installers can give you exact numbers for your roof. Compare up to 3 quotes free.</p>
            <button
              onClick={() => router.push(`/quotes/solar${zip ? `?zip=${zip}` : ""}`)}
              className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl mx-auto transition-colors"
            >
              Get My Free Quotes <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
