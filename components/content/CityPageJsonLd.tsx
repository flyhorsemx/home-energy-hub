import { SITE_URL, SITE_NAME } from "@/lib/config"

interface FaqPair {
  q: string
  a: string
}

interface CityPageJsonLdProps {
  cityName: string
  stateAbbr: string
  citySlug: string
  service: "insulation" | "hvac" | "roofing" | "windows"
  serviceLabel: string
  faqs: FaqPair[]
}

export default function CityPageJsonLd({
  cityName,
  stateAbbr,
  citySlug,
  service,
  serviceLabel,
  faqs,
}: CityPageJsonLdProps) {
  const pageUrl = `${SITE_URL}/${service}/${citySlug}`

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: serviceLabel, item: `${SITE_URL}/${service}` },
      { "@type": "ListItem", position: 3, name: `${serviceLabel} in ${cityName}, ${stateAbbr}`, item: pageUrl },
    ],
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceLabel} in ${cityName}, ${stateAbbr}`,
    description: `Free quote request for ${serviceLabel.toLowerCase()} companies in ${cityName}, ${stateAbbr}.`,
    areaServed: {
      "@type": "City",
      name: cityName,
      containedIn: { "@type": "State", name: stateAbbr },
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: pageUrl,
  }

  const faqSchema = faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
    </>
  )
}
