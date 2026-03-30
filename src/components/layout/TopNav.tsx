"use client"
import Link from "next/link"
import { Search, Home, Music, Library, Disc3 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/playlist", label: "All Tracks", icon: Disc3 },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass z-50">
      <div className="h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center glow-accent-sm">
            <Music className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">StreamFree</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-foreground"
                    : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <input
                type="text"
                placeholder="Search for tracks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-12 pr-4 bg-white/5 rounded-full text-sm text-foreground placeholder:text-foreground-muted border border-white/5 focus:border-accent/50 focus:outline-none transition-all"
              />
            </div>
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-white/10 transition-all">
            <span className="text-sm font-medium">?</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
