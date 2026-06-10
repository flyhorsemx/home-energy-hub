"use client"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const ANGI_LINKS: Record<string, string> = {
  hvac: "https://www.anrdoezrs.net/click-101763397-17142830",
  heating: "https://www.jdoqocy.com/click-101763397-17142838",
  roofing: "https://www.dpbolvw.net/click-101763397-17142826",
  windows: "https://www.jdoqocy.com/click-101763397-17142835",
  remodeling: "https://www.jdoqocy.com/click-101763397-17142833",
}

const ANGI_LABELS: Record<string, string> = {
  hvac: "HVAC & Air Conditioning",
  heating: "Heating & Furnace",
  roofing: "Roofing",
  windows: "Windows",
  remodeling: "Home Remodeling",
}

interface Props {
  category: keyof typeof ANGI_LINKS
  locationName?: string
}

export default function AngiCTA({ category, locationName }: Props) {
  const url = ANGI_LINKS[category]
  const label = ANGI_LABELS[category]
  if (!url) return null

  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "angi_click", {
        category: category,
        location: locationName ?? "unknown",
        page_path: window.location.pathname,
      })
    }
  }

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 mb-1">
          Also Compare on Angi
        </p>
        <p className="text-sm font-semibold text-gray-900">
          Find top-rated {label} pros{locationName ? ` in ${locationName}` : ""}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          Read reviews, compare quotes, and hire with confidence.
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        </svg>
        View on Angi
      </a>
    </div>
  )
}
