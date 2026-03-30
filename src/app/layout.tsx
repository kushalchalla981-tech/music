import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TopNav } from "@/components/layout/TopNav"
import { PlayerBar } from "@/components/player/PlayerBar"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "StreamFree - Free Music Streaming",
  description: "Stream free music instantly. No signup required.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TopNav />
        <main className="flex-1 pt-16 pb-24">
          {children}
        </main>
        <PlayerBar />
      </body>
    </html>
  )
}
