import { ExternalLink, Star } from "lucide-react"

interface AffiliateProductProps {
  name: string
  description: string
  price: string
  rating?: number
  reviewCount?: number
  href: string
  badge?: string
  source?: string
}

export default function AffiliateProduct({
  name,
  description,
  price,
  rating = 4.5,
  reviewCount,
  href,
  badge,
  source = "Amazon",
}: AffiliateProductProps) {
  return (
    <div className="not-prose my-4 border border-gray-200 rounded-xl p-4 bg-white flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            {badge && (
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full mb-1 inline-block">
                {badge}
              </span>
            )}
            <h4 className="font-bold text-gray-900 text-sm leading-snug">{name}</h4>
          </div>
          <span className="text-base font-extrabold text-green-700 shrink-0">{price}</span>
        </div>

        <div className="flex items-center gap-1 my-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}`}
            />
          ))}
          {reviewCount && <span className="text-xs text-gray-400 ml-1">({reviewCount.toLocaleString()})</span>}
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-3">{description}</p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
        >
          View on {source} <ExternalLink className="w-3 h-3" />
        </a>
        <p className="text-gray-400 text-xs mt-1">*Affiliate link — we earn a small commission at no extra cost to you.</p>
      </div>
    </div>
  )
}
