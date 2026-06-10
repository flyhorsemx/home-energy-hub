import { SITE_URL, SITE_NAME } from "@/lib/config"
import type { FaqItem } from "@/lib/mdx"

interface ArticleJsonLdProps {
  type: "blog" | "news"
  title: string
  description: string
  date: string
  slug: string
  author?: string
  faq?: FaqItem[]
}

export default function ArticleJsonLd({ type, title, description, date, slug, author, faq }: ArticleJsonLdProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": type === "news" ? "NewsArticle" : "Article",
    headline: title,
    description,
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(date).toISOString(),
    url: `${SITE_URL}/${type}/${slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(author && {
      author: {
        "@type": "Person",
        name: author,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${type}/${slug}`,
    },
  }

  const faqSchema =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
