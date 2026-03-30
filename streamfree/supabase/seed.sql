-- Seed Genres
INSERT INTO genres (name, color, icon) VALUES
  ('Electronic', '#8b5cf6', 'radio'),
  ('Rock', '#ef4444', 'guitar'),
  ('Hip Hop', '#f59e0b', 'mic'),
  ('Pop', '#ec4899', 'music'),
  ('Jazz', '#14b8a6', 'trumpet'),
  ('Classical', '#6366f1', 'piano'),
  ('R&B', '#f97316', 'headphones'),
  ('Indie', '#22c55e', 'cloud'),
  ('Metal', '#71717a', 'flame'),
  ('Ambient', '#06b6d4', 'waves')
ON CONFLICT (name) DO NOTHING;

-- Seed Artists
INSERT INTO artists (name, bio, avatar_url, banner_url, twitter_url, instagram_url, website_url) VALUES
  ('Neon Dreams', 'Synthwave producer from the future', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200', 'neondreams', 'neondreams', 'https://neondreams.example'),
  ('Midnight Echoes', 'Ambient electronic duo creating atmospheric soundscapes', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200', 'midnight_echoes', 'midnightechoes', null),
  ('The Voltage', 'High-energy electronic rock band', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=1200', 'thevoltage', 'thevoltage', 'https://thevoltage.example'),
  ('Luna Nova', 'Indie pop artist with dreamy melodies', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200', 'lunanova', 'lunanova', null),
  ('Bass Reactor', 'Heavy bass and experimental electronic', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200', 'bassreactor', 'bassreactor', 'https://bassreactor.example')
ON CONFLICT DO NOTHING;

-- Seed Tracks (using placeholder audio URLs - replace with actual S3 URLs)
INSERT INTO tracks (title, artist_id, genre_id, duration, audio_url, cover_url, plays) VALUES
  -- Neon Dreams - Electronic
  ('Cyber Sunrise', (SELECT id FROM artists WHERE name = 'Neon Dreams'), (SELECT id FROM genres WHERE name = 'Electronic'), 245, 'https://example.com/audio/cyber-sunrise.mp3', 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400', 15420),
  ('Neon Nights', (SELECT id FROM artists WHERE name = 'Neon Dreams'), (SELECT id FROM genres WHERE name = 'Electronic'), 312, 'https://example.com/audio/neon-nights.mp3', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', 12350),
  ('Digital Dreams', (SELECT id FROM artists WHERE name = 'Neon Dreams'), (SELECT id FROM genres WHERE name = 'Electronic'), 198, 'https://example.com/audio/digital-dreams.mp3', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400', 9870),
  
  -- Midnight Echoes - Ambient
  ('Stellar Drift', (SELECT id FROM artists WHERE name = 'Midnight Echoes'), (SELECT id FROM genres WHERE name = 'Ambient'), 420, 'https://example.com/audio/stellar-drift.mp3', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400', 8750),
  ('Ocean Mind', (SELECT id FROM artists WHERE name = 'Midnight Echoes'), (SELECT id FROM genres WHERE name = 'Ambient'), 385, 'https://example.com/audio/ocean-mind.mp3', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', 6540),
  
  -- The Voltage - Electronic/Rock
  ('Electric Heart', (SELECT id FROM artists WHERE name = 'The Voltage'), (SELECT id FROM genres WHERE name = 'Electronic'), 267, 'https://example.com/audio/electric-heart.mp3', 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=400', 11200),
  ('Voltage Drop', (SELECT id FROM artists WHERE name = 'The Voltage'), (SELECT id FROM genres WHERE name = 'Rock'), 234, 'https://example.com/audio/voltage-drop.mp3', 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400', 8900),
  
  -- Luna Nova - Indie/Pop
  ('Starlight', (SELECT id FROM artists WHERE name = 'Luna Nova'), (SELECT id FROM genres WHERE name = 'Indie'), 203, 'https://example.com/audio/starlight.mp3', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400', 7890),
  ('Crystal Waves', (SELECT id FROM artists WHERE name = 'Luna Nova'), (SELECT id FROM genres WHERE name = 'Pop'), 256, 'https://example.com/audio/crystal-waves.mp3', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', 6540),
  ('Moonrise', (SELECT id FROM artists WHERE name = 'Luna Nova'), (SELECT id FROM genres WHERE name = 'Indie'), 189, 'https://example.com/audio/moonrise.mp3', 'https://images.unsplash.com/photo-1532978379173-523e16f371f2?w=400', 5230),
  
  -- Bass Reactor - Electronic
  ('Bassquake', (SELECT id FROM artists WHERE name = 'Bass Reactor'), (SELECT id FROM genres WHERE name = 'Electronic'), 178, 'https://example.com/audio/bassquake.mp3', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', 10200),
  ('Deep Signal', (SELECT id FROM artists WHERE name = 'Bass Reactor'), (SELECT id FROM genres WHERE name = 'Electronic'), 245, 'https://example.com/audio/deep-signal.mp3', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 8760),
  ('Reactor Core', (SELECT id FROM artists WHERE name = 'Bass Reactor'), (SELECT id FROM genres WHERE name = 'Electronic'), 312, 'https://example.com/audio/reactor-core.mp3', 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400', 7120)
ON CONFLICT DO NOTHING;
