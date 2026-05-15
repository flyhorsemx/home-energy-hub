import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import NewsletterSignup from "@/components/lead-gen/NewsletterSignup"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface NewsItem {
  title: string
  slug: string
  date: string
}

interface SidebarProps {
  topNews?: NewsItem[]
}

export default function Sidebar({ topNews = [] }: SidebarProps) {
  return (
    <aside className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-green-800 mb-1 uppercase tracking-wide">Free Service</p>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Check Your Eligibility</h3>
        <ZipCodeForm compact />
      </div>

      <NewsletterSignup variant="inline" />

      {topNews.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-bold text-gray-900 mb-4">Latest News</h3>
          <ul className="space-y-3">
            {topNews.map((item) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className="flex items-start gap-2 group">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-green-600 shrink-0 group-hover:translate-x-1 transition-transform" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-green-700">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
