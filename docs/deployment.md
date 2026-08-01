# Heroy Hotel — Deployment Guide

## Recommended hosting split

- **Database**: managed Postgres (Neon, Supabase, Railway, or Render Postgres) — don't self-host Postgres in production unless you have ops experience.
- **API (apps/api)**: Railway, Render, or Fly.io — all support Node.js + Docker deploys with env var management.
- **Web (apps/web)**: Vercel (best fit for Next.js) or Netlify.

## Steps

### 1. Database
1. Create a managed Postgres instance.
2. Copy its connection string into `DATABASE_URL`.
3. Run migrations against it:
```bash
   cd apps/api
   DATABASE_URL="your-production-url" npx prisma migrate deploy
```

### 2. API
1. Set all environment variables from `apps/api/.env.example` in your hosting provider's dashboard — never commit real secrets.
2. Generate fresh, long random values for `JWT_SECRET` and `REFRESH_TOKEN_SECRET` (do not reuse local dev values):
```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
   Run this twice — once for each secret.
3. Set `CLIENT_URL` to your deployed frontend's real URL (needed for CORS).
4. Deploy via Docker (`apps/api/Dockerfile`) or your provider's native Node.js buildpack.

### 3. Web
1. Set `NEXT_PUBLIC_API_URL` to your deployed API's real URL.
2. Deploy to Vercel — it auto-detects Next.js, no Dockerfile needed there if using Vercel directly.

### 4. Post-deploy checklist
- [ ] Confirm `/health` on the API returns `{ status: "ok" }`
- [ ] Register a test account and confirm login works
- [ ] Promote one account to `SUPER_ADMIN` directly in the production database (same Prisma Studio approach as local dev)
- [ ] Test the AI chat widget against the live API
- [ ] Rotate the Groq API key if it was ever exposed during development
- [ ] Set up a real SMTP provider if using the AI Reports "email reports" feature
- [ ] Enable HTTPS on both API and web (most managed hosts do this automatically)

## Notes
- The seed script (`apps/api/prisma/seed/seed.ts`) is for development only — do not run it against production unless you intend to create real demo data.
- Rate limiting is already configured in `apps/api/src/app.ts`; adjust `RATE_LIMIT_MAX` for production traffic expectations.