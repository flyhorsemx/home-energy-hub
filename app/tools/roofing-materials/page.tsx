"use client"

import { useState } from "react"
import { Home, CheckCircle, X } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

interface Material {
  id: string
  name: string
  costRange: string
  costPerSqft: number  // midpoint $/sq ft installed
  lifespan: string
  lifespanYears: number
  energySavings: string
  maintenanceLevel: "Low" | "Medium" | "High"
  pros: string[]
  cons: string[]
  bestFor: string
  ira: boolean
}

const MATERIALS: Material[] = [
  {
    id: "asphalt-3tab",
    name: "Asphalt (3-Tab)",
    costRange: "$3.50–$5.50/sq ft",
    costPerSqft: 4.50,
    lifespan: "15–20 years",
    lifespanYears: 17,
    energySavings: "Minimal",
    maintenanceLevel: "Low",
    pros: ["Lowest upfront cost", "Easy to repair", "Widely available"],
    cons: ["Shortest lifespan", "Basic appearance", "Least wind resistance"],
    bestFor: "Budget replacement, short-term ownership",
    ira: false,
  },
  {
    id: "asphalt-arch",
    name: "Asphalt (Architectural)",
    costRange: "$4.50–$7.50/sq ft",
    costPerSqft: 6.00,
    lifespan: "25–30 years",
    lifespanYears: 27,
    energySavings: "Minimal–Moderate",
    maintenanceLevel: "Low",
    pros: ["Best value for money", "30-year warranties available", "Wide variety of styles"],
    cons: ["Still shorter lifespan than metal/tile", "Petroleum-based product"],
    bestFor: "Most homeowners — best balance of cost and durability",
    ira: false,
  },
  {
    id: "metal-standing",
    name: "Metal (Standing Seam)",
    costRange: "$10–$18/sq ft",
    costPerSqft: 14.00,
    lifespan: "40–70 years",
    lifespanYears: 55,
    energySavings: "10–25% cooling savings",
    maintenanceLevel: "Low",
    pros: ["50+ year lifespan", "Reflects solar heat", "Excellent wind/hail resistance", "Recyclable"],
    cons: ["High upfront cost", "Noise in rain (can be mitigated)", "Complex installation"],
    bestFor: "Long-term ownership, hot climates, high-wind areas",
    ira: true,
  },
  {
    id: "metal-corrugated",
    name: "Metal (Corrugated/Panel)",
    costRange: "$7–$12/sq ft",
    costPerSqft: 9.50,
    lifespan: "30–45 years",
    lifespanYears: 37,
    energySavings: "8–15% cooling savings",
    maintenanceLevel: "Low",
    pros: ["More affordable than standing seam", "Durable and lightweight", "Good energy performance"],
    cons: ["Exposed fasteners can rust over time", "Less premium appearance"],
    bestFor: "Cost-conscious buyers wanting metal benefits",
    ira: true,
  },
  {
    id: "clay-tile",
    name: "Clay / Concrete Tile",
    costRange: "$10–$20/sq ft",
    costPerSqft: 15.00,
    lifespan: "50+ years",
    lifespanYears: 60,
    energySavings: "10–20% cooling savings",
    maintenanceLevel: "Medium",
    pros: ["Exceptional lifespan", "Natural ventilation under tiles", "Fire resistant"],
    cons: ["Very heavy — may need structural reinforcement", "Fragile under foot traffic", "High cost"],
    bestFor: "Southwest/Mediterranean climates, long-term investment",
    ira: false,
  },
  {
    id: "slate",
    name: "Natural Slate",
    costRange: "$15–$30/sq ft",
    costPerSqft: 22.50,
    lifespan: "75–150 years",
    lifespanYears: 100,
    energySavings: "Moderate",
    maintenanceLevel: "Medium",
    pros: ["Longest lifespan of any roofing material", "Natural beauty", "Fire resistant"],
    cons: ["Extremely high cost", "Very heavy", "Requires specialized installers"],
    bestFor: "Historic homes, luxury properties, permanent installations",
    ira: false,
  },
]

const levelColor = { Low: "text-green-700 bg-green-50", Medium: "text-amber-700 bg-amber-50", High: "text-red-700 bg-red-50" }

export default function RoofingMaterialsPage() {
  const [selected, setSelected] = useState<string[]>(["asphalt-arch", "metal-standing"])
  const [sortBy, setSortBy] = useState<"cost" | "lifespan" | "lifespan-cost">("lifespan-cost")
  const [roofSize, setRoofSize] = useState(2000)
  const [showCostCalc, setShowCostCalc] = useState(false)

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) : [...prev, id]
    )
  }

  const sorted = [...MATERIALS].sort((a, b) => {
    if (sortBy === "cost") return a.costPerSqft - b.costPerSqft
    if (sortBy === "lifespan") return b.lifespanYears - a.lifespanYears
    // lifespan/cost = value score
    return (b.lifespanYears / b.costPerSqft) - (a.lifespanYears / a.costPerSqft)
  })

  const selectedMaterials = MATERIALS.filter(m => selected.includes(m.id))

  // Cost to install on roofSize sq ft (roofing uses "squares" = 100 sq ft + 15% waste)
  const squares = (roofSize / 100) * 1.15

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-rose-600 py-12 px-4 text-white text-center">
        <Home className="w-10 h-10 mx-auto mb-3 text-red-200" />
        <h1 className="text-3xl font-extrabold mb-2">Roofing Material Comparison Tool</h1>
        <p className="text-red-100 text-sm max-w-xl mx-auto">
          Compare every roofing material on cost, lifespan, energy savings, and total value. Find the best roof for your home and budget.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Select Materials to Compare</p>
              <div className="flex flex-wrap gap-2">
                {MATERIALS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => toggle(m.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border-2 transition-all ${selected.includes(m.id) ? "bg-red-600 border-red-600 text-white" : "border-gray-200 text-gray-600 hover:border-red-300"}`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <p className="text-sm font-semibold text-gray-700 mb-2">Sort By</p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="lifespan-cost">Best Value (Lifespan/Cost)</option>
                <option value="lifespan">Longest Lifespan</option>
                <option value="cost">Lowest Cost</option>
              </select>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700 w-36">Material</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Installed Cost</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Lifespan</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Energy Savings</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Maintenance</th>
                  <th className="text-left p-4 font-semibold text-gray-700">IRA Credit</th>
                </tr>
              </thead>
              <tbody>
                {sorted.filter(m => selected.includes(m.id)).map((m, i) => (
                  <tr key={m.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-4 font-semibold text-gray-900 border-b border-gray-100">{m.name}</td>
                    <td className="p-4 border-b border-gray-100 text-gray-700">{m.costRange}</td>
                    <td className="p-4 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">{m.lifespan}</span>
                    </td>
                    <td className="p-4 border-b border-gray-100 text-gray-700">{m.energySavings}</td>
                    <td className="p-4 border-b border-gray-100">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[m.maintenanceLevel]}`}>
                        {m.maintenanceLevel}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-100">
                      {m.ira
                        ? <CheckCircle className="w-4 h-4 text-green-600" />
                        : <X className="w-4 h-4 text-gray-300" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {sorted.filter(m => selected.includes(m.id)).map(m => (
            <div key={m.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900">{m.name}</h3>
                <span className="text-sm font-semibold text-red-700">{m.costRange}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3 italic">{m.bestFor}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-green-700 mb-1.5">Pros</p>
                  <ul className="space-y-1">
                    {m.pros.map(p => (
                      <li key={p} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600 mb-1.5">Cons</p>
                  <ul className="space-y-1">
                    {m.cons.map(c => (
                      <li key={c} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <X className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Calculator */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8">
          <button
            onClick={() => setShowCostCalc(!showCostCalc)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="font-bold text-gray-900">Estimate Your Project Cost</h2>
            <span className="text-xs text-red-600 font-medium">{showCostCalc ? "Hide ▲" : "Show ▼"}</span>
          </button>

          {showCostCalc && (
            <div className="mt-5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Home Footprint: <span className="text-red-700 font-bold">{roofSize.toLocaleString()} sq ft</span>
                </label>
                <input
                  type="range" min={800} max={5000} step={100} value={roofSize}
                  onChange={e => setRoofSize(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
                <p className="text-xs text-gray-400 mt-1">Actual roof area ≈ {Math.round(squares * 100).toLocaleString()} sq ft (includes 15% for pitch and waste)</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Material</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Est. Low</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Est. High</th>
                      <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">Cost per Year of Life</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.filter(m => selected.includes(m.id)).map(m => {
                      const [low, high] = m.costRange.replace(/\$|\/sq ft/g, "").split("–").map(Number)
                      const totalLow = Math.round(low * squares * 100)
                      const totalHigh = Math.round(high * squares * 100)
                      const midTotal = ((totalLow + totalHigh) / 2)
                      const costPerYear = Math.round(midTotal / m.lifespanYears)
                      return (
                        <tr key={m.id} className="hover:bg-gray-50">
                          <td className="p-3 border border-gray-200 font-medium">{m.name}</td>
                          <td className="p-3 border border-gray-200">${totalLow.toLocaleString()}</td>
                          <td className="p-3 border border-gray-200">${totalHigh.toLocaleString()}</td>
                          <td className="p-3 border border-gray-200 font-semibold text-green-700">${costPerYear.toLocaleString()}/yr</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">Estimates based on average installed costs. Get quotes for accurate pricing in your area.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Get Free Roofing Quotes</h2>
          <p className="text-gray-600 text-sm mb-5">
            Request local roofing quote options and compare materials, warranty, and project scope.
          </p>
          <div className="flex justify-center">
            <ZipCodeForm category="roofing" />
          </div>
        </div>
      </div>
    </div>
  )
}
