import Link from "next/link"
import { Droplets, ArrowRight, CheckCircle } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Water Heater Replacement Cost 2026: Heat Pump, Tankless & Quotes",
  description:
    "Compare tank, tankless, and heat pump water heater options and request free local quote options.",
}

const topics = [
  { title: "Water Heater Replacement Cost 2026", href: "/blog/water-heater-replacement-cost", tag: "Pricing" },
  { title: "Tankless vs Tank Water Heater", href: "/blog/tankless-vs-tank-water-heater", tag: "Comparison" },
  { title: "Heat Pump Water Heater Guide", href: "/blog/heat-pump-water-heater-guide", tag: "Guide" },
  { title: "IRA Home Energy Tax Credits", href: "/blog/ira-home-energy-tax-credits", tag: "Savings" },
  { title: "How to Lower Your Electric Bill", href: "/blog/how-to-lower-electric-bill", tag: "Guide" },
  { title: "Home Energy Audit Guide", href: "/blog/home-energy-audit-guide", tag: "Guide" },
  { title: "Home Upgrade Planner Tool", href: "/tools/upgrade-planner", tag: "Tool" },
  { title: "Check Your State Rebates", href: "/tools/rebates", tag: "Rebates" },
]

const waterHeaterTypes = [
  { type: "Heat Pump (Hybrid)", cost: "$1,200–$2,500 installed", efficiency: "3–4× more efficient", best: "Best efficiency; verify rebates" },
  { type: "Gas Tank", cost: "$800–$1,600 installed", efficiency: "Baseline", best: "Lower upfront, gas-connected homes" },
  { type: "Electric Tank", cost: "$600–$1,400 installed", efficiency: "Similar to gas", best: "Budget replacement, simple install" },
  { type: "Tankless Gas", cost: "$1,500–$3,500 installed", efficiency: "24–34% more efficient", best: "Unlimited hot water, small homes" },
  { type: "Tankless Electric", cost: "$800–$2,000 installed", efficiency: "24–34% more efficient", best: "Whole-home or point-of-use" },
  { type: "Solar Water Heater", cost: "$3,000–$6,000 installed", efficiency: "50–80% solar offset", best: "Hot climates; verify incentives" },
]

export default function WaterHeatingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-cyan-50 to-teal-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-6 h-6 text-cyan-500" />
            <span className="text-sm font-semibold text-cyan-700">Water Heating</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Water Heater Replacement Cost:<br />
            <span className="text-cyan-600">Heat Pump, Tankless & Local Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl">
            Compare heat pump, tankless, gas, and electric water heater options, then verify current utility, state, and DOE rebate eligibility before you buy.
          </p>
          <ZipCodeForm category="water-heating" />
        </div>
      </section>

      <section className="bg-cyan-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: "~$600/yr", l: "Avg. Water Heating Cost" },
            { v: "Up to 70%", l: "Energy Savings (HPWH)" },
            { v: "Rebate Check", l: "Utility + State" },
            { v: "2–4 yrs", l: "Typical Payback" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-extrabold">{s.v}</p>
              <p className="text-cyan-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Heater Types & Costs Compared</h2>
          <p className="text-gray-500 text-sm mb-6">
            Heat pump water heaters can be efficient, but the right choice depends on utility rates, space, wiring, fuel type, and current rebate eligibility.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Installed Cost</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Efficiency</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                {waterHeaterTypes.map((t) => (
                  <tr key={t.type} className={`hover:bg-gray-50 ${t.type === "Heat Pump (Hybrid)" ? "bg-cyan-50" : ""}`}>
                    <td className="p-3 border border-gray-200 font-medium text-gray-900">
                      {t.type === "Heat Pump (Hybrid)" ? (
                        <span className="flex items-center gap-2">
                          {t.type}
                          <span className="text-xs bg-cyan-100 text-cyan-700 font-semibold px-1.5 py-0.5 rounded-full">Recommended</span>
                        </span>
                      ) : t.type}
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-600">{t.cost}</td>
                    <td className="p-3 border border-gray-200 text-cyan-700 font-medium">{t.efficiency}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">{t.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Current tax and rebate eligibility varies by project date, equipment, state, utility, and household qualification rules. Verify before budgeting around incentives.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-cyan-50 border-y border-cyan-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Why Switch to a Heat Pump Water Heater?</h2>
          <p className="text-gray-500 text-sm mb-6">
            For many homes replacing a standard electric tank, the comparison starts with operating cost, wiring, location, and current rebate eligibility.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "The Energy Savings",
                desc: "A standard 50-gallon electric tank costs $550–$650/year to run. A heat pump water heater (HPWH) runs the same tank for $150–$200/year — a savings of $400+/year.",
                highlight: "~$400/yr savings",
              },
              {
                title: "The Rebate Check",
                desc: "Current federal credit rules changed after 2025. Ask contractors to separate equipment cost, installation cost, and any utility or state rebate assumptions.",
                highlight: "Verify eligibility",
              },
              {
                title: "The Payback",
                desc: "Payback depends on installed cost, electricity rate, usage, and incentives. Compare at least two quote scopes before choosing a model.",
                highlight: "Compare payback",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-cyan-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-3 leading-relaxed">{item.desc}</p>
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  {item.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Water Heating Guides & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">{t.tag}</span>
                  <p className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-cyan-700 transition-colors">{t.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-cyan-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <CheckCircle className="w-10 h-10 text-cyan-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free Water Heater Quotes Today</h2>
          <p className="text-cyan-100 text-sm mb-6">
            Request local water heater quote options. Free to request, no obligation.
          </p>
          <ZipCodeForm category="water-heating" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
