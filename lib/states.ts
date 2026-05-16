export interface StateData {
  slug: string
  name: string
  avgCost: string
  avgSavings: string
  payback: string
  incentives: string[]
  sunHours: string
  topCities: string[]
}

export const STATES: Record<string, StateData> = {
  california: {
    slug: "california",
    name: "California",
    avgCost: "$14,000–$22,000",
    avgSavings: "$1,800–$2,400/yr",
    payback: "5–7 years",
    incentives: ["Federal 30% Tax Credit", "California Solar Initiative", "Net Energy Metering (NEM 3.0)", "Property Tax Exclusion"],
    sunHours: "5.5–6.5 peak hours/day",
    topCities: ["Los Angeles", "San Diego", "San Jose", "Sacramento", "Fresno"],
  },
  texas: {
    slug: "texas",
    name: "Texas",
    avgCost: "$12,000–$20,000",
    avgSavings: "$1,500–$2,000/yr",
    payback: "6–9 years",
    incentives: ["Federal 30% Tax Credit", "Property Tax Exemption", "Austin Energy Rebate", "Various Utility Rebates"],
    sunHours: "5.0–6.0 peak hours/day",
    topCities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  },
  florida: {
    slug: "florida",
    name: "Florida",
    avgCost: "$11,000–$18,000",
    avgSavings: "$1,400–$1,900/yr",
    payback: "6–8 years",
    incentives: ["Federal 30% Tax Credit", "Florida Solar Energy Center Rebate", "Net Metering", "Sales Tax Exemption"],
    sunHours: "5.0–5.5 peak hours/day",
    topCities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
  },
  arizona: {
    slug: "arizona",
    name: "Arizona",
    avgCost: "$11,000–$17,000",
    avgSavings: "$1,600–$2,100/yr",
    payback: "5–7 years",
    incentives: ["Federal 30% Tax Credit", "AZ Residential Tax Credit (25%)", "APS/SRP Rebates", "Sales Tax Exemption"],
    sunHours: "5.5–7.0 peak hours/day",
    topCities: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Chandler"],
  },
  nevada: {
    slug: "nevada",
    name: "Nevada",
    avgCost: "$12,000–$19,000",
    avgSavings: "$1,500–$2,000/yr",
    payback: "6–8 years",
    incentives: ["Federal 30% Tax Credit", "NV Energy Rebate Program", "Net Metering", "Property Tax Exemption"],
    sunHours: "5.5–6.5 peak hours/day",
    topCities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"],
  },
  georgia: {
    slug: "georgia",
    name: "Georgia",
    avgCost: "$13,000–$20,000",
    avgSavings: "$1,200–$1,600/yr",
    payback: "8–10 years",
    incentives: ["Federal 30% Tax Credit", "Georgia Power Incentives", "Net Metering"],
    sunHours: "4.5–5.5 peak hours/day",
    topCities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"],
  },
  "north-carolina": {
    slug: "north-carolina",
    name: "North Carolina",
    avgCost: "$12,000–$19,000",
    avgSavings: "$1,200–$1,700/yr",
    payback: "7–9 years",
    incentives: ["Federal 30% Tax Credit", "Duke Energy Rebate", "Net Metering", "Property Tax Exemption"],
    sunHours: "4.5–5.0 peak hours/day",
    topCities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
  },
  "new-jersey": {
    slug: "new-jersey",
    name: "New Jersey",
    avgCost: "$13,000–$21,000",
    avgSavings: "$1,300–$1,800/yr",
    payback: "7–9 years",
    incentives: ["Federal 30% Tax Credit", "NJ Clean Energy Rebate", "SREC Program", "Sales Tax Exemption"],
    sunHours: "4.0–4.5 peak hours/day",
    topCities: ["Newark", "Jersey City", "Trenton", "Camden", "Edison"],
  },
  "new-york": {
    slug: "new-york",
    name: "New York",
    avgCost: "$14,000–$23,000",
    avgSavings: "$1,100–$1,600/yr",
    payback: "8–11 years",
    incentives: ["Federal 30% Tax Credit", "NY-Sun Initiative ($0.20/W)", "NY Solar Tax Credit (25%)", "Net Metering"],
    sunHours: "3.5–4.5 peak hours/day",
    topCities: ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
  },
  colorado: {
    slug: "colorado",
    name: "Colorado",
    avgCost: "$12,000–$20,000",
    avgSavings: "$1,400–$1,900/yr",
    payback: "6–8 years",
    incentives: ["Federal 30% Tax Credit", "Xcel Energy Rebate", "Colorado Energy Office Incentives", "Net Metering"],
    sunHours: "4.5–5.5 peak hours/day",
    topCities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
  },
}

export const STATE_SLUGS = Object.keys(STATES)

export function getStateBySlug(slug: string): StateData | undefined {
  return STATES[slug]
}
