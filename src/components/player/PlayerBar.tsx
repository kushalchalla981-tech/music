"use client"

import { usePlayerStore } from "@/store/player"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic } from "lucide-react"
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
      />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 h-24 bg-surface border-t border-border z-50"
      >
        <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-4 w-1/4 min-w-0">
            {currentTrack.cover_url ? (
              <img
                src={currentTrack.cover_url}
                alt={currentTrack.title}
                className="w-14 h-14 rounded object-cover"
              />
            ) : (
              <div className="w-14 h-14 bg-surface-hover rounded flex items-center justify-center">
                <Music className="w-6 h-6 text-foreground-muted" />
              </div>
            )}
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
                className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
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

            <div className="w-full flex items-center gap-2 text-xs text-foreground-muted">
              <span className="w-10 text-right">{formatDuration(progress)}</span>
              <input
                type="range"
                min={0}
                max={currentTrack.duration || 100}
                value={progress}
                onChange={handleSeek}
                className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="w-10">{formatDuration(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Volume & Queue */}
          <div className="flex items-center gap-4 w-1/4 justify-end">
            <button
              onClick={() => setShowQueue(!showQueue)}
              className={`p-2 rounded-full transition-colors ${
                showQueue ? "text-accent bg-accent/10" : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <ListMusic className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 w-32">
              <button
                onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
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
            className="fixed right-0 top-16 bottom-24 w-80 bg-surface border-l border-border z-40 overflow-y-auto"
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">Queue ({queue.length})</h3>
              {queue.length === 0 ? (
                <p className="text-sm text-foreground-muted">Queue is empty</p>
              ) : (
                <div className="space-y-2">
                  {queue.map((track, index) => (
                    <div
                      key={`${track.id}-${index}`}
                      className="flex items-center gap-3 p-2 rounded hover:bg-surface-hover transition-colors"
                    >
                      <span className="text-xs text-foreground-muted w-4">{index + 1}</span>
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

function Music(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}
