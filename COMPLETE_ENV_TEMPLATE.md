# 🔧 Complete .env File Template

## Problem Found
Your `.env` file is missing the Google OAuth credentials and NextAuth configuration. This is why you're getting "Error 401: invalid_client".

## Your Current .env File
```env
DATABASE_URL="file:./dev.db"
```

## What Your .env File Should Look Like

**Copy this complete template into your `.env` file:**

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="mK9vY+qE5z3w7wA8/uB6nC4fG2hJ5kL8mN0pQ3rS6tU9vX2zA5cF7hJ0kM3nP6qT"

# Google OAuth Configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
```

## Step-by-Step Fix

### 1. Update Your .env File
1. Open your `.env` file in the root directory
2. **Replace the entire contents** with the template above
3. Keep the Google placeholders for now - we'll update them next

### 2. Get Your Google Credentials
You need to get the real Google OAuth credentials from Google Cloud Console:

1. **Go to**: https://console.cloud.google.com/
2. **Create project** (if you haven't): "MediaKulture"
3. **Enable Google+ API**: APIs & Services → Library → Search "Google+ API" → Enable
4. **Create OAuth credentials**: APIs & Services → Credentials → Create OAuth 2.0 Client ID
5. **Set redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3002/api/auth/callback/google
   ```

### 3. Replace the Placeholders
Once you get your credentials from Google, replace:

```env
# Replace this:
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"

# With your actual credentials (example format):
GOOGLE_CLIENT_ID="123456789-abcdefg.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-ActualSecretFromGoogle"
```

### 4. Restart Your Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 5. Test Again
- Go to login page
- Click "Sign in with Google"
- Should work without the "invalid_client" error

## Quick Verification

After updating your .env file, check that it contains all 5 lines:
- ✅ DATABASE_URL
- ✅ NEXTAUTH_URL  
- ✅ NEXTAUTH_SECRET
- ✅ GOOGLE_CLIENT_ID
- ✅ GOOGLE_CLIENT_SECRET

**The "invalid_client" error will disappear once you add the missing environment variables!** 