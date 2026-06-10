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
import AngiCTA from "@/components/content/AngiCTA"

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
    const isFortWayne = slug === "fort-wayne-in"
    return {
      title: isFortWayne
        ? "HVAC Replacement Fort Wayne, IN: Cost, Rebates & Quotes"
        : `HVAC Installation in ${cityData.name}, ${cityData.stateAbbr}: Cost, Rebates & Quotes`,
      description: isFortWayne
        ? "Compare Fort Wayne HVAC replacement cost, furnace plus AC vs dual-fuel heat pump options, rebates, payback, and free local contractor quotes."
        : `Compare HVAC installation cost in ${cityData.name}: ${cityData.hvac.avgCostInstall}. See recommended systems, rebates, payback, and free local contractor quotes.`,
      keywords: [`HVAC contractors ${cityData.name}`, `HVAC installation ${cityData.name} ${cityData.stateAbbr}`, `AC replacement cost ${cityData.name}`, `furnace installation ${cityData.name}`, `heat pump ${cityData.name} ${cityData.stateAbbr}`],
      alternates: { canonical: `${SITE_URL}/hvac/${slug}` },
    }
  }
  const hvac = getHVACStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (hvac && base) {
    return {
      title: `HVAC Installation Cost in ${base.name}: 2026 System Prices, Rebates & Free Quotes`,
      description: `Average HVAC installation cost in ${base.name}: ${hvac.avgInstallCost}. Compare recommended systems, current rebate rules, and local contractor quote options.`,
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
    const isLexington = slug === "lexington-ky"
    const isFortWayne = slug === "fort-wayne-in"
    const faqs = [
      { q: `How much does HVAC installation cost in ${cityData.name}, ${cityData.stateAbbr}?`, a: `New HVAC system installation in ${cityData.name} costs ${h.avgCostInstall} on average, depending on system type, home size, and whether ductwork needs replacement. Heat pump systems may qualify for federal, state, utility, or local incentives, but homeowners should confirm current rules before budgeting around them.` },
      { q: `What is the best HVAC system for ${cityData.name}'s climate?`, a: `The recommended system for ${cityData.name} is the ${h.recommendedSystem}. ${h.climateNote.split(".")[0]}.` },
      { q: `How do I compare HVAC savings and payback in ${cityData.name}?`, a: `${cityData.name} homeowners should compare efficiency ratings, fuel type, equipment size, utility rates, and rebate eligibility. Payback varies by home, system type, and usage, so ask each contractor to show their assumptions.` },
      { q: `Are there HVAC rebates or tax credits available in ${cityData.name}?`, a: `There may be federal, utility, state, or local incentives for qualifying high-efficiency HVAC systems. ${h.incentives.length > 1 ? `Programs to check include: ${h.incentives.slice(1, 3).join("; ")}.` : ""} Ask each contractor to confirm current eligibility before you sign.` },
      { q: `When should I replace my HVAC system in ${cityData.name}?`, a: `Replace your HVAC system if it's 15+ years old, needs repairs costing more than 50% of a new system's price, uses R-22 refrigerant (no longer manufactured), or your energy bills have risen significantly. Most ${cityData.name} homeowners see payback within ${h.avgPayback}.` },
      { q: `How do I find a reliable HVAC contractor in ${cityData.name}?`, a: `Look for NATE-certified technicians in ${cityData.name} with at least 4.5 stars and recent reviews. Get 3 written quotes comparing the same equipment. Verify the contractor pulls a permit — required for HVAC work in ${cityData.stateAbbr}.` },
      ...(isFortWayne
        ? [
            {
              q: "Should Fort Wayne homeowners choose a gas furnace or a heat pump?",
              a: "Many Fort Wayne homes do well with a high-efficiency gas furnace plus central AC because winter reliability matters. A dual-fuel heat pump is worth comparing if the home already has gas heat and ductwork, because it can use electric heat during milder weather and gas heat during colder snaps.",
            },
            {
              q: "Does Fort Wayne HVAC replacement need a Manual J load calculation?",
              a: "Yes. A Manual J load calculation helps size the furnace, AC, or heat pump for the actual home instead of copying the old equipment size. This is especially useful in Fort Wayne homes with older ductwork, insulation upgrades, room additions, or uneven upstairs comfort.",
            },
            {
              q: "What should be included in a Fort Wayne HVAC replacement quote?",
              a: "A strong Fort Wayne HVAC quote should include equipment model numbers, SEER2 and AFUE ratings, Manual J sizing, ductwork inspection notes, thermostat, permit handling, labor warranty, disposal, and current Indiana Michigan Power or NIPSCO rebate paperwork.",
            },
          ]
        : []),
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
              HVAC Installation in {cityData.name}, {cityData.stateAbbr}:<br />
              <span className="text-blue-600">Cost, Rebates & Local Quotes</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl">
              New HVAC system cost in {cityData.name}: <strong>{h.avgCostInstall}</strong>. Typical bill impact estimate: <strong>{h.avgAnnualSavings}/year</strong>. Payback varies by home and system; common estimate: <strong>{h.avgPayback}</strong>.
            </p>
            <ZipCodeForm category="hvac" />
            <div className="mt-4 max-w-xl">
              <AngiCTA category="hvac" locationName={cityData.name} />
            </div>
          </div>
        </section>
        <section className="bg-blue-700 py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[{ v: h.avgCostInstall, l: "Installation Cost" }, { v: h.avgAnnualSavings, l: "Annual Savings" }, { v: h.avgPayback, l: "Typical Payback" }, { v: h.recommendedSystem.split("(")[0].trim(), l: "Best System" }].map((s) => (
              <div key={s.l}><p className="text-base md:text-xl font-extrabold">{s.v}</p><p className="text-blue-200 text-xs mt-1">{s.l}</p></div>
            ))}
          </div>
        </section>
        {isLexington && (
          <section className="py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Lexington HVAC Replacement: Quick Cost Answer</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Most common search", value: "HVAC replacement Lexington KY" },
                  { label: "Best fit for many homes", value: h.recommendedSystem },
                  { label: "Typical project range", value: h.avgCostInstall },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{item.label}</p>
                    <p className="mt-2 text-sm font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p>
                  Lexington homes deal with humid summers, cool winters, and enough shoulder-season weather to make heat pumps a strong option. If your current system is 12-15 years old, needs frequent repairs, or cannot keep upstairs rooms comfortable, compare a standard heat pump, a dual-fuel heat pump, and a high-efficiency AC plus furnace before choosing.
                </p>
                <p>
                  Ask every Lexington HVAC contractor for the same scope: equipment model, SEER2/HSPF2 rating, ductwork changes, thermostat, permit handling, labor warranty, and available rebate paperwork. Matching scopes makes quotes easier to compare and helps avoid a low bid that leaves out important work.
                </p>
              </div>
            </div>
          </section>
        )}
        {isFortWayne && (
          <section className="py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fort Wayne HVAC Replacement: Quick Cost Answer</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Most common search", value: "HVAC replacement Fort Wayne IN" },
                  { label: "Best fit for many homes", value: h.recommendedSystem },
                  { label: "Typical project range", value: h.avgCostInstall },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{item.label}</p>
                    <p className="mt-2 text-sm font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p>
                  Fort Wayne homes need reliable heat for cold Indiana winters and steady cooling for humid summers. If your system is older than 12-15 years, compare a high-efficiency gas furnace plus central AC against a dual-fuel heat pump, especially if your home already has gas service and existing ductwork.
                </p>
                <p>
                  Ask every Fort Wayne HVAC contractor for the same quote scope: Manual J load calculation, ductwork inspection, equipment model numbers, SEER2 and AFUE ratings, thermostat, permit handling, labor warranty, and current Indiana Michigan Power or NIPSCO rebate paperwork. Matching the scope makes it much easier to spot a bid that is cheap because it leaves work out.
                </p>
              </div>
            </div>
          </section>
        )}
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
        {isFortWayne && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fort Wayne Furnace vs Dual-Fuel Heat Pump Decision Guide</h2>
              <p className="text-sm text-gray-600 mb-6">
                Use this quick guide before requesting quotes so each contractor prices the same system options.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-sm">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="p-4 text-left">Home Situation</th>
                      <th className="p-4 text-left">System to Compare</th>
                      <th className="p-4 text-left">What to Ask</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { situation: "Existing gas furnace and ductwork", system: "High-efficiency gas furnace + central AC", ask: "AFUE rating, AC SEER2 rating, duct condition, and labor warranty" },
                      { situation: "High winter gas bills or uneven comfort", system: "Dual-fuel heat pump", ask: "Heat pump balance point, backup heat controls, and thermostat setup" },
                      { situation: "Older home with additions", system: "Manual J sizing before equipment choice", ask: "Room-by-room load calculation and duct airflow check" },
                      { situation: "Utility rebate focused project", system: "Qualifying high-efficiency equipment", ask: "Indiana Michigan Power or NIPSCO forms before signing" },
                    ].map((row, i) => (
                      <tr key={row.situation} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4 font-medium text-gray-900">{row.situation}</td>
                        <td className="p-4 text-gray-600">{row.system}</td>
                        <td className="p-4 text-gray-600">{row.ask}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
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
        {isFortWayne && (
          <section className="py-10 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related HVAC Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: "HVAC Installation Cost Guide", href: "/blog/hvac-installation-cost" },
                  { title: "Furnace Replacement Cost", href: "/blog/furnace-replacement-cost" },
                  { title: "Heat Pump vs Gas Furnace", href: "/blog/heat-pump-vs-gas-furnace" },
                  { title: "Heat Pump Cost Guide", href: "/blog/heat-pump-cost-guide" },
                  { title: "Central Air Installation Cost", href: "/blog/central-air-installation-cost" },
                  { title: "Signs You Need a New HVAC", href: "/blog/signs-you-need-new-hvac" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm font-medium text-gray-700 transition-colors hover:border-blue-400 hover:bg-blue-50">
                    <ArrowRight className="w-4 h-4 text-blue-500 shrink-0" />
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="py-14 px-4 bg-blue-700 text-white text-center">
          <div className="max-w-xl mx-auto">
            <Thermometer className="w-10 h-10 text-blue-200 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">Get Free HVAC Quotes in {cityData.name}</h2>
            <p className="text-blue-100 text-sm mb-6">Request quote options from local {cityData.name} HVAC companies. 100% free to request.</p>
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
            Average HVAC system cost in {base.name}: <strong>{hvac.avgInstallCost}</strong>. Compare system type, efficiency ratings, and rebate eligibility before choosing a high-efficiency system.
          </p>
          <ZipCodeForm category="hvac" />
          <div className="mt-4 max-w-xl">
            <AngiCTA category="hvac" locationName={base.name} />
          </div>
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
                  { type: "Geothermal Heat Pump", cost: "$15,000–$30,000", best: "Maximum long-term efficiency; verify current incentive rules" },
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
          <p className="text-gray-500 text-sm mt-4">* Incentives change frequently. A local {base.name} HVAC company can confirm current programs.</p>
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
            <p>With estimated energy bill impact of <strong>{hvac.avgAnnualSavings}</strong> per year and a common payback estimate of <strong>{hvac.avgPayback}</strong>, upgrading to a high-efficiency system is worth comparing for many {base.name} homeowners.</p>
            <p>Federal credit rules changed after 2025, so new 2026 projects should focus on current utility rebates, state programs, equipment efficiency, and contractor documentation before budgeting around incentives.</p>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm font-semibold text-blue-800 mb-1">Average {base.name} HVAC bill impact estimate: {hvac.avgAnnualSavings}</p>
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
              { title: "Best HVAC Brands", href: "/blog/best-hvac-brands" },
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
          <p className="text-blue-100 text-sm mb-6">Request quote options from local {base.name} HVAC companies. 100% free to request.</p>
          <ZipCodeForm category="hvac" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
