"use client"

import { Artist } from "@/types"
import { Play, Pause, ExternalLink, Globe } from "lucide-react"
import { usePlayerStore } from "@/store/player"
import { motion } from "framer-motion"

interface ArtistHeaderProps {
  artist: Artist
  trackCount?: number
  onPlayAll?: () => void
}

export function ArtistHeader({ artist, trackCount = 0, onPlayAll }: ArtistHeaderProps) {
  const { currentTrack, isPlaying, setIsPlaying } = usePlayerStore()

  const handlePlay = () => {
    if (onPlayAll) {
      onPlayAll()
    }
  }

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-64 md:h-80 w-full overflow-hidden">
        {artist.banner_url ? (
          <img
            src={artist.banner_url}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-accent/30 to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="relative px-6 -mt-32">
        <div className="flex items-end gap-6">
          {/* Avatar */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-background shadow-xl flex-shrink-0">
            {artist.avatar_url ? (
              <img
                src={artist.avatar_url}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-surface-hover flex items-center justify-center">
                <span className="text-5xl font-bold text-foreground-muted">
                  {artist.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pb-4">
            <p className="text-sm text-foreground-muted uppercase tracking-wider mb-1">Artist</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{artist.name}</h1>
            {artist.bio && (
              <p className="text-sm text-foreground-muted max-w-xl line-clamp-2">{artist.bio}</p>
            )}
            <p className="text-sm text-foreground-muted mt-2">
              {trackCount} {trackCount === 1 ? "track" : "tracks"}
            </p>
          </div>

          {/* Play Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlay}
            className="flex items-center gap-3 px-8 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent-hover transition-colors mb-4"
          >
            <Play className="w-5 h-5" />
            Play All
          </motion.button>
        </div>

        {/* Social Links */}
        {artist.website_url && (
          <div className="flex items-center gap-4 mt-6 pb-6">
            <a
              href={artist.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
