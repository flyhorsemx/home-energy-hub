import { AlertTriangle } from "lucide-react"
import Link from "next/link"

interface ProWarningAlertProps {
  category?: string
  children?: React.ReactNode
}

export default function ProWarningAlert({ category = "solar", children }: ProWarningAlertProps) {
  return (
    <div className="my-6 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-xl p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-yellow-800 mb-1">⚠️ Safety Warning — Get a Pro Instead</p>
          <div className="text-yellow-700 text-sm leading-relaxed">
            {children || (
              <p>
                This type of work involves electrical systems, structural components, or pressurized HVAC lines that can be
                dangerous without professional training. Improper installation can void warranties, fail inspections, or cause
                serious injury.
              </p>
            )}
          </div>
          <Link
            href={`/quotes/${category}`}
            className="inline-flex items-center mt-3 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get Free Professional Quotes →
          </Link>
        </div>
      </div>
    </div>
  )
}
