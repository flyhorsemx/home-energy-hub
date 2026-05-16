"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle, ChevronRight, Loader2, Sun, Wind, Home, AppWindow, Shield, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  serviceType: z.enum(["solar", "hvac", "roofing", "windows"]),
  homeOwnership: z.enum(["own", "rent"]),
  homeSize: z.enum(["under1500", "1500to2500", "over2500"]),
  yearBuilt: z.enum(["before1980", "1980to2000", "after2000"]),
  name: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  zip: z.string().length(5, "Enter a valid ZIP code").regex(/^\d{5}$/),
})

type FormData = z.infer<typeof schema>

const STEPS = [
  { id: 1, label: "Email" },
  { id: 2, label: "Service" },
  { id: 3, label: "Property" },
  { id: 4, label: "Contact" },
  { id: 5, label: "Done" },
]

const SERVICE_OPTIONS = [
  { value: "solar", label: "Solar Panels", sublabel: "Save $1,400+/yr", icon: Sun, color: "border-yellow-300 has-[:checked]:bg-yellow-50 has-[:checked]:border-yellow-500" },
  { value: "hvac", label: "HVAC System", sublabel: "Save $400+/yr", icon: Wind, color: "border-blue-300 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500" },
  { value: "roofing", label: "Roofing", sublabel: "Free estimates", icon: Home, color: "border-red-300 has-[:checked]:bg-red-50 has-[:checked]:border-red-500" },
  { value: "windows", label: "Windows", sublabel: "Up to 25% savings", icon: AppWindow, color: "border-purple-300 has-[:checked]:bg-purple-50 has-[:checked]:border-purple-500" },
]

interface MultiStepQuoteFormProps {
  category?: string
  initialZip?: string
}

export default function MultiStepQuoteForm({ category, initialZip = "" }: MultiStepQuoteFormProps) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [leadsCount] = useState(1247)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      zip: initialZip,
      serviceType: (category as FormData["serviceType"]) ?? undefined,
    },
  })

  const fieldsPerStep: Record<number, (keyof FormData)[]> = {
    1: ["email"],
    2: ["serviceType"],
    3: ["homeOwnership", "homeSize", "yearBuilt"],
    4: ["name", "phone", "zip"],
  }

  const nextStep = async () => {
    const valid = await trigger(fieldsPerStep[step])
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: FormData) => {
    // TODO: Replace with real lead gen API (Modernize/eLocal/QuinStreet)
    await new Promise((r) => setTimeout(r, 1200))
    console.log("Lead:", data)
    setSubmitted(true)
    setStep(5)
  }

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re All Set!</h3>
        <p className="text-gray-600 max-w-sm mx-auto mb-6 text-sm leading-relaxed">
          Local {watch("serviceType")} contractors will contact you within 24 hours with free, no-obligation quotes. Check your email for confirmation.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          <strong>Next step:</strong> Keep an eye on your phone — contractors typically call within 2 hours during business hours.
        </div>
      </div>
    )
  }

  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Step {step} of {STEPS.length - 1}</span>
          <span className="text-xs text-green-700 font-semibold">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step labels */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.slice(0, 4).map((s) => (
          <div key={s.id} className="flex flex-col items-center">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
              step > s.id
                ? "bg-green-600 text-white"
                : step === s.id
                  ? "bg-green-600 text-white ring-4 ring-green-100"
                  : "bg-gray-100 text-gray-400"
            )}>
              {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
            </div>
            <span className={cn("text-xs mt-1 hidden sm:block", step >= s.id ? "text-green-700 font-medium" : "text-gray-400")}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* STEP 1: Email */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Start with your email</h3>
            <p className="text-gray-500 text-sm mb-4">We&apos;ll send your quotes here. No spam, ever.</p>
            <input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
              <Lock className="w-3 h-3" />
              Your information is secure and never sold to third parties.
            </div>
          </div>
        )}

        {/* STEP 2: Service Type */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">What do you need?</h3>
            <p className="text-gray-500 text-sm mb-4">Select the service you&apos;re most interested in.</p>
            <div className="grid grid-cols-2 gap-3">
              {SERVICE_OPTIONS.map(({ value, label, sublabel, icon: Icon, color }) => (
                <label key={value} className={cn("flex flex-col items-center gap-2 border-2 rounded-xl py-4 px-3 cursor-pointer transition-all", color)}>
                  <input type="radio" value={value} {...register("serviceType")} className="sr-only" />
                  <Icon className="w-6 h-6 text-gray-600" />
                  <span className="font-semibold text-sm text-gray-900">{label}</span>
                  <span className="text-xs text-green-700 font-medium">{sublabel}</span>
                </label>
              ))}
            </div>
            {errors.serviceType && <p className="text-red-500 text-xs mt-2">{errors.serviceType.message}</p>}
          </div>
        )}

        {/* STEP 3: Property Info */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Tell us about your home</h3>
              <p className="text-gray-500 text-sm mb-4">This helps us match you with the right contractors.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do you own your home?</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ v: "own", l: "Yes, I own it" }, { v: "rent", l: "No, I rent" }].map(({ v, l }) => (
                  <label key={v} className="flex items-center justify-center border-2 border-gray-200 rounded-xl py-3 cursor-pointer text-sm font-medium has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                    <input type="radio" value={v} {...register("homeOwnership")} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
              {errors.homeOwnership && <p className="text-red-500 text-xs mt-1">Please select one</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home size (sq ft)?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: "under1500", l: "Under 1,500" },
                  { v: "1500to2500", l: "1,500–2,500" },
                  { v: "over2500", l: "Over 2,500" },
                ].map(({ v, l }) => (
                  <label key={v} className="flex items-center justify-center border-2 border-gray-200 rounded-xl py-3 cursor-pointer text-xs text-center px-1 has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                    <input type="radio" value={v} {...register("homeSize")} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
              {errors.homeSize && <p className="text-red-500 text-xs mt-1">Please select one</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">When was your home built?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: "before1980", l: "Before 1980" },
                  { v: "1980to2000", l: "1980–2000" },
                  { v: "after2000", l: "After 2000" },
                ].map(({ v, l }) => (
                  <label key={v} className="flex items-center justify-center border-2 border-gray-200 rounded-xl py-3 cursor-pointer text-xs text-center px-1 has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                    <input type="radio" value={v} {...register("yearBuilt")} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
              {errors.yearBuilt && <p className="text-red-500 text-xs mt-1">Please select one</p>}
            </div>
          </div>
        )}

        {/* STEP 4: Contact */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Almost done! How can contractors reach you?</h3>
              <p className="text-gray-500 text-sm mb-4">Up to 3 local pros will contact you with free quotes.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input {...register("name")} placeholder="Jane Smith" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-sm" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input {...register("phone")} type="tel" placeholder="(555) 000-0000" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-sm" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input {...register("zip")} placeholder="90210" maxLength={5} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-sm" />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip.message}</p>}
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-500 leading-relaxed">
              <Shield className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
              By submitting, you agree to our{" "}
              <a href="/terms" className="underline hover:text-gray-700">Terms</a> and{" "}
              <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>.
              TCPA compliant. Completely free, no obligation.
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 text-sm"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 text-sm"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 disabled:opacity-60 text-sm"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <>Get My Free Quotes <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>

        {step === 4 && (
          <p className="text-center text-xs text-green-700 font-medium">
            🔥 {leadsCount.toLocaleString()} people got quotes this week
          </p>
        )}
      </form>
    </div>
  )
}
