"use client"

import { usePlayerStore } from "@/store/player"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Music } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { formatDuration } from "@/lib/utils"
import { getAudioUrl } from "@/lib/storage"
import { motion, AnimatePresence } from "framer-motion"

export function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    currentTrack,
    isPlaying,
    queue,
    progress,
    volume,
    setIsPlaying,
    setProgress,
    setDuration,
    playNext,
    playPrevious,
    setVolume,
  } = usePlayerStore()

  const [showQueue, setShowQueue] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentTrack, setIsPlaying])

  useEffect(() => {
    if (!currentTrack) return
    audioRef.current?.load()
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false))
    }
  }, [currentTrack?.id])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
    setIsLoading(false)
  }

  const handleEnded = () => {
    playNext()
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setProgress(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  if (!currentTrack) return null

  const progressPercent = currentTrack.duration ? (progress / currentTrack.duration) * 100 : 0

  return (
    <>
      <audio
        ref={audioRef}
        src={getAudioUrl(currentTrack.audio_url)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={(e) => console.error("Audio error:", e)}
      />

      {/* Progress bar at top */}
      <div className="fixed top-16 left-0 right-0 h-1 z-40">
        <motion.div 
          className="h-full bg-accent"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 h-24 player-bar z-50"
      >
        <div className="h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-4 w-1/4 min-w-0">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              {currentTrack.cover_url ? (
                <img
                  src={currentTrack.cover_url}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center">
                  <Music className="w-6 h-6 text-foreground-muted" />
                </div>
              )}
              {/* Playing animation overlay */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    <motion.div
                      className="w-1 bg-accent rounded-full"
                      animate={{ height: ["40%", "100%", "60%", "100%"] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-1 bg-accent rounded-full"
                      animate={{ height: ["100%", "60%", "100%", "40%"] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-1 bg-accent rounded-full"
                      animate={{ height: ["80%", "100%", "40%", "100%"] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">{currentTrack.title}</h4>
              <p className="text-xs text-foreground-muted truncate">
                {currentTrack.artist?.name || "Unknown Artist"}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
            <div className="flex items-center gap-4">
              <button
                onClick={playPrevious}
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={isLoading}
                className="w-12 h-12 rounded-full bg-foreground text-black flex items-center justify-center hover:scale-105 transition-transform glow-accent-sm"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>

              <button
                onClick={playNext}
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full flex items-center gap-3 text-xs text-foreground-muted">
              <span className="w-10 text-right font-mono">{formatDuration(progress)}</span>
              <div className="flex-1 relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-accent rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={currentTrack.duration || 100}
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="w-10 font-mono">{formatDuration(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Volume & Queue */}
          <div className="flex items-center gap-4 w-1/4 justify-end">
            <button
              onClick={() => setShowQueue(!showQueue)}
              className={`p-2.5 rounded-xl transition-all ${
                showQueue 
                  ? "text-accent bg-accent/10" 
                  : "text-foreground-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <ListMusic className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 w-28">
              <button
                onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="flex-1 relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-foreground-muted rounded-full"
                  style={{ width: `${volume * 100}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Queue Panel */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-16 bottom-24 w-80 glass border-l border-white/5 z-40"
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-accent" />
                Queue ({queue.length})
              </h3>
              {queue.length === 0 ? (
                <p className="text-sm text-foreground-muted">Queue is empty</p>
              ) : (
                <div className="space-y-1">
                  {queue.map((track, index) => (
                    <div
                      key={`${track.id}-${index}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xs text-foreground-muted w-4 font-mono">{index + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-foreground truncate">{track.title}</p>
                        <p className="text-xs text-foreground-muted truncate">
                          {track.artist?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
