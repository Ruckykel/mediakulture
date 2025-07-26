# 🔧 Google OAuth Setup Guide

## Current Status
✅ Your email/password authentication is working perfectly!
✅ Google OAuth backend is configured and ready
🔧 Just need Google OAuth credentials to enable "Sign in with Google"

## Step-by-Step Google OAuth Setup

### 1. Go to Google Cloud Console
Open: https://console.cloud.google.com/

### 2. Create or Select a Project
- If you don't have a project: Click "New Project" → Enter "MediaKulture" → Create
- If you have a project: Select it from the dropdown

### 3. Enable Google+ API (Required for OAuth)
1. Go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**

### 4. Configure OAuth Consent Screen
1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** (unless you have a Google Workspace)
3. Fill in required fields:
   - **App name**: `MediaKulture`
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Click **"Save and Continue"**
5. **Skip** the Scopes step (click "Save and Continue")
6. **Skip** the Test users step (click "Save and Continue")

### 5. Create OAuth 2.0 Credentials
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"OAuth 2.0 Client IDs"**
3. Choose **"Web application"**
4. Set **Name**: `MediaKulture Web Client`
5. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3002/api/auth/callback/google
   ```
   (Add both ports since your app might run on either)
6. Click **"Create"**

### 6. Copy Your Credentials
After creating, you'll see a popup with:
- **Client ID** (long string ending in `.apps.googleusercontent.com`)
- **Client Secret** (shorter random string)

**Keep this popup open** and continue to the next step.

### 7. Update Your .env File
Open your `.env` file and replace the Google placeholders:

**Replace this:**
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**With your actual credentials:**
```env
GOOGLE_CLIENT_ID="1234567890-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your_actual_secret_here"
```

### 8. Restart Your Development Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 9. Test Google Sign-In
1. Go to: `http://localhost:3000/auth/login` (or 3002)
2. Click **"Sign in with Google"**
3. Should open Google OAuth popup
4. Sign in with your Google account
5. Should redirect to `/dashboard` with your Google profile info

## 🏆 Success Indicators

You'll know it's working when:
- ✅ "Sign in with Google" button is clickable (not disabled)
- ✅ Clicking it opens Google OAuth popup
- ✅ After Google login, redirects to dashboard
- ✅ Dashboard shows your Google name and email
- ✅ No errors in browser console

## 🔒 Production Setup (Later)

For production deployment, you'll need to:
1. Add your production domain to authorized redirect URIs:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
2. Update `NEXTAUTH_URL` in your production environment

## ⚠️ Troubleshooting

**"Error 400: redirect_uri_mismatch"**
- Make sure the redirect URI in Google Console exactly matches your local URL
- Include both `:3000` and `:3002` ports

**"This app isn't verified"**
- Normal for development - click "Advanced" → "Go to MediaKulture (unsafe)"
- For production, you'll need to verify your app

**Button still disabled**
- Make sure you restarted the dev server after updating .env
- Check that CLIENT_ID and CLIENT_SECRET have no extra quotes or spaces

Your Google OAuth is ready to go! 🚀 