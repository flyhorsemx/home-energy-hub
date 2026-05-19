import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import MetaPixel from "@/components/analytics/MetaPixel"
import TrustedForm from "@/components/analytics/TrustedForm"
import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Cut Your Energy Bills, Get Free Quotes`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: ["solar panels", "HVAC", "roofing", "energy efficient windows", "home energy savings", "free quotes", "energy rebates"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@CleverHomeEnergy",
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: "WI62FBST5dBGodyLcvWW8g5CgaGG7nlb1G8YZ0O4nOw",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <MetaPixel />
        <TrustedForm />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
