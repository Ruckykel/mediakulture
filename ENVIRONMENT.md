# Environment Variables

For deployment to Vercel, you'll need to set the following environment variables in your Vercel dashboard:

## Required Environment Variables

### Database
- `DATABASE_URL`: Your database connection string
  - For development: `file:./dev.db`
  - For production: Use a cloud database like PostgreSQL (recommended for Vercel)

### NextAuth
- `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET`: A secure random string for session encryption

### OAuth Providers (Optional)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with the appropriate value

## Database Setup for Production

For production, it's recommended to use a cloud database like:
- PostgreSQL on Vercel Postgres
- PlanetScale
- Supabase
- Railway

Update your `DATABASE_URL` to point to your production database. 