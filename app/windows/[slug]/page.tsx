import { notFound } from "next/navigation"
import Link from "next/link"
import { AppWindow, CheckCircle, MapPin, AlertTriangle, ArrowRight } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import { getCityBySlug, CITY_SLUGS } from "@/lib/cities"
import { getWindowsData } from "@/lib/city-services"
import { getWindowsStateBySlug, WINDOWS_STATE_SLUGS } from "@/lib/states-windows"
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
    ...WINDOWS_STATE_SLUGS.map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cityData = getCityBySlug(slug)
  if (cityData) {
    const w = getWindowsData(cityData)
    return {
      title: `Window Replacement in ${cityData.name}, ${cityData.stateAbbr}: 2026 Cost, Types & Free Quotes`,
      description: `Average window replacement in ${cityData.name}: ${w.avgCost}. Compare window types, current rebate rules, and local quote options.`,
      keywords: [
        `window replacement ${cityData.name}`,
        `window installation ${cityData.name} ${cityData.stateAbbr}`,
        `energy efficient windows ${cityData.name}`,
        `window cost ${cityData.name}`,
        `best window contractor ${cityData.name} ${cityData.stateAbbr}`,
      ],
      alternates: { canonical: `${SITE_URL}/windows/${slug}` },
    }
  }
  const winState = getWindowsStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (winState && base) {
    return {
      title: `Window Replacement Cost in ${base.name}: 2026 Types, Rebates & Free Quotes`,
      description: `Average window replacement in ${base.name}: ${winState.avgCost}. Recommended type: ${winState.recommendedType}. Compare energy savings and free local quotes.`,
      keywords: [
        `window replacement ${base.name}`,
        `window installation ${base.name}`,
        `energy efficient windows ${base.name}`,
        `window cost ${base.name}`,
        `window contractor ${base.name}`,
      ],
      alternates: { canonical: `${SITE_URL}/windows/${slug}` },
    }
  }
  return {}
}

export default async function WindowsSlugPage({ params }: Props) {
  const { slug } = await params

  // --- CITY PAGE ---
  const cityData = getCityBySlug(slug)
  if (cityData) {
    const w = getWindowsData(cityData)

    const faqs = [
      {
        q: `How much does window replacement cost in ${cityData.name}, ${cityData.stateAbbr}?`,
        a: `Window replacement in ${cityData.name} costs ${w.avgCost} per window installed, including labor. A whole-home project (10–15 windows) typically runs $3,000–$8,000. ${w.recommendedType} is a common fit for ${cityData.name}'s climate. Federal credit rules changed after 2025, so verify current IRS, utility, and state rebate rules before budgeting around incentives.`,
      },
      {
        q: `What type of windows are best for ${cityData.name}?`,
        a: `${w.recommendedType} is recommended for ${cityData.name}, ${cityData.stateAbbr}. Look for U-factor ${w.uFactor} to meet energy efficiency requirements for your climate. ${w.climateNote.split(".")[0]}.`,
      },
      {
        q: `How much can I save on energy bills with new windows in ${cityData.name}?`,
        a: `New energy-efficient windows in ${cityData.name} may reduce heating and cooling costs by about ${w.avgSavings} per year depending on the home. Payback is typically ${w.payback}. Savings are higher for homes with old single-pane windows or significant drafts.`,
      },
      {
        q: `Is there a tax credit for window replacement in ${cityData.name}?`,
        a: `Federal window credit rules changed after 2025, so new 2026 projects should verify current IRS guidance before budgeting around a tax credit. ${w.incentives.length > 1 ? `Additional programs in ${cityData.name} may include: ${w.incentives.slice(1, 2).join("; ")}.` : ""} Ask your window contractor to confirm ENERGY STAR, utility, and state rebate eligibility before purchasing.`,
      },
      {
        q: `How long do new windows last in ${cityData.name}?`,
        a: `Quality double-pane vinyl windows last 20–30 years in ${cityData.name}'s climate. Wood windows can last 30–50 years with proper maintenance. Fiberglass windows are the most durable at 30–50+ years. Common issues in ${cityData.name} include ${w.commonIssues[0].toLowerCase()}, which proper installation and quality materials can prevent.`,
      },
      {
        q: `How do I find a reliable window contractor in ${cityData.name}?`,
        a: `Get at least 3 written quotes from ${cityData.name} window contractors. Ask each company about licensing, insurance, and permit requirements. Ask each contractor for the NFRC rating label confirming U-factor and SHGC values. Request local references from projects completed in the past 12 months and look for 4.5+ star Google reviews.`,
      },
    ]

    return (
      <>
        <CityPageJsonLd
          cityName={cityData.name}
          stateAbbr={cityData.stateAbbr}
          citySlug={slug}
          service="windows"
          serviceLabel="Window Replacement"
          faqs={faqs}
        />
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <Link href="/windows" className="hover:underline">Windows</Link>
              <span>/</span>
              <span>{cityData.name}, {cityData.stateAbbr}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Window Replacement in {cityData.name}, {cityData.state}:<br />
              <span className="text-purple-600">Cost, Types & Free Quotes</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl">
              Average cost in {cityData.name}: <strong>{w.avgCost}</strong>.
              Recommended type: <strong>{w.recommendedType}</strong>.
              Typical annual bill impact estimate: <strong>{w.avgSavings}</strong>.
            </p>
            <ZipCodeForm category="windows" />
            <div className="mt-4 max-w-xl">
              <AngiCTA category="windows" locationName={cityData.name} />
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-purple-700 py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { v: w.avgCost, l: "Avg. Cost Per Window" },
              { v: w.avgSavings, l: "Annual Energy Savings" },
              { v: w.recommendedType, l: "Recommended Type" },
              { v: w.payback, l: "Typical Payback" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-sm md:text-base font-extrabold">{s.v}</p>
                <p className="text-purple-200 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Climate Note */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Window Replacement in {cityData.name}: What to Know
            </h2>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">{w.climateNote}</p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Common Window Issues in {cityData.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {w.commonIssues.map((issue) => (
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
              Window Rebates & Tax Credits in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {w.incentives.map((item) => (
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
              Window Replacement Cost in {cityData.name} ({new Date().getFullYear()})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-purple-700 text-white">
                  <tr>
                    <th className="text-left p-4">Window Type</th>
                    <th className="text-left p-4">Cost Per Window</th>
                    <th className="text-left p-4">U-Factor</th>
                    <th className="text-left p-4">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Double-Pane Standard", cost: "$150–$350", u: "0.30–0.40", best: "Budget replacement, mild climates" },
                    { type: "Double-Pane Low-E", cost: "$200–$500", u: "0.25–0.32", best: "Most homeowners — best value" },
                    { type: "Double-Pane Low-E + Argon", cost: "$280–$600", u: "0.20–0.28", best: "IRA credit eligible, mixed climates" },
                    { type: "Triple-Pane Low-E", cost: "$400–$800", u: "0.15–0.22", best: "Cold climates, maximum efficiency" },
                    { type: "Impact-Resistant", cost: "$500–$1,200", u: "Varies", best: "Hurricane zones, security upgrade" },
                  ].map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 font-medium text-gray-800">{row.type}</td>
                      <td className="p-4 text-gray-600">{row.cost}</td>
                      <td className="p-4 text-gray-600">{row.u}</td>
                      <td className="p-4 text-gray-600">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              * Prices are per-window installed estimates for {cityData.name}, {cityData.state}. Whole-home projects are typically priced lower per window.
            </p>
          </div>
        </section>

        {/* What to Look For */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Choose a Window Contractor in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: "Verify U-Factor & SHGC", desc: `For ${cityData.name}'s climate, look for U-factor ${w.uFactor}. Ask for the NFRC label on every window quoted.` },
                { title: "ENERGY STAR Certification", desc: "ENERGY STAR and NFRC documentation still matter for utility or state rebate programs. Confirm current eligibility before purchasing." },
                { title: "Installation Quality Matters", desc: "Even the best window leaks if poorly installed. Ask about flashing, vapor barriers, and the specific installation technique used." },
                { title: "Get 3+ Quotes", desc: `Window replacement quotes in ${cityData.name} vary 25–50% for the same product. Always compare at least 3 bids.` },
                { title: "Workmanship Warranty", desc: "Quality installers offer 2–10 year installation warranties in addition to the manufacturer's product warranty." },
                { title: "Check Local References", desc: `Ask for 2–3 ${cityData.name}-area references from jobs completed in the past 12 months and contact them directly.` },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-5 bg-white border border-gray-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions: Window Replacement in {cityData.name}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="border border-gray-200 rounded-xl group">
                  <summary className="p-5 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
                    {faq.q}
                    <span className="text-purple-600 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 bg-purple-700 text-white text-center">
          <div className="max-w-xl mx-auto">
            <AppWindow className="w-10 h-10 text-purple-200 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">
              Get Free Window Quotes in {cityData.name}
            </h2>
            <p className="text-purple-200 text-sm mb-6">
              Request quote options from local {cityData.name} window companies. 100% free to request.
            </p>
            <ZipCodeForm category="windows" className="[&_input]:bg-white [&_input]:text-gray-900" />
          </div>
        </section>
      </>
    )
  }

  // --- STATE PAGE ---
  const winState = getWindowsStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (!winState || !base) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-sm text-purple-700">
            <MapPin className="w-4 h-4" />
            <Link href="/windows" className="hover:underline">Windows</Link>
            <span>/</span>
            <span>{base.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Window Replacement Cost in {base.name}:<br />
            <span className="text-purple-600">Types, Rebates & Free Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            Average window replacement in {base.name}: <strong>{winState.avgCost}</strong>. Recommended type: <strong>{winState.recommendedType}</strong>. Annual savings estimate: <strong>{winState.avgAnnualSavings}</strong>.
          </p>
          <ZipCodeForm category="windows" />
          <div className="mt-4 max-w-xl">
            <AngiCTA category="windows" locationName={base.name} />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-purple-700 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: winState.avgCost, l: "Avg. Cost Per Window" },
            { v: winState.avgAnnualSavings, l: "Annual Energy Savings" },
            { v: winState.uFactor, l: "Target U-Factor" },
            { v: winState.payback, l: "Typical Payback" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-lg md:text-2xl font-extrabold">{s.v}</p>
              <p className="text-purple-200 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Window for State */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Windows for {base.name}</h2>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <div className="flex gap-3 items-start">
              <AppWindow className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1">Recommended: {winState.recommendedType}</p>
                <p className="text-gray-600 text-sm">{winState.climateNote}</p>
              </div>
            </div>
          </div>

          {/* Window Types Table */}
          <div className="overflow-x-auto mt-8">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Window Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Cost Per Window</th>
                  <th className="text-left p-3 font-semibold text-gray-700">U-Factor</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { type: "Double-Pane Standard", cost: "$150–$350", u: "0.30–0.40", best: "Budget replacement" },
                  { type: "Double-Pane Low-E", cost: "$200–$500", u: "0.25–0.32", best: "Best value overall" },
                  { type: "Double-Pane Low-E + Argon", cost: "$280–$600", u: "0.20–0.28", best: "Mixed climates" },
                  { type: "Triple-Pane Low-E", cost: "$400–$800", u: "0.15–0.22", best: "Cold climates" },
                  { type: "Impact-Resistant", cost: "$500–$1,200", u: "Varies", best: "Hurricane/storm zones" },
                ].map((row) => (
                  <tr key={row.type} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{row.type}</td>
                    <td className="p-3 text-gray-600">{row.cost}</td>
                    <td className="p-3 text-gray-600">{row.u}</td>
                    <td className="p-3 text-gray-500">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Incentives */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{base.name} Window Rebates & Tax Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {winState.incentives.map((incentive) => (
              <div key={incentive} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="font-medium text-gray-900 text-sm">{incentive}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Programs change often. Ask each window contractor to confirm current rebate and tax credit rules before you purchase.
          </p>
        </div>
      </section>

      {/* Top Cities */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Window Replacement Quotes by City in {base.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {base.topCities.map((city) => (
              <div key={city} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-sm font-medium text-gray-700 hover:border-purple-500 transition-colors">
                <MapPin className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Window Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: "Window Tax Credit 2025", href: "/blog/window-tax-credit-2025" },
              { title: "Andersen vs Pella Windows", href: "/blog/andersen-vs-pella-windows" },
              { title: "Home Weatherization Guide", href: "/blog/home-weatherization-guide" },
              { title: "Energy Saving Tips", href: "/blog/energy-saving-tips-home" },
              { title: "IRA Home Energy Tax Credits", href: "/blog/ira-home-energy-tax-credits" },
              { title: "How to Lower Electric Bill", href: "/blog/how-to-lower-electric-bill" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-colors text-sm font-medium text-gray-700">
                <ArrowRight className="w-4 h-4 text-purple-500 shrink-0" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-purple-700 text-white text-center">
        <div className="max-w-xl mx-auto">
          <AppWindow className="w-10 h-10 text-purple-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free Window Quotes in {base.name}</h2>
          <p className="text-purple-200 text-sm mb-6">Request quote options from local {base.name} window companies. 100% free to request.</p>
          <ZipCodeForm category="windows" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
