const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL || ""

export function getAudioUrl(key: string): string {
  if (!CLOUDFRONT_URL) {
    console.warn("NEXT_PUBLIC_AWS_CLOUDFRONT_URL not configured")
    return key
  }
  return `${CLOUDFRONT_URL}/${key}`
}

export function getCoverUrl(key: string): string {
  if (!CLOUDFRONT_URL) {
    return key
  }
  return `${CLOUDFRONT_URL}/${key}`
}
