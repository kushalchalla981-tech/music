"use client"

import { Genre } from "@/types"
import { motion } from "framer-motion"
import Link from "next/link"

interface GenreCardProps {
  genre: Genre
  index?: number
}

export function GenreCard({ genre, index }: GenreCardProps) {
  return (
    <Link href={`/genre/${genre.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: (index || 0) * 0.05 }}
        whileHover={{ scale: 1.02 }}
        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
        style={{ backgroundColor: genre.color || "#333" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
            {genre.name}
          </h3>
        </div>
      </motion.div>
    </Link>
  )
}
