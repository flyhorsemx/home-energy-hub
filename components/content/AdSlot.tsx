interface AdSlotProps {
  slot?: string
  format?: "horizontal" | "rectangle" | "vertical"
  className?: string
}

/**
 * Placeholder for Google AdSense / Mediavine / Raptive ad units.
 * Replace the inner content with the actual ad script when ready.
 *
 * Usage in production:
 *   1. Replace placeholder div with <ins class="adsbygoogle" ...> tag
 *   2. Add AdSense script to layout.tsx <head>
 *   3. After 50K+ monthly sessions, apply to Mediavine/Raptive for higher RPM
 */
export default function AdSlot({ slot, format = "horizontal", className }: AdSlotProps) {
  const dimensions: Record<string, string> = {
    horizontal: "h-[90px] min-w-[728px] max-w-full",
    rectangle: "h-[250px] w-[300px]",
    vertical: "h-[600px] w-[160px]",
  }

  // In development: render a visible placeholder
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded text-gray-400 text-xs ${dimensions[format]} ${className ?? ""}`}
        data-ad-slot={slot}
      >
        Ad Slot ({format}) — {slot ?? "unset"}
      </div>
    )
  }

  // Production: render AdSense ins tag
  // Replace data-ad-client and data-ad-slot with your actual values
  return (
    <div className={className}>
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot ?? "0000000000"}
        data-ad-format={format === "rectangle" ? "rectangle" : "auto"}
        data-full-width-responsive="true"
      />
      */}
    </div>
  )
}
