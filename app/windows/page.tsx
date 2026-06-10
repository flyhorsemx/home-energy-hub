import Link from "next/link"
import { AppWindow, ArrowRight, Star } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Window Replacement Cost 2026: Compare Types, Rebates & Free Quotes",
  description:
    "Compare 2026 window replacement costs, window types, ENERGY STAR documentation, current rebate checks, and free local quote options.",
}

const topics = [
  { title: "Window Replacement Cost 2026", href: "/blog/window-replacement-cost", tag: "Pricing" },
  { title: "Best Energy-Efficient Window Brands", href: "/blog/best-energy-efficient-windows", tag: "Comparison" },
  { title: "Andersen vs Pella Windows", href: "/blog/andersen-vs-pella-windows", tag: "Comparison" },
  { title: "Double vs Triple Pane Windows", href: "/blog/double-vs-triple-pane-windows", tag: "Guide" },
  { title: "Window Replacement Guide", href: "/blog/window-replacement-guide", tag: "Guide" },
  { title: "Window Tax Credit 2026", href: "/blog/energy-star-window-tax-credit", tag: "Savings" },
  { title: "IRA Home Energy Tax Credits", href: "/blog/ira-home-energy-tax-credits", tag: "Savings" },
  { title: "Home Energy Audit Guide", href: "/blog/home-energy-audit-guide", tag: "Guide" },
]

const cities = [
  { name: "Houston, TX", slug: "houston-tx" },
  { name: "Phoenix, AZ", slug: "phoenix-az" },
  { name: "Los Angeles, CA", slug: "los-angeles-ca" },
  { name: "Chicago, IL", slug: "chicago-il" },
  { name: "Dallas, TX", slug: "dallas-tx" },
  { name: "Miami, FL", slug: "miami-fl" },
  { name: "Atlanta, GA", slug: "atlanta-ga" },
  { name: "Seattle, WA", slug: "seattle-wa" },
  { name: "Denver, CO", slug: "denver-co" },
  { name: "Boston, MA", slug: "boston-ma" },
  { name: "Minneapolis, MN", slug: "minneapolis-mn" },
  { name: "Charlotte, NC", slug: "charlotte-nc" },
  { name: "Nashville, TN", slug: "nashville-tn" },
  { name: "Philadelphia, PA", slug: "philadelphia-pa" },
  { name: "San Antonio, TX", slug: "san-antonio-tx" },
  { name: "Austin, TX", slug: "austin-tx" },
  { name: "Las Vegas, NV", slug: "las-vegas-nv" },
  { name: "Portland, OR", slug: "portland-or" },
  { name: "Indianapolis, IN", slug: "indianapolis-in" },
  { name: "Columbus, OH", slug: "columbus-oh" },
]

const windowTypes = [
  { type: "Double-Pane", cost: "$150–$400/window", savings: "15–20%", best: "Best value, most common" },
  { type: "Triple-Pane", cost: "$400–$800/window", savings: "20–25%", best: "Best for cold climates" },
  { type: "Low-E Coated", cost: "$200–$500/window", savings: "15–20%", best: "Best for hot climates" },
  { type: "Gas-Filled", cost: "$300–$600/window", savings: "18–22%", best: "Best insulation value" },
]

export default function WindowsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <AppWindow className="w-6 h-6 text-purple-500" />
            <span className="text-sm font-semibold text-purple-700">Windows & Doors</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Window Replacement Cost & Quotes:<br />
            <span className="text-purple-600">Compare Local Options</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl">
            Compare window types, local installation costs, ENERGY STAR/NFRC documentation, and current rebate eligibility before you choose a contractor.
          </p>
          <ZipCodeForm category="windows" />
        </div>
      </section>

      <section className="bg-purple-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: "$150–$800", l: "Cost Per Window" },
            { v: "Varies", l: "Bill Impact" },
            { v: "Comfort", l: "Draft + Noise Help" },
            { v: "Rebate Check", l: "Utility + State" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-extrabold">{s.v}</p>
              <p className="text-purple-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Window Types & Costs Compared</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Window Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Cost Per Window</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Energy Savings</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                {windowTypes.map((w) => (
                  <tr key={w.type} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium text-gray-900">{w.type}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{w.cost}</td>
                    <td className="p-3 border border-gray-200 text-green-700 font-medium">{w.savings}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">{w.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Window & Door Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => (
              <Link key={t.href} href={t.href} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">{t.tag}</span>
                  <p className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-purple-700 transition-colors">{t.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Window Quotes by City</h2>
          <p className="text-gray-500 text-sm mb-6">Local window replacement costs and free quotes in your city.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/windows/${c.slug}`}
                className="text-sm text-purple-700 hover:text-purple-900 hover:underline py-1 px-2 rounded hover:bg-purple-50 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-purple-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Star className="w-10 h-10 text-purple-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free Window Replacement Quotes</h2>
          <p className="text-purple-100 text-sm mb-6">Request local window quote options. Free to request, no obligation.</p>
          <ZipCodeForm category="windows" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
