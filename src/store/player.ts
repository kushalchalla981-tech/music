import { create } from "zustand"
import { Track } from "@/types"

interface PlayerStore {
  currentTrack: Track | null
  isPlaying: boolean
  queue: Track[]
  currentIndex: number
  progress: number
  duration: number
  volume: number
  isShuffled: boolean
  isRepeat: "none" | "all" | "one"

  setCurrentTrack: (track: Track | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setQueue: (queue: Track[], startIndex?: number) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (index: number) => void
  clearQueue: () => void
  setProgress: (progress: number) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  playNext: () => void
  playPrevious: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,
  progress: 0,
  duration: 0,
  volume: 0.7,
  isShuffled: false,
  isRepeat: "none",

  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  
  setQueue: (queue, startIndex = 0) => set({ 
    queue, 
    currentIndex: startIndex,
    currentTrack: queue[startIndex] || null 
  }),

  addToQueue: (track) => set((state) => ({ 
    queue: [...state.queue, track] 
  })),

  removeFromQueue: (index) => set((state) => ({
    queue: state.queue.filter((_, i) => i !== index)
  })),

  clearQueue: () => set({ queue: [], currentIndex: 0, currentTrack: null }),
  
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  
  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
  
  toggleRepeat: () => set((state) => {
    const modes: ("none" | "all" | "one")[] = ["none", "all", "one"]
    const currentIndex = modes.indexOf(state.isRepeat)
    return { isRepeat: modes[(currentIndex + 1) % 3] }
  }),

  playNext: () => {
    const { queue, currentIndex, isRepeat, isShuffled } = get()
    if (queue.length === 0) return

    let nextIndex: number
    
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else if (currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1
    } else if (isRepeat === "all") {
      nextIndex = 0
    } else {
      return
    }

    set({ 
      currentIndex: nextIndex, 
      currentTrack: queue[nextIndex],
      progress: 0 
    })
  },

  playPrevious: () => {
    const { queue, currentIndex, progress } = get()
    if (queue.length === 0) return

    if (progress > 3) {
      set({ progress: 0 })
      return
    }

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1
    set({ 
      currentIndex: prevIndex, 
      currentTrack: queue[prevIndex],
      progress: 0 
    })
  }
}))
