const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || ""

export function getAudioUrl(path: string): string {
  if (!STORAGE_URL) {
    console.warn("NEXT_PUBLIC_SUPABASE_STORAGE_URL not configured")
    return path
  }
  return `${STORAGE_URL}/${path}`
}

export function getCoverUrl(path: string): string {
  if (!STORAGE_URL) {
    return path
  }
  return `${STORAGE_URL}/${path}`
}
