"use client"

import { useState } from "react"
import { Wind, Calculator, CheckCircle, AlertCircle } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

// Base load per sq ft by climate zone (BTU/hr per sq ft)
const CLIMATE_ZONES: Record<string, { label: string; coolingBtu: number; heatingBtu: number }> = {
  "zone1": { label: "Zone 1 — Very Hot (Miami, Phoenix, Houston)", coolingBtu: 25, heatingBtu: 15 },
  "zone2": { label: "Zone 2 — Hot (Dallas, Atlanta, Sacramento)", coolingBtu: 22, heatingBtu: 20 },
  "zone3": { label: "Zone 3 — Warm (Los Angeles, Charlotte)", coolingBtu: 18, heatingBtu: 25 },
  "zone4": { label: "Zone 4 — Mixed (Nashville, Seattle, Chicago)", coolingBtu: 16, heatingBtu: 32 },
  "zone5": { label: "Zone 5 — Cool (Minneapolis, Denver, Boston)", coolingBtu: 14, heatingBtu: 40 },
  "zone6": { label: "Zone 6 — Cold (Milwaukee, Portland ME)", coolingBtu: 12, heatingBtu: 50 },
}

const INSULATION_MULT: Record<string, number> = {
  poor:    1.20,
  average: 1.00,
  good:    0.85,
}

const CEILING_MULT: Record<string, number> = {
  "8ft":  1.00,
  "9ft":  1.05,
  "10ft": 1.10,
  vaulted: 1.20,
}

const WINDOW_MULT: Record<string, number> = {
  few:     0.95,
  average: 1.00,
  many:    1.10,
}

function btuToTons(btu: number): number {
  return btu / 12000
}

export default function HvacSizePage() {
  const [sqft, setSqft] = useState(1800)
  const [zone, setZone] = useState("zone3")
  const [insulation, setInsulation] = useState("average")
  const [ceiling, setCeiling] = useState("9ft")
  const [windows, setWindows] = useState("average")
  const [calculated, setCalculated] = useState(false)

  const zoneData = CLIMATE_ZONES[zone]
  const iMult = INSULATION_MULT[insulation]
  const cMult = CEILING_MULT[ceiling]
  const wMult = WINDOW_MULT[windows]

  const totalMult = iMult * cMult * wMult

  const coolingBtu = sqft * zoneData.coolingBtu * totalMult
  const heatingBtu = sqft * zoneData.heatingBtu * totalMult

  const coolingTons = btuToTons(coolingBtu)
  const heatingTons = btuToTons(heatingBtu)

  // Round to nearest standard size
  const standardSizes = [1.5, 2, 2.5, 3, 3.5, 4, 5]
  const recommendedTons = standardSizes.find(s => s >= coolingTons) || 5
  const recommendedRange = `${Math.max(1.5, recommendedTons - 0.5)}–${recommendedTons} tons`

  const oversizedWarning = coolingTons < recommendedTons - 0.5

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 px-4 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Wind className="w-8 h-8" />
          <Calculator className="w-6 h-6 text-blue-200" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">HVAC Size Calculator</h1>
        <p className="text-blue-100 text-sm max-w-xl mx-auto">
          Find the right AC or heat pump size for your home. An oversized system short-cycles and wastes money; undersized can&apos;t keep up. Get it right first.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Your Home Details</h2>
            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conditioned Square Footage: <span className="text-blue-700 font-bold">{sqft.toLocaleString()} sq ft</span>
                </label>
                <input
                  type="range" min={600} max={5000} step={100} value={sqft}
                  onChange={e => setSqft(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>600</span><span>5,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Climate Zone</label>
                <select
                  value={zone}
                  onChange={e => setZone(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(CLIMATE_ZONES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insulation Quality</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "poor", l: "Poor", sub: "Pre-1980, no upgrades" },
                    { v: "average", l: "Average", sub: "Standard, some upgrades" },
                    { v: "good", l: "Good", sub: "Well-insulated" },
                  ].map(({ v, l, sub }) => (
                    <button
                      key={v}
                      onClick={() => setInsulation(v)}
                      className={`py-2 px-1 text-xs rounded-lg border-2 font-medium transition-all text-center ${insulation === v ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      <div>{l}</div>
                      <div className="text-gray-400 font-normal mt-0.5">{sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ceiling Height</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { v: "8ft", l: "8 ft" },
                    { v: "9ft", l: "9 ft" },
                    { v: "10ft", l: "10 ft" },
                    { v: "vaulted", l: "Vaulted" },
                  ].map(({ v, l }) => (
                    <button
                      key={v}
                      onClick={() => setCeiling(v)}
                      className={`py-2 text-xs rounded-lg border-2 font-medium transition-all ${ceiling === v ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Window Coverage</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "few", l: "Few Windows" },
                    { v: "average", l: "Average" },
                    { v: "many", l: "Many / Large" },
                  ].map(({ v, l }) => (
                    <button
                      key={v}
                      onClick={() => setWindows(v)}
                      className={`py-2 text-xs rounded-lg border-2 font-medium transition-all ${windows === v ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCalculated(true)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Calculate Recommended Size
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {calculated ? (
              <>
                <div className="bg-blue-600 text-white rounded-2xl p-6 text-center">
                  <p className="text-blue-200 text-sm mb-1">Recommended AC / Heat Pump Size</p>
                  <p className="text-5xl font-extrabold mb-1">{recommendedTons}</p>
                  <p className="text-blue-200 text-sm">tons ({(recommendedTons * 12000).toLocaleString()} BTU/hr)</p>
                  <p className="text-blue-100 text-xs mt-3">Range: {recommendedRange}</p>
                </div>

                {oversizedWarning && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-amber-800">Watch for oversizing</p>
                      <p className="text-amber-700 text-xs mt-1">Your load is {coolingTons.toFixed(1)} tons but standard sizing rounds up. An oversized system short-cycles and won&apos;t dehumidify well. Ask your contractor to run a Manual J calculation.</p>
                    </div>
                  </div>
                )}

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Calculated Loads</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Cooling Load", value: `${coolingBtu.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} BTU/hr`, sub: `${coolingTons.toFixed(2)} tons` },
                      { label: "Heating Load", value: `${heatingBtu.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} BTU/hr`, sub: `${heatingTons.toFixed(2)} tons` },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{r.label}</span>
                        <div className="text-right">
                          <span className="font-bold text-gray-900">{r.value}</span>
                          <p className="text-xs text-gray-400">{r.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900 mb-1">Get a Manual J Calculation</p>
                      <p className="text-gray-600 text-xs mb-3">
                        This tool uses simplified load calculations. For an accurate sizing, ask your HVAC contractor to perform a full Manual J calculation — a legitimate contractor will always do this before quoting.
                      </p>
                      <ZipCodeForm category="hvac" compact />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                <Wind className="w-16 h-16 text-blue-200 mb-4" />
                <p className="text-gray-500 text-sm">
                  Fill in your home details and click Calculate to get your recommended HVAC size.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-sm text-gray-600">
          <h2 className="font-bold text-gray-900 mb-3">Understanding HVAC Sizing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Bigger Isn't Better", desc: "An oversized system cools quickly but cycles off before removing humidity. You'll feel cold but clammy, and the system wears out faster." },
              { title: "Manual J Is the Standard", desc: "ACCA Manual J is the industry standard load calculation. Any reputable contractor will run this — not just match your old system's size." },
              { title: "Insulation Matters More Than You Think", desc: "A well-insulated home needs 15–20% less HVAC capacity. Improving insulation before replacing your HVAC can let you buy a smaller, cheaper system." },
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
