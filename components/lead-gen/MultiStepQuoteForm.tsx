"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const schema = z.object({
  zip: z.string().length(5).regex(/^\d{5}$/),
  homeOwner: z.enum(["yes", "no"]),
  electricBill: z.enum(["under100", "100to200", "over200"]),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
})

type FormData = z.infer<typeof schema>

const STEPS = [
  { id: 1, title: "Your Location" },
  { id: 2, title: "Home Details" },
  { id: 3, title: "Contact Info" },
]

interface MultiStepQuoteFormProps {
  category: string
  initialZip?: string
}

export default function MultiStepQuoteForm({ category, initialZip = "" }: MultiStepQuoteFormProps) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { zip: initialZip },
  })

  const nextStep = async () => {
    const fieldsPerStep: Record<number, (keyof FormData)[]> = {
      1: ["zip"],
      2: ["homeOwner", "electricBill"],
    }
    const valid = await trigger(fieldsPerStep[step])
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200))
    console.log("Lead submitted:", { ...data, category })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re All Set!</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Local {category} contractors will contact you within 24 hours with free, no-obligation quotes.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
              step >= s.id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
            )}>
              {step > s.id ? <CheckCircle className="w-5 h-5" /> : s.id}
            </div>
            <span className={cn("ml-2 text-sm font-medium hidden sm:block", step >= s.id ? "text-green-700" : "text-gray-400")}>
              {s.title}
            </span>
            {i < STEPS.length - 1 && <div className={cn("flex-1 h-0.5 mx-3", step > s.id ? "bg-green-500" : "bg-gray-200")} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your ZIP Code</label>
            <input
              {...register("zip")}
              placeholder="e.g. 90210"
              maxLength={5}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
            />
            {errors.zip && <p className="text-red-500 text-sm mt-1">Please enter a valid 5-digit ZIP code</p>}
          </div>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you own your home?</label>
              <div className="grid grid-cols-2 gap-3">
                {["yes", "no"].map((v) => (
                  <label key={v} className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl py-3 cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                    <input type="radio" value={v} {...register("homeOwner")} className="sr-only" />
                    <span className="font-medium capitalize">{v === "yes" ? "Yes, I own it" : "No, I rent"}</span>
                  </label>
                ))}
              </div>
              {errors.homeOwner && <p className="text-red-500 text-sm mt-1">Please select one</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly electric bill?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: "under100", label: "Under $100" },
                  { v: "100to200", label: "$100–$200" },
                  { v: "over200", label: "Over $200" },
                ].map(({ v, label }) => (
                  <label key={v} className="flex items-center justify-center border-2 border-gray-200 rounded-xl py-3 cursor-pointer text-sm has-[:checked]:border-green-500 has-[:checked]:bg-green-50 text-center px-1">
                    <input type="radio" value={v} {...register("electricBill")} className="sr-only" />
                    {label}
                  </label>
                ))}
              </div>
              {errors.electricBill && <p className="text-red-500 text-sm mt-1">Please select one</p>}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input {...register("name")} placeholder="Jane Smith" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input {...register("email")} type="email" placeholder="jane@example.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input {...register("phone")} type="tel" placeholder="(555) 000-0000" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500" />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 disabled:opacity-60">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Free Quotes"}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
