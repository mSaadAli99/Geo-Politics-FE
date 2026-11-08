import { http, HttpResponse } from 'msw';
import {
  categories,
  countries,
  filterArticles,
  getArticleDetail,
  getCountryDetail,
  getEventDetail,
  getTimeline,
  health,
  overview,
  sentimentByCategory,
  sentimentByDay,
  sentimentBySource,
  categoryStats,
  sources,
  trending,
  events,
  paginate,
} from './fixtures';

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

function paramsFromUrl(request) {
  const url = new URL(request.url);
  const params = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

export const handlers = [
  http.get(`${base}/health`, () => HttpResponse.json(health)),

  http.get(`${base}/categories`, () => HttpResponse.json(categories)),

  http.get(`${base}/sources`, () => HttpResponse.json(sources)),

  http.get(`${base}/articles`, ({ request }) => {
    const params = paramsFromUrl(request);
    return HttpResponse.json(filterArticles(params));
  }),

  http.get(`${base}/articles/:id`, ({ params }) => {
    const article = getArticleDetail(params.id);
    if (!article) return HttpResponse.json({ detail: 'Article not found' }, { status: 404 });
    return HttpResponse.json(article);
  }),

  http.get(`${base}/countries`, () => HttpResponse.json(countries)),

  http.get(`${base}/countries/:iso2`, ({ params }) => {
    const detail = getCountryDetail(params.iso2);
    if (!detail) return HttpResponse.json({ detail: 'Country not found' }, { status: 404 });
    return HttpResponse.json(detail);
  }),

  http.get(`${base}/trending`, ({ request }) => {
    const params = paramsFromUrl(request);
    const limit = Number(params.limit) || trending.length;
    return HttpResponse.json(trending.slice(0, limit));
  }),

  http.get(`${base}/stats/overview`, () => HttpResponse.json(overview)),

  http.get(`${base}/stats/sentiment`, ({ request }) => {
    const params = paramsFromUrl(request);
    if (params.group_by === 'category') return HttpResponse.json(sentimentByCategory);
    if (params.group_by === 'source') return HttpResponse.json(sentimentBySource);
    if (params.group_by === 'country') {
      return HttpResponse.json(
        countries.slice(0, 8).map((c) => ({
          key: c.iso2,
          positive: 10,
          negative: 14,
          neutral: 12,
          total: 36,
        })),
      );
    }
    return HttpResponse.json(sentimentByDay);
  }),

  http.get(`${base}/stats/categories`, () => HttpResponse.json(categoryStats)),

  http.get(`${base}/events`, ({ request }) => {
    const params = paramsFromUrl(request);
    let list = [...events];
    if (params.q) {
      const q = String(params.q).toLowerCase();
      list = list.filter((e) => e.title.toLowerCase().includes(q));
    }
    if (params.category) list = list.filter((e) => e.category === params.category);
    if (params.country) list = list.filter((e) => e.countries.some((c) => c.iso2 === params.country));
    if (params.min_sources) list = list.filter((e) => e.sources_count >= Number(params.min_sources));
    return HttpResponse.json(paginate(list, params.page, params.page_size || 10));
  }),

  http.get(`${base}/events/:id`, ({ params }) => {
    const detail = getEventDetail(params.id);
    if (!detail) return HttpResponse.json({ detail: 'Event not found' }, { status: 404 });
    return HttpResponse.json(detail);
  }),

  http.get(`${base}/timeline`, ({ request }) => {
    const params = paramsFromUrl(request);
    return HttpResponse.json(getTimeline(params));
  }),
];
