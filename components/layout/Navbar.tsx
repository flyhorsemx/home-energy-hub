"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"

const navLinks = [
  { href: "/quotes/solar", label: "Solar" },
  { href: "/quotes/hvac", label: "HVAC" },
  { href: "/quotes/roofing", label: "Roofing" },
  { href: "/quotes/windows", label: "Windows" },
  { href: "/calculator", label: "Calculator" },
  { href: "/blog", label: "DIY Blog" },
  { href: "/news", label: "News" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700">
          <Zap className="w-6 h-6 text-yellow-500" />
          HomeEnergyHub
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-green-700 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/quotes/solar"
          className="hidden md:inline-flex items-center bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Get Free Quotes
        </Link>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-700 font-medium hover:text-green-700" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/quotes/solar"
            className="mt-2 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Get Free Quotes
          </Link>
        </div>
      )}
    </header>
  )
}
