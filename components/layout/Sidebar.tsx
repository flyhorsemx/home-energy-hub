import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import NewsletterSignup from "@/components/lead-gen/NewsletterSignup"
import AdSlot from "@/components/content/AdSlot"
import Link from "next/link"
import { ArrowRight, Calculator, DollarSign } from "lucide-react"

interface NewsItem {
  title: string
  slug: string
  date: string
}

interface SidebarProps {
  topNews?: NewsItem[]
  category?: string
}

export default function Sidebar({ topNews = [], category = "solar" }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Primary CTA */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">100% Free Service</p>
        <h3 className="text-base font-bold text-gray-900 mb-3">Get Your Free Quote</h3>
        <ZipCodeForm compact category={category} />
        <p className="text-xs text-gray-400 mt-2">No spam · No obligation</p>
      </div>

      {/* Savings Calculator link */}
      <Link
        href="/calculator"
        className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all group"
      >
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
            Savings Calculator
          </p>
          <p className="text-xs text-gray-500">How much could you save?</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Rebates link */}
      <Link
        href="/tools/rebates"
        className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 hover:shadow-md transition-all group"
      >
        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
          <DollarSign className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
            Find Your Rebates
          </p>
          <p className="text-xs text-gray-500">Federal + state incentives</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* AdSense slot */}
      <AdSlot slot="sidebar-top" className="w-full" />

      {/* Latest News */}
      {topNews.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Latest News</h3>
          <ul className="space-y-3">
            {topNews.map((item) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className="flex items-start gap-2 group">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 shrink-0 group-hover:translate-x-1 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-green-700 leading-snug">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <NewsletterSignup variant="inline" />

      {/* Second AdSense slot */}
      <AdSlot slot="sidebar-bottom" className="w-full" />
    </aside>
  )
}
