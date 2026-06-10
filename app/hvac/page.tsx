import Link from "next/link"
import { Wind, ArrowRight, CheckCircle, Star } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HVAC Installation Cost & Free Quotes (2025) | CleverHomeEnergy",
  description:
    "Compare HVAC brands, installation costs, and free quotes from local HVAC contractors. Learn about rebates and energy-efficient systems. New system: $5,000–$12,000.",
}

const topics = [
  { title: "HVAC Installation Cost in 2025", href: "/blog/hvac-installation-cost", tag: "Pricing" },
  { title: "Heat Pump Cost Guide 2025", href: "/blog/heat-pump-cost-guide", tag: "Pricing" },
  { title: "Best Smart Thermostats 2025", href: "/blog/best-smart-thermostats-2025", tag: "Guide" },
  { title: "Heat Pump vs Gas Furnace", href: "/blog/heat-pump-vs-gas-furnace", tag: "Comparison" },
  { title: "Mini-Split vs Central Air", href: "/blog/mini-split-vs-central-air", tag: "Comparison" },
  { title: "Best HVAC Brands Ranked", href: "/blog/best-hvac-brands", tag: "Comparison" },
  { title: "Signs You Need a New HVAC", href: "/blog/signs-you-need-new-hvac", tag: "Diagnosis" },
  { title: "Trane vs Carrier: Which Is Better?", href: "/blog/trane-vs-carrier-hvac", tag: "Comparison" },
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

const brands = [
  { name: "Trane", rating: "9.2/10", tier: "Premium", best: "Best reliability, quiet operation" },
  { name: "Carrier", rating: "9.0/10", tier: "Premium", best: "Best efficiency, smart home ready" },
  { name: "Lennox", rating: "8.8/10", tier: "Premium", best: "Ultra-quiet, highest SEER ratings" },
  { name: "Goodman", rating: "8.2/10", tier: "Value", best: "Best budget option, great warranty" },
  { name: "Rheem", rating: "8.4/10", tier: "Mid-Range", best: "Great value, reliable" },
]

export default function HvacPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Wind className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-semibold text-blue-700">HVAC Systems</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            HVAC Installation Costs &<br />
            <span className="text-blue-600">Free Local Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl">
            A new high-efficiency HVAC system can cut your heating and cooling bills by 20–40%. Compare free quotes from licensed local contractors.
          </p>
          <ZipCodeForm category="hvac" />
        </div>
      </section>

      <section className="bg-blue-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: "$5K–$12K", l: "Typical System Cost" },
            { v: "20–40%", l: "Energy Bill Reduction" },
            { v: "$2,000+", l: "Avg. Annual Savings" },
            { v: "15–20 yrs", l: "System Lifespan" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-extrabold">{s.v}</p>
              <p className="text-blue-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top HVAC Brands Compared</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Brand</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Rating</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Tier</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => (
                  <tr key={b.name} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium text-gray-900">{b.name}</td>
                    <td className="p-3 border border-gray-200">
                      <span className="font-bold text-blue-700">{b.rating}</span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.tier === "Premium" ? "bg-blue-50 text-blue-700" : b.tier === "Value" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {b.tier}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200 text-gray-500">{b.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">HVAC Guides & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => (
              <Link key={t.href} href={t.href} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">{t.tag}</span>
                  <p className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-blue-700 transition-colors">{t.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">HVAC Quotes by City</h2>
          <p className="text-gray-500 text-sm mb-6">Local HVAC pricing, contractor ratings, and free quotes in your city.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/hvac/${c.slug}`}
                className="text-sm text-blue-700 hover:text-blue-900 hover:underline py-1 px-2 rounded hover:bg-blue-50 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Wind className="w-10 h-10 text-blue-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free HVAC Quotes Today</h2>
          <p className="text-blue-100 text-sm mb-6">Compare up to 3 quotes from licensed local HVAC contractors.</p>
          <ZipCodeForm category="hvac" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
