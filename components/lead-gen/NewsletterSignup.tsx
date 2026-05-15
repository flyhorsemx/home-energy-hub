"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, CheckCircle, Loader2 } from "lucide-react"

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
})
type FormData = z.infer<typeof schema>

interface NewsletterSignupProps {
  variant?: "inline" | "banner"
  title?: string
  description?: string
}

export default function NewsletterSignup({
  variant = "inline",
  title = "Weekly Solar & Energy News",
  description = "Get the latest rebates, policy changes, and money-saving tips for your state — straight to your inbox.",
}: NewsletterSignupProps) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800))
    console.log("Newsletter signup:", data.email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 text-green-700 ${variant === "banner" ? "justify-center py-4" : ""}`}>
        <CheckCircle className="w-5 h-5 shrink-0" />
        <span className="font-medium">You&apos;re subscribed! Check your inbox for a confirmation.</span>
      </div>
    )
  }

  if (variant === "banner") {
    return (
      <section className="bg-gray-900 text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400 mb-6 text-sm">{description}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              className="flex-1 max-w-sm px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe Free"}
            </button>
          </form>
          {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
          <p className="text-gray-500 text-xs mt-3">Unsubscribe anytime. No spam, ever.</p>
        </div>
      </section>
    )
  }

  // inline (sidebar)
  return (
    <div className="bg-gray-900 text-white rounded-xl p-5">
      <Mail className="w-6 h-6 text-green-400 mb-2" />
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-gray-400 text-xs mb-3 leading-relaxed">{description}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Subscribe Free"}
        </button>
      </form>
      <p className="text-gray-500 text-xs mt-2">Unsubscribe anytime.</p>
    </div>
  )
}
