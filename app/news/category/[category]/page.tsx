import { getAllPosts } from "@/lib/mdx"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, Newspaper } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

const CATEGORY_META: Record<string, { title: string; description: string; label: string }> = {
  "solar-policy": {
    title: "Solar Policy & Rebates",
    description: "Stay current on federal and state solar incentives, net metering changes, and tax credit updates that affect US homeowners.",
    label: "Policy Update",
  },
  "home-tech": {
    title: "Home Solar Technology",
    description: "The latest in residential solar panels, battery storage, inverters, and smart home energy systems.",
    label: "Technology",
  },
  "energy-costs": {
    title: "Energy Costs & Rates",
    description: "Track electricity price trends, utility rate changes, and what they mean for your household budget.",
    label: "Market Update",
  },
  rebates: {
    title: "Rebates & Incentives",
    description: "Find active rebate programs in your state for solar, HVAC, windows, and home efficiency upgrades.",
    label: "Rebates",
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

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params
  const meta = CATEGORY_META[category]
  if (!meta) notFound()

  const all = getAllPosts("news")
  const posts = all.filter((p) =>
    p.category?.toLowerCase() === meta.label.toLowerCase()
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
          <Newspaper className="w-4 h-4" />
          <Link href="/news" className="hover:underline">News</Link>
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
              href={`/news/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">{post.category}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="font-bold text-gray-900 group-hover:text-green-700 leading-snug">{post.title}</h2>
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm text-green-700 font-medium mt-3">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <aside>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-2">Check Your Eligibility</h3>
            <p className="text-sm text-gray-600 mb-3">Enter your ZIP to see which programs apply to you.</p>
            <ZipCodeForm compact />
          </div>
        </aside>
      </div>
    </div>
  )
}
