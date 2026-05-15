import Link from "next/link"
import { Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-white text-lg mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            HomeEnergyHub
          </Link>
          <p className="text-sm leading-relaxed">
            Helping American homeowners save money and go green with smarter upgrades.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quotes/solar" className="hover:text-white">Solar Panels</Link></li>
            <li><Link href="/quotes/hvac" className="hover:text-white">HVAC</Link></li>
            <li><Link href="/quotes/roofing" className="hover:text-white">Roofing</Link></li>
            <li><Link href="/quotes/windows" className="hover:text-white">Windows & Doors</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-white">DIY Blog</Link></li>
            <li><Link href="/news" className="hover:text-white">Industry News</Link></li>
            <li><Link href="/calculator" className="hover:text-white">Savings Calculator</Link></li>
            <li><Link href="/feed.xml" className="hover:text-white">RSS Feed</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs">
        © {new Date().getFullYear()} HomeEnergyHub. All rights reserved.
      </div>
    </footer>
  )
}
