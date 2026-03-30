"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { searchAll } from "@/lib/db"
import { Track, Artist } from "@/types"
import { TrackListItem } from "@/components/tracks/TrackListItem"
import { ArtistCard } from "@/components/artists/ArtistCard"
import { Search as SearchIcon, Music } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [tracks, setTracks] = useState<Track[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "tracks" | "artists">("all")

  useEffect(() => {
    if (!query) {
      setTracks([])
      setArtists([])
      return
    }

    setLoading(true)
    searchAll(query)
      .then((results) => {
        setTracks(results.tracks || [])
        setArtists(results.artists || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [query])

  if (!query) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <SearchIcon className="w-16 h-16 text-foreground-muted mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Search for Music</h2>
          <p className="text-foreground-muted">Find tracks and artists</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Results for &quot;{query}&quot;
        </h1>
        <p className="text-foreground-muted">
          {tracks.length} tracks, {artists.length} artists
        </p>
      </div>

      <div className="flex gap-4 mb-8 border-b border-border">
        {(["all", "tracks", "artists"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {tab}
            {tab === "tracks" && ` (${tracks.length})`}
            {tab === "artists" && ` (${artists.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {activeTab === "all" && (
            <div className="space-y-8">
              {artists.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">Artists</h2>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {artists.map((artist, index) => (
                      <ArtistCard key={artist.id} artist={artist} index={index} />
                    ))}
                  </div>
                </section>
              )}

              {tracks.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">Tracks</h2>
                  <div className="space-y-1">
                    {tracks.map((track, index) => (
                      <TrackListItem key={track.id} track={track} index={index} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {activeTab === "tracks" && tracks.length > 0 && (
            <div className="space-y-1">
              {tracks.map((track, index) => (
                <TrackListItem key={track.id} track={track} index={index} />
              ))}
            </div>
          )}

          {activeTab === "artists" && artists.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {artists.map((artist, index) => (
                <ArtistCard key={artist.id} artist={artist} index={index} />
              ))}
            </div>
          )}

          {tracks.length === 0 && artists.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <Music className="w-16 h-16 text-foreground-muted mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">No results found</h2>
              <p className="text-foreground-muted">Try a different search term</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
