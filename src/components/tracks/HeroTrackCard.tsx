"use client"

import { Track } from "@/types"
import { Play, Pause } from "lucide-react"
import { usePlayerStore } from "@/store/player"
import { motion } from "framer-motion"

interface HeroTrackCardProps {
  track: Track
  rank: number
}

export function HeroTrackCard({ track, rank }: HeroTrackCardProps) {
  const { currentTrack, isPlaying, setIsPlaying, setQueue } = usePlayerStore()

  const isCurrentTrack = currentTrack?.id === track.id

  const handlePlay = () => {
    if (isCurrentTrack) {
      setIsPlaying(!isPlaying)
    } else {
      setQueue([track], 0)
      setIsPlaying(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: rank * 0.1 }}
      className="relative group cursor-pointer"
      onClick={handlePlay}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
        {track.cover_url ? (
          <img
            src={track.cover_url}
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-surface-hover flex items-center justify-center">
            <Play className="w-16 h-16 text-foreground-muted" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center shadow-lg"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </motion.button>
        </div>

        {/* Rank Badge */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-accent text-background font-bold text-sm flex items-center justify-center">
          {rank}
        </div>
      </div>

      <h3 className="font-semibold text-foreground truncate group-hover:text-accent transition-colors">
        {track.title}
      </h3>
      <p className="text-sm text-foreground-muted truncate">{track.artist?.name}</p>
    </motion.div>
  )
}
