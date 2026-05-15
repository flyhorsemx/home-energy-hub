import { getAllPosts } from "@/lib/mdx"
import Link from "next/link"
import type { Metadata } from "next"
import { Newspaper, ArrowRight } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

export const metadata: Metadata = {
  title: "Home Energy News",
  description: "Latest updates on solar, HVAC, roofing rebates, policy changes, and industry news for US homeowners.",
}

export default function NewsIndex() {
  const posts = getAllPosts("news")

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
          <Newspaper className="w-4 h-4" />
          Industry & Policy Updates
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">Home Energy News</h1>
        <p className="text-gray-500 mt-2">Stay current on rebates, incentives, and industry changes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {posts.length === 0 && <p className="text-gray-400">No news yet. Check back soon.</p>}
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {post.category && (
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">{post.category}</span>
                  )}
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="font-bold text-gray-900 group-hover:text-green-700 leading-snug">{post.title}</h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 shrink-0 mt-1 transition-colors" />
            </Link>
          ))}
        </div>

        <aside>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-3">Does This Apply to You?</h3>
            <p className="text-sm text-gray-600 mb-4">Enter your ZIP to check local eligibility and available rebates.</p>
            <ZipCodeForm compact />
          </div>
        </aside>
      </div>
    </div>
  )
}
