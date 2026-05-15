import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { SITE_URL, SITE_NAME } from "@/lib/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Upgrade Your Home, Lower Your Bills`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Get free quotes from local contractors for solar panels, HVAC, roofing, and energy-efficient windows. 100% free service trusted by American homeowners.",
  keywords: ["solar panels", "HVAC", "roofing", "energy efficient windows", "home energy savings"],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: "WI62FBST5dBGodyLcvWW8g5CgaGG7nlb1G8YZ0O4nOw",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
