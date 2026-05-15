import { getAllPosts } from "@/lib/mdx"
import { NextResponse } from "next/server"
import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/config"

export async function GET() {
  const blogPosts = getAllPosts("blog")
  const newsPosts = getAllPosts("news")

  const allItems = [
    ...newsPosts.map((p) => ({ ...p, type: "news" as const })),
    ...blogPosts.map((p) => ({ ...p, type: "blog" as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const items = allItems
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/${post.type}/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${post.type}/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ""}
    </item>`
    )
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
