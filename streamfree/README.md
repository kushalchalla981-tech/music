<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00d4ff&height=300&section=header&text=StreamFree&fontSize=90&animation=fadeIn&desc=Free%20Music%20Streaming%20For%20Everyone" />
</p>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p>

# 🎵 StreamFree

> **Stream free music instantly. No signup required. No subscriptions.**

A beautiful, open-source music streaming web application built with Next.js 14, Supabase, and Tailwind CSS. Like Spotify, but completely free and open!

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎧 **Instant Playback** | Click any track and start listening immediately |
| 🔍 **Smart Search** | Find tracks and artists in real-time |
| 🎨 **Beautiful UI** | Dark theme with electric blue accents |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |
| 🎚️ **Audio Player** | Full-featured player with queue, volume, progress |
| 🏷️ **Browse by Genre** | Explore music by genre categories |
| 👤 **Artist Profiles** | Dedicated pages for each artist |

---

## 🚀 Tech Stack

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend          │  Backend           │  Database         │
├───────────────────┼───────────────────┼───────────────────┤
│  Next.js 14       │  Supabase         │  PostgreSQL       │
│  React 19         │  (Auth, Storage)  │  (Supabase)       │
│  TypeScript       │                   │                   │
│  Tailwind CSS     │                   │                   │
│  Framer Motion    │                   │                   │
│  Zustand          │                   │                   │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/kushalchalla981-tech/music.git

# Navigate to project
cd music

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

---

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_STORAGE_URL=your_storage_url
```

---

## 📁 Project Structure

```
streamfree/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── search/         # Search page
│   │   ├── artist/[id]/    # Artist profile
│   │   └── genre/[id]/     # Genre browse
│   ├── components/         # React components
│   │   ├── layout/         # Layout components
│   │   ├── player/         # Audio player
│   │   ├── tracks/         # Track components
│   │   ├── artists/        # Artist components
│   │   └── genres/         # Genre components
│   ├── lib/               # Utilities & DB client
│   ├── store/             # Zustand state management
│   └── types/             # TypeScript definitions
├── supabase/              # Database schema & seeds
└── public/                # Static assets
```

---

## 🎨 Design System

<div align="center">

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0a0a` | Main background |
| Surface | `#181818` | Cards, panels |
| Accent | `#00d4ff` | Primary accent (Electric Blue) |
| Foreground | `#ffffff` | Primary text |
| Muted | `#a1a1aa` | Secondary text |

</div>

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Created By

<div align="center">

**Built with ❤️ by [Kushal Challa](https://github.com/kushalchalla981-tech)**

<a href="https://github.com/kushalchalla981-tech">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>

</div>

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00d4ff&height=100&section=footer" />
</p>
