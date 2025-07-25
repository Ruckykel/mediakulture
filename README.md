# MediaKulture

A modern landing page with full authentication system built with Next.js, NextAuth.js, and Prisma.

## Features

- **Landing Page**: Beautiful hero section with responsive design
- **Authentication**: Complete login/signup system with NextAuth.js
- **Database**: SQLite database with Prisma ORM
- **UI**: Modern design with Tailwind CSS
- **Responsive**: Works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication System

### Features
- User registration with email and password
- Secure password hashing with bcrypt
- JWT-based sessions
- Protected routes
- User dashboard

### Pages
- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Signup page  
- `/dashboard` - Protected dashboard (requires authentication)

### How to Test

1. **Create an account**:
   - Go to `/auth/signup`
   - Fill in your details
   - Click "Create account"

2. **Login**:
   - Go to `/auth/login`
   - Enter your credentials
   - You'll be redirected to the dashboard

3. **Dashboard**:
   - View your user information
   - Logout when done

## Project Structure

```
mediakulture/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── api/
│   │   └── auth/
│   ├── components/
│   ├── landing/
│   └── dashboard/
├── prisma/
│   └── schema.prisma
└── public/
    ├── MediaKultureLogo.png
    ├── favicon.svg
    └── man.png
```

## Technologies Used

- **Next.js 14** - React framework
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **SQLite** - Database
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Database

The project uses SQLite for simplicity. The database file (`dev.db`) will be created automatically when you run `npx prisma db push`.

## Deployment

This project can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
