"use client"

import { useState } from "react"
import { Zap, Calculator, TrendingDown } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"

// Gas price $/therm, electric price $/kWh by state
const STATE_DATA: Record<string, { electric: number; gas: number }> = {
  California:     { electric: 0.28, gas: 1.60 },
  Texas:          { electric: 0.13, gas: 0.90 },
  Florida:        { electric: 0.14, gas: 1.10 },
  Arizona:        { electric: 0.13, gas: 0.95 },
  "New York":     { electric: 0.22, gas: 1.50 },
  "New Jersey":   { electric: 0.18, gas: 1.40 },
  Colorado:       { electric: 0.14, gas: 0.95 },
  Massachusetts:  { electric: 0.26, gas: 1.70 },
  Georgia:        { electric: 0.13, gas: 1.00 },
  Illinois:       { electric: 0.15, gas: 1.05 },
  Other:          { electric: 0.16, gas: 1.10 },
}

// Annual energy use multipliers by home size (sq ft)
const HOME_MULTIPLIER: Record<string, number> = {
  under1500:  0.75,
  "1500to2500": 1.0,
  over2500:   1.45,
}

// HVAC system: COP/HSPF efficiency and fuel type
// Annual heating: ~55 MMBtu equivalent for average home
// Annual cooling: ~4,500 kWh for average home
const HVAC_SYSTEMS = [
  { id: "gas-furnace",   label: "Gas Furnace (96% AFUE)",    fuelType: "gas",      efficiency: 0.96,  annualMMBtu: 55 },
  { id: "heat-pump",     label: "Heat Pump (HSPF 10)",       fuelType: "electric", efficiency: 2.93,  annualMMBtu: 55 },
  { id: "electric-heat", label: "Electric Resistance Heat",  fuelType: "electric", efficiency: 1.0,   annualMMBtu: 55 },
]

const WH_SYSTEMS = [
  { id: "gas-tank",    label: "Gas Tank (0.64 EF)",        fuelType: "gas",      efficiency: 0.64,  annualMMBtu: 22 },
  { id: "electric-tank", label: "Electric Tank (0.92 EF)", fuelType: "electric", efficiency: 0.92,  annualMMBtu: 22 },
  { id: "hpwh",        label: "Heat Pump Water Heater (3.5 UEF)", fuelType: "electric", efficiency: 3.5, annualMMBtu: 22 },
]

// 1 MMBtu = 10 therms gas, 293 kWh electric
function annualCost(system: typeof HVAC_SYSTEMS[0], rates: { electric: number; gas: number }, multiplier: number): number {
  const annualMMBtu = system.annualMMBtu * multiplier
  if (system.fuelType === "gas") {
    const therms = (annualMMBtu * 10) / system.efficiency
    return therms * rates.gas
  } else {
    const kwh = (annualMMBtu * 293) / system.efficiency
    return kwh * rates.electric
  }
}

export default function EnergyComparisonPage() {
  const [state, setState] = useState("California")
  const [homeSize, setHomeSize] = useState("1500to2500")
  const [hvacId, setHvacId] = useState("gas-furnace")
  const [whId, setWhId] = useState("gas-tank")
  const [calculated, setCalculated] = useState(false)

  const rates = STATE_DATA[state] || STATE_DATA.Other
  const mult = HOME_MULTIPLIER[homeSize] || 1.0

  const hvacSystem = HVAC_SYSTEMS.find(s => s.id === hvacId)!
  const whSystem = WH_SYSTEMS.find(s => s.id === whId)!

  // Cooling cost is always electric
  const coolingCost = (4500 * mult) * rates.electric

  const heatingCost = annualCost(hvacSystem, rates, mult)
  const waterHeatCost = annualCost(whSystem, rates, mult)
  const totalCost = heatingCost + coolingCost + waterHeatCost

  // Compare vs most efficient alternatives
  const bestHvacCost = Math.min(...HVAC_SYSTEMS.map(s => annualCost(s, rates, mult))) + coolingCost
  const bestWhCost = Math.min(...WH_SYSTEMS.map(s => annualCost(s, rates, mult)))
  const potentialSavings = (totalCost) - (bestHvacCost + bestWhCost - coolingCost + bestWhCost)

  const savings10yr = potentialSavings * 10

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-12 px-4 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Zap className="w-8 h-8" />
          <Calculator className="w-6 h-6 text-teal-200" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">Home Energy Cost Comparison Calculator</h1>
        <p className="text-teal-100 text-sm max-w-xl mx-auto">
          Compare annual energy costs for different heating, cooling, and water heating systems — and see how much you could save by switching.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Your Current Setup</h2>
            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {Object.keys(STATE_DATA).map(s => <option key={s}>{s}</option>)}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Electric: ${rates.electric}/kWh · Gas: ${rates.gas}/therm
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Home Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "under1500", l: "Under 1,500 sq ft" },
                    { v: "1500to2500", l: "1,500–2,500 sq ft" },
                    { v: "over2500", l: "Over 2,500 sq ft" },
                  ].map(({ v, l }) => (
                    <button
                      key={v}
                      onClick={() => setHomeSize(v)}
                      className={`py-2 px-1 text-xs rounded-lg border-2 font-medium transition-all ${homeSize === v ? "border-teal-500 bg-teal-50 text-teal-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heating System</label>
                <div className="space-y-2">
                  {HVAC_SYSTEMS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setHvacId(s.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm transition-all ${hvacId === s.id ? "border-teal-500 bg-teal-50 text-teal-700 font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Heater</label>
                <div className="space-y-2">
                  {WH_SYSTEMS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setWhId(s.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border-2 text-sm transition-all ${whId === s.id ? "border-teal-500 bg-teal-50 text-teal-700 font-medium" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCalculated(true)}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-3.5 rounded-xl hover:bg-teal-700 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Calculate My Energy Costs
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {calculated ? (
              <>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-teal-600" />
                    Annual Energy Cost Breakdown
                  </h2>
                  <div className="space-y-2">
                    {[
                      { label: "Heating", value: heatingCost, note: hvacSystem.label },
                      { label: "Cooling (central AC)", value: coolingCost, note: "Electric, avg. efficiency" },
                      { label: "Water Heating", value: waterHeatCost, note: whSystem.label },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between items-start py-2.5 border-b border-gray-100 text-sm">
                        <div>
                          <p className="font-medium text-gray-800">{r.label}</p>
                          <p className="text-xs text-gray-400">{r.note}</p>
                        </div>
                        <span className="font-bold text-gray-900">${Math.round(r.value).toLocaleString()}/yr</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-2.5 text-sm font-bold text-gray-900 border-t-2 border-gray-200 mt-1">
                      <span>Total Annual Cost</span>
                      <span className="text-lg text-teal-700">${Math.round(totalCost).toLocaleString()}/yr</span>
                    </div>
                  </div>
                </div>

                {potentialSavings > 50 && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                      <h3 className="font-bold text-green-900 text-sm">Upgrade Opportunity</h3>
                    </div>
                    <p className="text-sm text-green-800 mb-3">
                      Switching to the most efficient options could save you approximately{" "}
                      <strong>${Math.round(potentialSavings).toLocaleString()}/year</strong> — that&apos;s{" "}
                      <strong>${Math.round(savings10yr).toLocaleString()} over 10 years</strong>.
                    </p>
                    <ZipCodeForm category="hvac" compact />
                  </div>
                )}

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">All Options Compared (Heating + Water Heating)</h3>
                  <div className="space-y-2">
                    {HVAC_SYSTEMS.map(hs => (
                      WH_SYSTEMS.map(ws => {
                        if (hs.id !== "heat-pump" && ws.id !== "hpwh") return null
                        if (hs.id === "heat-pump" && ws.id === "hpwh") {
                          const c = annualCost(hs, rates, mult) + coolingCost + annualCost(ws, rates, mult)
                          return (
                            <div key="best" className="flex justify-between text-xs py-1.5 border-b border-gray-100">
                              <span className="text-green-700 font-medium">Best: Heat Pump + HPWH</span>
                              <span className="font-bold text-green-700">${Math.round(c).toLocaleString()}/yr</span>
                            </div>
                          )
                        }
                        return null
                      })
                    ))}
                    <div className="flex justify-between text-xs py-1.5 text-gray-500">
                      <span>Your current setup</span>
                      <span className="font-bold">${Math.round(totalCost).toLocaleString()}/yr</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm h-full flex flex-col items-center justify-center min-h-[300px]">
                <Zap className="w-16 h-16 text-teal-300 mb-4" />
                <p className="text-gray-500 text-sm">
                  Select your current systems and click Calculate to see your annual energy costs and potential savings.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-sm text-gray-600">
          <h2 className="font-bold text-gray-900 mb-3">How This Calculator Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Energy Rates", desc: "Uses average utility rates by state from EIA 2024 data. Your actual rate may vary." },
              { title: "System Efficiency", desc: "Heating calculated from AFUE/COP ratings. Water heating from Energy Factor (EF/UEF)." },
              { title: "Home Size", desc: "Scales energy use based on square footage relative to a 2,000 sq ft baseline." },
            ].map(i => (
              <div key={i.title}>
                <p className="font-semibold text-gray-800 mb-1">{i.title}</p>
                <p>{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
