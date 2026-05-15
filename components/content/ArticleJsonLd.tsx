import { SITE_URL, SITE_NAME } from "@/lib/config"

interface ArticleJsonLdProps {
  type: "blog" | "news"
  title: string
  description: string
  date: string
  slug: string
  author?: string
}


export default function ArticleJsonLd({ type, title, description, date, slug, author }: ArticleJsonLdProps) {
  const schema = {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
