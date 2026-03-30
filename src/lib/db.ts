import { supabase } from "./supabase"
import { Track, Artist, Genre } from "@/types"

export async function getTrendingTracks(limit: number = 20): Promise<Track[]> {
  const { data, error } = await supabase
    .from("tracks")
    .select(`
      *,
      artist:artists(*),
      genre:genres(*)
    `)
    .order("plays", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getTop5Trending(): Promise<Track[]> {
  return getTrendingTracks(5)
}

export async function getGenres(): Promise<Genre[]> {
  const { data, error } = await supabase
    .from("genres")
    .select("*")
    .order("name")

  if (error) throw error
  return data || []
}

export async function getGenreById(id: string): Promise<Genre | null> {
  const { data, error } = await supabase
    .from("genres")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}

export async function getTracksByGenre(genreId: string): Promise<Track[]> {
  const { data, error } = await supabase
    .from("tracks")
    .select(`
      *,
      artist:artists(*),
      genre:genres(*)
    `)
    .eq("genre_id", genreId)
    .order("plays", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getArtistById(id: string): Promise<Artist | null> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}

export async function getTracksByArtist(artistId: string): Promise<Track[]> {
  const { data, error } = await supabase
    .from("tracks")
    .select(`
      *,
      artist:artists(*),
      genre:genres(*)
    `)
    .eq("artist_id", artistId)
    .order("plays", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getPopularTracksByArtist(artistId: string, limit: number = 5): Promise<Track[]> {
  const { data, error } = await supabase
    .from("tracks")
    .select(`
      *,
      artist:artists(*),
      genre:genres(*)
    `)
    .eq("artist_id", artistId)
    .order("plays", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function searchTracks(query: string): Promise<Track[]> {
  const { data, error } = await supabase
    .from("tracks")
    .select(`
      *,
      artist:artists(*),
      genre:genres(*)
    `)
    .ilike("title", `%${query}%`)
    .order("plays", { ascending: false })
    .limit(20)

  if (error) throw error
  return data || []
}

export async function searchArtists(query: string): Promise<Artist[]> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .ilike("name", `%${query}%`)
    .limit(20)

  if (error) throw error
  return data || []
}

export async function searchAll(query: string) {
  const [tracks, artists] = await Promise.all([
    searchTracks(query),
    searchArtists(query)
  ])

  return { tracks, artists }
}
