"use client"

import { Play } from "lucide-react"
import { usePlayerStore } from "@/store/player"
import { Track } from "@/types"

export function PlayAllButton({ tracks }: { tracks: Track[] }) {
  const { setQueue, setIsPlaying } = usePlayerStore()

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      setQueue(tracks, 0)
      setIsPlaying(true)
    }
  }

  return (
    <button
      onClick={handlePlayAll}
      className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-colors"
    >
      <Play className="w-4 h-4" />
      Play All
    </button>
  )
}
