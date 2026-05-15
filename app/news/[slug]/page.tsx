import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, Tag } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"
import ArticleJsonLd from "@/components/content/ArticleJsonLd"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug("news", slug)
  if (!post) return {}
  return { title: post.meta.title, description: post.meta.excerpt }
}

export default async function NewsPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug("news", slug)
  if (!post) notFound()

  const relatedNews = getAllPosts("news")
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <ArticleJsonLd
        type="news"
        title={post.meta.title}
        description={post.meta.excerpt}
        date={post.meta.date}
        slug={slug}
      />
      <article>
        <header className="mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            {post.meta.category && (
              <span className="flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {post.meta.category}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {post.meta.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {post.meta.title}
          </h1>
          <p className="text-gray-500 text-lg mt-3">{post.meta.excerpt}</p>
        </header>

        <div className="prose prose-gray prose-lg max-w-none prose-headings:font-bold prose-a:text-green-700">
          <MDXRemote source={post.content} />
        </div>
      </article>

      {/* CTA Banner */}
      <div className="mt-12 bg-green-700 text-white rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Does This Apply to Your ZIP Code?</h3>
        <p className="text-green-100 mb-6">
          Check if the rebates and programs mentioned in this article are available in your area.
        </p>
        <div className="flex justify-center">
          <ZipCodeForm className="[&_input]:bg-white [&_input]:text-gray-900" />
        </div>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="mt-12">
          <h3 className="font-bold text-gray-900 text-xl mb-5">More News</h3>
          <div className="space-y-4">
            {relatedNews.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="flex items-center gap-3 group"
              >
                <ArrowRight className="w-4 h-4 text-green-600 shrink-0 group-hover:translate-x-1 transition-transform" />
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-green-700">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
