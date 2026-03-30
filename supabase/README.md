# Supabase Setup Instructions

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Enter project details:
   - Name: `streamfree`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
4. Wait for project to be created

## 2. Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the query
4. Do the same for `supabase/seed.sql` to add sample data

## 3. Get API Credentials
1. Go to **Project Settings** (gear icon)
2. Click **API**
3. Copy:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Configure Environment Variables
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_AWS_CLOUDFRONT_URL=your_cloudfront_url
```

## 5. Test the Connection
Run `npm run dev` and check console for any database errors.
