import Link from "next/link"
import { Layers, ArrowRight, CheckCircle } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Insulation Cost & Free Quotes (2025) | CleverHomeEnergy",
  description:
    "Cut heating and cooling costs 15–25% with proper insulation. Compare insulation types, costs, and get free quotes from local contractors. IRA 30% tax credit available.",
}

const topics = [
  { title: "Home Insulation Cost in 2025", href: "/blog/home-insulation-cost", tag: "Pricing" },
  { title: "IRA Home Energy Tax Credits", href: "/blog/ira-home-energy-tax-credits", tag: "Savings" },
  { title: "Home Energy Audit Guide", href: "/blog/home-energy-audit-guide", tag: "Guide" },
  { title: "How to Lower Your Electric Bill", href: "/blog/how-to-lower-electric-bill", tag: "Guide" },
  { title: "Home Upgrade Planner Tool", href: "/tools/upgrade-planner", tag: "Tool" },
  { title: "Check Your State Rebates", href: "/tools/rebates", tag: "Rebates" },
]

const insulationTypes = [
  { type: "Blown-In (Attic)", cost: "$0.80–$1.50/sq ft", rValue: "R-2.2 to R-3.8/in", best: "Best value for attic upgrades" },
  { type: "Batt (Walls/Floors)", cost: "$0.50–$1.80/sq ft", rValue: "R-11 to R-21", best: "Open cavities, new construction" },
  { type: "Spray Foam", cost: "$0.80–$3.50/sq ft", rValue: "R-3.7 to R-7.0/in", best: "Air sealing + insulation combo" },
  { type: "Rigid Foam Board", cost: "$0.75–$2.00/sq ft", rValue: "R-3.8 to R-6.5/in", best: "Basement walls, exterior sheathing" },
]

export default function InsulationPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-6 h-6 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700">Home Insulation</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Home Insulation: Cut Heating &<br />
            <span className="text-amber-600">Cooling Bills by 15–25%</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl">
            Most US homes are significantly under-insulated. Adding proper insulation is one of the highest-ROI upgrades available — with a 30% federal tax credit and payback in as little as 3 years.
          </p>
          <ZipCodeForm category="insulation" />
        </div>
      </section>

      <section className="bg-amber-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: "$1,200–$3,500", l: "Typical Attic Project" },
            { v: "15–25%", l: "Energy Bill Reduction" },
            { v: "3–7 yrs", l: "Average Payback" },
            { v: "30% Tax Credit", l: "IRA Section 25C" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-extrabold">{s.v}</p>
              <p className="text-amber-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Insulation Types & Costs Compared</h2>
          <p className="text-gray-500 text-sm mb-6">
            The right insulation type depends on where you&apos;re insulating and whether you need air sealing too.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Installed Cost</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">R-Value</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                {insulationTypes.map((t) => (
                  <tr key={t.type} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium text-gray-900">{t.type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{t.cost}</td>
                    <td className="p-3 border border-gray-200 text-amber-700 font-medium">{t.rValue}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">{t.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            All insulation projects qualify for the IRA 30% tax credit (up to $1,200/year) when installed in your primary residence.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Where to Start: Highest ROI First</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Attic Insulation",
                desc: "The single highest-impact project for most homes. Heat rises — an under-insulated attic wastes thousands per year.",
                savings: "$200–$500/yr",
              },
              {
                step: "2",
                title: "Air Sealing",
                desc: "Seal gaps around pipes, wiring, and framing before adding insulation. Air leaks can waste as much energy as leaving a window open.",
                savings: "$150–$350/yr",
              },
              {
                step: "3",
                title: "Rim Joists & Crawl Space",
                desc: "Spray foam on rim joists delivers a fast payback (2–4 years). Full crawl space encapsulation eliminates moisture issues too.",
                savings: "$100–$250/yr",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-amber-200 rounded-xl p-5">
                <div className="w-8 h-8 bg-amber-100 text-amber-700 font-extrabold text-sm rounded-full flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-3 leading-relaxed">{item.desc}</p>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  Est. {item.savings}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Insulation Guides & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{t.tag}</span>
                  <p className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-amber-700 transition-colors">{t.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-amber-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <CheckCircle className="w-10 h-10 text-amber-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free Insulation Quotes Today</h2>
          <p className="text-amber-100 text-sm mb-6">
            Compare quotes from licensed local insulation contractors. Takes 60 seconds.
          </p>
          <ZipCodeForm category="insulation" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
