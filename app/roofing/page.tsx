import Link from "next/link"
import { Home, ArrowRight, CheckCircle, Star } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Roof Replacement Cost & Free Estimates (2025) | CleverHomeEnergy",
  description:
    "Get free roofing estimates from local contractors. Compare roofing materials, costs by state, and top brands. Typical roof replacement: $8,000–$25,000.",
}

const topics = [
  { title: "Roof Replacement Cost by State (2025)", href: "/blog/roof-replacement-cost", tag: "Pricing" },
  { title: "Metal Roof vs Asphalt Shingles", href: "/blog/metal-roof-vs-asphalt-shingles", tag: "Comparison" },
  { title: "Owens Corning vs GAF Roofing", href: "/blog/owens-corning-vs-gaf-roofing", tag: "Comparison" },
  { title: "Best Roofing Materials Guide", href: "/blog/roofing-material-comparison", tag: "Guide" },
  { title: "9 Signs You Need a New Roof", href: "/blog/signs-you-need-new-roof", tag: "Diagnosis" },
  { title: "Roof Repair vs Replacement", href: "/blog/roof-repair-vs-replacement", tag: "Guide" },
  { title: "How Long Does a Roof Last?", href: "/blog/how-long-does-roof-last", tag: "Guide" },
  { title: "How to Choose a Roofing Contractor", href: "/blog/how-to-choose-roofing-contractor", tag: "Guide" },
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

const materials = [
  { name: "Asphalt Shingles", lifespan: "15–30 yrs", cost: "$3–$5/sq ft", best: "Most affordable, widely available" },
  { name: "Metal Roofing", lifespan: "40–70 yrs", cost: "$8–$14/sq ft", best: "Long-lasting, energy efficient" },
  { name: "Architectural Shingles", lifespan: "25–30 yrs", cost: "$4–$6/sq ft", best: "Best value, great appearance" },
  { name: "Tile Roofing", lifespan: "50+ yrs", cost: "$10–$18/sq ft", best: "Premium look, hot climates" },
]

const faqs = [
  {
    q: "How much does a roof replacement cost?",
    a: "Most homeowners pay $8,000–$25,000 for a full replacement. The average is around $12,000 for a typical 2,000 sq ft home. Cost varies by material, pitch, and location.",
  },
  {
    q: "How long does a roof replacement take?",
    a: "Most residential roofs are replaced in 1–3 days. Larger or more complex roofs may take longer. Weather can also be a factor.",
  },
  {
    q: "Does homeowner's insurance cover roof replacement?",
    a: "Insurance typically covers storm or hail damage. Wear and tear is usually not covered. A local roofer can help you document damage for a claim.",
  },
]

export default function RoofingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-6 h-6 text-red-500" />
            <span className="text-sm font-semibold text-red-700">Roofing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Roof Replacement Costs &<br />
            <span className="text-red-600">Free Local Estimates</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl">
            Compare roofing quotes from vetted local contractors. Most homeowners save $3,000–$8,000 by comparing multiple bids.
          </p>
          <ZipCodeForm category="roofing" />
        </div>
      </section>

      <section className="bg-red-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: "$8K–$25K", l: "Avg. Replacement Cost" },
            { v: "1–3 Days", l: "Typical Install Time" },
            { v: "15–70 yrs", l: "Material Lifespan Range" },
            { v: "5%+", l: "Home Value Increase" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-extrabold">{s.v}</p>
              <p className="text-red-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Compare Roofing Materials</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Material</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Lifespan</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Cost</th>
                  <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.name} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200 font-medium text-gray-900">{m.name}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{m.lifespan}</td>
                    <td className="p-3 border border-gray-200 text-gray-600">{m.cost}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">{m.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Roofing Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => (
              <Link key={t.href} href={t.href} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">{t.tag}</span>
                  <p className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-red-700 transition-colors">{t.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Roofing FAQs</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Roofing Quotes by City</h2>
          <p className="text-gray-500 text-sm mb-6">Local roofing costs, contractor ratings, and free estimates in your city.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/roofing/${c.slug}`}
                className="text-sm text-red-700 hover:text-red-900 hover:underline py-1 px-2 rounded hover:bg-red-50 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-red-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Star className="w-10 h-10 text-red-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free Roofing Estimates Today</h2>
          <p className="text-red-100 text-sm mb-6">Compare quotes from 3 vetted local roofers. 100% free.</p>
          <ZipCodeForm category="roofing" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
