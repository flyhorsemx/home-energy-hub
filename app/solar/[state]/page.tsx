import { notFound } from "next/navigation"
import Link from "next/link"
import { Sun, CheckCircle, MapPin, ArrowRight, Star } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import { getStateBySlug, STATE_SLUGS } from "@/lib/states"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

interface Props {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return STATE_SLUGS.map((state) => ({ state }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const data = getStateBySlug(state)
  if (!data) return {}

  return {
    title: `Solar Panel Installation Cost in ${data.name}: 2026 Prices, Rebates & Quotes`,
    description: `Average solar installation cost in ${data.name}: ${data.avgCost} before incentives. Compare local quotes, current rebate rules, and expected production.`,
    keywords: [`solar panels ${data.name}`, `solar installation ${data.name}`, `solar cost ${data.name}`, `solar quotes ${data.name}`],
    alternates: { canonical: `${SITE_URL}/solar/${state}` },
  }
}

export default async function StateSolarPage({ params }: Props) {
  const { state } = await params
  const data = getStateBySlug(state)
  if (!data) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-sm text-yellow-700">
            <MapPin className="w-4 h-4" />
            <Link href="/solar" className="hover:underline">Solar</Link>
            <span>/</span>
            <span>{data.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Solar Panel Installation in {data.name}:<br />
            <span className="text-yellow-600">Costs, Rebates & Free Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            Average solar system cost in {data.name}: <strong>{data.avgCost}</strong> before incentives.
            Compare expected production, incentives, and installation details for your home.
          </p>
          <ZipCodeForm category="solar" />
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-yellow-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: data.avgCost, l: "Avg. System Cost" },
            { v: data.avgSavings, l: "Annual Savings" },
            { v: data.payback, l: "Typical Payback" },
            { v: data.sunHours, l: "Peak Sun Hours" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-lg md:text-2xl font-extrabold">{s.v}</p>
              <p className="text-yellow-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Incentives */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {data.name} Solar Incentives & Rebates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.incentives.map((incentive) => (
              <div key={incentive} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="font-medium text-gray-900 text-sm">{incentive}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">
            * Incentives change frequently. Ask each local {data.name} solar company to confirm current programs and show assumptions in writing.
          </p>
        </div>
      </section>

      {/* Top Cities */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Solar Quotes by City in {data.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {data.topCities.map((city) => (
              <div
                key={city}
                className="bg-white border border-gray-200 rounded-xl p-3 text-center text-sm font-medium text-gray-700 hover:border-yellow-400 transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is Solar Worth It */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Is Solar Worth It in {data.name}?
          </h2>
          <div className="prose prose-sm text-gray-600 space-y-4">
            <p>
              With an average of <strong>{data.sunHours}</strong> of peak sunlight daily and state-specific solar rules,
              {data.name} can still be worth comparing for solar. Payback depends on system size, export credit rules,
              financing, and current incentives; a common estimate is <strong>{data.payback}</strong>.
            </p>
            <p>
              Federal solar credit rules changed after 2025, while {data.name}-specific programs may reduce project cost when current rules and eligibility line up.
            </p>
            <p>
              The best way to know if solar makes sense for your specific home is to get a free quote from a local installer.
              They&apos;ll assess your roof, shade situation, and electricity usage to give you a project-specific estimate.
            </p>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm font-semibold text-yellow-800 mb-1">
              Average {data.name} solar bill impact estimate: {data.avgSavings}
            </p>
            <p className="text-xs text-yellow-700">Based on average utility rates and system sizes in {data.name}.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-yellow-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Sun className="w-10 h-10 text-yellow-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">
            Get Free Solar Quotes in {data.name}
          </h2>
          <p className="text-yellow-100 text-sm mb-6">
            Request quote options from local {data.name} solar installers. 100% free to request.
          </p>
          <ZipCodeForm category="solar" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
