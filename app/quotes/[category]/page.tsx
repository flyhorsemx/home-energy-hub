import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import MultiStepQuoteForm from "@/components/lead-gen/MultiStepQuoteForm"
import { Sun, Wind, Home, AppWindow, CheckCircle, Shield, Star, Lock, Users } from "lucide-react"

const categoryConfig: Record<string, {
  title: string
  headline: string
  subheadline: string
  icon: React.ElementType
  accentColor: string
  bgColor: string
  benefits: string[]
  savings: string
  avgSavings: string
  caseStudy: { name: string; location: string; savings: string; quote: string }
}> = {
  solar: {
    title: "Get Free Solar Quotes",
    headline: "Find Out If Solar Is Worth It in Your Area",
    subheadline: "Get up to 3 free quotes from vetted local solar installers. See exactly what you'll save.",
    icon: Sun,
    accentColor: "text-yellow-600",
    bgColor: "bg-yellow-600",
    benefits: [
      "30% Federal Tax Credit — still available in 2025",
      "Average ROI in 6–8 years, then free electricity",
      "Increase your home value by 4–6%",
      "Lock in electricity rates for 25+ years",
    ],
    savings: "$1,400+/yr",
    avgSavings: "Save $1,400+/year",
    caseStudy: {
      name: "Mike T.",
      location: "San Diego, CA",
      savings: "$1,820/yr saved",
      quote: "The process was so easy. Got 3 quotes in one day and saved $28,000 over what I was first quoted.",
    },
  },
  hvac: {
    title: "Get Free HVAC Quotes",
    headline: "Replace Your HVAC & Slash Energy Bills",
    subheadline: "Get free quotes from licensed HVAC contractors. New systems are up to 50% more efficient.",
    icon: Wind,
    accentColor: "text-blue-600",
    bgColor: "bg-blue-600",
    benefits: [
      "Energy Star rebates up to $2,000 available",
      "New high-efficiency units cut bills 20–40%",
      "Improved air quality and home comfort",
      "Up to $600 tax credit for qualifying systems",
    ],
    savings: "$400+/yr",
    avgSavings: "Save $400+/year",
    caseStudy: {
      name: "Angela R.",
      location: "Austin, TX",
      savings: "$560/yr saved",
      quote: "My electric bill dropped 40% the first month. The contractor was professional and done in one day.",
    },
  },
  roofing: {
    title: "Get Free Roofing Quotes",
    headline: "Get a New Roof That Saves You Money",
    subheadline: "Compare local roofing contractors on price, materials, and warranty. Most homeowners save $3,000–$8,000 by comparing bids.",
    icon: Home,
    accentColor: "text-red-600",
    bgColor: "bg-red-600",
    benefits: [
      "Energy-efficient materials reduce cooling costs 15%",
      "Boost home resale value by 5–8%",
      "Insurance discount potential after replacement",
      "Compare up to 3 bids to get the best price",
    ],
    savings: "5%+ home value",
    avgSavings: "Boost home value 5%+",
    caseStudy: {
      name: "James K.",
      location: "Nashville, TN",
      savings: "$4,200 saved vs. first quote",
      quote: "Got three quotes and saved over $4,000. The whole process took less than a week.",
    },
  },
  windows: {
    title: "Get Free Window Quotes",
    headline: "Stop Energy Loss With New Windows",
    subheadline: "Energy-efficient windows cut heating and cooling costs by up to 25%. Get local quotes free.",
    icon: AppWindow,
    accentColor: "text-purple-600",
    bgColor: "bg-purple-600",
    benefits: [
      "$600 tax credit for ENERGY STAR certified windows",
      "Cut drafts and cut energy bills up to 25%",
      "Reduce outside noise by 40–50%",
      "Protect furniture from UV damage",
    ],
    savings: "$300+/yr",
    avgSavings: "Save $300+/year",
    caseStudy: {
      name: "Sarah L.",
      location: "Chicago, IL",
      savings: "$340/yr saved",
      quote: "My house is so much warmer this winter. No more drafts and my heating bill dropped noticeably.",
    },
  },
}

interface Props {
  params: Promise<{ category: string }>
  searchParams: Promise<{ zip?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const config = categoryConfig[category]
  if (!config) return {}
  return {
    title: `${config.title} — Free, No Obligation | CleverHomeEnergy`,
    description: config.subheadline,
    robots: { index: true, follow: true },
  }
}

export default async function QuotePage({ params, searchParams }: Props) {
  const { category } = await params
  const { zip } = await searchParams
  const config = categoryConfig[category]
  if (!config) notFound()

  const Icon = config.icon

  return (
    // No Navbar on quote pages — reduces distractions, boosts conversion
    <div className="min-h-screen bg-gray-50">
      {/* Minimal header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-green-700 font-bold text-lg">
            <Shield className="w-5 h-5" />
            CleverHomeEnergy
          </Link>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Secure & Private
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              100% Free
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Top trust bar */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon className={`w-6 h-6 ${config.accentColor}`} />
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">{config.headline}</h1>
          </div>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">{config.subheadline}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* LEFT: Form */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <MultiStepQuoteForm category={category} initialZip={zip || ""} />
          </div>

          {/* RIGHT: Trust signals */}
          <div className="lg:col-span-2 space-y-5">
            {/* Why us */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Why Use CleverHomeEnergy?
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Vetted, licensed local contractors only",
                  "Compare up to 3 competing quotes",
                  "100% free — no hidden fees, ever",
                  "No spam, no pushy sales calls",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Case study */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-xs italic mb-3 leading-relaxed">
                &ldquo;{config.caseStudy.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">{config.caseStudy.name}</p>
                  <p className="text-xs text-gray-500">{config.caseStudy.location}</p>
                </div>
                <span className="text-xs font-bold text-green-700 bg-white border border-green-200 px-2 py-1 rounded-full">
                  {config.caseStudy.savings}
                </span>
              </div>
            </div>

            {/* Avg savings */}
            <div className={`${config.bgColor} text-white rounded-2xl p-5 text-center`}>
              <p className="text-3xl font-extrabold mb-1">{config.savings}</p>
              <p className="text-white/80 text-xs">{config.avgSavings} on average</p>
            </div>

            {/* Social proof counter */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600 shrink-0" />
              <div>
                <p className="font-bold text-gray-900 text-sm">47,000+ homeowners</p>
                <p className="text-xs text-gray-500">have gotten free quotes this year</p>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-500 leading-relaxed flex items-start gap-1.5">
                <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>
                  Your information is secure and private. We are TCPA compliant.
                  You&apos;ll only hear from contractors relevant to your request.{" "}
                  <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
