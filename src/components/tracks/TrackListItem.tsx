"use client"

import { Track } from "@/types"
import { Play, Pause, MoreHorizontal, Heart } from "lucide-react"
import { usePlayerStore } from "@/store/player"
import { formatDuration } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TrackListItemProps {
  track: Track
  index?: number
  onPlay?: () => void
}

export function TrackListItem({ track, index, onPlay }: TrackListItemProps) {
  const { currentTrack, isPlaying, setIsPlaying, setQueue, queue, currentIndex } = usePlayerStore()
  const [isHovered, setIsHovered] = useState(false)

  const isCurrentTrack = currentTrack?.id === track.id

  const handlePlay = () => {
    if (onPlay) {
      onPlay()
      return
    }
    
    if (isCurrentTrack) {
      setIsPlaying(!isPlaying)
    } else {
      setQueue([track], 0)
      setIsPlaying(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center gap-4 p-3 rounded-lg transition-colors ${
        isCurrentTrack ? "bg-accent/10" : "hover:bg-surface-hover"
      }`}
    >
      {/* Index / Play Button */}
      <div className="w-8 text-center">
        {isHovered || isCurrentTrack ? (
          <button
            onClick={handlePlay}
            className="w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
        ) : (
          <span className="text-sm text-foreground-muted">{index !== undefined ? index + 1 : ""}</span>
        )}
      </div>

      {/* Cover */}
      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
        {track.cover_url ? (
          <img
            src={track.cover_url}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-surface-hover flex items-center justify-center">
            <Play className="w-5 h-5 text-foreground-muted" />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/artist/${track.artist?.id}`}
          className="text-sm font-medium text-foreground hover:text-accent transition-colors block truncate"
        >
          {track.title}
        </Link>
        <Link
          href={`/artist/${track.artist?.id}`}
          className="text-xs text-foreground-muted hover:text-foreground transition-colors block truncate"
        >
          {track.artist?.name || "Unknown Artist"}
        </Link>
      </div>

      {/* Duration & Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 text-foreground-muted hover:text-foreground transition-colors">
          <Heart className="w-4 h-4" />
        </button>
        <span className="text-xs text-foreground-muted w-12 text-right">
          {formatDuration(track.duration)}
        </span>
        <button className="p-2 text-foreground-muted hover:text-foreground transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
