"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, ArrowRight, Loader2, ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  zip: z.string().length(5, "Enter a valid 5-digit ZIP").regex(/^\d{5}$/),
})
type FormData = z.infer<typeof schema>

interface InContentCTAProps {
  category?: string
  headline?: string
  subtext?: string
}

export default function InContentCTA({
  category = "solar",
  headline = "Don't Risk It — Get a Free Pro Quote Instead",
  subtext = "Request local quote options and compare project scope before you decide.",
}: InContentCTAProps) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    router.push(`/quotes/${category}?zip=${data.zip}`)
  }

  return (
    <div className="my-8 bg-gradient-to-br from-green-700 to-green-800 text-white rounded-2xl p-6 md:p-8 not-prose">
      <div className="flex items-start gap-3 mb-4">
        <ShieldCheck className="w-7 h-7 text-green-300 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-xl font-bold">{headline}</h3>
          <p className="text-green-100 text-sm mt-1">{subtext}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register("zip")}
            placeholder="Enter ZIP code"
            maxLength={5}
            className="w-full pl-9 pr-3 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-3 rounded-xl transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Request Free Quotes <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
      {errors.zip && <p className="text-yellow-200 text-xs mt-2">{errors.zip.message}</p>}

      <p className="text-green-200 text-xs mt-3">
        ✓ No spam &nbsp;·&nbsp; ✓ No hidden fees &nbsp;·&nbsp; ✓ Results in 60 seconds
      </p>
    </div>
  )
}
