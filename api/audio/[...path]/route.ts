import { NextRequest, NextResponse } from 'next/server'

const STORAGE_URL = 'https://ukpuarzwkghtyetskpga.supabase.co/storage/v1/object/public/music'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const filePath = path.join('/')
  
  try {
    const response = await fetch(`${STORAGE_URL}/${filePath}`)
    
    if (!response.ok) {
      return new NextResponse('Audio not found', { status: 404 })
    }

    const audioBuffer = await response.arrayBuffer()

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    return new NextResponse('Error fetching audio', { status: 500 })
  }
}
