# Supabase Storage Setup

## 1. Create Storage Bucket
1. In Supabase dashboard, go to **Storage** (left sidebar)
2. Click **New bucket**
3. Bucket name: `audio`
4. Public bucket: ✅ Check "Make public"
5. Click **Create bucket**

## 2. Upload Test Audio
1. Click on your new `audio` bucket
2. Click **Upload** and upload a sample MP3 file
3. After upload, click the file → copy the **Public URL**

## 3. Get Bucket URL
The public URL format will be:
```
https://[project-ref].supabase.co/storage/v1/object/public/audio/your-file.mp3
```

## 4. Update Environment Variable
Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_STORAGE_URL=https://ukpuarzwkghtyetskpga.supabase.co/storage/v1/object/public/audio
```

---

**After setting up storage, let me know and I'll update the code to use Supabase Storage URLs.**
