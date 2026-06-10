"use client"

import { useState } from "react"
import { DollarSign, Search, CheckCircle, ExternalLink } from "lucide-react"
import ZipCodeForm from "@/components/lead-gen/ZipCodeForm"

interface Rebate {
  name: string
  type: string
  amount: string
  eligibility: string
  expires: string
  link?: string
}

const REBATES_BY_STATE: Record<string, Rebate[]> = {
  "All States": [
    {
      name: "Federal residential energy credits",
      type: "Federal",
      amount: "Changed after 2025",
      eligibility: "Verify prior-year claim or carryforward eligibility",
      expires: "New 2026 projects should verify IRS rules",
    },
    {
      name: "Utility efficiency rebates",
      type: "Utility",
      amount: "Varies by ZIP and utility",
      eligibility: "HVAC, insulation, windows, thermostats, and audits may qualify",
      expires: "Often limited funding",
    },
    {
      name: "DOE Home Energy Rebates",
      type: "State-administered",
      amount: "Varies by state and income",
      eligibility: "State program rules, household income, and project type",
      expires: "Rollout varies by state",
    },
  ],
  California: [
    {
      name: "California Solar Initiative (CSI)",
      type: "State",
      amount: "Varies by utility",
      eligibility: "PG&E, SCE, SDG&E customers",
      expires: "Limited funding",
    },
    {
      name: "Self-Generation Incentive Program (SGIP)",
      type: "State",
      amount: "$200–$1,000/kWh battery",
      eligibility: "Solar+battery storage systems",
      expires: "Ongoing (limited funds)",
    },
    {
      name: "Property Tax Exclusion for Solar",
      type: "State",
      amount: "Solar value excluded from property tax",
      eligibility: "All homeowners with solar",
      expires: "2025",
    },
  ],
  Texas: [
    {
      name: "Austin Energy Rebate",
      type: "Utility",
      amount: "$2,500",
      eligibility: "Austin Energy customers",
      expires: "Varies",
    },
    {
      name: "CPS Energy Solar Rebate",
      type: "Utility",
      amount: "$2,500",
      eligibility: "CPS Energy customers (San Antonio)",
      expires: "Limited funding",
    },
    {
      name: "Texas Property Tax Exemption",
      type: "State",
      amount: "Solar value excluded from property tax",
      eligibility: "All TX solar homeowners",
      expires: "Permanent",
    },
  ],
  Florida: [
    {
      name: "Florida Net Metering",
      type: "Utility",
      amount: "Credit for excess solar production",
      eligibility: "All FL utility customers with solar",
      expires: "Policy under review",
    },
    {
      name: "FL Sales Tax Exemption",
      type: "State",
      amount: "6% sales tax waived",
      eligibility: "All solar equipment purchases",
      expires: "Permanent",
    },
    {
      name: "FL Property Tax Exemption",
      type: "State",
      amount: "Solar value excluded from property tax",
      eligibility: "All FL solar homeowners",
      expires: "Permanent",
    },
  ],
  Arizona: [
    {
      name: "AZ Residential Solar Tax Credit",
      type: "State",
      amount: "25% of cost, up to $1,000",
      eligibility: "AZ homeowners purchasing solar",
      expires: "Ongoing",
    },
    {
      name: "APS Solar Incentive",
      type: "Utility",
      amount: "Varies",
      eligibility: "APS customers",
      expires: "Limited funding",
    },
    {
      name: "AZ Sales Tax Exemption",
      type: "State",
      amount: "Solar equipment tax-exempt",
      eligibility: "All AZ solar purchases",
      expires: "Permanent",
    },
  ],
  "New York": [
    {
      name: "NY-Sun Incentive Program",
      type: "State",
      amount: "$0.20–$0.40/watt",
      eligibility: "NY homeowners with solar",
      expires: "Ongoing (limited budget)",
    },
    {
      name: "NY State Solar Tax Credit",
      type: "State",
      amount: "25% of cost, up to $5,000",
      eligibility: "NY residents purchasing solar",
      expires: "Ongoing",
    },
    {
      name: "NY-Sun Con Edison Program",
      type: "Utility",
      amount: "Additional $0.20/watt",
      eligibility: "Con Edison customers",
      expires: "Limited funding",
    },
  ],
}

const typeColors: Record<string, string> = {
  Federal: "bg-blue-50 text-blue-700",
  State: "bg-green-50 text-green-700",
  Utility: "bg-purple-50 text-purple-700",
}

export default function RebatesClient() {
  const [selectedState, setSelectedState] = useState("All States")
  const states = Object.keys(REBATES_BY_STATE)
  const rebates = [
    ...REBATES_BY_STATE["All States"],
    ...(selectedState !== "All States" ? (REBATES_BY_STATE[selectedState] || []) : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 py-12 px-4 text-white text-center">
        <DollarSign className="w-10 h-10 mx-auto mb-3 text-green-200" />
        <h1 className="text-3xl font-extrabold mb-2">Energy Rebate & Incentive Finder</h1>
        <p className="text-green-100 text-sm max-w-xl mx-auto">
          Find every federal, state, and utility rebate available for solar, HVAC, windows, and home energy improvements.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* State selector */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Your State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            <strong>{rebates.length}</strong> rebates found for{" "}
            <span className="text-green-700 font-semibold">{selectedState}</span>
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {Object.entries(typeColors).map(([type, color]) => (
              <span key={type} className={`px-2 py-0.5 rounded-full font-medium ${color}`}>{type}</span>
            ))}
          </div>
        </div>

        {/* Rebate cards */}
        <div className="space-y-4">
          {rebates.map((rebate) => (
            <div key={rebate.name} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <h3 className="font-bold text-gray-900 text-sm">{rebate.name}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${typeColors[rebate.type] || "bg-gray-100 text-gray-600"}`}>
                  {rebate.type}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs pl-8">
                <div>
                  <p className="text-gray-500 mb-0.5">Amount</p>
                  <p className="font-semibold text-green-700">{rebate.amount}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Eligibility</p>
                  <p className="font-medium text-gray-700">{rebate.eligibility}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Expires</p>
                  <p className="font-medium text-gray-700">{rebate.expires}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Get a Free Quote That Maximizes Your Rebates
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            A local contractor will walk you through every incentive you qualify for and factor them into your quote.
          </p>
          <div className="flex justify-center">
            <ZipCodeForm />
          </div>
        </div>
      </div>
    </div>
  )
}
