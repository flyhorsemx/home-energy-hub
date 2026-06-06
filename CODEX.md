# CleverHomeEnergy — Complete Technical Reference for Codex

> This document is the single source of truth for AI agents working on this codebase.
> Read this before writing any code. All environment variables, routes, data schemas, APIs, and business context are documented here.

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| Site name | CleverHomeEnergy |
| Domain | https://cleverhomeenergy.com |
| GitHub repo | https://github.com/flyhorsemx/home-energy-hub |
| Vercel project | `home-energy-hub` (team: flyhorsemxs-projects) |
| Local root | `C:\Users\mx\home-energy-hub` |
| Bash path | `/c/Users/mx/home-energy-hub` |
| Framework | Next.js 16.2.6 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + @tailwindcss/typography |
| Hosting | Vercel Free Plan |
| DNS | Cloudflare (A record → 76.76.21.21, orange cloud OFF) |

**Business model:** US home energy improvement Lead Gen site (solar, HVAC, roofing, windows, insulation, water heating). Three revenue streams:
1. **Lead Gen** (primary) — ZIP → 5-step quote funnel → partner networks (Networx, Modernize, QuinStreet — pending approval)
2. **Affiliate** (secondary) — Amazon Associates (tag: `cleverhomeenergy-20`) product cards in blog posts
3. **Display Ads** (future) — AdSense placeholders ready, awaiting ca-pub ID approval

---

## 2. Deploy Command

```bash
cd /c/Users/mx/home-energy-hub && npx vercel deploy --prod --yes
```

Always run from bash (Git Bash / WSL). Do NOT use Windows cmd/PowerShell paths.

---

## 3. Environment Variables

### Vercel Dashboard (Production Secrets — NOT in `.env` files)

| Variable | Value / Notes |
|----------|---------------|
| `RESEND_API_KEY` | Set in Vercel dashboard. Sends lead notification emails via Resend API. |
| `LEAD_WEBHOOK_URL` | Zapier webhook URL. Fires on every lead submission → Google Sheets + email fallback. |
| `ELOCAL_API_KEY` | NOT yet set. Enable when eLocal partnership is approved. |
| `ELOCAL_API_URL` | Defaults to `https://api.elocal.com/v1/leads` if not set. |
| `ELOCAL_PUBLISHER_CODE` | NOT yet set. Set alongside `ELOCAL_API_KEY`. |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (format: `G-XXXXXXXXXX`). Set in Vercel dashboard. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID. Set in Vercel dashboard. |

### Local Dev Files

**`.env.local`** (localhost only, gitignored):
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**`.env.production`** (committed, non-secret):
```
NEXT_PUBLIC_SITE_URL=https://cleverhomeenergy.com
```

### Key Config Constants (`lib/config.ts`)

```typescript
export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || "https://cleverhomeenergy.com"
export const SITE_NAME = "CleverHomeEnergy"
export const SITE_DESC = "Get free solar, HVAC, roofing, and window quotes from vetted local contractors. Cut your energy bills — trusted by 47,000+ American homeowners."
```

---

## 4. Site Architecture

### Page Count (as of 2026-06-06)
| Type | Count |
|------|-------|
| Solar state pages | 50 |
| HVAC city pages | 100 |
| HVAC state pages | 50 |
| Roofing city pages | 100 |
| Roofing state pages | 50 |
| Windows city pages | 100 |
| Insulation city pages | 100 |
| Blog posts | 65 |
| News articles | 19 |
| Static/hub pages | ~30 |
| **Total** | **~674** |

### Route Map

```
app/
├── page.tsx                          # Home page
├── layout.tsx                        # Root layout (GA4, MetaPixel, TrustedForm)
├── sitemap.ts                        # Dynamic XML sitemap (all ~674 pages)
├── robots.ts                         # Allows all, disallows /api/
├── feed.xml/route.ts                 # RSS feed
├── solar/
│   ├── page.tsx                      # Solar hub
│   └── [state]/page.tsx              # 50 solar state pages (e.g. /solar/texas)
├── hvac/
│   ├── page.tsx                      # HVAC hub
│   └── [slug]/page.tsx               # 150 pages: 100 city + 50 state (combined route)
├── roofing/
│   ├── page.tsx                      # Roofing hub
│   └── [slug]/page.tsx               # 150 pages: 100 city + 50 state (combined route)
├── windows/
│   ├── page.tsx                      # Windows hub
│   └── [city]/page.tsx               # 100 city pages
├── insulation/
│   ├── page.tsx                      # Insulation hub
│   └── [city]/page.tsx               # 100 city pages
├── water-heating/
│   └── page.tsx                      # Water heating hub (no city pages yet)
├── blog/
│   ├── page.tsx                      # Blog index
│   ├── [slug]/page.tsx               # Individual blog posts (MDX)
│   └── category/[category]/page.tsx  # Category filter pages
├── news/
│   ├── page.tsx                      # News index
│   ├── [slug]/page.tsx               # Individual news articles (MDX)
│   └── category/[category]/page.tsx  # Category filter pages
├── quotes/
│   └── [category]/page.tsx           # High-intent quote pages per service
├── calculator/page.tsx               # Energy savings calculator
├── tools/
│   ├── solar-roi/page.tsx
│   ├── rebates/page.tsx
│   ├── upgrade-planner/page.tsx
│   ├── energy-comparison/page.tsx
│   ├── hvac-size/page.tsx
│   └── roofing-materials/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
└── api/
    └── submit-lead/route.ts          # Lead POST endpoint
```

### Critical Routing Pattern: Combined `[slug]` Routes

HVAC and Roofing both use a **single `[slug]` dynamic route** that handles both city slugs AND state slugs. This was necessary to avoid Next.js "Ambiguous route" build errors that occur when two `[param]` directories match the same URL pattern.

**Pattern in `app/hvac/[slug]/page.tsx` and `app/roofing/[slug]/page.tsx`:**

```typescript
export async function generateStaticParams() {
  return [
    ...CITY_SLUGS.map((slug) => ({ slug })),
    ...STATE_SLUGS.map((slug) => ({ slug })),  // use service-specific slugs
  ]
}

export default async function Page({ params }) {
  const { slug } = await params
  const cityData = getCityBySlug(slug)
  if (cityData) { /* render city page */ return ... }
  const stateData = getStateBySlug(slug)
  if (stateData) { /* render state page */ return ... }
  notFound()
}
```

**DO NOT** create separate `[city]` and `[state]` directories under the same parent route — it causes build failure.

---

## 5. Data Library Files

### `lib/config.ts`
Site constants. See Section 3.

### `lib/states.ts` — Solar States
```typescript
interface StateData {
  slug: string          // "texas"
  name: string          // "Texas"
  avgCost: string       // "$11,000–$18,000"
  avgSavings: string    // "$1,200–$1,800/yr"
  payback: string       // "7–10 years"
  incentives: string[]
  sunHours: string      // "5.5–6.5 peak hours/day"
  topCities: string[]
}
exports: STATES, STATE_SLUGS (string[]), getStateBySlug(slug)
```
Used by: `/solar/[state]/page.tsx` and as the `base` state for HVAC/Roofing state pages.

### `lib/states-hvac.ts` — HVAC States
```typescript
interface HVACStateData {
  slug: string
  avgInstallCost: string    // "$5,000–$9,500"
  avgAnnualSavings: string  // "$700–$1,200/yr"
  recommendedSystem: string // "Heat pump (20+ SEER2)"
  climateNote: string       // 1-2 sentence climate explanation
  incentives: string[]
  avgPayback: string        // "7–10 years"
}
exports: HVAC_STATES, HVAC_STATE_SLUGS (string[]), getHVACStateBySlug(slug)
```
All 50 states. Used by `/hvac/[slug]/page.tsx` (state branch).

### `lib/states-roofing.ts` — Roofing States
```typescript
interface RoofingStateData {
  slug: string
  avgCost: string       // "$7,500–$14,000"
  avgLifespan: string   // "20–25 years"
  topMaterial: string   // "Architectural asphalt shingles"
  climateNote: string   // 1-2 sentence material rationale
  incentives: string[]  // state/utility rebates + insurance discounts
}
exports: ROOFING_STATES, ROOFING_STATE_SLUGS (string[]), getRoofingStateBySlug(slug)
```
All 50 states. Used by `/roofing/[slug]/page.tsx` (state branch).

### `lib/cities.ts` — 100 US Cities
```typescript
interface CityData {
  slug: string         // "houston-tx"
  name: string         // "Houston"
  state: string        // "Texas"
  stateAbbr: string    // "TX"
  roofing: {
    avgCost: string
    avgLifespan: string
    topMaterial: string
    climateNote: string
    commonIssues: string[]
    incentives: string[]
  }
  hvac: {
    avgInstallCost: string
    avgAnnualSavings: string
    recommendedSystem: string
    climateNote: string
    incentives: string[]
    avgPayback: string
  }
}
exports: CITIES (Record<string, CityData>), CITY_SLUGS (string[]), getCityBySlug(slug)
```
2211 lines. City slugs format: `"city-stateabbr"` (e.g. `"phoenix-az"`, `"chicago-il"`).

### `lib/city-services.ts` — Windows & Insulation Data
Climate-zone-based data (hot/warm/mixed/cold) for windows and insulation city pages.

### `lib/mdx.ts` — MDX Content Reader
```typescript
interface FaqItem { q: string; a: string }

interface PostMeta {
  title: string
  date: string        // "2025-06-05" ISO date string
  excerpt: string
  category?: string
  author?: string
  readTime?: string
  keywords?: string[]
  faq?: FaqItem[]     // optional FAQ array for FAQPage JSON-LD
  slug: string
}

getAllPosts(type: "blog" | "news"): PostMeta[]     // sorted by date desc
getPostBySlug(type, slug): { meta, content } | null
```

---

## 6. API Endpoints

### `POST /api/submit-lead`

Lead submission handler. Flow:
1. Validate with Zod schema
2. Try eLocal API (if `ELOCAL_API_KEY` set)
3. Fire Zapier webhook non-blocking (if `LEAD_WEBHOOK_URL` set)
4. Send Resend email notification (if `RESEND_API_KEY` set)

**Request body:**
```typescript
{
  email: string                  // valid email
  serviceType: "solar" | "hvac" | "roofing" | "windows" | "insulation" | "water-heating"
  homeOwnership: "own" | "rent"
  homeSize: "under1500" | "1500to2500" | "over2500"
  yearBuilt: "before1980" | "1980to2000" | "after2000"
  name: string                   // min 2 chars
  phone: string                  // min 10 chars
  zip: string                    // exactly 5 digits
  trustedFormCertUrl?: string    // TCPA compliance (TrustedForm)
  ipAddress?: string
  userAgent?: string
}
```

**Important Zod v4 gotcha:** Zod v4 `.enum()` does NOT accept `{ required_error }` option. Pass enum values as plain array only: `z.enum(["a", "b"])`.

**Resend sender:** `"CleverHomeEnergy Leads <onboarding@resend.dev>"` → `flyhorsemx@gmail.com`

**eLocal API format:** `Authorization: Bearer {ELOCAL_API_KEY}`, POST to `https://api.elocal.com/v1/leads`

---

## 7. Components Reference

### Lead Gen Components

**`ZipCodeForm`** (`components/lead-gen/ZipCodeForm.tsx`)
- Props: `category: string`, `className?: string`
- ZIP input → redirects to multi-step form
- Fires Meta Pixel `Lead` event on submit
- Usage: `<ZipCodeForm category="roofing" />`
- Dark bg variant: `<ZipCodeForm category="roofing" className="[&_input]:bg-white [&_input]:text-gray-900" />`

**`MultiStepQuoteForm`** (`components/lead-gen/MultiStepQuoteForm.tsx`)
- 5-step form: service type → home info → contact → submit
- POSTs to `/api/submit-lead`
- Includes TrustedForm cert URL capture

**`InContentCTA`** (`components/lead-gen/InContentCTA.tsx`)
- In-article call-to-action box
- Props: `service: string`
- Usage in MDX: `<InContentCTA service="hvac" />`

**`NewsletterSignup`** (`components/lead-gen/NewsletterSignup.tsx`)
- Email capture component for sidebar/footer

### Content/Schema Components

**`CityPageJsonLd`** (`components/content/CityPageJsonLd.tsx`)
- Injects BreadcrumbList + Service + FAQPage JSON-LD
- Props: `cityName`, `stateAbbr`, `citySlug`, `service`, `serviceLabel`, `faqs: FaqItem[]`
- Used on ALL city pages (roofing, hvac — insulation/windows may differ)

**`ArticleJsonLd`** (`components/content/ArticleJsonLd.tsx`)
- Article schema for blog/news posts

**`AffiliateProduct`** (`components/content/AffiliateProduct.tsx`)
- Amazon affiliate product card for MDX blog posts
- Uses Amazon Associates tag: `cleverhomeenergy-20`

**`AdSlot`** (`components/content/AdSlot.tsx`)
- Placeholder for Google AdSense ads
- Currently shows placeholder (awaiting ca-pub ID)
- Located in Sidebar (×2)

**`AuthorBio`** (`components/content/AuthorBio.tsx`)
- Author bio block for blog posts

**`ProWarningAlert`** (`components/content/ProWarningAlert.tsx`)
- Safety/professional warning callout for DIY guides

### Analytics Components

**`GoogleAnalytics`** (`components/analytics/GoogleAnalytics.tsx`)
- Loaded in root layout
- Uses `NEXT_PUBLIC_GA_ID`

**`MetaPixel`** (`components/analytics/MetaPixel.tsx`)
- Meta/Facebook Pixel
- Uses `NEXT_PUBLIC_META_PIXEL_ID`
- Fires `Lead` event on form submit

**`TrustedForm`** (`components/analytics/TrustedForm.tsx`)
- TCPA compliance script (ActiveProspect TrustedForm)
- Captures certificate URL for lead submission

### Layout Components

**`components/layout/Sidebar`** — Contains tool links + 2× AdSlot
**`components/layout/Footer`** — Contact: `hello@cleverhomeenergy.com`

---

## 8. Content Structure (MDX)

### Blog Posts — `content/blog/*.mdx`

65 posts total. Frontmatter schema:
```yaml
---
title: "Post Title"
date: "2025-06-05"
excerpt: "Short description for cards and meta."
category: "hvac-maintenance"   # used in /blog/category/[category]
author: "CleverHomeEnergy Team"
readTime: "8 min read"
keywords: ["keyword1", "keyword2"]
faq:                           # optional, generates FAQPage JSON-LD
  - q: "Question?"
    a: "Answer."
---
```

**Blog categories:** `solar-diy`, `hvac-maintenance`, `energy-saving-tips`, `roofing`

### News Articles — `content/news/*.mdx`

19 articles total. Same frontmatter schema.

**News categories:** `solar-policy`, `rebates`, `home-tech`, `energy-costs`

### All 65 Blog Posts (current)

air-conditioner-replacement-cost, andersen-vs-pella-windows, attic-insulation-diy-guide, attic-insulation-guide, best-energy-efficient-windows, best-hvac-brands, best-roofing-brands, best-smart-thermostats-2025, best-solar-panel-brands, best-water-heaters-2025, blown-in-insulation-cost, carrier-vs-lennox-hvac, central-air-installation-cost, crawl-space-insulation-cost, double-vs-triple-pane-windows, ductless-mini-split-cost, energy-saving-tips-home, energy-star-window-tax-credit, ev-charger-installation-cost, furnace-replacement-cost, geothermal-heat-pump-cost, gutter-replacement-cost, heat-pump-cost-guide, heat-pump-maintenance-guide, heat-pump-vs-gas-furnace, heat-pump-water-heater-guide, heat-pump-water-heater-rebates, home-energy-audit-guide, home-insulation-cost, home-weatherization-guide, how-long-does-hvac-last, how-long-does-roof-last, how-much-do-solar-panels-save, how-solar-panels-work, how-to-choose-roofing-contractor, how-to-lower-electric-bill, hvac-filter-guide, hvac-installation-cost, hvac-maintenance-checklist, insulation-r-value-guide, ira-home-energy-tax-credits, metal-roof-vs-asphalt-shingles, mini-split-installation-guide, mini-split-vs-central-air, owens-corning-vs-gaf-roofing, roof-inspection-checklist, roof-repair-vs-replacement, roof-replacement-cost, roofing-material-comparison, signs-you-need-new-hvac, signs-you-need-new-roof, solar-battery-storage-cost, solar-financing-options, solar-installation-cost-by-state, solar-panel-maintenance-guide, solar-rebates-incentives, spray-foam-vs-fiberglass-insulation, sunpower-vs-panasonic-solar, tankless-vs-tank-water-heater, trane-vs-carrier-hvac, types-of-home-insulation, water-heater-replacement-cost, window-replacement-cost, window-replacement-guide, window-tax-credit-2025

### All 19 News Articles (current)

energy-efficient-windows-cost-2025, energy-star-new-standards-2025, ev-charger-rebates-2025, florida-solar-update-2025, geothermal-rebates-expansion-2025, hail-storm-season-roof-damage-2025, heat-pump-adoption-record-2025, heat-pump-rebates-states-2025, home-insurance-costs-2025, hvac-rebates-by-state, hvac-shortage-summer-2025, insulation-rebates-2025, ira-solar-tax-credit-2025, roofing-material-costs-2025, solar-battery-prices-falling-2025, solar-installation-backlog-summer-2025, solar-net-metering-changes-2025, utility-rates-rising-2025, window-rebates-2025

---

## 9. SEO & Schema Strategy

### Schemas in Use
- **FAQPage** — on all blog/news posts with `faq:` frontmatter; on all city pages
- **BreadcrumbList** — on all city pages via `CityPageJsonLd`
- **Service** — on all city pages via `CityPageJsonLd`
- **Article** — on blog/news posts via `ArticleJsonLd`

### Canonical URLs
All pages set canonical via `alternates: { canonical: \`${SITE_URL}/path\` }` in `generateMetadata`.

### Sitemap
Dynamic, generated at `/sitemap.xml`. Covers all ~674 pages with appropriate priorities:
- Hub pages: 0.95
- State/city pages: 0.85
- Blog: 0.7
- News: 0.8
- Tools: 0.8

### Key SEO Topics
- IRA / 25C / 30% federal tax credits (central content pillar)
- HEEHRA low-income rebates
- State-by-state incentive data
- Local cost estimates (city + state level)

---

## 10. Dependencies

```json
{
  "next": "16.2.6",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "next-mdx-remote": "^6.0.0",
  "gray-matter": "^4.0.3",
  "zod": "^4.4.3",
  "react-hook-form": "^7.75.0",
  "@hookform/resolvers": "^5.2.2",
  "resend": "^6.12.3",
  "lucide-react": "^1.16.0",
  "tailwind-merge": "^3.6.0",
  "clsx": "^2.1.1",
  "class-variance-authority": "^0.7.1",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-label": "^2.1.8",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-slot": "^1.2.4",
  "@tailwindcss/typography": "^0.5.19",
  "tailwindcss": "^4"
}
```

---

## 11. Known Issues & Gotchas

### Zod v4 Breaking Change
`z.enum()` does NOT accept `{ required_error: "..." }` as a second argument in Zod v4. This causes a TypeScript error. Use plain array only:
```typescript
// WRONG (Zod v3 style):
z.enum(["a", "b"], { required_error: "Required" })
// CORRECT (Zod v4):
z.enum(["a", "b"])
```

### Next.js 16 Params Are Async
In App Router (Next.js 16), `params` is a Promise. Always await it:
```typescript
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}
```

### Ambiguous Route Conflict
Next.js throws a build error if two `[param]` directories resolve to the same URL pattern (e.g., both `hvac/[city]` and `hvac/[state]` exist). Solution: merge into a single `[slug]` route with if/else conditional logic. Already applied to HVAC and Roofing.

### Tailwind v4 Config
No `tailwind.config.js` needed — Tailwind v4 auto-detects content files. Typography plugin is `@tailwindcss/typography`.

### Build Cache Issue
If TypeScript errors appear after restructuring routes, clear the build cache:
```bash
rm -rf .next && npx tsc --noEmit
```

---

## 12. Monetization Status

| Channel | Status | Notes |
|---------|--------|-------|
| Resend email leads | Active | `RESEND_API_KEY` set in Vercel |
| Zapier webhook | Active | `LEAD_WEBHOOK_URL` set in Vercel → Google Sheets |
| eLocal API | Pending | Set `ELOCAL_API_KEY` + `ELOCAL_PUBLISHER_CODE` when approved |
| Networx/Modernize | Pending approval | Lead network ping-post integration |
| Amazon Associates | Active | Tag: `cleverhomeenergy-20` |
| Google AdSense | Pending approval | Replace AdSlot placeholder with `ca-pub-XXXXXXXX` |

---

## 13. Affiliate Configuration

**Amazon Associates**
- Tag: `cleverhomeenergy-20`
- Used in `AffiliateProduct` component in MDX blog posts
- Link format: `https://www.amazon.com/dp/ASIN?tag=cleverhomeenergy-20`

---

## 14. Contact & Owner

- Site email: `hello@cleverhomeenergy.com`
- Owner email (leads go here): `flyhorsemx@gmail.com`
- GitHub: flyhorsemx

---

## 15. Next Development Priorities

1. **Lead network integration** — Add Networx/Modernize ping-post code to `/api/submit-lead` when affiliate accounts approved
2. **AdSense integration** — Replace `AdSlot` placeholder component with real `ca-pub-XXXXXXXX` ID when approved
3. **eLocal integration** — Set `ELOCAL_API_KEY` and `ELOCAL_PUBLISHER_CODE` in Vercel environment when partnership approved
4. **Insulation state pages** — Add `/insulation/[slug]` combined route (same pattern as HVAC/Roofing)
5. **Windows state pages** — Add `/windows/[slug]` combined route
6. **More blog content** — Target high-volume cost/comparison queries; add `faq:` frontmatter to all posts
7. **Link building** — HARO responses, local directory submissions

---

*Last updated: 2026-06-06. Page count: ~674 static pages.*
