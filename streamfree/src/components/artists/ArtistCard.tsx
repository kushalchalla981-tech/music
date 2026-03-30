"use client"

import { Artist } from "@/types"
import { motion } from "framer-motion"
import Link from "next/link"

interface ArtistCardProps {
  artist: Artist
  index?: number
}

export function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <Link href={`/artist/${artist.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index || 0) * 0.05 }}
        whileHover={{ y: -4 }}
        className="text-center cursor-pointer"
      >
        <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden">
          {artist.avatar_url ? (
            <img
              src={artist.avatar_url}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-surface-hover flex items-center justify-center">
              <span className="text-3xl font-bold text-foreground-muted">
                {artist.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-medium text-foreground truncate hover:text-accent transition-colors">
          {artist.name}
        </h3>
        <p className="text-xs text-foreground-muted">Artist</p>
      </motion.div>
    </Link>
  )
}
