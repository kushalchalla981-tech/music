-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Genres table
CREATE TABLE genres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#333333',
  icon TEXT
);

-- Artists table
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracks table
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  genre_id UUID REFERENCES genres(id) ON DELETE SET NULL,
  duration INTEGER NOT NULL DEFAULT 0,
  audio_url TEXT NOT NULL,
  cover_url TEXT,
  plays INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_tracks_artist_id ON tracks(artist_id);
CREATE INDEX idx_tracks_genre_id ON tracks(genre_id);
CREATE INDEX idx_tracks_plays ON tracks(plays DESC);
CREATE INDEX idx_artists_name ON artists(name);
CREATE INDEX idx_genres_name ON genres(name);

-- Enable Row Level Security
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view artists" ON artists FOR SELECT USING (true);
CREATE POLICY "Public can view tracks" ON tracks FOR SELECT USING (true);
CREATE POLICY "Public can view genres" ON genres FOR SELECT USING (true);
