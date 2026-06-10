import { notFound } from "next/navigation"
import Link from "next/link"
import { Layers, CheckCircle, MapPin, AlertTriangle, ArrowRight } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import { getCityBySlug, CITY_SLUGS } from "@/lib/cities"
import { getInsulationData } from "@/lib/city-services"
import { getInsulationStateBySlug, INSULATION_STATE_SLUGS } from "@/lib/states-insulation"
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
    ...INSULATION_STATE_SLUGS.map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cityData = getCityBySlug(slug)
  if (cityData) {
    const ins = getInsulationData(cityData)
    const isMinneapolis = slug === "minneapolis-mn"
    return {
      title: isMinneapolis
        ? "Attic Insulation Minneapolis, MN: Cost, R-60 & Local Quotes"
        : `Home Insulation in ${cityData.name}, ${cityData.stateAbbr}: Cost, R-Values & Free Quotes`,
      description: isMinneapolis
        ? "Compare Minneapolis attic insulation cost, R-49 to R-60 targets, ice dam prevention, air sealing, rebates, and free local contractor quotes."
        : `Attic insulation in ${cityData.name} costs ${ins.avgAtticCost}. Recommended R-value: ${ins.recommendedRValue}. Request free quotes from local insulation companies.`,
      keywords: [
        `home insulation ${cityData.name}`,
        `attic insulation ${cityData.name} ${cityData.stateAbbr}`,
        `insulation contractor ${cityData.name}`,
        `insulation cost ${cityData.name}`,
        `blow in insulation ${cityData.name} ${cityData.stateAbbr}`,
      ],
      alternates: { canonical: `${SITE_URL}/insulation/${slug}` },
    }
  }
  const ins = getInsulationStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (ins && base) {
    return {
      title: `Home Insulation Cost in ${base.name}: 2026 R-Values, Rebates & Free Quotes`,
      description: `Average attic insulation cost in ${base.name}: ${ins.avgAtticCost}. Recommended R-value: ${ins.recommendedRValue}. Compare rebates and free local contractor quotes.`,
      keywords: [
        `home insulation ${base.name}`,
        `attic insulation ${base.name}`,
        `insulation cost ${base.name}`,
        `insulation contractor ${base.name}`,
        `blown in insulation ${base.name}`,
      ],
      alternates: { canonical: `${SITE_URL}/insulation/${slug}` },
    }
  }
  return {}
}

export default async function InsulationSlugPage({ params }: Props) {
  const { slug } = await params

  // --- CITY PAGE ---
  const cityData = getCityBySlug(slug)
  if (cityData) {
    const ins = getInsulationData(cityData)
    const isMinneapolis = slug === "minneapolis-mn"

    const faqs = [
      {
        q: `How much does insulation cost in ${cityData.name}, ${cityData.stateAbbr}?`,
        a: `Attic insulation in ${cityData.name} typically costs ${ins.avgAtticCost} installed, depending on home size, current insulation level, access, and the type of insulation used. Qualifying insulation and air sealing materials may be eligible for federal, state, utility, or local incentives, but homeowners should confirm current rules before budgeting around them.`,
      },
      {
        q: `What R-value do I need for my home in ${cityData.name}?`,
        a: `For ${cityData.name}, ${cityData.stateAbbr}, the DOE recommends ${ins.recommendedRValue}. The correct R-value depends on your climate zone and whether you're insulating an attic, walls, or crawl space. A local energy auditor can give you an exact recommendation based on your home.`,
      },
      {
        q: `How much can I save on energy bills with new insulation in ${cityData.name}?`,
        a: `Many ${cityData.name} homeowners use insulation quotes to compare R-value targets, air sealing scope, material choice, and expected payback. The right project depends on the home's current insulation level and air leakage.`,
      },
      {
        q: `Are there rebates or tax credits for insulation in ${cityData.name}?`,
        a: `There may be federal, utility, state, or local incentives for qualifying insulation, air sealing, and home energy audit work. ${ins.incentives.length > 1 ? `Programs to check in ${cityData.name} include: ${ins.incentives.slice(1, 3).join("; ")}.` : ""} Ask each contractor to confirm current eligibility and provide the documentation you need before you sign.`,
      },
      {
        q: `What type of insulation is best for ${cityData.name}'s climate?`,
        a: `The best first project for ${cityData.name} homeowners is ${ins.topProject}. This addresses the most common issues in ${cityData.name}: ${ins.commonIssues[0].toLowerCase()}. Blown-in cellulose or fiberglass is the most cost-effective choice for attic applications.`,
      },
      {
        q: `How do I compare insulation contractors in ${cityData.name}?`,
        a: `Look for contractors certified by BPI (Building Performance Institute) or RESNET in ${cityData.name}. Get at least 3 quotes because prices can vary 30-50% for identical work. Ask each contractor to confirm the R-value target, air sealing scope, ventilation changes, and incentive paperwork in writing.`,
      },
      ...(isMinneapolis
        ? [
            {
              q: "Does attic insulation help prevent ice dams in Minneapolis?",
              a: "Yes, but only when it is paired with attic air sealing and proper ventilation. Ice dams usually form when warm indoor air leaks into the attic, warms the roof deck, and melts snow unevenly. Minneapolis homeowners should ask for attic bypass sealing before adding blown-in insulation to R-49 or R-60.",
            },
            {
              q: "Should Minneapolis homeowners use cellulose or fiberglass blown-in insulation?",
              a: "Both can work well in Minneapolis attics when installed to the right depth and protected from air leaks. Cellulose is dense and performs well around irregular framing; fiberglass is lighter and common for open attic spaces. The more important decision is whether the contractor air-seals penetrations and confirms the final R-value.",
            },
            {
              q: "What should be included in a Minneapolis insulation quote?",
              a: "A strong Minneapolis insulation quote should list existing R-value, final target R-value, air sealing locations, attic hatch treatment, bath fan venting, ventilation changes, material type, cleanup, warranty, and any Xcel Energy or CenterPoint Energy rebate paperwork the contractor will help prepare.",
            },
          ]
        : []),
    ]

    return (
      <>
        <CityPageJsonLd
          cityName={cityData.name}
          stateAbbr={cityData.stateAbbr}
          citySlug={slug}
          service="insulation"
          serviceLabel="Home Insulation"
          faqs={faqs}
        />
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <Link href="/insulation" className="hover:underline">Insulation</Link>
              <span>/</span>
              <span>{cityData.name}, {cityData.stateAbbr}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Home Insulation in {cityData.name}, {cityData.state}:<br />
              <span className="text-amber-600">Cost, R-Values & Free Quotes</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl">
              Attic insulation in {cityData.name}: <strong>{ins.avgAtticCost}</strong>.
              DOE recommended R-value: <strong>{ins.recommendedRValue}</strong>.
              Annual energy savings: <strong>{ins.avgAnnualSavings}</strong>.
            </p>
            <ZipCodeForm category="insulation" />
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-amber-600 py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { v: ins.avgAtticCost, l: "Avg. Attic Project Cost" },
              { v: ins.avgAnnualSavings, l: "Annual Energy Savings" },
              { v: ins.recommendedRValue.split(",")[0], l: "Recommended R-Value" },
              { v: ins.payback, l: "Typical Payback" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-sm md:text-base font-extrabold">{s.v}</p>
                <p className="text-amber-100 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {isMinneapolis && (
          <section className="py-12 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Minneapolis Insulation: Quick Cost Answer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Most common search", value: "attic insulation Minneapolis" },
                  { label: "Best first project", value: "Air sealing + blown-in attic insulation to R-60" },
                  { label: "Typical attic range", value: ins.avgAtticCost },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{item.label}</p>
                    <p className="mt-2 text-sm font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p>
                  Minneapolis homes lose a lot of heat through attic bypasses, recessed lights, plumbing chases, and poorly sealed attic hatches. For most local homes, the strongest first bid is not just more blown-in insulation. It is attic air sealing first, then bringing the attic to R-49 to R-60 so the insulation can actually perform during long Minnesota heating seasons.
                </p>
                <p>
                  Ice dams are the big local warning sign. Ask Minneapolis insulation contractors to separate air sealing, final R-value, bath fan venting, attic ventilation, attic hatch treatment, and rebate paperwork on the quote. If your utility is Xcel Energy or CenterPoint Energy, have the contractor confirm which efficiency programs are current before work starts.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Climate Note */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Insulation in {cityData.name}: What You Need to Know
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-4">
              <p className="text-gray-700 leading-relaxed">{ins.climateNote}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 text-sm">Best First Project for {cityData.name} Homeowners</p>
                <p className="text-green-700 text-sm mt-0.5">{ins.topProject}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">
              Common Insulation Issues in {cityData.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ins.commonIssues.map((issue) => (
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
              Insulation Rebates & Tax Credits in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ins.incentives.map((item) => (
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
              Insulation Cost in {cityData.name} ({new Date().getFullYear()})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-amber-600 text-white">
                  <tr>
                    <th className="text-left p-4">Project</th>
                    <th className="text-left p-4">Typical Cost</th>
                    <th className="text-left p-4">Annual Savings</th>
                    <th className="text-left p-4">Payback</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { project: "Attic blown-in (R-49)", cost: "$1,000–$2,800", savings: "$200–$450/yr", payback: "3–6 yrs" },
                    { project: "Air sealing package", cost: "$400–$1,200", savings: "$150–$350/yr", payback: "1–4 yrs" },
                    { project: "Rim joist spray foam", cost: "$400–$900", savings: "$100–$200/yr", payback: "2–5 yrs" },
                    { project: "Wall insulation (existing)", cost: "$1,500–$4,000", savings: "$150–$350/yr", payback: "5–15 yrs" },
                    { project: "Crawl space encapsulation", cost: "$3,000–$7,000", savings: "$200–$400/yr", payback: "8–20 yrs" },
                    { project: "Basement wall insulation", cost: "$1,200–$3,000", savings: "$150–$300/yr", payback: "5–12 yrs" },
                  ].map((row, i) => (
                    <tr key={row.project} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 font-medium text-gray-800">{row.project}</td>
                      <td className="p-4 text-gray-600">{row.cost}</td>
                      <td className="p-4 text-green-700 font-medium">{row.savings}</td>
                      <td className="p-4 text-gray-600">{row.payback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              * Cost estimates for {cityData.name}, {cityData.state}. Actual pricing varies by home size, access difficulty, current insulation level, air sealing scope, and current rebate eligibility.
            </p>
          </div>
        </section>

        {isMinneapolis && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Minneapolis Insulation Quote Checklist
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Use this checklist to compare insulation contractors in Minneapolis on the same scope, not just the lowest price.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Attic air sealing scope", desc: "Look for top plates, plumbing chases, recessed lights, wiring holes, attic hatches, and other bypasses named in the proposal." },
                  { title: "Final R-value and depth", desc: "The quote should show the target R-49 to R-60 level and the installed depth needed for the selected material." },
                  { title: "Ice dam prevention details", desc: "Ask how the work reduces roof deck warming and whether the contractor recommends ventilation or bath fan corrections." },
                  { title: "Utility paperwork", desc: "Have the contractor identify current Xcel Energy, CenterPoint Energy, or Minnesota weatherization documentation before work starts." },
                ].map((item) => (
                  <div key={item.title} className="rounded-lg border border-gray-200 bg-white p-5">
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How to Choose */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Choose an Insulation Contractor in {cityData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: "Start With a Home Energy Audit", desc: `A home energy auditor can identify attic bypasses, duct leakage, and insulation gaps before you request bids. Ask about current incentive eligibility before budgeting around it.` },
                { title: "Verify BPI or RESNET Certification", desc: "Look for contractors certified by BPI (Building Performance Institute) or RESNET. These certifications require demonstrated knowledge of building science." },
                { title: "Confirm Material Specs", desc: "Ask for the R-value per inch, the total target R-value, and the brand/product name in writing before work starts." },
                { title: "Get 3+ Quotes", desc: `Insulation quotes in ${cityData.name} vary 30–50% for the same scope of work. Always compare multiple bids.` },
                { title: "Air Sealing First", desc: "The best insulation contractors always air-seal before adding insulation. Air leaks can waste as much energy as poor insulation — insulating over them wastes money." },
                { title: "Ask About IRA Documentation", desc: "Your contractor should provide product certification statements needed for IRS Form 5695. Keep all invoices and manufacturer documents." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-5 bg-white border border-gray-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
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
              Frequently Asked Questions: Insulation in {cityData.name}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="border border-gray-200 rounded-xl group">
                  <summary className="p-5 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
                    {faq.q}
                    <span className="text-amber-600 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {isMinneapolis && (
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Related Insulation Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { title: "Attic Insulation Guide", href: "/blog/attic-insulation-guide" },
                  { title: "Home Insulation Cost", href: "/blog/home-insulation-cost" },
                  { title: "Blown-In Insulation Cost", href: "/blog/blown-in-insulation-cost" },
                  { title: "Insulation R-Value Guide", href: "/blog/insulation-r-value-guide" },
                  { title: "Crawl Space Insulation Cost", href: "/blog/crawl-space-insulation-cost" },
                  { title: "Home Weatherization Guide", href: "/blog/home-weatherization-guide" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 transition-colors hover:border-amber-400 hover:bg-amber-50">
                    <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-14 px-4 bg-amber-600 text-white text-center">
          <div className="max-w-xl mx-auto">
            <Layers className="w-10 h-10 text-amber-200 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">
              Get Free Insulation Quotes in {cityData.name}
            </h2>
            <p className="text-amber-100 text-sm mb-6">
              Request quote options from local {cityData.name} insulation companies. 100% free to request.
            </p>
            <ZipCodeForm category="insulation" className="[&_input]:bg-white [&_input]:text-gray-900" />
          </div>
        </section>
      </>
    )
  }

  // --- STATE PAGE ---
  const insState = getInsulationStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (!insState || !base) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-sm text-amber-700">
            <MapPin className="w-4 h-4" />
            <Link href="/insulation" className="hover:underline">Insulation</Link>
            <span>/</span>
            <span>{base.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Home Insulation Cost in {base.name}:<br />
            <span className="text-amber-600">R-Values, Rebates & Free Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            Average attic insulation cost in {base.name}: <strong>{insState.avgAtticCost}</strong>. Recommended R-value: <strong>{insState.recommendedRValue}</strong>. Annual savings potential: <strong>{insState.avgAnnualSavings}</strong>.
          </p>
          <ZipCodeForm category="insulation" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { v: insState.avgAtticCost, l: "Avg. Attic Project Cost" },
            { v: insState.avgAnnualSavings, l: "Annual Energy Savings" },
            { v: insState.recommendedRValue.split(",")[0], l: "Recommended R-Value" },
            { v: insState.payback, l: "Typical Payback" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-lg md:text-2xl font-extrabold">{s.v}</p>
              <p className="text-amber-100 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Climate Note */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Insulation Approach for {base.name}</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
            <div className="flex gap-3 items-start">
              <Layers className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1">Recommended: {insState.topProject}</p>
                <p className="text-gray-600 text-sm">{insState.climateNote}</p>
              </div>
            </div>
          </div>

          {/* Cost Table */}
          <div className="overflow-x-auto mt-8">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Project Type</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Typical Cost</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Annual Savings</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Payback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { project: "Attic blown-in (R-49)", cost: "$1,000–$2,800", savings: "$200–$450/yr", payback: "3–6 yrs" },
                  { project: "Air sealing package", cost: "$400–$1,200", savings: "$150–$350/yr", payback: "1–4 yrs" },
                  { project: "Rim joist spray foam", cost: "$400–$900", savings: "$100–$200/yr", payback: "2–5 yrs" },
                  { project: "Wall insulation (existing)", cost: "$1,500–$4,000", savings: "$150–$350/yr", payback: "5–15 yrs" },
                  { project: "Crawl space encapsulation", cost: "$3,000–$7,000", savings: "$200–$400/yr", payback: "8–20 yrs" },
                ].map((row) => (
                  <tr key={row.project} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{row.project}</td>
                    <td className="p-3 text-gray-600">{row.cost}</td>
                    <td className="p-3 text-green-700 font-medium">{row.savings}</td>
                    <td className="p-3 text-gray-600">{row.payback}</td>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{base.name} Insulation Rebates & Tax Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insState.incentives.map((incentive) => (
              <div key={incentive} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="font-medium text-gray-900 text-sm">{incentive}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Programs change often. Ask each insulation contractor to confirm current rebate and tax credit rules before you sign.
          </p>
        </div>
      </section>

      {/* Top Cities */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Insulation Quotes by City in {base.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {base.topCities.map((city) => (
              <div key={city} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-sm font-medium text-gray-700 hover:border-amber-500 transition-colors">
                <MapPin className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Insulation Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: "Home Insulation Cost Guide", href: "/blog/home-insulation-cost" },
              { title: "Attic Insulation Guide", href: "/blog/attic-insulation-guide" },
              { title: "Blown-In Insulation Cost", href: "/blog/blown-in-insulation-cost" },
              { title: "Insulation R-Value Guide", href: "/blog/insulation-r-value-guide" },
              { title: "Crawl Space Insulation Cost", href: "/blog/crawl-space-insulation-cost" },
              { title: "Home Weatherization Guide", href: "/blog/home-weatherization-guide" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-colors text-sm font-medium text-gray-700">
                <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-amber-600 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Layers className="w-10 h-10 text-amber-200 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free Insulation Quotes in {base.name}</h2>
          <p className="text-amber-100 text-sm mb-6">Request quote options from local {base.name} insulation companies. 100% free to request.</p>
          <ZipCodeForm category="insulation" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
