import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import MultiStepQuoteForm from "@/components/lead-gen/MultiStepQuoteForm"
import { Sun, Wind, Home, AppWindow, Layers, Droplets, CheckCircle, Shield, Star, Lock, Users } from "lucide-react"

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
    subheadline: "Request free quotes from local solar installers and compare system options for your home.",
    icon: Sun,
    accentColor: "text-yellow-600",
    bgColor: "bg-yellow-600",
    benefits: [
      "Federal solar incentives may be available",
      "Compare equipment, warranty, and installation options",
      "Review expected production for your home",
      "Review financing and utility connection details",
    ],
    savings: "Compare quotes",
    avgSavings: "Review local solar options",
    caseStudy: {
      name: "Mike T.",
      location: "San Diego, CA",
      savings: "Compared options",
      quote: "The process was simple. I could compare local solar proposals and ask better questions before choosing a provider.",
    },
  },
  hvac: {
    title: "Get Free HVAC Quotes",
    headline: "Compare HVAC Replacement Quotes",
    subheadline: "Request free HVAC quotes and compare equipment, efficiency ratings, warranties, and installation scope.",
    icon: Wind,
    accentColor: "text-blue-600",
    bgColor: "bg-blue-600",
    benefits: [
      "Energy efficiency incentives may be available",
      "Compare SEER2, AFUE, and equipment options",
      "Review comfort and indoor air quality options",
      "Ask contractors about current rebate paperwork",
    ],
    savings: "Compare quotes",
    avgSavings: "Review local HVAC options",
    caseStudy: {
      name: "Angela R.",
      location: "Austin, TX",
      savings: "Compared scope",
      quote: "I liked being able to compare the equipment model, warranty, and installation details before scheduling the work.",
    },
  },
  roofing: {
    title: "Get Free Roofing Quotes",
    headline: "Compare Local Roofing Quotes",
    subheadline: "Compare local roofing contractors on price, materials, warranty, schedule, and project scope.",
    icon: Home,
    accentColor: "text-red-600",
    bgColor: "bg-red-600",
    benefits: [
      "Review shingle, metal, and flat-roof options",
      "Compare warranty and installation scope",
      "Ask about insurance documentation when relevant",
      "Compare multiple bids before you decide",
    ],
    savings: "Compare quotes",
    avgSavings: "Review local roofing options",
    caseStudy: {
      name: "James K.",
      location: "Nashville, TN",
      savings: "Reviewed bids",
      quote: "I could compare materials, warranty terms, and project timelines before deciding which roofer to call back.",
    },
  },
  windows: {
    title: "Get Free Window Quotes",
    headline: "Stop Energy Loss With New Windows",
    subheadline: "Request free local window quotes and compare glass packages, frame materials, and installation scope.",
    icon: AppWindow,
    accentColor: "text-purple-600",
    bgColor: "bg-purple-600",
    benefits: [
      "Federal incentives may apply for qualifying windows",
      "Compare ENERGY STAR window options",
      "Review comfort, draft, and noise-reduction options",
      "Protect furniture from UV damage",
    ],
    savings: "Compare quotes",
    avgSavings: "Review local window options",
    caseStudy: {
      name: "Sarah L.",
      location: "Chicago, IL",
      savings: "Compared styles",
      quote: "I could compare window styles, glass packages, and installation details before deciding what made sense for my home.",
    },
  },
  insulation: {
    title: "Get Free Insulation Quotes",
    headline: "Compare Local Insulation Quotes",
    subheadline: "Request free insulation quotes and compare R-value targets, air sealing, materials, and project scope.",
    icon: Layers,
    accentColor: "text-amber-600",
    bgColor: "bg-amber-600",
    benefits: [
      "Federal incentives may apply for qualifying work",
      "Compare attic, crawl space, and air sealing scopes",
      "Review material, R-value, and ventilation details",
      "Compare multiple bids before you decide",
    ],
    savings: "Compare quotes",
    avgSavings: "Review local insulation options",
    caseStudy: {
      name: "David M.",
      location: "Denver, CO",
      savings: "Compared R-values",
      quote: "The quotes made it easier to compare R-value targets, air sealing details, and rebate paperwork before starting the project.",
    },
  },
  "water-heating": {
    title: "Get Free Water Heater Quotes",
    headline: "Compare Water Heater Replacement Quotes",
    subheadline: "Request free water heater quotes and compare tank, tankless, and heat pump water heater options.",
    icon: Droplets,
    accentColor: "text-cyan-600",
    bgColor: "bg-cyan-600",
    benefits: [
      "Federal incentives may apply for qualifying units",
      "Compare tank, tankless, and heat pump options",
      "Review installation requirements and warranty",
      "Compare multiple bids before you decide",
    ],
    savings: "Compare quotes",
    avgSavings: "Review local water heater options",
    caseStudy: {
      name: "Linda K.",
      location: "Portland, OR",
      savings: "Compared systems",
      quote: "I could compare tankless and heat pump options side by side before choosing the right replacement.",
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
                  "Compare local home improvement companies",
                  "Review up to 3 quote options when available",
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
              <p className="text-white/80 text-xs">{config.avgSavings}</p>
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
