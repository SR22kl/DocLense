# DocLense

> A modern document management and analysis app built with Next.js, Clerk auth, Prisma, PostgreSQL, and Google Generative AI.

## Preview

![DocLense Preview 1](preview/pre-1.png)

![DocLense Preview 2](preview/pre-2.png)

![DocLense Preview 3](preview/pre-3.png)

![DocLense Preview 4](preview/pre-4.png)

## Project Overview

DocLense is a Next.js application that lets users upload documents, manage organizations, and analyze document content using AI-powered generation. It uses secure authentication, PostgreSQL-backed persistence, and cloud storage for document assets.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Prisma ORM
- PostgreSQL database
- Clerk authentication
- Google Generative AI (`@google/generative-ai`)
- Vercel Blob storage
- Shadcn UI with Radix primitives
- Framer Motion animations
- Sonner toast notifications

## Primary Packages

### Dependencies

- `next`
- `react`
- `react-dom`
- `typescript`
- `@clerk/nextjs`
- `@google/generative-ai`
- `@vercel/blob`
- `@prisma/client`
- `@prisma/adapter-pg`
- `pg`
- `tailwindcss`
- `@tailwindcss/postcss`
- `shadcn`
- `radix-ui`
- `framer-motion`
- `lucide-react`
- `@phosphor-icons/react`
- `react-icons`
- `react-markdown`
- `clsx`
- `class-variance-authority`
- `next-themes`
- `tailwind-merge`
- `tw-animate-css`
- `sonner`
- `dotenv`

### Dev Dependencies

- `eslint`
- `eslint-config-next`
- `prisma`
- `tsx`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@types/pg`

## Services Required

- Clerk (authentication)
- Google Cloud Generative AI API
- PostgreSQL database
- Vercel or another hosting provider for deployment
- Optional: Vercel storage / blob support

## Project Structure

```text
DocLense/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/page.tsx
│   │   └── sign-up/
│   │       └── [[...sign-up]]/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── [orgSlug]/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── documents/page.tsx
│   ├── (root)/page.tsx
│   ├── api/
│   │   ├── analyze/route.ts
│   │   ├── documents/route.ts
│   │   ├── documents/[documentId]/route.ts
│   │   └── organizations/route.ts
│   ├── data/data.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── favicon.ico
├── components/
│   ├── Banner.tsx
│   ├── Cta.tsx
│   ├── Features.tsx
│   ├── Hiworks.tsx
│   ├── document/
│   │   ├── documentCard.tsx
│   │   └── docUploadDialog.tsx
│   ├── common/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── LogoIcon.tsx
│   └── ui/ (shadcn UI primitives)
├── lib/
│   ├── blob.ts
│   ├── gemini.ts
│   ├── prisma.ts
│   ├── sync-user.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── preview/
│   ├── pre-1.png
│   ├── pre-2.png
│   ├── pre-3.png
│   └── pre-4.png
├── public/
├── types/
│   └── index.ts
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd DocLense
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>
CLERK_JWT_KEY=<your-clerk-jwt-key>
GOOGLE_API_KEY=<your-google-gen-ai-api-key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
NEXT_PUBLIC_CLOUD_STORAGE_BUCKET=<your-storage-bucket>
```

> Replace the placeholder values with your own PostgreSQL and service credentials.

### 4. Configure Clerk

1. Sign up for Clerk and create a new application.
2. Add the redirect URL for local development, typically `http://localhost:3000/*`.
3. Copy the frontend API key, API key, and JWT key into `.env`.

### 5. Configure Google Generative AI

1. Enable the Google Cloud Generative AI API.
2. Create credentials and add the API key to `.env`.
3. Confirm the project has permissions to call the generative AI models.

### 6. Configure PostgreSQL

1. Create a PostgreSQL database.
2. Set `DATABASE_URL` in `.env`.
3. Run Prisma migrations to initialize the schema:

```bash
npx prisma migrate dev --name init
```

If you already have the schema and want to push without generating a migration:

```bash
npx prisma db push
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view DocLense locally.

### 8. Build for production

```bash
npm run build
npm start
```

## Deployment

- Deploy to Vercel for seamless Next.js support.
- Set the same environment variables in Vercel.
- Enable any required build settings for `next build`.

## Notes

- The `app/api/analyze/route.ts` endpoint handles document analysis requests.
- The `app/api/documents` and `app/api/organizations` routes manage persistence and organization data.
- The `lib/prisma.ts` file exports the Prisma client instance.

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Preview Images

The preview images are stored in the `preview/` folder:

- `preview/pre-1.png`
- `preview/pre-2.png`
- `preview/pre-3.png`
- `preview/pre-4.png`

Use them as a reference for the UI and app flow.
