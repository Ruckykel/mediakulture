# Authentication Setup Guide

## Overview
Your MediaKulture application now supports both email/password authentication and Google OAuth login. Users can sign up/sign in using either method and will be redirected to the dashboard after successful authentication.

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-random-string-here"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (for production)
5. **Copy the Client ID and Client Secret** to your `.env.local` file

## Generate NextAuth Secret

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```
Or use: https://generate-secret.vercel.app/32

## What's Been Implemented

### ✅ Database Schema
- Updated Prisma schema with NextAuth OAuth tables
- Account, Session, User, and VerificationToken models
- Migrations applied successfully

### ✅ NextAuth Configuration
- Google OAuth provider configured
- Credentials provider for email/password login
- Prisma adapter for database integration
- Automatic redirect to dashboard after login

### ✅ Login Page
- Email/password authentication
- Google sign-in button (functional)
- Error handling and loading states
- Automatic redirect to dashboard when authenticated

### ✅ Signup Page
- Email/password registration
- Google sign-up button (functional)
- Password confirmation validation
- Success/error feedback

### ✅ Dashboard Protection
- Automatic redirect to login if not authenticated
- Displays user information from session
- Works with both email and Google authentication

## Testing the Authentication

1. **Set up your environment variables** as shown above
2. **Start your development server**: `npm run dev`
3. **Test email/password signup**:
   - Go to `/auth/signup`
   - Create an account with email/password
   - Should redirect to login page
4. **Test email/password login**:
   - Go to `/auth/login`
   - Login with your credentials
   - Should redirect to `/dashboard`
5. **Test Google authentication**:
   - Click "Sign in with Google" on login page
   - Complete Google OAuth flow
   - Should redirect to `/dashboard`

## Features

- ✅ Email/password authentication
- ✅ Google OAuth authentication
- ✅ Automatic dashboard redirect after login
- ✅ Session management with NextAuth
- ✅ Protected dashboard page
- ✅ User information display
- ✅ Secure password hashing
- ✅ Database integration with Prisma

## Troubleshooting

If you encounter issues:

1. **Make sure all environment variables are set correctly**
2. **Verify Google OAuth credentials and redirect URIs**
3. **Check that the database is accessible**
4. **Ensure NextAuth secret is properly configured**
5. **Check browser console for any JavaScript errors**

Your authentication system is now fully functional and ready for use! 