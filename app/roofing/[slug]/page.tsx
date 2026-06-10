import { notFound } from "next/navigation"
import Link from "next/link"
import { Home, CheckCircle, MapPin, AlertTriangle, ArrowRight, DollarSign, Shield } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import { getCityBySlug, CITY_SLUGS } from "@/lib/cities"
import { getRoofingStateBySlug, ROOFING_STATE_SLUGS } from "@/lib/states-roofing"
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
    ...ROOFING_STATE_SLUGS.map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cityData = getCityBySlug(slug)
  if (cityData) {
    return {
      title: `Roofing Contractors in ${cityData.name}, ${cityData.stateAbbr} (2025): Cost, Materials & Free Quotes`,
      description: `Average roof replacement cost in ${cityData.name}: ${cityData.roofing.avgCost}. Compare local roofing contractors. ${cityData.roofing.topMaterial} recommended for ${cityData.name}'s climate.`,
      keywords: [`roofing contractors ${cityData.name}`, `roof replacement ${cityData.name} ${cityData.stateAbbr}`, `roofing cost ${cityData.name}`, `roof repair ${cityData.name}`],
      alternates: { canonical: `${SITE_URL}/roofing/${slug}` },
    }
  }
  const roofing = getRoofingStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (roofing && base) {
    return {
      title: `Roof Replacement Cost in ${base.name} (2025): Prices by Material & Free Quotes`,
      description: `Average roof replacement cost in ${base.name}: ${roofing.avgCost}. Compare roofing materials, get local contractor quotes, and learn about ${base.name} roofing rebates.`,
      keywords: [`roof replacement cost ${base.name}`, `roofing cost ${base.name}`, `roof replacement ${base.name}`, `roofing contractor ${base.name}`],
      alternates: { canonical: `${SITE_URL}/roofing/${slug}` },
    }
  }
  return {}
}

export default async function RoofingSlugPage({ params }: Props) {
  const { slug } = await params

  // --- CITY PAGE ---
  const cityData = getCityBySlug(slug)
  if (cityData) {
    const r = cityData.roofing
    const faqs = [
      { q: `How much does a roof replacement cost in ${cityData.name}, ${cityData.stateAbbr}?`, a: `The average roof replacement in ${cityData.name} costs ${r.avgCost} for a standard home using ${r.topMaterial}. Price varies by roof size, pitch, material choice, and contractor.` },
      { q: `What is the best roofing material for ${cityData.name}?`, a: `${r.topMaterial} is the recommended roofing material for ${cityData.name}'s climate, offering a lifespan of ${r.avgLifespan}. ${r.climateNote.split(".")[0]}.` },
      { q: `How long does a roof last in ${cityData.name}, ${cityData.stateAbbr}?`, a: `With ${r.topMaterial}, you can expect a lifespan of ${r.avgLifespan} in ${cityData.name}'s climate. ${r.commonIssues[0]} can shorten roof life if not addressed.` },
      { q: `Are there roofing rebates or incentives in ${cityData.name}?`, a: `Roofing rebates are limited, but some options in ${cityData.name} include: ${r.incentives.slice(0, 2).join("; ")}.` },
      { q: `How do I know if I need a roof repair or full replacement in ${cityData.name}?`, a: `If your roof is under 15 years old with isolated damage affecting less than 30% of the surface, repair is usually better. If it's over 20 years old or has widespread damage — replace it.` },
      { q: `How do I find a licensed roofer in ${cityData.name}?`, a: `Verify ${cityData.stateAbbr} contractor license and both general liability and workers' compensation insurance. Get 3 written bids comparing the same material specs, and ask about manufacturer warranty enrollment.` },
    ]
    return (
      <>
        <CityPageJsonLd cityName={cityData.name} stateAbbr={cityData.stateAbbr} citySlug={slug} service="roofing" serviceLabel="Roofing Contractors" faqs={faqs} />
        <section className="bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <Link href="/roofing" className="hover:underline">Roofing</Link>
              <span>/</span>
              <span>{cityData.name}, {cityData.stateAbbr}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Roofing Contractors in {cityData.name}, {cityData.state}:<br />
              <span className="text-slate-600">Cost, Materials & Free Quotes</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl">
              Average roof replacement in {cityData.name}: <strong>{r.avgCost}</strong>. Best material for this climate: <strong>{r.topMaterial}</strong>. Expected lifespan: <strong>{r.avgLifespan}</strong>.
            </p>
            <ZipCodeForm category="roofing" />
          </div>
        </section>
        <section className="bg-slate-700 py-8 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 text-center text-white">
            {[{ v: r.avgCost, l: "Avg. Replacement Cost" }, { v: r.avgLifespan, l: "Expected Lifespan" }, { v: r.topMaterial, l: "Recommended Material" }].map((s) => (
              <div key={s.l}><p className="text-base md:text-xl font-extrabold">{s.v}</p><p className="text-slate-300 text-xs mt-1">{s.l}</p></div>
            ))}
          </div>
        </section>
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Roofing in {cityData.name}: What You Need to Know</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">{r.climateNote}</p>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">Common Roofing Issues in {cityData.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {r.commonIssues.map((issue) => (
                <div key={issue} className="flex gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-gray-800">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Roofing Incentives & Rebates in {cityData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {r.incentives.map((incentive) => (
                <div key={incentive} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-gray-800">{incentive}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Roof Replacement Cost in {cityData.name} ({new Date().getFullYear()})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-700 text-white">
                  <tr>
                    <th className="text-left p-4">Roof Type</th>
                    <th className="text-left p-4">Typical Cost Range</th>
                    <th className="text-left p-4">Lifespan</th>
                    <th className="text-left p-4">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "3-Tab Asphalt", cost: "$5,500–$9,000", life: "15–20 yrs", best: "Budget-conscious homeowners" },
                    { type: "Architectural Asphalt", cost: "$7,000–$13,000", life: "25–30 yrs", best: "Best value — most popular choice" },
                    { type: "Class 4 Impact Asphalt", cost: "$9,000–$16,000", life: "25–30 yrs", best: "Hail-prone areas, insurance savings" },
                    { type: "Metal (Steel/Aluminum)", cost: "$12,000–$24,000", life: "40–70 yrs", best: "Long-term value, extreme weather" },
                    { type: "Clay/Concrete Tile", cost: "$15,000–$30,000", life: "40–50 yrs", best: "Southwest / Mediterranean style" },
                    { type: "Slate", cost: "$20,000–$45,000", life: "75–150 yrs", best: "Premium homes, historic restoration" },
                  ].map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-4 font-medium text-gray-800">{row.type}</td>
                      <td className="p-4 text-gray-600">{row.cost}</td>
                      <td className="p-4 text-gray-600">{row.life}</td>
                      <td className="p-4 text-gray-600">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions: Roofing in {cityData.name}</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="border border-gray-200 rounded-xl group">
                  <summary className="p-5 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center gap-4">
                    {faq.q}
                    <span className="text-slate-600 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="py-14 px-4 bg-slate-800 text-white text-center">
          <div className="max-w-xl mx-auto">
            <Home className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-2">Get Free Roofing Quotes in {cityData.name}</h2>
            <p className="text-slate-300 text-sm mb-6">Compare quotes from vetted local {cityData.name} roofing contractors. 100% free, no obligation.</p>
            <ZipCodeForm category="roofing" className="[&_input]:bg-white [&_input]:text-gray-900" />
          </div>
        </section>
      </>
    )
  }

  // --- STATE PAGE ---
  const roofing = getRoofingStateBySlug(slug)
  const base = getStateBySlug(slug)
  if (!roofing || !base) notFound()

  return (
    <>
      <section className="bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3 text-sm text-slate-700">
            <MapPin className="w-4 h-4" />
            <Link href="/roofing" className="hover:underline">Roofing</Link>
            <span>/</span>
            <span>{base.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Roof Replacement Cost in {base.name}:<br />
            <span className="text-slate-700">Prices, Materials & Free Quotes</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            Average roof replacement cost in {base.name}: <strong>{roofing.avgCost}</strong>. Most {base.name} roofs last <strong>{roofing.avgLifespan}</strong> with proper installation and maintenance.
          </p>
          <ZipCodeForm category="roofing" />
        </div>
      </section>

      <section className="bg-slate-700 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[{ v: roofing.avgCost, l: "Avg. Replacement Cost" }, { v: roofing.avgLifespan, l: "Expected Lifespan" }, { v: roofing.topMaterial.split("/")[0].trim(), l: "Top Material Choice" }, { v: "3–5 Days", l: "Typical Install Time" }].map((s) => (
            <div key={s.l}><p className="text-lg md:text-2xl font-extrabold">{s.v}</p><p className="text-slate-300 text-xs mt-1">{s.l}</p></div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Roofing Materials for {base.name}</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
            <div className="flex gap-3 items-start">
              <Shield className="w-6 h-6 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1">Recommended: {roofing.topMaterial}</p>
                <p className="text-gray-600 text-sm">{roofing.climateNote}</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Material</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Cost per Sq. Ft.</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Lifespan</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { mat: "3-Tab Asphalt", cost: "$1.50–$3.00", life: "15–20 yrs", best: "Budget replacement" },
                  { mat: "Architectural Asphalt", cost: "$2.50–$4.50", life: "20–30 yrs", best: "Best value overall" },
                  { mat: "Class 4 Impact Asphalt", cost: "$3.50–$5.50", life: "25–30 yrs", best: "Hail/storm regions" },
                  { mat: "Metal (Standing Seam)", cost: "$8–$14", life: "40–70 yrs", best: "Snow/rain/longevity" },
                  { mat: "Concrete/Clay Tile", cost: "$9–$18", life: "40–60 yrs", best: "Hot/dry climates" },
                  { mat: "Natural Slate", cost: "$15–$30", life: "75–150 yrs", best: "Historic homes, premium" },
                ].map((row) => (
                  <tr key={row.mat} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{row.mat}</td>
                    <td className="p-3 text-gray-600">{row.cost}</td>
                    <td className="p-3 text-gray-600">{row.life}</td>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{base.name} Roofing Incentives & Savings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roofing.incentives.map((incentive) => (
              <div key={incentive} className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="font-medium text-gray-900 text-sm">{incentive}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Roofing Quotes by City in {base.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {base.topCities.map((city) => (
              <div key={city} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-sm font-medium text-gray-700 hover:border-slate-500 transition-colors">
                <MapPin className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Roofing Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { title: "Roof Replacement Cost Guide", href: "/blog/roof-replacement-cost" },
              { title: "Metal vs Asphalt Shingles", href: "/blog/metal-roof-vs-asphalt-shingles" },
              { title: "Signs You Need a New Roof", href: "/blog/signs-you-need-new-roof" },
              { title: "Best Roofing Brands 2025", href: "/blog/best-roofing-brands" },
              { title: "Roof Repair vs Replacement", href: "/blog/roof-repair-vs-replacement" },
              { title: "How to Choose a Roofer", href: "/blog/how-to-choose-roofing-contractor" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-slate-400 hover:bg-slate-50 transition-colors text-sm font-medium text-gray-700">
                <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-slate-700 text-white text-center">
        <div className="max-w-xl mx-auto">
          <Home className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Get Free Roofing Quotes in {base.name}</h2>
          <p className="text-slate-300 text-sm mb-6">Compare quotes from licensed {base.name} roofing contractors. 100% free, no obligation.</p>
          <ZipCodeForm category="roofing" className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </section>
    </>
  )
}
