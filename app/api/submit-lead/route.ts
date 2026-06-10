import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

// ─── Validation ────────────────────────────────────────────────────────────────

const LeadSchema = z.object({
  email: z.string().email(),
  serviceType: z.enum(["solar", "hvac", "roofing", "windows", "insulation", "water-heating"]),
  homeOwnership: z.enum(["own", "rent"]),
  homeSize: z.enum(["under1500", "1500to2500", "over2500"]),
  yearBuilt: z.enum(["before1980", "1980to2000", "after2000"]),
  name: z.string().min(2),
  phone: z.string().min(10),
  zip: z.string().length(5).regex(/^\d{5}$/),
  // TCPA / TrustedForm
  trustedFormCertUrl: z.string().url().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
})

type LeadPayload = z.infer<typeof LeadSchema>

// ─── Service category mapping ──────────────────────────────────────────────────

const SERVICE_MAP: Record<string, string> = {
  solar:           "Solar Panels",
  hvac:            "HVAC",
  roofing:         "Roofing",
  windows:         "Windows & Doors",
  insulation:      "Insulation",
  "water-heating": "Water Heating",
}

// ─── Email notification (Resend) ───────────────────────────────────────────────

async function sendLeadEmail(lead: LeadPayload, ip: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const resend = new Resend(apiKey)

  const homeOwnershipLabel: Record<string, string> = { own: "Homeowner", rent: "Renter" }
  const homeSizeLabel: Record<string, string> = {
    under1500: "Under 1,500 sq ft",
    "1500to2500": "1,500–2,500 sq ft",
    over2500: "Over 2,500 sq ft",
  }
  const yearBuiltLabel: Record<string, string> = {
    before1980: "Before 1980",
    "1980to2000": "1980–2000",
    after2000: "After 2000",
  }

  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })

  await resend.emails.send({
    from: "CleverHomeEnergy Leads <onboarding@resend.dev>",
    to: "flyhorsemx@gmail.com",
    subject: `New Lead: ${SERVICE_MAP[lead.serviceType]} — ZIP ${lead.zip}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
        <h2 style="color:#16a34a;margin-top:0;">🏡 New Lead — CleverHomeEnergy.com</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr style="background:#f0fdf4;">
            <td style="padding:10px 12px;font-weight:bold;width:140px;">Service</td>
            <td style="padding:10px 12px;">${SERVICE_MAP[lead.serviceType]}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;">Name</td>
            <td style="padding:10px 12px;">${lead.name}</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:10px 12px;font-weight:bold;">Phone</td>
            <td style="padding:10px 12px;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;">Email</td>
            <td style="padding:10px 12px;"><a href="mailto:${lead.email}">${lead.email}</a></td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:10px 12px;font-weight:bold;">ZIP Code</td>
            <td style="padding:10px 12px;">${lead.zip}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;">Ownership</td>
            <td style="padding:10px 12px;">${homeOwnershipLabel[lead.homeOwnership] ?? lead.homeOwnership}</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:10px 12px;font-weight:bold;">Home Size</td>
            <td style="padding:10px 12px;">${homeSizeLabel[lead.homeSize] ?? lead.homeSize}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;">Year Built</td>
            <td style="padding:10px 12px;">${yearBuiltLabel[lead.yearBuilt] ?? lead.yearBuilt}</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:10px 12px;font-weight:bold;">Submitted</td>
            <td style="padding:10px 12px;">${submittedAt} ET</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;font-weight:bold;">IP</td>
            <td style="padding:10px 12px;">${ip}</td>
          </tr>
        </table>
      </div>
    `,
  })
}

// ─── eLocal submission ─────────────────────────────────────────────────────────

async function submitToElocal(lead: LeadPayload, req: NextRequest): Promise<void> {
  const apiKey  = process.env.ELOCAL_API_KEY
  const apiUrl  = process.env.ELOCAL_API_URL ?? "https://api.elocal.com/v1/leads"
  const pubCode = process.env.ELOCAL_PUBLISHER_CODE

  if (!apiKey) throw new Error("ELOCAL_API_KEY not configured")

  const [firstName, ...rest] = lead.name.trim().split(" ")
  const lastName = rest.join(" ") || firstName

  const homeSizeMap: Record<string, string> = {
    under1500:  "under_1500",
    "1500to2500": "1500_2500",
    over2500:   "over_2500",
  }

  const body: Record<string, unknown> = {
    first_name:            firstName,
    last_name:             lastName,
    email:                 lead.email,
    phone:                 lead.phone.replace(/\D/g, ""),
    zip_code:              lead.zip,
    service_category:      SERVICE_MAP[lead.serviceType],
    home_owner:            lead.homeOwnership === "own",
    home_size:             homeSizeMap[lead.homeSize],
    year_built:            lead.yearBuilt,
    source_url:            "https://cleverhomeenergy.com",
    tcpa_consent:          true,
    tcpa_timestamp:        new Date().toISOString(),
    tcpa_text:             "By submitting this form you authorize CleverHomeEnergy and its partners to contact you about your request at the number provided, including calls, texts, prerecorded messages, or automated technology. Consent is not a condition of purchase.",
    ip_address:            lead.ipAddress ?? req.headers.get("x-forwarded-for") ?? "unknown",
    user_agent:            lead.userAgent ?? req.headers.get("user-agent") ?? "unknown",
    ...(lead.trustedFormCertUrl && { trusted_form_cert_url: lead.trustedFormCertUrl }),
    ...(pubCode && { publisher_code: pubCode }),
  }

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`eLocal API error ${res.status}: ${text}`)
  }
}

// ─── Webhook fallback (Zapier / Make / custom) ─────────────────────────────────

const HOME_OWNERSHIP_MAP: Record<string, string> = {
  own:  "Homeowner",
  rent: "Renter",
}

const HOME_SIZE_MAP: Record<string, string> = {
  under1500:    "Under 1,500 sq ft",
  "1500to2500": "1,500–2,500 sq ft",
  over2500:     "Over 2,500 sq ft",
}

const YEAR_BUILT_MAP: Record<string, string> = {
  before1980:  "Before 1980",
  "1980to2000": "1980–2000",
  after2000:   "After 2000",
}

async function submitToWebhook(lead: LeadPayload, req: NextRequest): Promise<void> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL
  if (!webhookUrl) return // silently skip if not configured

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })

  const emailSubject = `New Lead: ${SERVICE_MAP[lead.serviceType]} — ZIP ${lead.zip}`

  const emailBody = [
    `New Lead from CleverHomeEnergy.com`,
    ``,
    `Service Type:  ${SERVICE_MAP[lead.serviceType]}`,
    `Name:          ${lead.name}`,
    `Phone:         ${lead.phone}`,
    `Email:         ${lead.email}`,
    `ZIP Code:      ${lead.zip}`,
    `Home Ownership: ${HOME_OWNERSHIP_MAP[lead.homeOwnership] ?? lead.homeOwnership}`,
    `Home Size:     ${HOME_SIZE_MAP[lead.homeSize] ?? lead.homeSize}`,
    `Year Built:    ${YEAR_BUILT_MAP[lead.yearBuilt] ?? lead.yearBuilt}`,
    ``,
    `Submitted At:  ${submittedAt} ET`,
    `IP Address:    ${ip}`,
    `Source:        cleverhomeenergy.com`,
    ...(lead.trustedFormCertUrl ? [`TrustedForm:   ${lead.trustedFormCertUrl}`] : []),
  ].join("\n")

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // raw fields (for Google Sheets columns)
      service_type:    SERVICE_MAP[lead.serviceType],
      name:            lead.name,
      phone:           lead.phone,
      email:           lead.email,
      zip:             lead.zip,
      home_ownership:  HOME_OWNERSHIP_MAP[lead.homeOwnership] ?? lead.homeOwnership,
      home_size:       HOME_SIZE_MAP[lead.homeSize] ?? lead.homeSize,
      year_built:      YEAR_BUILT_MAP[lead.yearBuilt] ?? lead.yearBuilt,
      submitted_at:    submittedAt,
      ip,
      source:          "cleverhomeenergy.com",
      // pre-formatted fields (for Zapier Send Email action)
      email_subject:   emailSubject,
      email_body:      emailBody,
    }),
  })
  // Webhook failures are non-fatal — don't throw
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = LeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const lead = parsed.data
  const errors: string[] = []

  // Try eLocal first
  try {
    await submitToElocal(lead, req)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    // Only treat as failure if the key is configured (misconfigured) vs. missing (not set up yet)
    if (process.env.ELOCAL_API_KEY) {
      errors.push(`eLocal: ${msg}`)
      console.error("[submit-lead] eLocal error:", msg)
    }
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown"

  // Fire webhook non-blocking (Zapier / Google Sheets)
  submitToWebhook(lead, req).catch((e) => console.error("[submit-lead] webhook error:", e))

  // Await email so serverless function doesn't terminate before it sends
  try {
    await sendLeadEmail(lead, ip)
  } catch (e) {
    console.error("[submit-lead] email error:", e)
  }

  // Return success unless eLocal was configured but failed
  if (errors.length > 0 && process.env.ELOCAL_API_KEY) {
    return NextResponse.json(
      { error: "Lead submission failed", details: errors },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true })
}
