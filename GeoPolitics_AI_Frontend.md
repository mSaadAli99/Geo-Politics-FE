# GeoPolitics AI: Frontend Build Spec (React)

> Give this file to Cursor (Agent mode) together with `GeoPolitics_AI_Backend.md`.
> The backend is **FastAPI** (not Flask). The **API contract in section 5 must match section 6 of the backend file exactly.**

---

## 1. What we're building

The web interface of **GeoPolitics AI**: an easy-to-use dashboard that turns continuously updated geopolitical news into concise insights. Users can:

1. Open the **Dashboard**: latest news, trending topics, country updates, sentiment graphs and an interactive world map.
2. **Search** a topic (e.g. "Pakistan–India Relations") or **filter** by country, category, sentiment, source and date.
3. Open an **Article**: headline, source, available text, **AI summary**, category, sentiment, detected countries/organisations/people, credibility score, and a link to the original.
4. Explore the **World Map**: pick a country to see its related news and events.
5. View **Sentiment analysis**: positive/negative/neutral distribution by time, topic, category or country.
6. Explore **Trending topics** and click one to see its articles and summaries.
7. **Compare sources**: see how different publishers reported the same event (headlines, summaries, times, credibility).
8. View the **Timeline**: a topic/country/event in chronological order, showing how reporting developed.

## 2. Tech stack

| Area | Choice |
|---|---|
| Framework | **React.js 18** with **Vite** (JavaScript) |
| Routing | `react-router-dom` v6 |
| HTTP | **Axios**, through one shared API client |
| Charts | **Recharts** |
| Map | **Leaflet.js** + **React-Leaflet** (v4 for React 18), plus a world countries GeoJSON |
| Timeline | Custom vertical timeline component (HTML/CSS) |
| Styling | **CSS**: global variables + CSS Modules per component; responsive (mobile → desktop) |
| Dates | `date-fns` |
| Icons | `lucide-react` (optional) |
| Testing | **Vitest** + **React Testing Library**; **MSW** to mock the API |
| Lint / format | ESLint + Prettier |

Don't use a UI kit that hides the HTML/CSS. The proposal lists HTML, CSS and JavaScript as our own work.

## 3. Folder structure

```
frontend/
├── public/
│   └── world-countries.geojson      # countries with ISO_A2 / ISO_A3 properties
├── src/
│   ├── main.jsx
│   ├── App.jsx                      # routes + layout
│   ├── api/
│   │   ├── client.js                # axios instance (baseURL from env, timeout, error interceptor)
│   │   ├── articles.js              # getArticles, getArticle
│   │   ├── countries.js
│   │   ├── trending.js
│   │   ├── stats.js
│   │   ├── events.js
│   │   ├── timeline.js
│   │   └── meta.js                  # categories, sources, health
│   ├── hooks/
│   │   ├── useApi.js                # generic {data, loading, error, refetch} with AbortController
│   │   ├── useFilters.js            # filters <-> URL query string sync
│   │   ├── useDebounce.js
│   │   └── usePolling.js            # refetch every N seconds
│   ├── components/
│   │   ├── layout/ (Navbar, Sidebar, Footer, PageHeader)
│   │   ├── articles/ (ArticleCard, ArticleList, ArticleMeta, SummaryBox, EntityChips)
│   │   ├── badges/ (CategoryBadge, SentimentBadge, CredibilityBadge, CountryChip)
│   │   ├── filters/ (SearchBar, FilterBar, DateRangePicker, Pagination)
│   │   ├── charts/ (SentimentPieChart, SentimentTrendChart, CategoryBarChart, TrendingBarChart)
│   │   ├── map/ (WorldMap, MapLegend, CountryPanel)
│   │   ├── timeline/ (Timeline, TimelineItem, TimelineVolumeChart)
│   │   ├── compare/ (SourceComparisonTable, EventCard)
│   │   ├── credibility/ (CredibilityBreakdown)
│   │   └── common/ (Loader, Skeleton, EmptyState, ErrorState, NewArticlesBanner, StatCard)
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── NewsPage.jsx              # search + filters + results
│   │   ├── ArticlePage.jsx
│   │   ├── MapPage.jsx
│   │   ├── SentimentPage.jsx
│   │   ├── TrendingPage.jsx
│   │   ├── ComparePage.jsx           # list of multi-source events
│   │   ├── EventComparePage.jsx      # one event compared across sources
│   │   ├── TimelinePage.jsx
│   │   ├── AboutPage.jsx             # methodology: how AI + credibility work
│   │   └── NotFoundPage.jsx
│   ├── utils/ (constants.js, format.js, colors.js)
│   └── styles/ (variables.css, global.css)
├── tests/ (setup.js, mocks/handlers.js, *.test.jsx)
├── .env.example
├── vercel.json
└── README.md
```

## 4. Config

`.env.example`:
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_POLL_INTERVAL_SECONDS=60
```

Only non-secret values go in the frontend. **No API keys in the frontend**; news API keys live in the backend only.

## 5. API contract (must match the backend)

Base URL: `VITE_API_BASE_URL` (`/api/v1`). Errors come back as `{"detail": "..."}`.

**ArticleCard**
```jsonc
{
  "id": 123, "title": "...", "url": "https://original",
  "source": { "id": 4, "name": "BBC News", "domain": "bbc.co.uk", "reliability_tier": "high" },
  "author": "string|null", "published_at": "ISO date", "image_url": "string|null",
  "snippet": "...", "summary": "string|null",
  "category": "politics|economy|conflict|international_relations|global_affairs",
  "sentiment": { "label": "positive|negative|neutral", "score": 0.87 },
  "credibility": { "score": 78, "level": "high|medium|low" },
  "countries": [ { "iso2": "PK", "name": "Pakistan" } ],
  "event_id": 55
}
```
**ArticleDetail** = ArticleCard + `content_text`, `entities {persons, organizations, locations}`, `keywords`, `topics [{id,label}]`, `credibility.factors [{name, value, weight, explanation}]`, `credibility.disclaimer`, `related_articles: ArticleCard[]`.

**Paginated**: `{ items, total, page, page_size, pages }`

| Call | Params | Used on |
|---|---|---|
| `GET /health` | – | Footer "last updated" / status dot |
| `GET /articles` | `q, category, country, sentiment, source_id, topic_id, event_id, from, to, min_credibility, sort(latest/relevance/credibility), page, page_size` | Dashboard, News, Trending, Country panel |
| `GET /articles/{id}` | – | Article page |
| `GET /categories` | – | Filters |
| `GET /sources` | – | Filters, About |
| `GET /countries` | `from, to, category` → `[{iso2, iso3, name, lat, lng, article_count, avg_sentiment, dominant_sentiment}]` | Map |
| `GET /countries/{iso2}` | `from, to` → `{country, article_count, sentiment_breakdown, top_categories, top_topics, latest_articles}` | Map side panel |
| `GET /trending` | `window(24h/7d), limit` → `[{id, label, keywords, article_count, trend_score, growth_pct, sample_article_ids}]` | Dashboard, Trending |
| `GET /stats/overview` | – → `{total_articles, articles_today, sources_count, countries_count, last_updated_at, by_category, by_sentiment}` | Dashboard stat cards |
| `GET /stats/sentiment` | `group_by(day/category/country/source), q, category, country, from, to` → `[{key, positive, negative, neutral, total}]` | Sentiment page, Dashboard |
| `GET /stats/categories` | `from, to, country` → `[{category, count}]` | Dashboard |
| `GET /events` | `q, category, country, from, to, min_sources, page, page_size` | Compare list |
| `GET /events/{id}` | – → `{event, articles, comparison: {sources, sentiment_spread, earliest_report, credibility_range}}` | Event compare |
| `GET /timeline` | `q` or `topic_id` or `country` or `event_id`, plus `from, to, granularity(day/week)` → `{buckets, items}` | Timeline |

Put all calls in `src/api/*`. Components never call Axios directly.

## 6. Pages and routes

| Route | Page | Contents |
|---|---|---|
| `/` | **Dashboard** | 4 stat cards (total articles, today, sources, countries) · Trending topics (top 5 chips + small bar chart) · Latest news (10 ArticleCards) · Mini world map (click → `/map?country=XX`) · Sentiment pie (last 7 days) + category bar chart · "N new articles" banner from polling |
| `/news` | **News / Search** | SearchBar (debounced 400ms) + FilterBar (category, country, sentiment, source, date range, min credibility, sort) · results list · pagination. **All filters are synced to the URL query string** so links are shareable and Back works |
| `/news/:id` | **Article** | Headline, source + reliability tier, author, date, image · **AI Summary** box (labelled "AI-generated") · available text · Category, Sentiment, Credibility badges · Detected countries (chips → map), organisations, people · Keywords/topics (chips → news filter) · **Credibility breakdown** (factor bars + explanation + disclaimer) · "Read original article ↗" (new tab, `rel="noopener noreferrer"`) · "Compare coverage" (→ event page if `event_id`) · Related articles |
| `/map` | **World Map** | Full-width Leaflet map with a choropleth of countries by article count (or by dominant sentiment, toggle) · hover tooltip (name + count) · click → side panel with `/countries/{iso2}`: counts, sentiment breakdown, top categories/topics, latest articles · filters for category and date range · legend |
| `/sentiment` | **Sentiment** | Filters (topic search, category, country, date range) · stacked area/line chart over time (`group_by=day`) · pie of overall distribution · bar charts by category and by source · short text explaining how sentiment is computed |
| `/trending` | **Trending** | Window toggle 24h / 7d · ranked list with article count + growth % arrow · bar chart · click a topic → its articles + summaries (`/articles?topic_id=`) and a button "View timeline" |
| `/compare` | **Compare Sources** | Search + filters · list of events covered by ≥2 sources (title, sources count, date range, countries) |
| `/compare/:eventId` | **Event comparison** | Event header · side-by-side cards / table: source, headline, AI summary, published time (earliest marked "First reported"), sentiment, credibility · summary strip: number of sources, sentiment spread, credibility range |
| `/timeline` | **Timeline** | Pick a topic (search), country or trending topic (also reachable through `?q=`, `?country=`, `?topic_id=`, `?event_id=`) · granularity day/week · volume chart (stacked by sentiment) on top · vertical chronological timeline of events below, each with date, title, article count, top article link · note: "Based on the historical data in our database" |
| `/about` | **About / Methodology** | What the system does, data sources, how summaries, categories, sentiment, trending and credibility are produced, limitations and disclaimer |
| `*` | 404 | |

**Layout:** a top navbar with logo "GeoPolitics AI", global search box (→ `/news?q=`) and nav links (Dashboard, News, Map, Sentiment, Trending, Compare, Timeline, About). Collapse to a hamburger menu on mobile. A footer shows the last updated time from `/health`.

## 7. Component rules

- **ArticleCard:** image (or placeholder), title (link to `/news/:id`), source + relative time ("2h ago"), summary (or snippet if the summary is null, plus a small "AI analysis in progress" tag), and CategoryBadge, SentimentBadge, CredibilityBadge and up to 3 CountryChips.
- **Badges** use consistent colours from `utils/colors.js`:
  - Sentiment: positive = green, neutral = grey, negative = red.
  - Credibility: high = green, medium = amber, low = red. Always show the number too, not colour alone.
  - Category: one fixed colour per category, used the same way in every chart.
- **Every data component handles 3 states:** loading (skeletons), error (message + Retry button), and empty ("No articles match these filters" + "Clear filters").
- **Map:**
  - Import `leaflet/dist/leaflet.css` and fix the default marker icon paths for Vite.
  - Load `world-countries.geojson` once and join to `/countries` data by ISO2. Countries with no data are light grey.
  - Use the OpenStreetMap tile layer with attribution, `minZoom=2`, and `worldCopyJump`.
- **Charts:** Recharts `ResponsiveContainer`, tooltips, legends, and readable axis dates via date-fns.
- **Real-time updates:** `usePolling` refetches `/stats/overview` every `VITE_POLL_INTERVAL_SECONDS`. If `total_articles` increased, show "N new articles – Refresh" instead of reloading lists unexpectedly. Pause polling when the tab is hidden.
- **Axios client:** 15s timeout, cancel stale requests with AbortController when filters change, and normalise errors to `{message, status}`.
- The **credibility disclaimer** is always visible wherever a detailed score is shown: *"Indicator based on defined factors, not a fact-check."*

## 8. Design

- Clean, news-dashboard look: neutral background, white cards, 12px radius, subtle shadow, one accent colour (e.g. deep blue `#1E3A8A`). Define everything in `styles/variables.css` (colours, spacing, radius, fonts), with a dark mode via `[data-theme="dark"]` and a toggle in the navbar.
- Font: Inter (Google Fonts) or the system font stack.
- Responsive layout: 1 column on mobile, 2 on tablet, 12-column grid on desktop. The map side panel becomes a bottom sheet on mobile.
- Accessibility: semantic HTML, labels on all inputs, keyboard-navigable filters and map panel, focus outlines, alt text, and sufficient colour contrast.

## 9. Testing

- **Vitest + React Testing Library**, with **MSW** handlers returning fixtures that match section 5.
- **Unit:** badges, format utils, `useFilters` URL sync, Pagination.
- **Integration (page level):** News page filters → correct API params → results rendered; Article page renders summary, entities, credibility breakdown; Dashboard renders stats/trending/latest; error and empty states.
- **Manual checklist:** each user flow in section 1 works end to end against the real backend, at 390px mobile width and on desktop.

## 10. Deployment

- Local:
  ```bash
  npm install
  ```
  ```bash
  npm run dev
  ```
  The app runs on `http://localhost:5173`. The backend must allow this origin in `CORS_ORIGINS`.
- **Vercel:** framework preset Vite, build `npm run build`, output `dist`. Set `VITE_API_BASE_URL` to the Render backend URL. Add a `vercel.json` SPA rewrite so deep links work:
  ```json
  { "rewrites": [ { "source": "/(.*)", "destination": "/index.html" } ] }
  ```

## 11. Build order (stop after each phase and show me)

1. Vite + React skeleton, routing, layout (navbar/footer), CSS variables, Axios client, API modules.
2. Shared components: ArticleCard, badges, loaders/empty/error, Pagination, FilterBar with URL sync.
3. News/Search page + Article page.
4. Dashboard (stat cards, trending, latest, charts, mini map, polling banner).
5. World Map page + country panel.
6. Sentiment and Trending pages.
7. Compare (events list + event comparison) and Timeline pages.
8. About page, dark mode, responsive + accessibility pass, tests, Vercel config, README.

Until the backend is ready, run against the **MSW mocks** so frontend work isn't blocked. Switch to the real API with an env flag (`VITE_USE_MOCKS=true/false`).

## 12. Ground rules

- JavaScript (not TypeScript), functional components + hooks only.
- No business logic or AI processing in the frontend. It only displays what the API returns.
- Never hard-code the API URL; use `VITE_API_BASE_URL`.
- Keep components small, with no duplicated fetch logic.
- At the end, list: how to run, env vars, and screenshots of each page.
