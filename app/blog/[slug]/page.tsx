import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import Sidebar from "@/components/layout/Sidebar"
import ProWarningAlert from "@/components/content/ProWarningAlert"
import AffiliateProduct from "@/components/content/AffiliateProduct"
import InContentCTA from "@/components/lead-gen/InContentCTA"
import NewsletterSignup from "@/components/lead-gen/NewsletterSignup"
import AuthorBio from "@/components/content/AuthorBio"
import ArticleJsonLd from "@/components/content/ArticleJsonLd"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug("blog", slug)
  if (!post) return {}
  const { SITE_URL } = await import("@/lib/config")
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    keywords: post.meta.keywords ?? [],
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      url: `${SITE_URL}/blog/${slug}`,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug("blog", slug)
  if (!post) notFound()

  const topNews = getAllPosts("news").slice(0, 4).map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
  }))

  const category = post.meta.category?.toLowerCase().includes("hvac")
    ? "hvac"
    : post.meta.category?.toLowerCase().includes("roof")
    ? "roofing"
    : post.meta.category?.toLowerCase().includes("window")
    ? "windows"
    : post.meta.category?.toLowerCase().includes("insulation")
    ? "insulation"
    : "solar"

  const components = {
    ProWarningAlert,
    AffiliateProduct,
    InContentCTA: (props: React.ComponentProps<typeof InContentCTA>) => (
      <InContentCTA category={category} {...props} />
    ),
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="not-prose my-6 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[640px] text-sm" {...props} />
      </div>
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th className="bg-gray-50 px-4 py-3 text-left font-semibold text-gray-800" {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td className="border-t border-gray-100 px-4 py-3 align-top text-gray-700" {...props} />
    ),
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ArticleJsonLd
        type="blog"
        title={post.meta.title}
        description={post.meta.excerpt}
        date={post.meta.date}
        slug={slug}
        author={post.meta.author}
        faq={post.meta.faq}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article */}
        <article className="lg:col-span-2">
          <header className="mb-8">
            {post.meta.category && (
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {post.meta.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 leading-tight">
              {post.meta.title}
            </h1>
            <p className="text-gray-400 text-sm mt-2">{post.meta.date}</p>
          </header>

          <div className="prose prose-gray prose-lg max-w-none prose-headings:font-bold prose-a:text-green-700">
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Post-article In-content CTA */}
          <InContentCTA
            category={category}
            headline="Ready to Stop Guessing? Get Expert Quotes Free"
            subtext="Request local quote options and compare project scope before you decide."
          />

          {post.meta.author && (
            <AuthorBio name={post.meta.author} role="Home Energy Expert" />
          )}
        </article>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Sidebar topNews={topNews} />
          </div>
        </div>
      </div>

      {/* Newsletter banner at article end */}
      <div className="mt-16">
        <NewsletterSignup variant="banner" />
      </div>
    </div>
  )
}
