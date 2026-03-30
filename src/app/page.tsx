import { getTrendingTracks, getTop5Trending, getGenres } from "@/lib/db"
import { HeroTrackCard } from "@/components/tracks/HeroTrackCard"
import { TrackListItem } from "@/components/tracks/TrackListItem"
import { GenreCard } from "@/components/genres/GenreCard"
import { PlayAllButton } from "@/components/home/PlayAllButton"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [top5Tracks, trendingTracks, genres] = await Promise.all([
    getTop5Trending(),
    getTrendingTracks(20),
    getGenres(),
  ])

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
      {/* Hero Section - Top 5 */}
      {top5Tracks.length > 0 && (
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Trending Top 5</h2>
            <PlayAllButton tracks={top5Tracks} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {top5Tracks.map((track, index) => (
              <HeroTrackCard key={track.id} track={track} rank={index + 1} />
            ))}
          </div>
        </section>
      )}

      {/* Trending Top 20 */}
      {trendingTracks.length > 0 && (
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">All Trending</h2>
            <PlayAllButton tracks={trendingTracks} />
          </div>
          <div className="space-y-1">
            {trendingTracks.map((track, index) => (
              <TrackListItem key={track.id} track={track} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Browse by Genre */}
      {genres.length > 0 && (
        <section className="py-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {genres.map((genre, index) => (
              <GenreCard key={genre.id} genre={genre} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {top5Tracks.length === 0 && trendingTracks.length === 0 && genres.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Welcome to StreamFree</h2>
          <p className="text-foreground-muted text-center max-w-md">
            No tracks available yet. Upload some music to get started!
          </p>
        </div>
      )}
    </div>
  )
}
