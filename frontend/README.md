# GeoPolitics AI — Frontend

React dashboard that turns geopolitical news into concise insights: search, map, sentiment, trending topics, source comparison, and timelines.

## Stack

- React 18 + Vite (JavaScript)
- React Router v6
- Axios API client
- Recharts, Leaflet / React-Leaflet
- CSS variables + CSS Modules
- Vitest + React Testing Library + MSW

## Quick start

```bash
cd frontend
npm install
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

By default `VITE_USE_MOCKS=true` so the UI runs against MSW fixtures without a backend.

## Environment

Copy `.env.example` to `.env`:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend base URL, e.g. `http://localhost:8000/api/v1` |
| `VITE_POLL_INTERVAL_SECONDS` | Dashboard polling interval (default `60`) |
| `VITE_USE_MOCKS` | `true` = MSW mocks, `false` = real API |

No API keys belong in the frontend.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local Vite server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm test` | Vitest once |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Routes

| Path | Page |
|---|---|
| `/` | Dashboard |
| `/news` | Search + filters |
| `/news/:id` | Article detail |
| `/map` | World map + country panel |
| `/sentiment` | Sentiment analysis |
| `/trending` | Trending topics |
| `/compare` | Multi-source events |
| `/compare/:eventId` | Event comparison |
| `/timeline` | Chronological timeline |
| `/about` | Methodology |

## Deploy (Vercel)

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Set `VITE_API_BASE_URL` to your Render backend URL
- SPA rewrites are in `vercel.json`

Ensure the backend `CORS_ORIGINS` includes the frontend origin.

## Project layout

See `GeoPolitics_AI_Frontend.md` in the repo root for the full build spec and API contract.
