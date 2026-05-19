import type { CityData } from "./cities"

// ─── Climate Zone Mapping ────────────────────────────────────────────────────
// DOE Climate Zone by state (simplified: hot/warm/mixed/cold)
type ClimateProfile = "hot" | "warm" | "mixed" | "cold"

const STATE_CLIMATE: Record<string, ClimateProfile> = {
  Hawaii: "hot",
  Florida: "hot",
  Louisiana: "hot",
  Mississippi: "hot",
  Alabama: "hot",
  Texas: "hot",
  Arizona: "hot",
  "New Mexico": "hot",
  Georgia: "warm",
  "South Carolina": "warm",
  "North Carolina": "warm",
  Virginia: "warm",
  Tennessee: "warm",
  Arkansas: "warm",
  Oklahoma: "warm",
  California: "warm",
  Nevada: "warm",
  Maryland: "mixed",
  Delaware: "mixed",
  "West Virginia": "mixed",
  Missouri: "mixed",
  Kansas: "mixed",
  Utah: "mixed",
  Colorado: "mixed",
  Oregon: "mixed",
  Washington: "mixed",
  Idaho: "mixed",
  "New Jersey": "mixed",
  Pennsylvania: "cold",
  Ohio: "cold",
  Indiana: "cold",
  Illinois: "cold",
  Michigan: "cold",
  Wisconsin: "cold",
  Iowa: "cold",
  Nebraska: "cold",
  "South Dakota": "cold",
  "North Dakota": "cold",
  Montana: "cold",
  Wyoming: "cold",
  "New York": "cold",
  Connecticut: "cold",
  "Rhode Island": "cold",
  Massachusetts: "cold",
  "New Hampshire": "cold",
  Vermont: "cold",
  Maine: "cold",
  Minnesota: "cold",
}

function getClimate(state: string): ClimateProfile {
  return STATE_CLIMATE[state] ?? "mixed"
}

// ─── Windows Data ─────────────────────────────────────────────────────────────
export interface WindowsCityData {
  avgCost: string
  avgSavings: string
  recommendedType: string
  uFactor: string
  climateNote: string
  incentives: string[]
  commonIssues: string[]
  payback: string
}

const STATE_WINDOW_REBATES: Record<string, string[]> = {
  California:    ["CPUC income-qualified weatherization rebates", "Some local utility window rebates"],
  "New York":    ["NY Green Bank financing for window upgrades", "Con Edison weatherization program"],
  Massachusetts: ["Mass Save HEAT Loan (0% financing for window upgrades)", "MassSave rebates up to $150/window"],
  Connecticut:   ["Energize CT rebates for ENERGY STAR windows", "CT Green Bank low-interest loans"],
  "New Jersey":  ["NJ Clean Energy Program window rebates", "PSE&G weatherization rebates"],
  Texas:         ["Oncor and CenterPoint weatherization programs", "Some city-level rebates (Austin, San Antonio)"],
  Illinois:      ["ComEd and Peoples Energy efficiency rebates", "IL DCEO weatherization program"],
  Michigan:      ["Consumers Energy and DTE Energy window rebates", "MI Saves low-interest financing"],
  Oregon:        ["Energy Trust of Oregon window rebates up to $100/window", "Pacific Power weatherization incentives"],
  Washington:    ["Puget Sound Energy and PSE rebates for windows", "WA DOC weatherization assistance"],
  Colorado:      ["Xcel Energy efficiency rebates", "CO Energy Office weatherization grants"],
}

export function getWindowsData(city: CityData): WindowsCityData {
  const climate = getClimate(city.state)
  const stateRebates = STATE_WINDOW_REBATES[city.state] ?? []

  const base = {
    incentives: [
      "Federal 30% IRA tax credit, up to $600 for ENERGY STAR windows",
      "Up to $250/door for qualifying exterior doors",
      ...stateRebates,
    ],
  }

  if (climate === "hot") {
    return {
      ...base,
      avgCost: "$350–$750 per window installed",
      avgSavings: "$250–$450/year",
      recommendedType: "Low-E Double-Pane",
      uFactor: "U-0.30 or lower, SHGC ≤ 0.25",
      climateNote: `${city.name}'s hot climate means solar heat gain is the primary concern. Low-E coatings with low Solar Heat Gain Coefficient (SHGC ≤ 0.25) block summer heat while maintaining natural light. Double-pane with argon fill is the standard recommendation — triple-pane rarely pays off in climates without severe winters.`,
      commonIssues: ["Solar heat gain driving cooling costs", "UV damage to interior furnishings", "Condensation on older single-pane glass"],
      payback: "5–9 years",
    }
  }

  if (climate === "warm") {
    return {
      ...base,
      avgCost: "$350–$750 per window installed",
      avgSavings: "$250–$400/year",
      recommendedType: "Low-E Double-Pane",
      uFactor: "U-0.30 or lower, SHGC 0.25–0.40",
      climateNote: `${city.name}'s mixed climate means windows should balance summer cooling and winter heating. Low-E double-pane with moderate SHGC (0.25–0.40) works well year-round. South-facing windows benefit from slightly higher SHGC to capture passive solar warmth in winter.`,
      commonIssues: ["Drafts around aging window frames", "Single-pane heat loss in cooler months", "Condensation between panes (failed seal)"],
      payback: "6–10 years",
    }
  }

  if (climate === "mixed") {
    return {
      ...base,
      avgCost: "$380–$800 per window installed",
      avgSavings: "$280–$450/year",
      recommendedType: "Double or Triple-Pane Low-E",
      uFactor: "U-0.27 or lower, SHGC 0.25–0.40",
      climateNote: `${city.name}'s mixed heating and cooling climate makes window efficiency important year-round. ENERGY STAR Most Efficient windows (U-factor ≤ 0.20) can qualify for the $600 IRA tax credit. Double-pane with low-E is the minimum; triple-pane is worth considering for north-facing exposures.`,
      commonIssues: ["Drafts and air leakage at frames", "Moisture infiltration around casings", "Single-pane heat loss adding to heating bills"],
      payback: "5–8 years",
    }
  }

  // cold
  return {
    ...base,
    avgCost: "$400–$900 per window installed",
    avgSavings: "$350–$600/year",
    recommendedType: "Triple-Pane Low-E",
    uFactor: "U-0.20 or lower, SHGC 0.35–0.55",
    climateNote: `${city.name}'s cold winters make high-performance windows a high-ROI upgrade. Triple-pane windows with U-factor ≤ 0.20 qualify for the IRA's highest credit tier. Higher SHGC (0.35–0.55) on south-facing windows captures passive solar heat in winter, meaningfully reducing heating costs.`,
    commonIssues: ["Ice buildup and condensation on single-pane glass", "Air leakage through aging frames", "Cold glass causing comfort complaints near windows"],
    payback: "4–7 years",
  }
}

// ─── Insulation Data ──────────────────────────────────────────────────────────
export interface InsulationCityData {
  recommendedRValue: string
  avgAtticCost: string
  avgAnnualSavings: string
  climateNote: string
  incentives: string[]
  commonIssues: string[]
  payback: string
  topProject: string
}

const STATE_INSULATION_REBATES: Record<string, string[]> = {
  California:    ["CPUC Low Income Weatherization Program", "Local utility insulation rebates"],
  "New York":    ["NY Green Bank weatherization financing", "NYSERDA insulation rebates up to $0.10/sq ft"],
  Massachusetts: ["Mass Save rebates for attic insulation (up to $2,000)", "Mass Save HEAT Loan (0% financing)"],
  Connecticut:   ["Energize CT insulation rebates up to $1,500", "CT Green Bank efficiency loans"],
  "New Jersey":   ["NJ Clean Energy weatherization rebates", "PSE&G energy-efficiency programs"],
  Michigan:      ["MI Saves weatherization loans", "Consumers Energy and DTE insulation rebates"],
  Illinois:      ["ComEd and Peoples Energy insulation rebates", "IL Home Weatherization Assistance Program"],
  Oregon:        ["Energy Trust of Oregon insulation rebates up to $800", "Pacific Power efficiency program"],
  Washington:    ["Puget Sound Energy insulation rebates", "Seattle City Light weatherization incentives"],
  Colorado:      ["Xcel Energy insulation rebates", "CO Energy Office low-income weatherization"],
  Minnesota:     ["CenterPoint Energy and Xcel insulation rebates", "MN Commerce weatherization assistance"],
}

export function getInsulationData(city: CityData): InsulationCityData {
  const climate = getClimate(city.state)
  const stateRebates = STATE_INSULATION_REBATES[city.state] ?? []

  const base = {
    incentives: [
      "Federal IRA 30% tax credit for insulation (up to $1,200/year)",
      "30% credit for air sealing materials (within same $1,200 cap)",
      "Home energy audit 30% credit up to $150",
      ...stateRebates,
    ],
  }

  if (climate === "hot") {
    return {
      ...base,
      recommendedRValue: "R-38 to R-60 (attic), R-13 to R-15 (walls)",
      avgAtticCost: "$1,000–$2,800",
      avgAnnualSavings: "$200–$400",
      climateNote: `In ${city.name}'s hot climate, attic insulation is the single highest-impact upgrade. Heat pours through an under-insulated attic ceiling, forcing your AC to work harder. The DOE recommends R-38 to R-49 for most ${city.stateAbbr} attics, with radiant barriers adding further benefit in extreme heat. Bringing a 1,500 sq ft attic from R-11 to R-49 typically costs $1,200–$2,400 and pays back in 3–6 years.`,
      commonIssues: ["Attic heat gain driving cooling costs", "Duct leaks in hot attics increasing AC load", "Insufficient attic ventilation trapping heat"],
      payback: "3–6 years",
      topProject: "Attic blown-in insulation + radiant barrier",
    }
  }

  if (climate === "warm") {
    return {
      ...base,
      recommendedRValue: "R-38 to R-49 (attic), R-13 to R-19 (walls)",
      avgAtticCost: "$1,000–$2,800",
      avgAnnualSavings: "$200–$450",
      climateNote: `${city.name} has both cooling and heating seasons to contend with. Attic insulation to R-38 or R-49 reduces cooling costs in summer and heating costs in winter — making it the best single investment. Air sealing around electrical boxes, plumbing penetrations, and attic hatches often saves as much as the insulation itself and costs very little.`,
      commonIssues: ["Under-insulated attics from original construction", "Air leaks at top plates and ceiling penetrations", "Unsealed recessed lighting adding heat gain"],
      payback: "3–7 years",
      topProject: "Air sealing + blown-in attic insulation to R-49",
    }
  }

  if (climate === "mixed") {
    return {
      ...base,
      recommendedRValue: "R-49 to R-60 (attic), R-15 to R-21 (walls)",
      avgAtticCost: "$1,200–$3,200",
      avgAnnualSavings: "$250–$500",
      climateNote: `${city.name}'s four-season climate means insulation pays dividends year-round. The DOE recommends R-49 for attics in this climate zone. Rim joists — where the floor framing meets the foundation walls — are one of the highest-return air sealing projects and often overlooked. Spray foam on rim joists ($400–$900) typically pays back in 2–4 years.`,
      commonIssues: ["Air leakage at rim joists", "Under-insulated crawl spaces causing cold floors", "Attic bypasses from old construction"],
      payback: "3–6 years",
      topProject: "Attic insulation to R-49 + rim joist spray foam",
    }
  }

  // cold
  return {
    ...base,
    recommendedRValue: "R-49 to R-60 (attic), R-19 to R-21 (walls)",
    avgAtticCost: "$1,400–$3,500",
    avgAnnualSavings: "$300–$600",
    climateNote: `${city.name}'s cold winters mean heating costs dominate — and a poorly insulated home is expensive to heat. The DOE recommends R-49 to R-60 for attics in cold climate zones. Bringing a typical ${city.name} home up to R-49 can cut heating costs by 15–20%. Crawl space encapsulation ($3,000–$7,000) is a transformative upgrade for homes with cold floors and moisture issues.`,
    commonIssues: ["Heat loss through under-insulated attic", "Ice dams from poor attic air sealing", "Freezing pipes in uninsulated crawl spaces"],
    payback: "2–5 years",
    topProject: "Attic insulation to R-60 + air sealing package",
  }
}
