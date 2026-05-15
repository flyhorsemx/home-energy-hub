import { notFound } from "next/navigation"
import type { Metadata } from "next"
import MultiStepQuoteForm from "@/components/lead-gen/MultiStepQuoteForm"
import { Sun, Wind, Home, AppWindow, CheckCircle } from "lucide-react"

const categoryConfig: Record<string, {
  title: string
  headline: string
  subheadline: string
  icon: React.ElementType
  color: string
  benefits: string[]
  savings: string
}> = {
  solar: {
    title: "Solar Panel Quotes",
    headline: "Find Out If Solar Is Worth It in Your Area",
    subheadline: "Get up to 3 free quotes from local solar installers. Check federal and state rebates available at your address.",
    icon: Sun,
    color: "text-yellow-500",
    benefits: ["30% Federal Tax Credit available", "Average ROI in 6–8 years", "Increase home value by 4%", "Lock in electricity rates"],
    savings: "$1,500/yr average savings",
  },
  hvac: {
    title: "HVAC System Quotes",
    headline: "Replace Your HVAC & Slash Energy Bills",
    subheadline: "Get free quotes from licensed HVAC contractors. Compare brands, efficiency ratings, and installation costs.",
    icon: Wind,
    color: "text-blue-500",
    benefits: ["Energy Star rebates up to $2,000", "New units are 50% more efficient", "Improved indoor air quality", "Financing options available"],
    savings: "$400/yr average savings",
  },
  roofing: {
    title: "Roofing Quotes",
    headline: "Get a New Roof That Saves You Money",
    subheadline: "Compare local roofing contractors on price, materials, and warranty. No pressure, no obligation.",
    icon: Home,
    color: "text-red-500",
    benefits: ["Cool roof materials reduce cooling 15%", "Increase home resale value", "Insurance discount potential", "Storm damage coverage options"],
    savings: "Boost home value 5%",
  },
  windows: {
    title: "Window & Door Quotes",
    headline: "Stop Energy Loss With New Windows",
    subheadline: "Energy-efficient windows can cut heating and cooling costs by up to 25%. Get local contractor quotes free.",
    icon: AppWindow,
    color: "text-green-500",
    benefits: ["$600 tax credit for ENERGY STAR windows", "Reduce drafts and noise", "UV protection for interiors", "Curb appeal boost"],
    savings: "$300/yr average savings",
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
    title: config.title,
    description: config.subheadline,
  }
}

export default async function QuotePage({ params, searchParams }: Props) {
  const { category } = await params
  const { zip } = await searchParams
  const config = categoryConfig[category]
  if (!config) notFound()

  const Icon = config.icon

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Icon className={`w-8 h-8 ${config.color}`} />
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{config.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {config.headline}
            </h1>
            <p className="text-gray-600 text-lg mb-8">{config.subheadline}</p>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <p className="text-sm font-bold text-gray-500 uppercase mb-4">What You Get</p>
              <ul className="space-y-3">
                {config.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 inline-flex items-center gap-2">
              <span className="text-2xl font-extrabold text-green-700">{config.savings}</span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Get Your Free Quotes</h2>
            <MultiStepQuoteForm category={category} initialZip={zip || ""} />
            <p className="text-xs text-gray-400 mt-4 text-center">
              By submitting, you agree to be contacted by up to 3 local contractors. 100% free, no hidden fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
