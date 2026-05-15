import Link from "next/link"
import { Sun, Wind, Home, AppWindow, Shield, Star, CheckCircle, ArrowRight } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

const services = [
  {
    icon: Sun,
    title: "Solar Panels",
    description: "Cut your electric bill by up to 90%. Federal tax credits available.",
    href: "/quotes/solar",
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    savings: "Save $1,500+/yr",
  },
  {
    icon: Wind,
    title: "HVAC Systems",
    description: "New energy-efficient heating & cooling systems with rebates.",
    href: "/quotes/hvac",
    color: "bg-blue-50 text-blue-600 border-blue-200",
    savings: "Save $400+/yr",
  },
  {
    icon: Home,
    title: "Roofing",
    description: "Durable, energy-efficient roofing that lowers cooling costs.",
    href: "/quotes/roofing",
    color: "bg-red-50 text-red-600 border-red-200",
    savings: "Boost home value 5%",
  },
  {
    icon: AppWindow,
    title: "Windows & Doors",
    description: "Eliminate drafts with double-pane, ENERGY STAR certified windows.",
    href: "/quotes/windows",
    color: "bg-green-50 text-green-600 border-green-200",
    savings: "Save $300+/yr",
  },
]

const trustStats = [
  { value: "50,000+", label: "Homeowners Helped" },
  { value: "$1,200", label: "Avg. Annual Savings" },
  { value: "500+", label: "Vetted Contractors" },
  { value: "100%", label: "Free Service" },
]

const latestNews = [
  {
    slug: "ira-solar-tax-credit-2025",
    category: "Policy Update",
    title: "IRA Solar Tax Credit Extended: How to Claim Your 30% in 2025",
    date: "May 12, 2025",
  },
  {
    slug: "hvac-rebates-by-state",
    category: "Rebates",
    title: "State-by-State HVAC Rebates: Which Programs Are Still Open?",
    date: "May 8, 2025",
  },
  {
    slug: "energy-efficient-windows-cost-2025",
    category: "Market Update",
    title: "Energy-Efficient Window Costs in 2025: What Homeowners Are Paying",
    date: "May 3, 2025",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Federal Rebates Available in 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
            Upgrade Your Home,<br />
            <span className="text-green-600">Lower Your Bills</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Compare free quotes from local solar, HVAC, roofing, and window contractors.
            No spam. No obligation. Results in 60 seconds.
          </p>
          <div className="flex justify-center">
            <ZipCodeForm />
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-green-700 text-white py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm font-medium">
          {["100% Free Service", "No Obligation Quotes", "Trusted by 50,000+ Homeowners", "Secure & Private"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-300" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustStats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-extrabold text-green-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">What Do You Want to Upgrade?</h2>
            <p className="text-gray-500 mt-2">Select a category to get free local quotes instantly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`group border-2 rounded-2xl p-6 bg-white hover:shadow-lg transition-all flex flex-col gap-4 ${s.color.split(" ")[2]}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color.split(" ").slice(0, 2).join(" ")}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{s.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {s.savings}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Enter Your ZIP Code", desc: "We match you with licensed contractors in your area." },
              { step: "2", title: "Answer a Few Questions", desc: "Tell us about your home in under 2 minutes." },
              { step: "3", title: "Get Free Quotes", desc: "Receive up to 3 competing quotes. No pressure, no fees." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white font-extrabold text-xl flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Industry News</h2>
            <Link href="/news" className="text-sm text-green-700 font-medium hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestNews.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
              >
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2 text-sm leading-snug group-hover:text-green-700">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400">{item.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What Homeowners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Lisa M.", location: "Phoenix, AZ", quote: "I got 3 solar quotes in 24 hours. Saved $28,000 vs what I was first quoted!", stars: 5 },
              { name: "David R.", location: "Austin, TX", quote: "New HVAC through HomeEnergyHub — easy process, no pressure. Electric bill down 40%.", stars: 5 },
              { name: "Sarah K.", location: "Denver, CO", quote: "Found a great roofing company. The free service saved me hours of research.", stars: 5 },
            ].map((r) => (
              <div key={r.name} className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic mb-4">&ldquo;{r.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-green-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Shield className="w-12 h-12 mx-auto mb-4 text-green-300" />
          <h2 className="text-3xl font-bold mb-3">Ready to Start Saving?</h2>
          <p className="text-green-100 mb-8">Enter your ZIP code and get matched with top local contractors for free.</p>
          <div className="flex justify-center">
            <ZipCodeForm className="[&_input]:bg-white [&_input]:text-gray-900" />
          </div>
        </div>
      </section>
    </>
  )
}
