"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { MapPin, ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const schema = z.object({
  zip: z
    .string()
    .length(5, "Please enter a valid 5-digit ZIP code")
    .regex(/^\d{5}$/, "ZIP code must be 5 digits"),
  category: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface ZipCodeFormProps {
  compact?: boolean
  category?: string
  className?: string
}

export default function ZipCodeForm({ compact = false, category, className }: ZipCodeFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { category },
  })

  const onSubmit = (data: FormData) => {
    const target = data.category || category || "solar"
    router.push(`/quotes/${target}?zip=${data.zip}`)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full", className)}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("zip")}
              placeholder="ZIP Code"
              maxLength={5}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-3 py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
        {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("w-full max-w-lg", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            {...register("zip")}
            placeholder="Enter your ZIP code"
            maxLength={5}
            className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-xl transition-colors disabled:opacity-60 shadow-sm whitespace-nowrap"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>Check My Eligibility <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
      {errors.zip && (
        <p className="text-red-500 text-sm mt-2 ml-1">{errors.zip.message}</p>
      )}
      <p className="text-xs text-gray-500 mt-2 ml-1">100% free. No spam. Results in 60 seconds.</p>
    </form>
  )
}
