import Link from "next/link"
import { Zap } from "lucide-react"
import { SITE_NAME } from "@/lib/config"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            {SITE_NAME}
          </Link>
          <p className="text-sm leading-relaxed">
            Helping American homeowners cut energy bills with smarter upgrades. Free quotes, unbiased guides.
          </p>
          <a
            href="mailto:hello@cleverhomeenergy.com"
            className="text-sm mt-3 block hover:text-white transition-colors"
          >
            hello@cleverhomeenergy.com
          </a>
          <p className="text-xs mt-3 text-gray-600">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/solar" className="hover:text-white transition-colors">Solar Panels</Link></li>
            <li><Link href="/hvac" className="hover:text-white transition-colors">HVAC Systems</Link></li>
            <li><Link href="/roofing" className="hover:text-white transition-colors">Roofing</Link></li>
            <li><Link href="/windows" className="hover:text-white transition-colors">Windows &amp; Doors</Link></li>
            <li><Link href="/insulation" className="hover:text-white transition-colors">Insulation</Link></li>
            <li><Link href="/water-heating" className="hover:text-white transition-colors">Water Heating</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Tools &amp; Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/calculator" className="hover:text-white transition-colors">Savings Calculator</Link></li>
            <li><Link href="/tools/solar-roi" className="hover:text-white transition-colors">Solar ROI Calculator</Link></li>
            <li><Link href="/tools/energy-comparison" className="hover:text-white transition-colors">Energy Cost Comparison</Link></li>
            <li><Link href="/tools/hvac-size" className="hover:text-white transition-colors">HVAC Size Calculator</Link></li>
            <li><Link href="/tools/roofing-materials" className="hover:text-white transition-colors">Roofing Material Comparison</Link></li>
            <li><Link href="/tools/rebates" className="hover:text-white transition-colors">Rebate Finder</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Homeowner Guides</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Get Free Quotes</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quotes/solar" className="hover:text-white transition-colors">Solar Quotes</Link></li>
            <li><Link href="/quotes/hvac" className="hover:text-white transition-colors">HVAC Quotes</Link></li>
            <li><Link href="/quotes/roofing" className="hover:text-white transition-colors">Roofing Quotes</Link></li>
            <li><Link href="/quotes/windows" className="hover:text-white transition-colors">Window Quotes</Link></li>
            <li><Link href="/quotes/insulation" className="hover:text-white transition-colors">Insulation Quotes</Link></li>
            <li><Link href="/quotes/water-heating" className="hover:text-white transition-colors">Water Heater Quotes</Link></li>
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-800 space-y-1.5 text-xs">
            <Link href="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="block hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/feed.xml" className="block hover:text-white transition-colors">RSS Feed</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 px-4">
        <p className="text-center text-xs text-gray-600">
          CleverHomeEnergy is a free quote-matching service. We are not affiliated with any contractor or manufacturer.
          By using this site you agree to our{" "}
          <Link href="/terms" className="underline hover:text-gray-400">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-gray-400">Privacy Policy</Link>.
          TCPA compliant.
        </p>
      </div>
    </footer>
  )
}
