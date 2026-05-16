import Link from "next/link"
import { Sun, Wind, Home, AppWindow, Shield, Star, CheckCircle, ArrowRight, Calculator, TrendingDown, Award, Users } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/config"

export const metadata: Metadata = {
  title: "Cut Your Energy Bills — Free Quotes from Local Pros | CleverHomeEnergy",
  description:
    "Get free solar, HVAC, roofing, and window quotes from vetted local contractors. Already helped 47,000+ homeowners cut energy bills. 100% free, no obligation.",
  alternates: { canonical: SITE_URL },
}

const services = [
  {
    icon: Sun,
    title: "Solar",
    tag: "Save $1,400/yr",
    tagColor: "bg-yellow-100 text-yellow-800",
    borderColor: "border-yellow-300",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    href: "/quotes/solar",
    desc: "Federal 30% tax credit still available",
  },
  {
    icon: Home,
    title: "Roofing",
    tag: "Free estimates",
    tagColor: "bg-red-100 text-red-800",
    borderColor: "border-red-300",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    href: "/quotes/roofing",
    desc: "Energy-efficient materials, local pros",
  },
  {
    icon: AppWindow,
    title: "Windows",
    tag: "Up to 25% savings",
    tagColor: "bg-purple-100 text-purple-800",
    borderColor: "border-purple-300",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    href: "/quotes/windows",
    desc: "ENERGY STAR certified replacements",
  },
  {
    icon: Wind,
    title: "HVAC",
    tag: "Free quotes",
    tagColor: "bg-blue-100 text-blue-800",
    borderColor: "border-blue-300",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    href: "/quotes/hvac",
    desc: "High-efficiency systems, fast install",
  },
]

const trustLogos = [
  { name: "BBB", rating: "A+ Rated" },
  { name: "HomeAdvisor", rating: "Elite Service" },
  { name: "Modernize", rating: "Verified Partner" },
  { name: "Google", rating: "4.9 ★ (2,400 reviews)" },
]

const reviews = [
  {
    name: "Lisa M.",
    location: "Phoenix, AZ",
    quote: "Got 3 solar quotes in 24 hours. Saved $28,000 vs what I was first quoted!",
    stars: 5,
    service: "Solar",
    savings: "$1,600/yr",
  },
  {
    name: "David R.",
    location: "Austin, TX",
    quote: "New HVAC through CleverHomeEnergy — easy process, no pressure. Electric bill down 40%.",
    stars: 5,
    service: "HVAC",
    savings: "$520/yr",
  },
  {
    name: "Sarah K.",
    location: "Denver, CO",
    quote: "Found a great roofing company fast. Free service saved me hours of research and I got a fair price.",
    stars: 5,
    service: "Roofing",
    savings: "Boosted home value",
  },
]

const latestGuides = [
  {
    slug: "how-solar-panels-work",
    category: "Solar",
    categoryColor: "bg-yellow-50 text-yellow-700",
    title: "How Solar Panels Work: A Homeowner's Complete Guide",
    excerpt: "Everything you need to know before getting solar quotes — from panel types to ROI.",
    readTime: "8 min read",
  },
  {
    slug: "signs-you-need-new-roof",
    category: "Roofing",
    categoryColor: "bg-red-50 text-red-700",
    title: "9 Signs You Need a New Roof (And What It Will Cost)",
    excerpt: "Don't wait for a leak. These warning signs tell you it's time to get estimates.",
    readTime: "6 min read",
  },
  {
    slug: "hvac-maintenance-checklist",
    category: "HVAC",
    categoryColor: "bg-blue-50 text-blue-700",
    title: "Annual HVAC Maintenance Checklist: Save $300+ This Year",
    excerpt: "Simple steps homeowners can do themselves, plus what to leave to the pros.",
    readTime: "5 min read",
  },
]

const stats = [
  { value: "47,000+", label: "Homeowners Helped", icon: Users },
  { value: "$1,200", label: "Avg. Annual Savings", icon: TrendingDown },
  { value: "500+", label: "Vetted Contractors", icon: Award },
  { value: "100%", label: "Free Service", icon: Shield },
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            🔥 Federal Rebates Available — Limited 2025 Window
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Cut Your Energy Bills —<br />
            <span className="text-yellow-300">Get Free Quotes from Local Pros</span>
          </h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Enter your ZIP code. Get matched with vetted local contractors in 60 seconds. No spam, no obligation.
          </p>
          <div className="flex justify-center mb-6">
            <ZipCodeForm />
          </div>
          <p className="text-green-200 text-sm">
            ✓ Already helped <strong className="text-white">47,000+</strong> homeowners save on energy costs
          </p>
        </div>
      </section>

      {/* ─── SERVICE CARDS ─── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-widest mb-6">
            Choose Your Upgrade
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`group border-2 ${s.borderColor} rounded-2xl p-5 bg-white hover:shadow-lg transition-all flex flex-col items-center text-center gap-3`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.iconBg}`}>
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">{s.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-tight">{s.desc}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.tagColor}`}>
                  {s.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SAVINGS CALCULATOR TEASER ─── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Free Tool
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How Much Could You Save This Year?
          </h2>
          <p className="text-gray-500 mb-8">
            Enter your monthly electric bill and ZIP code. Our calculator instantly estimates your solar savings and payback period.
          </p>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Electric Bill</label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Under $100</option>
                  <option selected>$100 – $200</option>
                  <option>$200 – $300</option>
                  <option>Over $300</option>
                </select>
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Home Type</label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Single Family</option>
                  <option>Townhouse</option>
                  <option>Condo</option>
                </select>
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your State</label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>California</option>
                  <option>Texas</option>
                  <option>Florida</option>
                  <option>Arizona</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <Link
              href="/calculator"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculate My Savings
            </Link>
            <p className="text-xs text-gray-400 mt-3">
              Avg. homeowner saves <strong>$1,200–$1,800/year</strong> after solar installation
            </p>
          </div>
        </div>
      </section>

      {/* ─── TRUST STATS ─── */}
      <section className="py-12 px-4 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUST LOGOS ─── */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Trusted Partners &amp; Certifications
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {trustLogos.map((l) => (
              <div key={l.name} className="flex flex-col items-center gap-1">
                <div className="h-10 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-xs">
                  <span className="font-bold text-gray-700 text-sm">{l.name}</span>
                </div>
                <span className="text-xs text-gray-400">{l.rating}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1">
              <div className="h-10 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-xs">
                <Shield className="w-4 h-4 text-green-600 mr-1.5" />
                <span className="font-bold text-gray-700 text-sm">TCPA Compliant</span>
              </div>
              <span className="text-xs text-gray-400">Privacy Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            What Homeowners Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.location}</p>
                  </div>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                    {r.savings}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST GUIDES ─── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Latest Homeowner Guides</h2>
              <p className="text-gray-500 text-sm mt-1">Unbiased advice to help you make the smartest upgrade decisions</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm text-green-700 font-medium hover:underline">
              View all guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/blog/${g.slug}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
              >
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${g.categoryColor}`}>
                  {g.category}
                </span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2 text-sm leading-snug group-hover:text-green-700 transition-colors">
                  {g.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{g.excerpt}</p>
                <p className="text-xs text-gray-400">{g.readTime}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/blog" className="text-sm text-green-700 font-medium hover:underline">
              View all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Your ZIP Code",
                desc: "We instantly match you with licensed, vetted contractors in your area.",
              },
              {
                step: "2",
                title: "Answer a Few Questions",
                desc: "Tell us about your home and needs in under 2 minutes.",
              },
              {
                step: "3",
                title: "Get Free Competing Quotes",
                desc: "Receive up to 3 quotes from local pros. Compare, choose, save.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white font-extrabold text-xl flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 px-4 bg-green-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Save? Get Your Free Home Energy Assessment
          </h2>
          <p className="text-green-100 mb-8 text-sm">
            100% free · No obligation · Trusted by 47,000+ homeowners across all 50 states
          </p>
          <div className="flex justify-center mb-4">
            <ZipCodeForm className="[&_input]:bg-white [&_input]:text-gray-900" />
          </div>
          <div className="flex justify-center gap-4 text-xs text-green-200">
            {["No spam", "No hidden fees", "TCPA compliant"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
