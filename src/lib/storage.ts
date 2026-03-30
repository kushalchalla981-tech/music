const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || ""

export function getAudioUrl(path: string): string {
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // If no storage URL configured, return path as is
  if (!STORAGE_URL) {
    console.warn("NEXT_PUBLIC_SUPABASE_STORAGE_URL not configured")
    return path
  }
  
  // Otherwise, prepend storage URL
  return `${STORAGE_URL}/${path}`
}

export function getCoverUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  if (!STORAGE_URL) {
    return path
  }
  
  return `${STORAGE_URL}/${path}`
}
