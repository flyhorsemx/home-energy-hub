import { notFound } from "next/navigation"
import Link from "next/link"
import { Layers, CheckCircle, MapPin, AlertTriangle } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import { getCityBySlug, CITY_SLUGS } from "@/lib/cities"
import { getInsulationData } from "@/lib/city-services"
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
  const ins = getInsulationData(data)

  return {
    title: `Home Insulation in ${data.name}, ${data.stateAbbr} (2025): Cost, R-Values & Free Quotes`,
    description: `Attic insulation in ${data.name} costs ${ins.avgAtticCost}. Recommended R-value: ${ins.recommendedRValue}. Get free quotes from licensed local insulation contractors.`,
    keywords: [
      `home insulation ${data.name}`,
      `attic insulation ${data.name} ${data.stateAbbr}`,
      `insulation contractor ${data.name}`,
      `insulation cost ${data.name}`,
      `blow in insulation ${data.name} ${data.stateAbbr}`,
    ],
    alternates: { canonical: `${SITE_URL}/insulation/${city}` },
  }
}

export default async function InsulationCityPage({ params }: Props) {
  const { city } = await params
  const data = getCityBySlug(city)
  if (!data) notFound()

  const ins = getInsulationData(data)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <Link href="/insulation" className="hover:underline">Insulation</Link>
            <span>/</span>
            <span>{data.name}, {data.stateAbbr}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Home Insulation in {data.name}, {data.state}:<br />
            <span className="text-amber-600">Cost, R-Values & Free Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            Attic insulation in {data.name}: <strong>{ins.avgAtticCost}</strong>.
            DOE recommended R-value: <strong>{ins.recommendedRValue}</strong>.
            Annual energy savings: <strong>{ins.avgAnnualSavings}</strong>.
          </p>
          <ZipCodeForm category="insulation" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: ins.avgAtticCost, l: "Avg. Attic Project Cost" },
            { v: ins.avgAnnualSavings, l: "Annual Energy Savings" },
            { v: ins.recommendedRValue.split(",")[0], l: "Recommended R-Value" },
            { v: ins.payback, l: "Typical Payback" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-sm md:text-base font-extrabold">{s.v}</p>
              <p className="text-amber-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Climate Note */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Insulation in {data.name}: What You Need to Know
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-4">
            <p className="text-gray-700 leading-relaxed">{ins.climateNote}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800 text-sm">Best First Project for {data.name} Homeowners</p>
              <p className="text-green-700 text-sm mt-0.5">{ins.topProject}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">
            Common Insulation Issues in {data.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ins.commonIssues.map((issue) => (
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
            Insulation Rebates & Tax Credits in {data.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ins.incentives.map((item) => (
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
            Insulation Cost in {data.name} ({new Date().getFullYear()})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="text-left p-4">Project</th>
                  <th className="text-left p-4">Typical Cost</th>
                  <th className="text-left p-4">Annual Savings</th>
                  <th className="text-left p-4">Payback</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { project: "Attic blown-in (R-49)", cost: "$1,000–$2,800", savings: "$200–$450/yr", payback: "3–6 yrs" },
                  { project: "Air sealing package", cost: "$400–$1,200", savings: "$150–$350/yr", payback: "1–4 yrs" },
                  { project: "Rim joist spray foam", cost: "$400–$900", savings: "$100–$200/yr", payback: "2–5 yrs" },
                  { project: "Wall insulation (existing)", cost: "$1,500–$4,000", savings: "$150–$350/yr", payback: "5–15 yrs" },
                  { project: "Crawl space encapsulation", cost: "$3,000–$7,000", savings: "$200–$400/yr", payback: "8–20 yrs" },
                  { project: "Basement wall insulation", cost: "$1,200–$3,000", savings: "$150–$300/yr", payback: "5–12 yrs" },
                ].map((row, i) => (
                  <tr key={row.project} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 font-medium text-gray-800">{row.project}</td>
                    <td className="p-4 text-gray-600">{row.cost}</td>
                    <td className="p-4 text-green-700 font-medium">{row.savings}</td>
                    <td className="p-4 text-gray-600">{row.payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Cost estimates for {data.name}, {data.state}. Actual pricing varies by home size, access difficulty, and current insulation level. IRA 30% tax credit (up to $1,200) reduces net cost.
          </p>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Choose an Insulation Contractor in {data.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Start With a Home Energy Audit", desc: `A licensed energy auditor will identify exactly where ${data.name}'s climate is costing you money. The audit is 30% tax-creditable up to $150.` },
              { title: "Verify BPI or RESNET Certification", desc: "Look for contractors certified by BPI (Building Performance Institute) or RESNET. These certifications require demonstrated knowledge of building science." },
              { title: "Confirm Material Specs", desc: "Ask for the R-value per inch, the total target R-value, and the brand/product name in writing before work starts." },
              { title: "Get 3+ Quotes", desc: `Insulation quotes in ${data.name} vary 30–50% for the same scope of work. Always compare multiple bids.` },
              { title: "Air Sealing First", desc: "The best insulation contractors always air-seal before adding insulation. Air leaks can waste as much energy as poor insulation — insulating over them wastes money." },
              { title: "Ask About IRA Documentation", desc: "Your contractor should provide product certification statements needed for IRS Form 5695. Keep all invoices and manufacturer documents." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-5 bg-white border border-gray-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
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
      <section className="py-14 px-4 bg-amber-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Layers className="w-10 h-10 text-amber-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">
            Get Free Insulation Quotes in {data.name}
          </h2>
          <p className="text-amber-100 text-sm mb-6">
            Compare quotes from vetted local {data.name} insulation contractors. 100% free, no obligation.
          </p>
          <ZipCodeForm category="insulation" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
