import Link from "next/link"
import { Sun, ArrowRight, CheckCircle, Calculator, Star } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solar Panels for Home: Costs, 2026 Incentives & Free Quotes",
  description:
    "Compare solar panel costs, brand reviews, state incentives, utility rebates, and local quote options. Check current 2026 solar rules before you sign.",
  keywords: ["solar panels", "solar installation cost", "solar quotes", "home solar", "solar tax credit"],
}

const solarTopics = [
  { title: "Solar Installation Cost by State", href: "/blog/solar-installation-cost-by-state", tag: "Pricing" },
  { title: "How Much Do Solar Panels Save?", href: "/blog/how-much-do-solar-panels-save", tag: "Savings" },
  { title: "Solar Battery Storage Cost", href: "/blog/solar-battery-storage-cost", tag: "Pricing" },
  { title: "Solar Rebates & Incentives Guide", href: "/blog/solar-rebates-incentives", tag: "Savings" },
  { title: "IRA Home Energy Tax Credits", href: "/blog/ira-home-energy-tax-credits", tag: "Savings" },
  { title: "Solar Financing Options", href: "/blog/solar-financing-options", tag: "Guide" },
  { title: "Best Solar Panel Brands Ranked", href: "/blog/best-solar-panel-brands", tag: "Comparison" },
  { title: "SunPower vs Panasonic Solar", href: "/blog/sunpower-vs-panasonic-solar", tag: "Comparison" },
  { title: "How Long Do Solar Panels Last?", href: "/blog/how-long-do-solar-panels-last", tag: "Guide" },
]

const topStates = [
  { name: "California", slug: "california" },
  { name: "Texas", slug: "texas" },
  { name: "Florida", slug: "florida" },
  { name: "Arizona", slug: "arizona" },
  { name: "New York", slug: "new-york" },
  { name: "North Carolina", slug: "north-carolina" },
  { name: "New Jersey", slug: "new-jersey" },
  { name: "Georgia", slug: "georgia" },
  { name: "Virginia", slug: "virginia" },
  { name: "Colorado", slug: "colorado" },
  { name: "Washington", slug: "washington" },
  { name: "Massachusetts", slug: "massachusetts" },
  { name: "Nevada", slug: "nevada" },
  { name: "Illinois", slug: "illinois" },
  { name: "Maryland", slug: "maryland" },
  { name: "Oregon", slug: "oregon" },
  { name: "Minnesota", slug: "minnesota" },
  { name: "Ohio", slug: "ohio" },
  { name: "Michigan", slug: "michigan" },
  { name: "Pennsylvania", slug: "pennsylvania" },
]

const stats = [
  { value: "Varies", label: "Local Incentives" },
  { value: "$1,400+", label: "Bill Impact Est." },
  { value: "7–10 yrs", label: "Typical Payback Period" },
  { value: "25+ yrs", label: "Panel Lifespan" },
]

const faqs = [
  {
    q: "How much do solar panels cost in 2026?",
    a: "The average cost of a residential solar system often ranges from $15,000 to $25,000 before incentives. Final cost depends on roof size, equipment, utility rules, financing, and any current state or utility programs.",
  },
  {
    q: "Are solar panels worth it if I have a small roof?",
    a: "Yes — modern high-efficiency panels (like SunPower or Panasonic) produce more power per square foot. A solar pro can assess your roof and recommend the best layout.",
  },
  {
    q: "How long does solar installation take?",
    a: "Installation typically takes 1–3 days. Permitting and utility approval can take 1–3 months. Most homeowners are generating power within 90 days of signing.",
  },
  {
    q: "Do I need a new roof before going solar?",
    a: "If your roof is over 15 years old or showing wear, it's worth replacing first. Removing and reinstalling panels later can cost $1,500–$3,000. A free solar quote will include a roof assessment.",
  },
]

export default function SolarPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-700">Solar Energy</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Solar Panels for Your Home:<br />
            <span className="text-yellow-600">Compare Solar Options</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl">
            Compare local solar quotes, state incentives, utility rules, and expected production before you decide.
          </p>
          <ZipCodeForm category="solar" />
          <p className="text-sm text-gray-500 mt-3">
            Free quotes - No obligation - Local project options
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-yellow-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-extrabold">{s.value}</p>
              <p className="text-yellow-100 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Solar */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Homeowners Are Comparing Solar in 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Lock in low electricity rates", desc: "As utility prices rise, solar locks in your energy costs for 25+ years." },
              { title: "State and utility incentives", desc: "Program availability now varies by market, so verify current rules before budgeting around incentives." },
              { title: "Increase home value", desc: "Homes with solar sell for 4–6% more than comparable homes without, according to Zillow." },
              { title: "Net metering pays you", desc: "Many states pay you for excess electricity you send back to the grid." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Solar Guides & Resources</h2>
          <p className="text-gray-500 text-sm mb-8">Everything you need to make an informed solar decision</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solarTopics.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full">
                    {t.tag}
                  </span>
                  <p className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-yellow-700 transition-colors">
                    {t.title}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Calculator className="w-10 h-10 text-green-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Calculate Your Solar Savings</h2>
          <p className="text-gray-500 text-sm mb-5">
            Enter your monthly electric bill and get an instant estimate of your savings and payback period.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
          >
            Use Free Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Solar FAQs</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Solar Quotes by State</h2>
          <p className="text-gray-500 text-sm mb-6">Local solar costs, incentives, and free quotes for your state.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {topStates.map((s) => (
              <Link
                key={s.slug}
                href={`/solar/${s.slug}`}
                className="text-sm text-yellow-700 hover:text-yellow-900 hover:underline py-1 px-2 rounded hover:bg-yellow-50 transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-yellow-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Star className="w-10 h-10 text-yellow-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Your Free Solar Quotes Today</h2>
          <p className="text-yellow-100 text-sm mb-6">
            Compare quotes from up to 3 local installers. 100% free, no obligation.
          </p>
          <ZipCodeForm category="solar" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
