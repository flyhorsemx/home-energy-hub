import { notFound } from "next/navigation"
import Link from "next/link"
import { AppWindow, CheckCircle, MapPin, AlertTriangle } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import { getCityBySlug, CITY_SLUGS } from "@/lib/cities"
import { getWindowsData } from "@/lib/city-services"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

interface Props {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const data = getCityBySlug(city)
  if (!data) return {}
  const w = getWindowsData(data)

  return {
    title: `Window Replacement in ${data.name}, ${data.stateAbbr} (2025): Cost, Types & Free Quotes`,
    description: `Average window replacement in ${data.name}: ${w.avgCost}. ${w.recommendedType} recommended for ${data.name}'s climate. Get free quotes from local window contractors.`,
    keywords: [
      `window replacement ${data.name}`,
      `window installation ${data.name} ${data.stateAbbr}`,
      `energy efficient windows ${data.name}`,
      `window cost ${data.name}`,
      `best window contractor ${data.name} ${data.stateAbbr}`,
    ],
    alternates: { canonical: `${SITE_URL}/windows/${city}` },
  }
}

export default async function WindowsCityPage({ params }: Props) {
  const { city } = await params
  const data = getCityBySlug(city)
  if (!data) notFound()

  const w = getWindowsData(data)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <Link href="/windows" className="hover:underline">Windows</Link>
            <span>/</span>
            <span>{data.name}, {data.stateAbbr}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Window Replacement in {data.name}, {data.state}:<br />
            <span className="text-purple-600">Cost, Types & Free Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            Average cost in {data.name}: <strong>{w.avgCost}</strong>.
            Recommended type: <strong>{w.recommendedType}</strong>.
            Typical annual savings: <strong>{w.avgSavings}</strong>.
          </p>
          <ZipCodeForm category="windows" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-purple-700 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: w.avgCost, l: "Avg. Cost Per Window" },
            { v: w.avgSavings, l: "Annual Energy Savings" },
            { v: w.recommendedType, l: "Recommended Type" },
            { v: w.payback, l: "Typical Payback" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-sm md:text-base font-extrabold">{s.v}</p>
              <p className="text-purple-200 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Climate Note */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Window Replacement in {data.name}: What to Know
          </h2>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <p className="text-gray-700 leading-relaxed">{w.climateNote}</p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Common Window Issues in {data.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {w.commonIssues.map((issue) => (
              <div key={issue} className="flex gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-gray-800">{issue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incentives */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Window Rebates & Tax Credits in {data.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {w.incentives.map((item) => (
              <div key={item} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Window Replacement Cost in {data.name} ({new Date().getFullYear()})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="text-left p-4">Window Type</th>
                  <th className="text-left p-4">Cost Per Window</th>
                  <th className="text-left p-4">U-Factor</th>
                  <th className="text-left p-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Double-Pane Standard", cost: "$150–$350", u: "0.30–0.40", best: "Budget replacement, mild climates" },
                  { type: "Double-Pane Low-E", cost: "$200–$500", u: "0.25–0.32", best: "Most homeowners — best value" },
                  { type: "Double-Pane Low-E + Argon", cost: "$280–$600", u: "0.20–0.28", best: "IRA credit eligible, mixed climates" },
                  { type: "Triple-Pane Low-E", cost: "$400–$800", u: "0.15–0.22", best: "Cold climates, maximum efficiency" },
                  { type: "Impact-Resistant", cost: "$500–$1,200", u: "Varies", best: "Hurricane zones, security upgrade" },
                ].map((row, i) => (
                  <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-800">{row.type}</td>
                    <td className="p-4 text-gray-600">{row.cost}</td>
                    <td className="p-4 text-gray-600">{row.u}</td>
                    <td className="p-4 text-gray-600">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Prices are per-window installed estimates for {data.name}, {data.state}. Whole-home projects are typically priced lower per window.
          </p>
        </div>
      </section>

      {/* What to Look For */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Choose a Window Contractor in {data.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Verify U-Factor & SHGC", desc: `For ${data.name}'s climate, look for U-factor ${w.uFactor}. Ask for the NFRC label on every window quoted.` },
              { title: "ENERGY STAR Certification", desc: "ENERGY STAR Most Efficient windows qualify for the full IRA $600 tax credit. Confirm before purchasing." },
              { title: "Installation Quality Matters", desc: "Even the best window leaks if poorly installed. Ask about flashing, vapor barriers, and the specific installation technique used." },
              { title: "Get 3+ Quotes", desc: `Window replacement quotes in ${data.name} vary 25–50% for the same product. Always compare at least 3 bids.` },
              { title: "Workmanship Warranty", desc: "Quality installers offer 2–10 year installation warranties in addition to the manufacturer's product warranty." },
              { title: "Check Local References", desc: `Ask for 2–3 ${data.name}-area references from jobs completed in the past 12 months and contact them directly.` },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-5 bg-white border border-gray-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-purple-700 text-white text-center">
        <div className="max-w-xl mx-auto">
          <AppWindow className="w-10 h-10 text-purple-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">
            Get Free Window Quotes in {data.name}
          </h2>
          <p className="text-purple-200 text-sm mb-6">
            Compare quotes from vetted local {data.name} window contractors. 100% free, no obligation.
          </p>
          <ZipCodeForm category="windows" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
