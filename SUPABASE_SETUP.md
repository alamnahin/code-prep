# Supabase Setup Guide

This guide will walk you through setting up a Supabase free tier project for this application.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Sign up with GitHub, Google, or email

## Step 2: Create a New Project

1. Once logged in, click "New Project"
2. Fill in the project details:
   - **Name**: `code-prep` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Select "Free" tier
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be provisioned

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the left menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
4. Keep this page open, you'll need these values next

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root of your project:

```bash
# In the terminal, run:
touch .env.local
```

2. Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Make sure `.env.local` is in your `.gitignore` (it should be by default in Next.js projects)

## Step 5: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor** (in the left sidebar)
2. Click "New Query"
3. Copy the entire contents of `scripts/001-create-tables.sql`
4. Paste it into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see a success message

This will create:
- `problems` table - stores coding challenges
- `submissions` table - tracks user code submissions
- `user_progress` table - tracks which problems users have solved
- Row Level Security (RLS) policies for data protection
- Indexes for better performance

## Step 6: Seed the Database

1. In the SQL Editor, click "New Query" again
2. Copy the entire contents of `scripts/002-seed-problems.sql`
3. Paste it into the SQL editor
4. Click "Run"
5. You should see initial problems inserted into the database

## Step 7: Enable Authentication

1. Go to **Authentication** in the left sidebar
2. Click on **Providers** tab
3. Enable the authentication methods you want:
   - **Email** is already enabled by default
   - Optionally enable **Google**, **GitHub**, etc.

### For Email Authentication:
1. Go to **Authentication** → **URL Configuration**
2. Set your site URL to `http://localhost:3000` for development
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - Add your production URL when deploying

## Step 8: Verify the Setup

1. In your Supabase dashboard, go to **Table Editor**
2. You should see three tables:
   - `problems`
   - `submissions`
   - `user_progress`
3. Click on the `problems` table to see your seeded data

## Step 9: Test Locally

1. Install dependencies (if not already done):
```bash
pnpm install
```

2. Start your development server:
```bash
pnpm dev
```

3. Open `http://localhost:3000` in your browser
4. Your app should now be connected to Supabase!

## Optional: Set Up Storage (for future use)

If you plan to allow users to upload files:

1. Go to **Storage** in the left sidebar
2. Click "New Bucket"
3. Create buckets as needed (e.g., `avatars`, `problem-images`)
4. Configure bucket policies in the Policies tab

## Troubleshooting

### Common Issues:

**Problem**: "Invalid API key" error
- **Solution**: Double-check your environment variables are correct and restart your dev server

**Problem**: Can't insert data
- **Solution**: Check your RLS policies. You might need to be authenticated

**Problem**: Tables not showing up
- **Solution**: Re-run the SQL scripts in the SQL Editor

**Problem**: Auth not working
- **Solution**: Verify your redirect URLs in Authentication → URL Configuration

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the same environment variables to your hosting platform
2. Update the Site URL and redirect URLs in Supabase Authentication settings
3. Consider upgrading to a paid Supabase plan for higher limits

## Free Tier Limits

The Supabase free tier includes:
- 500MB database space
- 1GB file storage
- 50,000 monthly active users
- 500MB egress bandwidth per month
- No credit card required

Perfect for development and small projects!

## Next Steps

- Review the SQL scripts to understand your database schema
- Check the Supabase client configuration in `lib/supabase/`
- Test user authentication flows
- Start building your features!

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
