"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home, Thermometer, Sun, Layers, AppWindow, Zap,
  ArrowRight, ArrowLeft, CheckCircle, DollarSign,
  TrendingUp, Star, ChevronRight,
} from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Answers {
  monthlyBill: number        // $
  homeSize: string           // sq ft bucket
  state: string
  hvacAge: string            // years bucket
  roofAge: string
  windowsType: string        // single/double/triple
  hasSolar: string           // yes/no
  goals: string[]            // save-money | comfort | environment | home-value
}

interface Upgrade {
  id: string
  name: string
  category: "solar" | "hvac" | "roofing" | "windows"
  icon: React.ReactNode
  cost: string
  annualSavings: string
  payback: string
  roi25yr: string
  why: string
  federalCredit?: string
  priority: number           // 1 = highest
}

// ─── Calculation ──────────────────────────────────────────────────────────────

function computeUpgrades(a: Answers): Upgrade[] {
  const bill = a.monthlyBill
  const hvacOld = ["15+", "20+"].includes(a.hvacAge)
  const hvacModerate = a.hvacAge === "10-15"
  const roofOld = ["20+", "15-20"].includes(a.roofAge)
  const singlePane = a.windowsType === "single"
  const noSolar = a.hasSolar === "no"
  const largeHome = ["2500-4000", "4000+"].includes(a.homeSize)
  const wantsValue = a.goals.includes("home-value")

  const upgrades: Upgrade[] = []

  // ── Solar ──────────────────────────────────────────────────────────────────
  if (noSolar) {
    const annualSavings = Math.round(bill * 12 * 0.75)
    const systemCost = largeHome ? 24000 : 18000
    const afterCredit = Math.round(systemCost * 0.7)
    const paybackYrs = Math.round(afterCredit / annualSavings)
    upgrades.push({
      id: "solar",
      name: "Solar Panel System",
      category: "solar",
      icon: <Sun className="w-6 h-6" />,
      cost: `$${afterCredit.toLocaleString()} after 30% federal credit`,
      annualSavings: `$${annualSavings.toLocaleString()}`,
      payback: `${paybackYrs}–${paybackYrs + 2} years`,
      roi25yr: `$${(annualSavings * 25 - afterCredit).toLocaleString()}`,
      why: `Based on your $${bill}/mo bill, solar can eliminate 70–80% of your electricity costs. The 30% ITC brings your net cost to ~$${afterCredit.toLocaleString()}.`,
      federalCredit: "30% Investment Tax Credit (ITC)",
      priority: bill > 200 ? 1 : 2,
    })
  }

  // ── HVAC ───────────────────────────────────────────────────────────────────
  if (hvacOld || hvacModerate) {
    const annualSavings = Math.round(bill * 12 * (hvacOld ? 0.25 : 0.15))
    const cost = hvacOld ? "$6,000–$10,000" : "$5,500–$9,000"
    upgrades.push({
      id: "hvac",
      name: "High-Efficiency Heat Pump / HVAC",
      category: "hvac",
      icon: <Thermometer className="w-6 h-6" />,
      cost,
      annualSavings: `$${annualSavings.toLocaleString()}`,
      payback: hvacOld ? "5–8 years" : "6–10 years",
      roi25yr: `$${(annualSavings * 25 - 8000).toLocaleString()}+`,
      why: hvacOld
        ? `Your system is likely running at 60–70% efficiency. A modern heat pump runs at 300%+ efficiency, cutting heating/cooling costs by ~25% while also qualifying for up to $2,000 in federal tax credits.`
        : `A 10–15 year old system is entering its end-of-life zone. Replacing proactively — before an emergency breakdown — gives you time to compare quotes and choose the right system.`,
      federalCredit: "25C Tax Credit — up to $2,000",
      priority: hvacOld ? 1 : 3,
    })
  }

  // ── Roof ───────────────────────────────────────────────────────────────────
  if (roofOld || wantsValue) {
    upgrades.push({
      id: "roofing",
      name: "Roof Replacement",
      category: "roofing",
      icon: <Layers className="w-6 h-6" />,
      cost: "$8,000–$18,000",
      annualSavings: "$200–$500",
      payback: "20–30 years (lifespan)",
      roi25yr: "Protects $300,000+ in home value",
      why: roofOld
        ? `A roof over 15–20 years old is approaching or past its design life. Proactive replacement prevents water damage, mold, and insurance claim complications.`
        : `A new roof is the #1 home improvement for resale value — recouping 60–70% of cost at sale while protecting the home's entire structure.`,
      priority: roofOld ? 2 : 4,
    })
  }

  // ── Windows ────────────────────────────────────────────────────────────────
  if (singlePane || a.goals.includes("comfort")) {
    const annualSavings = Math.round(bill * 12 * 0.12)
    upgrades.push({
      id: "windows",
      name: "Energy-Efficient Window Replacement",
      category: "windows",
      icon: <AppWindow className="w-6 h-6" />,
      cost: "$400–$900 per window",
      annualSavings: `$${annualSavings.toLocaleString()}`,
      payback: "10–15 years",
      roi25yr: `$${(annualSavings * 15).toLocaleString()} + comfort`,
      why: singlePane
        ? `Single-pane windows lose 5–10x more heat than double-pane. Replacing them cuts heating/cooling load by 10–15%, eliminates drafts, and dramatically reduces noise.`
        : `Energy-efficient windows reduce hot/cold spots, cut UV damage to furniture, and qualify for a 30% federal tax credit up to $600/year.`,
      federalCredit: "25C Credit — 30% up to $600/yr",
      priority: singlePane ? 2 : 5,
    })
  }

  // ── Insulation (always recommended) ───────────────────────────────────────
  if (a.goals.includes("save-money") || a.goals.includes("comfort")) {
    const annualSavings = Math.round(bill * 12 * 0.15)
    upgrades.push({
      id: "insulation",
      name: "Attic Insulation & Air Sealing",
      category: "hvac",
      icon: <Home className="w-6 h-6" />,
      cost: "$1,500–$4,000",
      annualSavings: `$${annualSavings.toLocaleString()}`,
      payback: "3–7 years",
      roi25yr: `$${(annualSavings * 20 - 2500).toLocaleString()}+`,
      why: `The EPA says adding insulation is the #1 most cost-effective home improvement. Most homes lose 25–35% of conditioned air through the attic. Air sealing + insulation fixes this at low cost.`,
      federalCredit: "25C Credit — 30% up to $1,200",
      priority: 3,
    })
  }

  // Sort by priority, then by estimated annual savings descending
  return upgrades.sort((a, b) => a.priority - b.priority)
}

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  solar:   { bg: "bg-yellow-50",  border: "border-yellow-200", dot: "bg-yellow-500", cta: "solar" },
  hvac:    { bg: "bg-blue-50",    border: "border-blue-200",   dot: "bg-blue-500",   cta: "hvac" },
  roofing: { bg: "bg-slate-50",   border: "border-slate-200",  dot: "bg-slate-500",  cta: "roofing" },
  windows: { bg: "bg-green-50",   border: "border-green-200",  dot: "bg-green-500",  cta: "windows" },
}

// ─── Step components ──────────────────────────────────────────────────────────

function OptionCard({
  selected, onClick, children,
}: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-green-500 bg-green-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {children}
    </button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4

const DEFAULT_ANSWERS: Answers = {
  monthlyBill: 150,
  homeSize: "1500-2500",
  state: "Other",
  hvacAge: "10-15",
  roofAge: "10-15",
  windowsType: "double",
  hasSolar: "no",
  goals: ["save-money"],
}

export default function UpgradePlannerPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS)
  const [results, setResults] = useState<Upgrade[] | null>(null)

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }))

  const toggleGoal = (goal: string) =>
    setAnswers((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }))

  const next = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
    else {
      setResults(computeUpgrades(answers))
      setStep(TOTAL_STEPS + 1)
    }
  }
  const back = () => setStep((s) => s - 1)

  // ── Results page ────────────────────────────────────────────────────────────
  if (results) {
    const totalSavings = results.reduce((sum, u) => {
      const n = parseInt(u.annualSavings.replace(/[^0-9]/g, ""), 10)
      return sum + (isNaN(n) ? 0 : n)
    }, 0)

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <CheckCircle className="w-4 h-4" /> Your Personalized Energy Upgrade Plan
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            You Could Save Up to{" "}
            <span className="text-green-600">${totalSavings.toLocaleString()}/year</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Based on your home profile, here are your top upgrade opportunities ranked by return on investment.
          </p>
        </div>

        {/* Upgrades */}
        <div className="space-y-5 mb-12">
          {results.map((u, i) => {
            const style = CATEGORY_STYLES[u.category]
            return (
              <div
                key={u.id}
                className={`${style.bg} ${style.border} border rounded-2xl p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${style.dot} text-white p-2.5 rounded-xl shrink-0`}>
                    {u.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        #{i + 1} Priority
                      </span>
                      {i === 0 && (
                        <span className="text-xs font-bold bg-green-600 text-white px-2 py-0.5 rounded-full">
                          Highest ROI
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900">{u.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 mb-4">{u.why}</p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[
                        { label: "Est. Cost", value: u.cost },
                        { label: "Annual Savings", value: u.annualSavings },
                        { label: "Payback Period", value: u.payback },
                        { label: "25-Year Return", value: u.roi25yr },
                      ].map((s) => (
                        <div key={s.label} className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
                          <p className="text-sm font-bold text-gray-900 leading-tight">{s.value}</p>
                        </div>
                      ))}
                    </div>

                    {u.federalCredit && (
                      <div className="flex items-center gap-2 text-xs text-green-700 font-semibold mb-4">
                        <DollarSign className="w-3.5 h-3.5" />
                        Federal incentive available: {u.federalCredit}
                      </div>
                    )}

                    <Link
                      href={`/quotes/${style.cta}`}
                      className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                    >
                      Get Free {u.name.split(" ")[0]} Quotes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total savings summary */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 text-center mb-8">
          <TrendingUp className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <p className="text-sm text-gray-400 mb-1">Combined potential savings</p>
          <p className="text-4xl font-extrabold text-green-400 mb-1">
            ${totalSavings.toLocaleString()}/year
          </p>
          <p className="text-gray-400 text-sm mb-6">
            That's ${Math.round(totalSavings * 25 / 1000)}k+ over 25 years — before accounting for energy price inflation.
          </p>
          <ZipCodeForm className="[&_input]:bg-white [&_input]:text-gray-900" />
          <p className="text-gray-500 text-xs mt-3">
            Enter your ZIP to see contractor availability and current rebates in your area.
          </p>
        </div>

        <button
          onClick={() => { setStep(1); setResults(null); setAnswers(DEFAULT_ANSWERS) }}
          className="text-sm text-gray-400 hover:text-gray-600 underline block mx-auto"
        >
          Start over with different answers
        </button>
      </div>
    )
  }

  // ── Wizard steps ────────────────────────────────────────────────────────────
  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
          <Zap className="w-4 h-4" /> Free Home Energy Audit
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Your Home Upgrade Planner
        </h1>
        <p className="text-gray-500">
          Answer 4 quick questions. Get a personalized upgrade roadmap ranked by ROI.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 1: Home basics */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Tell us about your home</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Average monthly electricity bill
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Under $100", value: 75 },
                { label: "$100–$150", value: 125 },
                { label: "$150–$200", value: 175 },
                { label: "$200–$300", value: 250 },
                { label: "$300–$400", value: 350 },
                { label: "Over $400", value: 450 },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={answers.monthlyBill === opt.value}
                  onClick={() => set("monthlyBill", opt.value)}
                >
                  <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Home size (square feet)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Under 1,000 sq ft", value: "under-1000" },
                { label: "1,000–1,500 sq ft", value: "1000-1500" },
                { label: "1,500–2,500 sq ft", value: "1500-2500" },
                { label: "2,500–4,000 sq ft", value: "2500-4000" },
                { label: "Over 4,000 sq ft", value: "4000+" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={answers.homeSize === opt.value}
                  onClick={() => set("homeSize", opt.value)}
                >
                  <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              State (for incentive calculations)
            </label>
            <select
              value={answers.state}
              onChange={(e) => set("state", e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-green-500"
            >
              {[
                "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
                "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
                "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
                "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
                "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
                "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
                "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
                "Virginia","Washington","West Virginia","Wisconsin","Wyoming","Other",
              ].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Step 2: Current systems */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">How old are your systems?</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              HVAC system age
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Less than 5 years", value: "under-5" },
                { label: "5–10 years", value: "5-10" },
                { label: "10–15 years", value: "10-15" },
                { label: "15–20 years", value: "15+" },
                { label: "20+ years", value: "20+" },
                { label: "Not sure", value: "unknown" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={answers.hvacAge === opt.value}
                  onClick={() => set("hvacAge", opt.value)}
                >
                  <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Roof age
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Less than 5 years", value: "under-5" },
                { label: "5–10 years", value: "5-10" },
                { label: "10–15 years", value: "10-15" },
                { label: "15–20 years", value: "15-20" },
                { label: "20+ years", value: "20+" },
                { label: "Not sure", value: "unknown" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={answers.roofAge === opt.value}
                  onClick={() => set("roofAge", opt.value)}
                >
                  <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Windows & Solar */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">A few more details</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What type of windows do you have?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Single-pane", desc: "Older home / drafty", value: "single" },
                { label: "Double-pane", desc: "Standard modern windows", value: "double" },
                { label: "Triple-pane", desc: "High-performance / recent", value: "triple" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={answers.windowsType === opt.value}
                  onClick={() => set("windowsType", opt.value)}
                >
                  <p className="text-sm font-bold text-gray-900">{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </OptionCard>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Do you currently have solar panels?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "No solar yet", value: "no" },
                { label: "Yes, I have solar", value: "yes" },
              ].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={answers.hasSolar === opt.value}
                  onClick={() => set("hasSolar", opt.value)}
                >
                  <span className="text-sm font-semibold text-gray-800">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Goals */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">
            What are your primary goals?
          </h2>
          <p className="text-sm text-gray-500">Select all that apply.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                value: "save-money",
                label: "Lower my energy bills",
                desc: "Maximize monthly savings and ROI",
                icon: <DollarSign className="w-5 h-5" />,
              },
              {
                value: "comfort",
                label: "Improve home comfort",
                desc: "Eliminate drafts, hot/cold spots, noise",
                icon: <Home className="w-5 h-5" />,
              },
              {
                value: "environment",
                label: "Reduce carbon footprint",
                desc: "Go electric, reduce fossil fuel use",
                icon: <Zap className="w-5 h-5" />,
              },
              {
                value: "home-value",
                label: "Increase home value",
                desc: "Maximize return on upgrades at sale",
                icon: <TrendingUp className="w-5 h-5" />,
              },
            ].map((opt) => {
              const selected = answers.goals.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleGoal(opt.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                    selected
                      ? "border-green-500 bg-green-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg shrink-0 ${selected ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {opt.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                  {selected && <CheckCircle className="w-5 h-5 text-green-600 ml-auto shrink-0 mt-0.5" />}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            onClick={back}
            className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button
          onClick={next}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {step < TOTAL_STEPS ? (
            <>Continue <ArrowRight className="w-4 h-4" /></>
          ) : (
            <>See My Upgrade Plan <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

      {/* Trust signals */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> 100% Free</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> No signup required</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" /> Results in under 60 seconds</span>
      </div>
    </div>
  )
}
