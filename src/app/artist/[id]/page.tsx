import { getArtistById, getTracksByArtist, getPopularTracksByArtist } from "@/lib/db"
import { ArtistHeader } from "@/components/artists/ArtistHeader"
import { TrackListItem } from "@/components/tracks/TrackListItem"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ArtistPage({ params }: PageProps) {
  const { id } = await params
  const [artist, popularTracks, allTracks] = await Promise.all([
    getArtistById(id),
    getPopularTracksByArtist(id),
    getTracksByArtist(id),
  ])

  if (!artist) {
    notFound()
  }

  return (
    <div>
      <ArtistHeader artist={artist} trackCount={allTracks.length} />

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8">
        {/* Popular Tracks */}
        {popularTracks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Popular</h2>
            <div className="space-y-1">
              {popularTracks.map((track, index) => (
                <TrackListItem key={track.id} track={track} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* All Tracks */}
        {allTracks.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">All Tracks</h2>
            <div className="space-y-1">
              {allTracks.map((track, index) => (
                <TrackListItem key={track.id} track={track} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {allTracks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-xl font-bold text-foreground mb-2">No tracks yet</h2>
            <p className="text-foreground-muted">This artist hasn&apos;t uploaded any tracks</p>
          </div>
        )}
      </div>
    </div>
  )
}
