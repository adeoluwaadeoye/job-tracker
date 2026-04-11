# JobTracker — AI-Powered Job Application Tracker

A full-stack web application that helps engineers track job applications intelligently. Paste any job description and AI instantly extracts the role details, required skills, and writes a tailored cover letter. Built with Next.js, MongoDB, and Groq.

![JobTracker](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-orange?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)

---

## Features

- **AI-powered parsing** — Paste any job description. Groq + Llama 3.3 extracts title, company, location, type, top skills, and a 2-sentence summary in under 3 seconds
- **Cover letter generation** — Gets a confident, role-specific opening paragraph written automatically for every job
- **Visual job board** — Track every application through stages: Saved → Applied → Interviewing → Offer → Rejected
- **Pipeline analytics** — See response rates, interview conversion, and the most in-demand skills across all your applications
- **Email verification** — 6-digit OTP sent on registration via Resend. Unverified users cannot access the dashboard
- **Auth** — Email + password, GitHub OAuth, Google OAuth via NextAuth v5
- **Password reset** — Secure token-based password reset via email
- **Fully responsive** — Works on mobile, tablet, and desktop
- **Notes per application** — Add interview prep notes, contacts, and follow-up dates per job

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Auth | NextAuth v5 |
| AI | Groq API (Llama 3.3 70B) |
| Email | Resend |
| Data fetching | SWR |
| Font | Space Grotesk (headings) + Inter (body) |

# JobTracker — AI-Powered Job Application Tracker

A full-stack web application that helps engineers track job applications intelligently. Paste any job description and AI instantly extracts the role details, required skills, and writes a tailored cover letter. Built with Next.js, MongoDB, and Groq.

![JobTracker](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-orange?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)

---

## Features

- **AI-powered parsing** — Paste any job description. Groq + Llama 3.3 extracts title, company, location, type, top skills, and a 2-sentence summary in under 3 seconds
- **Cover letter generation** — Gets a confident, role-specific opening paragraph written automatically for every job
- **Visual job board** — Track every application through stages: Saved → Applied → Interviewing → Offer → Rejected
- **Pipeline analytics** — See response rates, interview conversion, and the most in-demand skills across all your applications
- **Email verification** — 6-digit OTP sent on registration via Resend. Unverified users cannot access the dashboard
- **Auth** — Email + password, GitHub OAuth, Google OAuth via NextAuth v5
- **Password reset** — Secure token-based password reset via email
- **Fully responsive** — Works on mobile, tablet, and desktop
- **Notes per application** — Add interview prep notes, contacts, and follow-up dates per job

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Auth | NextAuth v5 |
| AI | Groq API (Llama 3.3 70B) |
| Email | Resend |
| Data fetching | SWR |
| Font | Space Grotesk (headings) + Inter (body) |

---
---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free M0 cluster)
- Groq API key (free at console.groq.com)
- Resend account (free tier)
- GitHub OAuth app
- Google OAuth credentials

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/ai-job-tracker.git
cd ai-job-tracker
```

**2. Install dependencies**

```bash
npm install --legacy-peer-deps
```

**3. Set up environment variables**

Create `.env.local` in the project root:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker?retryWrites=true&w=majority

# Auth
AUTH_SECRET=your_auth_secret        # generate with: npx auth secret
NEXTAUTH_URL=http://localhost:3000

# OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI
GROQ_API_KEY=gsk_your_groq_api_key

# Email
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
```

**4. Run the development server**

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Environment Variables Guide

| Variable | Where to get it |
|----------|----------------|
| `MONGODB_URI` | MongoDB Atlas → Connect → Drivers |
| `AUTH_SECRET` | Run `npx auth secret` in terminal |
| `GITHUB_CLIENT_ID` | GitHub → Settings → Developer settings → OAuth Apps |
| `GITHUB_CLIENT_SECRET` | Same as above |
| `GOOGLE_CLIENT_ID` | Google Cloud Console → APIs & Services → Credentials |
| `GOOGLE_CLIENT_SECRET` | Same as above |
| `GROQ_API_KEY` | console.groq.com → API Keys |
| `RESEND_API_KEY` | resend.com → API Keys |

---

## Deployment

### Deploy to Vercel (recommended)

**1. Push to GitHub**

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourusername/ai-job-tracker.git
git push -u origin main
```

**2. Import to Vercel**

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Add all environment variables from `.env.local`
4. Update `NEXTAUTH_URL` to your Vercel URL: `https://your-app.vercel.app`
5. Click **Deploy**

**3. Update OAuth callback URLs**

After deployment, update your OAuth apps with the production URLs:

- GitHub: `https://your-app.vercel.app/api/auth/callback/github`
- Google: `https://your-app.vercel.app/api/auth/callback/google`

**4. Update Resend**

For production, verify your domain in Resend and update `EMAIL_FROM` to `noreply@yourdomain.com` so you can send emails to any address.

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/jobs/parse` | Parse job description with AI |
| `GET` | `/api/jobs` | Get all jobs (optional `?status=` filter) |
| `POST` | `/api/jobs` | Create a job |
| `PATCH` | `/api/jobs/:id` | Update job (status, notes, etc.) |
| `DELETE` | `/api/jobs/:id` | Delete a job |
| `POST` | `/api/auth/register` | Register with email + password |
| `POST` | `/api/auth/verify-email` | Verify email with OTP |
| `POST` | `/api/auth/resend-code` | Resend verification code |
| `POST` | `/api/auth/reset-password` | Request password reset |
| `POST` | `/api/auth/new-password` | Set new password |

---

## Key Implementation Details

**AI Pipeline** — Two sequential Groq API calls on parse. First extracts structured JSON (title, company, skills, etc.), second generates a tailored cover letter. Separated to keep prompts focused and outputs reliable.

**Auth Security** — Email verification is enforced. Unverified users are blocked from signing in. OTP codes are SHA-256 hashed before storage, expire in 10 minutes, and lock after 3 failed attempts.

**Database** — MongoDB connection uses a global singleton with connection pooling (`maxPoolSize: 10`) to prevent connection exhaustion in serverless environments.

**Data Fetching** — SWR handles all client-side data fetching with 5-second deduplication intervals, preventing redundant API calls during navigation.

**Route Protection** — `proxy.ts` intercepts all `/dashboard/*` requests and redirects unauthenticated users to `/auth/login` with the original URL as `callbackUrl`.

---

## Roadmap

- [ ] Native mobile app (iOS + Android)
- [ ] Resume builder and storage
- [ ] Cover letter full document generation
- [ ] Interview question generator per role
- [ ] Follow-up reminder system
- [ ] Export applications to CSV
- [ ] Skill gap analysis
- [ ] Dark mode toggle
- [ ] Team/collaborative tracking

---

## License

MIT — free to use, modify, and distribute.

---

Built by [Adeoluwa Adeoye](https://github.com/adeoluwaadeoye)