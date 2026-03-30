export interface Artist {
  id: string
  name: string
  bio: string | null
  avatar_url: string | null
  banner_url: string | null
  twitter_url: string | null
  instagram_url: string | null
  website_url: string | null
  created_at: string
}

export interface Genre {
  id: string
  name: string
  color: string
  icon: string | null
}

export interface Track {
  id: string
  title: string
  artist_id: string
  artist?: Artist
  genre_id: string
  genre?: Genre
  duration: number
  audio_url: string
  cover_url: string | null
  plays: number
  created_at: string
}

export interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  queue: Track[]
  currentIndex: number
  progress: number
  volume: number
  isShuffled: boolean
  isRepeat: "none" | "all" | "one"
}
