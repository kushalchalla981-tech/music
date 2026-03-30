import { getGenreById, getTracksByGenre } from "@/lib/db"
import { TrackListItem } from "@/components/tracks/TrackListItem"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function GenrePage({ params }: PageProps) {
  const { id } = await params
  const [genre, tracks] = await Promise.all([getGenreById(id), getTracksByGenre(id)])

  if (!genre) {
    notFound()
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
      {/* Genre Header */}
      <div
        className="relative h-48 rounded-2xl overflow-hidden mb-8"
        style={{ backgroundColor: genre.color || "#333" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white uppercase tracking-wider">
            {genre.name}
          </h1>
        </div>
      </div>

      {/* Tracks */}
      {tracks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
          </h2>
          <div className="space-y-1">
            {tracks.map((track, index) => (
              <TrackListItem key={track.id} track={track} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {tracks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-xl font-bold text-foreground mb-2">No tracks in this genre</h2>
          <p className="text-foreground-muted">Check back later for new music</p>
        </div>
      )}
    </div>
  )
}
