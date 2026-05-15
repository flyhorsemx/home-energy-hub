import { getAllPosts } from "@/lib/mdx"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, BookOpen } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

const CATEGORY_META: Record<string, { title: string; description: string; label: string }> = {
  "solar-diy": {
    title: "Solar DIY Guides",
    description: "Everything you need to know about residential solar — from how panels work to installation risks and savings potential.",
    label: "Solar",
  },
  "hvac-maintenance": {
    title: "HVAC Maintenance & Troubleshooting",
    description: "Keep your HVAC running efficiently with our expert guides on maintenance, repair, and when to call a pro.",
    label: "HVAC",
  },
  "energy-saving-tips": {
    title: "Home Energy Saving Tips",
    description: "Practical, high-ROI strategies to reduce your energy bills — ranked by actual savings impact.",
    label: "Energy Saving",
  },
  roofing: {
    title: "Roofing Guides",
    description: "Learn to spot roofing problems, understand replacement costs, and make smart decisions about your roof.",
    label: "Roofing",
  },
}

interface Props {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const meta = CATEGORY_META[category]
  if (!meta) return {}
  return { title: meta.title, description: meta.description }
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params
  const meta = CATEGORY_META[category]
  if (!meta) notFound()

  const all = getAllPosts("blog")
  const posts = all.filter((p) =>
    p.category?.toLowerCase().replace(/\s+/g, "-") === category ||
    p.category?.toLowerCase() === meta.label.toLowerCase()
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-2">
          <BookOpen className="w-4 h-4" />
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span>/</span>
          <span>{meta.label}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">{meta.title}</h1>
        <p className="text-gray-500 mt-2 max-w-2xl">{meta.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {posts.length === 0 && (
            <p className="text-gray-400">No articles in this category yet. Check back soon.</p>
          )}
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow group"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700">{post.title}</h2>
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

        <aside>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-3">Get Free Quotes</h3>
            <ZipCodeForm compact />
          </div>
        </aside>
      </div>
    </div>
  )
}
