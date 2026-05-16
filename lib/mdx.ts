import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostMeta {
  title: string
  date: string
  excerpt: string
  category?: string
  author?: string
  readTime?: string
  keywords?: string[]
  slug: string
}

function getPostsDir(type: "blog" | "news") {
  return path.join(process.cwd(), "content", type)
}

export function getAllPosts(type: "blog" | "news"): PostMeta[] {
  const dir = getPostsDir(type)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8")
      const { data } = matter(raw)
      return { ...data, slug: file.replace(/\.mdx$/, "") } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(type: "blog" | "news", slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(getPostsDir(type), `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return { meta: { ...data, slug } as PostMeta, content }
}
