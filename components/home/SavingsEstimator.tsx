"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, ArrowRight } from "lucide-react"

const BILL_SAVINGS: Record<string, { annual: number; system: number }> = {
  under100: { annual: 900, system: 8500 },
  "100to200": { annual: 1400, system: 12000 },
  "200to300": { annual: 2100, system: 17500 },
  over300: { annual: 2800, system: 23000 },
}

const STATE_BONUS: Record<string, number> = {
  California: 1.3, Arizona: 1.25, Nevada: 1.2, Florida: 1.1,
  Texas: 1.0, "New York": 1.15, "New Jersey": 1.2, Colorado: 1.05,
  Other: 1.0,
}

export default function SavingsEstimator() {
  const [bill, setBill] = useState("100to200")
  const [homeType, setHomeType] = useState("Single Family")
  const [state, setState] = useState("Other")
  const [showResult, setShowResult] = useState(false)

  const base = BILL_SAVINGS[bill]
  const bonus = STATE_BONUS[state] || 1.0
  const annual = Math.round(base.annual * bonus)
  const systemCost = base.system
  const credit = Math.round(systemCost * 0.3)
  const netCost = systemCost - credit
  const payback = (netCost / annual).toFixed(1)

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Electric Bill</label>
          <select
            value={bill}
            onChange={(e) => { setBill(e.target.value); setShowResult(false) }}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="under100">Under $100</option>
            <option value="100to200">$100 – $200</option>
            <option value="200to300">$200 – $300</option>
            <option value="over300">Over $300</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Home Type</label>
          <select
            value={homeType}
            onChange={(e) => { setHomeType(e.target.value); setShowResult(false) }}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>Single Family</option>
            <option>Townhouse</option>
            <option>Condo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your State</label>
          <select
            value={state}
            onChange={(e) => { setState(e.target.value); setShowResult(false) }}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="California">California</option>
            <option value="Texas">Texas</option>
            <option value="Florida">Florida</option>
            <option value="Arizona">Arizona</option>
            <option value="Nevada">Nevada</option>
            <option value="New York">New York</option>
            <option value="New Jersey">New Jersey</option>
            <option value="Colorado">Colorado</option>
            <option value="Other">Other State</option>
          </select>
        </div>
      </div>

      <button
        onClick={() => setShowResult(true)}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
      >
        <Calculator className="w-4 h-4" />
        Calculate My Savings
      </button>

      {showResult && (
        <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div>
              <p className="text-2xl font-extrabold text-green-700">${annual.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-0.5">Est. Annual Savings</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-blue-700">${credit.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-0.5">Federal Tax Credit</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-purple-700">{payback} yrs</p>
              <p className="text-xs text-gray-500 mt-0.5">Payback Period</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-3 text-center">
            *Estimates based on average {state} solar data. Get a free quote for exact numbers.
          </p>
          <Link
            href={`/quotes/solar`}
            className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-4 py-2.5 rounded-lg text-sm hover:bg-green-700 transition-colors"
          >
            Get My Free Solar Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {!showResult && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Avg. homeowner saves <strong className="text-gray-600">$1,200–$1,800/year</strong> after solar installation
        </p>
      )}
    </div>
  )
}
