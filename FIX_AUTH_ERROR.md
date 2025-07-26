# 🚨 Fix Authentication 500 Error

## Problem
Your authentication is failing with a 500 error because the `NEXTAUTH_SECRET` in your `.env` file is set to a placeholder value instead of a real secret.

## Quick Fix

**Step 1:** Open your `.env` file in the root directory

**Step 2:** Replace this line:
```
NEXTAUTH_SECRET="your-secret-key-here"
```

**Step 3:** With this line (copy exactly):
```
NEXTAUTH_SECRET="mK9vY+qE5z3w7wA8/uB6nC4fG2hJ5kL8mN0pQ3rS6tU9vX2zA5cF7hJ0kM3nP6qT"
```

**Step 4:** Save the file

**Step 5:** Restart your development server:
```bash
npm run dev
```

## Your Updated .env File Should Look Like This:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="mK9vY+qE5z3w7wA8/uB6nC4fG2hJ5kL8mN0pQ3rS6tU9vX2zA5cF7hJ0kM3nP6qT"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## After This Fix:
- ✅ Email/password login will work
- ✅ Email/password signup will work  
- ✅ Users will be redirected to dashboard after login
- ❌ Google OAuth will still show placeholder (that's fine for now)

## Test It:
1. Go to `http://localhost:3000/auth/signup`
2. Create an account with email/password
3. Then try logging in at `http://localhost:3000/auth/login`
4. You should be redirected to the dashboard!

## For Google OAuth Later:
If you want Google sign-in to work, you'll need to:
1. Set up Google Cloud Console credentials
2. Replace the Google client ID and secret placeholders
3. Follow the full setup guide in `AUTHENTICATION_SETUP.md`