import { getAllTracks } from "@/lib/db"
import { TrackListItem } from "@/components/tracks/TrackListItem"
import { PlayAllButton } from "@/components/home/PlayAllButton"
import { Disc3, Clock, Music } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function PlaylistPage() {
  const tracks = await getAllTracks()
  const totalDuration = tracks.reduce((acc, track) => acc + track.duration, 0)
  const hours = Math.floor(totalDuration / 3600)
  const minutes = Math.floor((totalDuration % 3600) / 60)

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
      {/* Playlist Header */}
      <section className="py-10">
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-purple-500/10 to-transparent rounded-3xl" />
          
          <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-end p-8 rounded-3xl">
            {/* Playlist Cover */}
            <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-accent via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl glow-accent">
              <Disc3 className="w-24 h-24 text-white/90" />
            </div>

            {/* Playlist Info */}
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-foreground-muted uppercase tracking-wider mb-2">Playlist</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
                All Tracks
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-foreground-muted text-sm">
                <span className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  {tracks.length} songs
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`}
                </span>
              </div>
            </div>

            {/* Play Button */}
            <div className="md:ml-auto">
              <PlayAllButton tracks={tracks} />
            </div>
          </div>
        </div>
      </section>

      {/* Track List */}
      {tracks.length > 0 && (
        <section className="py-4">
          {/* Table Header */}
          <div className="grid grid-cols-[auto_1fr_1fr_auto] md:grid-cols-[auto_1fr_1fr_120px_auto] gap-4 px-4 py-2 text-sm text-foreground-muted border-b border-white/10 mb-4">
            <span className="w-8 text-center">#</span>
            <span>Title</span>
            <span className="hidden md:block">Album</span>
            <span className="text-right w-16">Duration</span>
            <span className="w-16"></span>
          </div>

          {/* Tracks */}
          <div className="space-y-1">
            {tracks.map((track, index) => (
              <TrackListItem key={track.id} track={track} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {tracks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center mb-6">
            <Music className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-3xl font-bold mb-3 gradient-text">No Tracks Yet</h2>
          <p className="text-foreground-muted text-center max-w-md">
            Upload your music to get started!
          </p>
        </div>
      )}
    </div>
  )
}
