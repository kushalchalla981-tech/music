"use client"
import Link from "next/link"
import { Search, Home, Music } from "lucide-react"
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

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-50">
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-accent font-bold text-xl">
          <Music className="w-6 h-6" />
          <span>StreamFree</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              pathname === "/" ? "text-foreground" : "text-foreground-muted hover:text-foreground"
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            <input
              type="text"
              placeholder="Search for tracks or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-surface-hover rounded-full text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </form>

        <div className="w-20" />
      </div>
    </nav>
  )
}
