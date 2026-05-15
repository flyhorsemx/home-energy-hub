import { getAllPosts } from "@/lib/mdx"
import Link from "next/link"
import type { Metadata } from "next"
import { BookOpen, ArrowRight } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

export const metadata: Metadata = {
  title: "DIY Home Energy Blog",
  description: "Practical guides, tips, and tutorials to help homeowners improve energy efficiency and reduce utility bills.",
}

export default function BlogIndex() {
  const posts = getAllPosts("blog")

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-2">
          <BookOpen className="w-4 h-4" />
          DIY Guides & How-Tos
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">Home Energy Blog</h1>
        <p className="text-gray-500 mt-2">Expert guides to help you upgrade smarter and save more.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {posts.length === 0 && (
            <p className="text-gray-400">No articles yet. Check back soon.</p>
          )}
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow group"
            >
              {post.category && (
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{post.category}</span>
              )}
              <h2 className="text-xl font-bold text-gray-900 mt-3 mb-2 group-hover:text-green-700">{post.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-sm text-green-700 font-medium flex items-center gap-1">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Get Free Quotes</h3>
            <ZipCodeForm compact />
          </div>
        </aside>
      </div>
    </div>
  )
}
