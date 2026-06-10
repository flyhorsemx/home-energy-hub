import { notFound } from "next/navigation"
import Link from "next/link"
import { Thermometer, CheckCircle, MapPin, AlertTriangle, ArrowRight, DollarSign, Zap, Wind, ThermometerSun } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import { getCityBySlug, CITY_SLUGS } from "@/lib/cities"
import { getHVACStateBySlug, HVAC_STATE_SLUGS } from "@/lib/states-hvac"
import { getStateBySlug } from "@/lib/states"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"
import CityPageJsonLd from "@/components/content/CityPageJsonLd"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [
    ...CITY_SLUGS.map((slug) => ({ slug })),
    ...HVAC_STATE_SLUGS.map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cityData = getCityBySlug(slug)
  if (cityData) {
    return {
      title: `HVAC Installation Cost in ${cityData.name}, ${cityData.stateAbbr} (2025): Systems, Rebates & Quotes`,
      description: `HVAC replacement cost in ${cityData.name}: ${cityData.hvac.avgCostInstall}. Save ${cityData.hvac.avgAnnualSavings}/year with a new system. Get free quotes from local HVAC contractors.`,
      keywords: [`HVAC contractors ${cityData.name}`, `HVAC installation ${cityData.name} ${cityData.stateAbbr}`, `AC replacement cost ${cityData.name}`, `furnace installation ${cityData.name}`, `heat pump ${cityData.name} ${cityData.stateAbbr}`],
      alternates: { canonical: `${SITE_URL}/hvac/${slug}` },
    }
  }
  const hvac = getHVACStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (hvac && base) {
    return {
      title: `HVAC Installation Cost in ${base.name} (2025): System Prices, Rebates & Free Quotes`,
      description: `Average HVAC installation cost in ${base.name}: ${hvac.avgInstallCost}. Most homeowners save ${hvac.avgAnnualSavings} after upgrading. Get free quotes from licensed local contractors.`,
      keywords: [`HVAC installation ${base.name}`, `HVAC cost ${base.name}`, `heat pump ${base.name}`, `air conditioner installation ${base.name}`, `furnace replacement ${base.name}`],
      alternates: { canonical: `${SITE_URL}/hvac/${slug}` },
    }
  }
  return {}
}

export default async function HvacSlugPage({ params }: Props) {
  const { slug } = await params

  // --- CITY PAGE ---
  const cityData = getCityBySlug(slug)
  if (cityData) {
    const h = cityData.hvac
    const faqs = [
      { q: `How much does HVAC installation cost in ${cityData.name}, ${cityData.stateAbbr}?`, a: `New HVAC system installation in ${cityData.name} costs ${h.avgCostInstall} on average, depending on system type, home size, and whether ductwork needs replacement. Heat pump systems may qualify for a federal tax credit of up to $2,000, reducing net cost significantly.` },
      { q: `What is the best HVAC system for ${cityData.name}'s climate?`, a: `The recommended system for ${cityData.name} is the ${h.recommendedSystem}. ${h.climateNote.split(".")[0]}.` },
      { q: `How much can I save on energy bills with a new HVAC system in ${cityData.name}?`, a: `${cityData.name} homeowners typically save ${h.avgAnnualSavings} per year after upgrading to a modern high-efficiency HVAC system. Payback period is usually ${h.avgPayback}.` },
      { q: `Are there HVAC rebates or tax credits available in ${cityData.name}?`, a: `Yes. The federal IRA provides a 30% tax credit up to $2,000 for qualifying heat pump systems through 2032. ${h.incentives.length > 1 ? `Additional programs include: ${h.incentives.slice(1, 3).join("; ")}.` : ""}` },
      { q: `When should I replace my HVAC system in ${cityData.name}?`, a: `Replace your HVAC system if it's 15+ years old, needs repairs costing more than 50% of a new system's price, uses R-22 refrigerant (no longer manufactured), or your energy bills have risen significantly. Most ${cityData.name} homeowners see payback within ${h.avgPayback}.` },
      { q: `How do I find a reliable HVAC contractor in ${cityData.name}?`, a: `Look for NATE-certified technicians in ${cityData.name} with at least 4.5 stars and recent reviews. Get 3 written quotes comparing the same equipment. Verify the contractor pulls a permit — required for HVAC work in ${cityData.stateAbbr}.` },
    ]
    return (
      <>
        <CityPageJsonLd cityName={cityData.name} stateAbbr={cityData.stateAbbr} citySlug={slug} service="hvac" serviceLabel="HVAC Installation" faqs={faqs} />
        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm text-blue-600">
              <MapPin className="w-4 h-4" />
              <Link href="/hvac" className="hover:underline">HVAC</Link>
              <span>/</span>
              <span>{cityData.name}, {cityData.stateAbbr}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              HVAC Installation in {cityData.name}, {cityData.state}:<br />
              <span className="text-blue-600">Cost, Systems & Free Quotes</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl">
              New HVAC system cost in {cityData.name}: <strong>{h.avgCostInstall}</strong>. Homeowners save <strong>{h.avgAnnualSavings}/year</strong> on energy bills after upgrading. Typical payback: <strong>{h.avgPayback}</strong>.
            </p>
            <ZipCodeForm category="hvac" />
          </div>
        </section>
        <section className="bg-blue-700 py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[{ v: h.avgCostInstall, l: "Installation Cost" }, { v: h.avgAnnualSavings, l: "Annual Savings" }, { v: h.avgPayback, l: "Typical Payback" }, { v: h.recommendedSystem.split("(")[0].trim(), l: "Best System" }].map((s) => (
              <div key={s.l}><p className="text-base md:text-xl font-extrabold">{s.v}</p><p className="text-blue-200 text-xs mt-1">{s.l}</p></div>
            ))}
          </div>
        </section>
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best HVAC System for {cityData.name}</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <p className="text-sm font-bold text-blue-800 mb-1">Recommended System</p>
              <p className="text-lg font-bold text-gray-900 mb-3">{h.recommendedSystem}</p>
              <p className="text-gray-700 leading-relaxed">{h.climateNote}</p>
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">HVAC Rebates & Incentives in {cityData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {h.incentives.map((incentive) => (
                <div key={incentive} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <DollarSign className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-gray-800">{incentive}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">HVAC System Comparison for {cityData.name} Homeowners</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="text-left p-4">System Type</th>
                    <th className="text-left p-4">Installed Cost</th>
                    <th className="text-left p-4">Efficiency</th>
                    <th className="text-left p-4">Best Climate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Central AC + Gas Furnace", cost: "$5,000–$12,000", eff: "13–21 SEER2 / 80–98% AFUE", climate: "Cold winters + hot summers" },
                    { type: "Standard Heat Pump", cost: "$4,500–$9,500", eff: "14–18 SEER2", climate: "Mild winters (above 20°F)" },
                    { type: "Cold-Climate Heat Pump", cost: "$5,500–$12,000", eff: "18–22 SEER2", climate: "Cold winters (to -15°F)" },
                    { type: "Dual-Fuel Heat Pump", cost: "$6,000–$13,000", eff: "18–22 SEER2 + 95% AFUE", climate: "All climates — most efficient" },
                    { type: "Ductless Mini-Split", cost: "$3,500–$9,000", eff: "18–26 SEER2", climate: "No ductwork, zoned comfort" },
                    { type: "Geothermal Heat Pump", cost: "$15,000–$35,000", eff: "300–600% COP", climate: "All climates — highest ROI long-term" },
                  ].map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 font-medium text-gray-800">{row.type}</td>
                      <td className="p-4 text-gray-600">{row.cost}</td>
                      <td className="p-4 text-gray-600">{row.eff}</td>
                      <td className="p-4 text-gray-600">{row.climate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions: HVAC in {cityData.name}</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="border border-gray-200 rounded-xl bg-white group">
                  <summary className="p-5 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
                    {faq.q}
                    <span className="text-blue-600 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="py-14 px-4 bg-blue-700 text-white text-center">
          <div className="max-w-xl mx-auto">
            <Thermometer className="w-10 h-10 text-blue-200 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">Get Free HVAC Quotes in {cityData.name}</h2>
            <p className="text-blue-100 text-sm mb-6">Compare quotes from vetted local {cityData.name} HVAC contractors. 100% free, no obligation.</p>
            <ZipCodeForm category="hvac" className="[&_input]:bg-white [&_input]:text-gray-900" />
          </div>
        </section>
      </>
    )
  }

  // --- STATE PAGE ---
  const hvac = getHVACStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (!hvac || !base) notFound()

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-sky-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-sm text-blue-700">
            <MapPin className="w-4 h-4" />
            <Link href="/hvac" className="hover:underline">HVAC</Link>
            <span>/</span>
            <span>{base.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            HVAC Installation Cost in {base.name}:<br />
            <span className="text-blue-600">Prices, Rebates & Free Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            Average HVAC system cost in {base.name}: <strong>{hvac.avgInstallCost}</strong>. Most homeowners save <strong>{hvac.avgAnnualSavings}</strong> on energy bills after upgrading to a high-efficiency system.
          </p>
          <ZipCodeForm category="hvac" />
        </div>
      </section>

      <section className="bg-blue-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[{ v: hvac.avgInstallCost, l: "Avg. Install Cost" }, { v: hvac.avgAnnualSavings, l: "Annual Savings" }, { v: hvac.avgPayback, l: "Typical Payback" }, { v: "Up to $2,000", l: "Federal Tax Credit" }].map((s) => (
            <div key={s.l}><p className="text-lg md:text-2xl font-extrabold">{s.v}</p><p className="text-blue-100 text-xs mt-1">{s.l}</p></div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best HVAC System for {base.name} Homes</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex gap-3 items-start">
              <ThermometerSun className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1">{hvac.recommendedSystem}</p>
                <p className="text-gray-600 text-sm">{hvac.climateNote}</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">System Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Installed Cost</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { type: "Central AC + Gas Furnace", cost: "$5,000–$12,000", best: "Cold climates with existing ductwork" },
                  { type: "Heat Pump (Air Source)", cost: "$4,500–$10,000", best: "Mixed climates, max efficiency" },
                  { type: "Dual-Fuel Heat Pump", cost: "$6,000–$13,000", best: "Regions with cold winters + high AC demand" },
                  { type: "Ductless Mini-Split", cost: "$3,000–$9,000", best: "Additions, no ductwork, zoned comfort" },
                  { type: "Geothermal Heat Pump", cost: "$15,000–$30,000", best: "Maximum long-term savings, 30% federal credit" },
                ].map((row) => (
                  <tr key={row.type} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{row.type}</td>
                    <td className="p-3 text-gray-600">{row.cost}</td>
                    <td className="p-3 text-gray-500">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{base.name} HVAC Rebates & Incentives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hvac.incentives.map((incentive) => (
              <div key={incentive} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="font-medium text-gray-900 text-sm">{incentive}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">* Incentives change frequently. A licensed {base.name} HVAC contractor can confirm current programs.</p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">HVAC Quotes by City in {base.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {base.topCities.map((city) => (
              <div key={city} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-sm font-medium text-gray-700 hover:border-blue-400 transition-colors">
                <MapPin className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Is a New HVAC System Worth It in {base.name}?</h2>
          <div className="prose prose-sm text-gray-600 space-y-4">
            <p>With average energy savings of <strong>{hvac.avgAnnualSavings}</strong> per year and a payback period of <strong>{hvac.avgPayback}</strong>, upgrading to a high-efficiency system is one of the best home improvement investments {base.name} homeowners can make.</p>
            <p>The federal IRA&apos;s 25C tax credit covers <strong>up to $2,000</strong> for qualifying heat pumps and <strong>up to $600</strong> for high-efficiency furnaces and AC units. Combined with {base.name}-specific utility rebates, your out-of-pocket cost can be significantly lower than the sticker price.</p>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm font-semibold text-blue-800 mb-1">💡 Average {base.name} homeowner saves {hvac.avgAnnualSavings} after upgrading</p>
            <p className="text-xs text-blue-700">Based on average energy costs and system efficiency in {base.name}.</p>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related HVAC Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: "HVAC Installation Cost Guide", href: "/blog/hvac-installation-cost" },
              { title: "Heat Pump vs Gas Furnace", href: "/blog/heat-pump-vs-gas-furnace" },
              { title: "Signs You Need a New HVAC", href: "/blog/signs-you-need-new-hvac" },
              { title: "Best HVAC Brands 2025", href: "/blog/best-hvac-brands" },
              { title: "HVAC Maintenance Checklist", href: "/blog/hvac-maintenance-checklist" },
              { title: "Trane vs Carrier Comparison", href: "/blog/trane-vs-carrier-hvac" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700">
                <ArrowRight className="w-4 h-4 text-blue-500 shrink-0" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-blue-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Wind className="w-10 h-10 text-blue-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free HVAC Quotes in {base.name}</h2>
          <p className="text-blue-100 text-sm mb-6">Compare quotes from licensed {base.name} HVAC contractors. 100% free, no obligation.</p>
          <ZipCodeForm category="hvac" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
