const now = Date.now();
const hoursAgo = (h) => new Date(now - h * 3600_000).toISOString();
const daysAgo = (d) => new Date(now - d * 86400_000).toISOString();

export const sources = [
  { id: 1, name: 'BBC News', domain: 'bbc.co.uk', reliability_tier: 'high' },
  { id: 2, name: 'Reuters', domain: 'reuters.com', reliability_tier: 'high' },
  { id: 3, name: 'Al Jazeera', domain: 'aljazeera.com', reliability_tier: 'high' },
  { id: 4, name: 'Associated Press', domain: 'apnews.com', reliability_tier: 'high' },
  { id: 5, name: 'The Guardian', domain: 'theguardian.com', reliability_tier: 'medium' },
];

export const categories = [
  { value: 'politics', label: 'Politics' },
  { value: 'economy', label: 'Economy' },
  { value: 'conflict', label: 'Conflict' },
  { value: 'international_relations', label: 'International Relations' },
  { value: 'global_affairs', label: 'Global Affairs' },
];

const baseArticles = [
  {
    id: 101,
    title: 'Pakistan and India agree to resume trade talks amid border calm',
    url: 'https://example.com/pk-in-trade',
    source: sources[0],
    author: 'Aisha Khan',
    published_at: hoursAgo(2),
    image_url: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    snippet: 'Officials from both sides confirmed exploratory talks on trade facilitation.',
    summary:
      'Islamabad and New Delhi signal a cautious restart of trade discussions after weeks of reduced border incidents. Analysts note the move is symbolic but could ease regional tension if sustained.',
    category: 'international_relations',
    sentiment: { label: 'positive', score: 0.72 },
    credibility: { score: 84, level: 'high' },
    countries: [
      { iso2: 'PK', name: 'Pakistan' },
      { iso2: 'IN', name: 'India' },
    ],
    event_id: 55,
  },
  {
    id: 102,
    title: 'EU leaders push new sanctions package over Eastern Europe security',
    url: 'https://example.com/eu-sanctions',
    source: sources[1],
    author: 'Marco Silva',
    published_at: hoursAgo(5),
    image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    snippet: 'Brussels drafts additional economic measures targeting energy and finance.',
    summary:
      'European Union capitals are aligning on a fresh round of sanctions aimed at constraining financing channels linked to regional instability.',
    category: 'politics',
    sentiment: { label: 'negative', score: 0.61 },
    credibility: { score: 88, level: 'high' },
    countries: [
      { iso2: 'DE', name: 'Germany' },
      { iso2: 'FR', name: 'France' },
      { iso2: 'UA', name: 'Ukraine' },
    ],
    event_id: 56,
  },
  {
    id: 103,
    title: 'Oil prices rise as Middle East shipping routes face disruption risk',
    url: 'https://example.com/oil-routes',
    source: sources[2],
    author: null,
    published_at: hoursAgo(8),
    image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    snippet: 'Benchmark crude climbs after insurers warn of higher premiums.',
    summary: null,
    category: 'economy',
    sentiment: { label: 'negative', score: 0.58 },
    credibility: { score: 76, level: 'high' },
    countries: [
      { iso2: 'SA', name: 'Saudi Arabia' },
      { iso2: 'IR', name: 'Iran' },
      { iso2: 'YE', name: 'Yemen' },
    ],
    event_id: 57,
  },
  {
    id: 104,
    title: 'ASEAN summit focuses on South China Sea code of conduct',
    url: 'https://example.com/asean-scs',
    source: sources[3],
    author: 'Linh Nguyen',
    published_at: hoursAgo(12),
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    snippet: 'Member states urge faster progress on maritime rules.',
    summary:
      'ASEAN leaders reaffirmed commitment to a binding code of conduct in disputed waters, while acknowledging slow negotiation progress with China.',
    category: 'global_affairs',
    sentiment: { label: 'neutral', score: 0.54 },
    credibility: { score: 81, level: 'high' },
    countries: [
      { iso2: 'PH', name: 'Philippines' },
      { iso2: 'VN', name: 'Vietnam' },
      { iso2: 'CN', name: 'China' },
    ],
    event_id: 58,
  },
  {
    id: 105,
    title: 'Ceasefire talks stall as frontline clashes intensify',
    url: 'https://example.com/ceasefire',
    source: sources[4],
    author: 'Elena Petrova',
    published_at: daysAgo(1),
    image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    snippet: 'Mediators report limited progress after overnight shelling.',
    summary:
      'Diplomatic efforts to revive a ceasefire remain fragile after renewed fighting, with humanitarian agencies warning of rising civilian risk.',
    category: 'conflict',
    sentiment: { label: 'negative', score: 0.81 },
    credibility: { score: 69, level: 'medium' },
    countries: [
      { iso2: 'UA', name: 'Ukraine' },
      { iso2: 'RU', name: 'Russia' },
    ],
    event_id: 56,
  },
  {
    id: 106,
    title: 'US and China hold working-level talks on export controls',
    url: 'https://example.com/us-cn-export',
    source: sources[1],
    author: 'James Reed',
    published_at: daysAgo(1),
    image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    snippet: 'Officials discuss semiconductor licensing and rare earths.',
    summary:
      'Washington and Beijing convened technical discussions aimed at clarifying export-control rules affecting chips and critical minerals.',
    category: 'economy',
    sentiment: { label: 'neutral', score: 0.5 },
    credibility: { score: 86, level: 'high' },
    countries: [
      { iso2: 'US', name: 'United States' },
      { iso2: 'CN', name: 'China' },
    ],
    event_id: 59,
  },
  {
    id: 107,
    title: 'African Union mediation advances in Sahel security dialogue',
    url: 'https://example.com/au-sahel',
    source: sources[2],
    author: 'Fatou Diallo',
    published_at: daysAgo(2),
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    snippet: 'Regional bloc proposes joint monitoring mechanism.',
    summary:
      'The African Union outlined a monitoring framework for Sahel security cooperation, seeking broader buy-in from neighbouring states.',
    category: 'politics',
    sentiment: { label: 'positive', score: 0.64 },
    credibility: { score: 74, level: 'medium' },
    countries: [
      { iso2: 'ML', name: 'Mali' },
      { iso2: 'NE', name: 'Niger' },
      { iso2: 'BF', name: 'Burkina Faso' },
    ],
    event_id: 60,
  },
  {
    id: 108,
    title: 'IMF warns of debt pressure in emerging markets after rate shocks',
    url: 'https://example.com/imf-debt',
    source: sources[0],
    author: 'Sophie Laurent',
    published_at: daysAgo(2),
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    snippet: 'Fund urges proactive restructuring frameworks.',
    summary:
      'The IMF cautioned that higher global rates continue to strain debt sustainability for several emerging economies, recommending earlier restructuring talks.',
    category: 'economy',
    sentiment: { label: 'negative', score: 0.67 },
    credibility: { score: 90, level: 'high' },
    countries: [
      { iso2: 'AR', name: 'Argentina' },
      { iso2: 'EG', name: 'Egypt' },
      { iso2: 'PK', name: 'Pakistan' },
    ],
    event_id: null,
  },
  {
    id: 109,
    title: 'NATO members debate longer-term Ukraine security guarantees',
    url: 'https://example.com/nato-guarantees',
    source: sources[3],
    author: 'Chris Nolan',
    published_at: daysAgo(3),
    image_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    snippet: 'Alliance explores bilateral and multilateral options.',
    summary:
      'NATO allies are weighing frameworks for longer-term security assurances for Ukraine without committing to immediate membership timelines.',
    category: 'international_relations',
    sentiment: { label: 'neutral', score: 0.52 },
    credibility: { score: 83, level: 'high' },
    countries: [
      { iso2: 'US', name: 'United States' },
      { iso2: 'DE', name: 'Germany' },
      { iso2: 'UA', name: 'Ukraine' },
    ],
    event_id: 56,
  },
  {
    id: 110,
    title: 'Brazil hosts climate finance talks ahead of COP summit',
    url: 'https://example.com/brazil-climate',
    source: sources[4],
    author: 'Camila Rocha',
    published_at: daysAgo(3),
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    snippet: 'Developing nations seek clearer funding commitments.',
    summary:
      'Brazil convened pre-COP discussions focused on climate finance delivery, with developing countries pressing for clearer timelines and accountability.',
    category: 'global_affairs',
    sentiment: { label: 'positive', score: 0.59 },
    credibility: { score: 71, level: 'medium' },
    countries: [
      { iso2: 'BR', name: 'Brazil' },
      { iso2: 'IN', name: 'India' },
      { iso2: 'ZA', name: 'South Africa' },
    ],
    event_id: 61,
  },
  {
    id: 111,
    title: 'India and Pakistan border trade proposal draws mixed reactions',
    url: 'https://example.com/pk-in-reactions',
    source: sources[1],
    author: 'Priya Mehta',
    published_at: hoursAgo(1),
    image_url: null,
    snippet: 'Business groups welcome talks; security hawks urge caution.',
    summary:
      'Domestic reactions to renewed Pakistan–India trade contacts remain divided, with commercial lobbies supportive and security voices sceptical.',
    category: 'international_relations',
    sentiment: { label: 'neutral', score: 0.48 },
    credibility: { score: 80, level: 'high' },
    countries: [
      { iso2: 'PK', name: 'Pakistan' },
      { iso2: 'IN', name: 'India' },
    ],
    event_id: 55,
  },
  {
    id: 112,
    title: 'Reuters: Pakistan–India trade thaw still fragile, officials say',
    url: 'https://example.com/reuters-pk-in',
    source: sources[1],
    author: 'Staff',
    published_at: hoursAgo(3),
    image_url: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80',
    snippet: 'Both capitals emphasise confidence-building steps first.',
    summary:
      'Sources familiar with the discussions say any trade restart would begin with limited goods lists and confidence-building measures.',
    category: 'international_relations',
    sentiment: { label: 'positive', score: 0.55 },
    credibility: { score: 91, level: 'high' },
    countries: [
      { iso2: 'PK', name: 'Pakistan' },
      { iso2: 'IN', name: 'India' },
    ],
    event_id: 55,
  },
];

export const articles = baseArticles;

export function getArticleDetail(id) {
  const card = articles.find((a) => a.id === Number(id));
  if (!card) return null;
  return {
    ...card,
    content_text:
      card.summary ||
      card.snippet ||
      'Full article text is unavailable from the source feed. Please open the original link for complete coverage.',
    entities: {
      persons: card.author ? [card.author] : ['Regional envoy'],
      organizations: [card.source.name, 'United Nations'],
      locations: card.countries.map((c) => c.name),
    },
    keywords: ['geopolitics', card.category, ...card.countries.map((c) => c.name.toLowerCase())],
    topics: [
      { id: 1, label: 'Pakistan–India Relations' },
      { id: 2, label: 'European Security' },
      { id: 3, label: 'Energy Markets' },
    ].slice(0, 2),
    credibility: {
      ...card.credibility,
      factors: [
        {
          name: 'Source reliability',
          value: card.source.reliability_tier === 'high' ? 90 : 70,
          weight: 0.35,
          explanation: 'Based on the publisher reliability tier.',
        },
        {
          name: 'Corroboration',
          value: card.event_id ? 78 : 55,
          weight: 0.3,
          explanation: 'Whether similar claims appear across multiple outlets.',
        },
        {
          name: 'Content completeness',
          value: card.summary ? 82 : 48,
          weight: 0.2,
          explanation: 'Availability of summary and structured metadata.',
        },
        {
          name: 'Recency',
          value: 75,
          weight: 0.15,
          explanation: 'How recently the article was published.',
        },
      ],
      disclaimer: 'Indicator based on defined factors, not a fact-check.',
    },
    related_articles: articles.filter((a) => a.id !== card.id).slice(0, 3),
  };
}

export const countries = [
  { iso2: 'PK', iso3: 'PAK', name: 'Pakistan', lat: 30.4, lng: 69.3, article_count: 18, avg_sentiment: 0.12, dominant_sentiment: 'neutral' },
  { iso2: 'IN', iso3: 'IND', name: 'India', lat: 20.6, lng: 78.9, article_count: 22, avg_sentiment: 0.08, dominant_sentiment: 'neutral' },
  { iso2: 'US', iso3: 'USA', name: 'United States', lat: 39.8, lng: -98.5, article_count: 31, avg_sentiment: -0.05, dominant_sentiment: 'neutral' },
  { iso2: 'CN', iso3: 'CHN', name: 'China', lat: 35.9, lng: 104.2, article_count: 27, avg_sentiment: -0.1, dominant_sentiment: 'negative' },
  { iso2: 'UA', iso3: 'UKR', name: 'Ukraine', lat: 48.4, lng: 31.2, article_count: 35, avg_sentiment: -0.42, dominant_sentiment: 'negative' },
  { iso2: 'RU', iso3: 'RUS', name: 'Russia', lat: 61.5, lng: 105.3, article_count: 29, avg_sentiment: -0.38, dominant_sentiment: 'negative' },
  { iso2: 'DE', iso3: 'DEU', name: 'Germany', lat: 51.2, lng: 10.4, article_count: 16, avg_sentiment: -0.15, dominant_sentiment: 'negative' },
  { iso2: 'FR', iso3: 'FRA', name: 'France', lat: 46.2, lng: 2.2, article_count: 14, avg_sentiment: -0.12, dominant_sentiment: 'negative' },
  { iso2: 'BR', iso3: 'BRA', name: 'Brazil', lat: -14.2, lng: -51.9, article_count: 9, avg_sentiment: 0.22, dominant_sentiment: 'positive' },
  { iso2: 'SA', iso3: 'SAU', name: 'Saudi Arabia', lat: 23.9, lng: 45.1, article_count: 11, avg_sentiment: -0.18, dominant_sentiment: 'negative' },
  { iso2: 'IR', iso3: 'IRN', name: 'Iran', lat: 32.4, lng: 53.7, article_count: 13, avg_sentiment: -0.25, dominant_sentiment: 'negative' },
  { iso2: 'PH', iso3: 'PHL', name: 'Philippines', lat: 12.9, lng: 121.8, article_count: 8, avg_sentiment: 0.05, dominant_sentiment: 'neutral' },
];

export function getCountryDetail(iso2) {
  const country = countries.find((c) => c.iso2.toUpperCase() === String(iso2).toUpperCase());
  if (!country) return null;
  const latest = articles.filter((a) => a.countries.some((c) => c.iso2 === country.iso2)).slice(0, 5);
  return {
    country,
    article_count: country.article_count,
    sentiment_breakdown: { positive: 22, negative: 41, neutral: 37 },
    top_categories: [
      { category: 'international_relations', count: 8 },
      { category: 'politics', count: 5 },
      { category: 'economy', count: 4 },
    ],
    top_topics: [
      { id: 1, label: 'Pakistan–India Relations', count: 6 },
      { id: 2, label: 'European Security', count: 4 },
    ],
    latest_articles: latest.length ? latest : articles.slice(0, 3),
  };
}

export const trending = [
  { id: 1, label: 'Pakistan–India Relations', keywords: ['pakistan', 'india', 'trade'], article_count: 14, trend_score: 92, growth_pct: 38, sample_article_ids: [101, 111, 112] },
  { id: 2, label: 'European Security', keywords: ['eu', 'nato', 'ukraine'], article_count: 21, trend_score: 88, growth_pct: 24, sample_article_ids: [102, 105, 109] },
  { id: 3, label: 'Energy Markets', keywords: ['oil', 'shipping', 'crude'], article_count: 11, trend_score: 76, growth_pct: 17, sample_article_ids: [103] },
  { id: 4, label: 'US–China Tech Controls', keywords: ['export', 'chips', 'semiconductor'], article_count: 9, trend_score: 71, growth_pct: 12, sample_article_ids: [106] },
  { id: 5, label: 'Climate Finance', keywords: ['cop', 'climate', 'finance'], article_count: 7, trend_score: 64, growth_pct: 9, sample_article_ids: [110] },
  { id: 6, label: 'Sahel Security', keywords: ['sahel', 'au', 'mediation'], article_count: 5, trend_score: 58, growth_pct: -4, sample_article_ids: [107] },
];

export const overview = {
  total_articles: 1284,
  articles_today: 46,
  sources_count: sources.length,
  countries_count: countries.length,
  last_updated_at: hoursAgo(0.2),
  by_category: {
    politics: 320,
    economy: 280,
    conflict: 210,
    international_relations: 290,
    global_affairs: 184,
  },
  by_sentiment: { positive: 312, negative: 498, neutral: 474 },
};

export const sentimentByDay = Array.from({ length: 14 }).map((_, i) => {
  const day = daysAgo(13 - i).slice(0, 10);
  return {
    key: day,
    positive: 8 + ((i * 3) % 7),
    negative: 12 + ((i * 5) % 9),
    neutral: 10 + ((i * 2) % 6),
    total: 0,
  };
}).map((row) => ({ ...row, total: row.positive + row.negative + row.neutral }));

export const sentimentByCategory = categories.map((c, i) => ({
  key: c.value,
  positive: 20 + i * 4,
  negative: 30 + i * 3,
  neutral: 25 + i * 2,
  total: 75 + i * 9,
}));

export const sentimentBySource = sources.map((s, i) => ({
  key: s.name,
  positive: 15 + i * 2,
  negative: 18 + i * 3,
  neutral: 16 + i,
  total: 49 + i * 6,
}));

export const categoryStats = categories.map((c, i) => ({
  category: c.value,
  count: 40 + i * 12,
}));

export const events = [
  {
    id: 55,
    title: 'Pakistan–India exploratory trade talks',
    category: 'international_relations',
    countries: [
      { iso2: 'PK', name: 'Pakistan' },
      { iso2: 'IN', name: 'India' },
    ],
    sources_count: 3,
    article_count: 3,
    first_seen_at: hoursAgo(5),
    last_seen_at: hoursAgo(1),
  },
  {
    id: 56,
    title: 'EU / NATO security measures on Eastern Europe',
    category: 'politics',
    countries: [
      { iso2: 'UA', name: 'Ukraine' },
      { iso2: 'DE', name: 'Germany' },
    ],
    sources_count: 3,
    article_count: 3,
    first_seen_at: daysAgo(3),
    last_seen_at: hoursAgo(5),
  },
  {
    id: 57,
    title: 'Middle East shipping and oil price spike',
    category: 'economy',
    countries: [
      { iso2: 'SA', name: 'Saudi Arabia' },
      { iso2: 'IR', name: 'Iran' },
    ],
    sources_count: 2,
    article_count: 1,
    first_seen_at: hoursAgo(10),
    last_seen_at: hoursAgo(8),
  },
];

export function getEventDetail(id) {
  const event = events.find((e) => e.id === Number(id));
  if (!event) return null;
  const related = articles.filter((a) => a.event_id === event.id);
  const scores = related.map((a) => a.credibility.score);
  return {
    event,
    articles: related,
    comparison: {
      sources: [...new Set(related.map((a) => a.source.name))],
      sentiment_spread: [...new Set(related.map((a) => a.sentiment.label))],
      earliest_report: related.reduce(
        (min, a) => (!min || a.published_at < min ? a.published_at : min),
        null,
      ),
      credibility_range: scores.length
        ? { min: Math.min(...scores), max: Math.max(...scores) }
        : { min: 0, max: 0 },
    },
  };
}

export function getTimeline(params = {}) {
  const filtered = articles.filter((a) => {
    if (params.country && !a.countries.some((c) => c.iso2 === params.country)) return false;
    if (params.event_id && a.event_id !== Number(params.event_id)) return false;
    if (params.topic_id && Number(params.topic_id) === 1) {
      return a.countries.some((c) => ['PK', 'IN'].includes(c.iso2));
    }
    if (params.q) {
      const q = String(params.q).toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        (a.summary || '').toLowerCase().includes(q) ||
        a.countries.some((c) => c.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const bucketsMap = {};
  filtered.forEach((a) => {
    const key = a.published_at.slice(0, 10);
    if (!bucketsMap[key]) {
      bucketsMap[key] = { key, positive: 0, negative: 0, neutral: 0, total: 0 };
    }
    bucketsMap[key][a.sentiment.label] += 1;
    bucketsMap[key].total += 1;
  });

  const items = Object.entries(bucketsMap)
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([date, bucket]) => ({
      date,
      title: `Coverage cluster · ${date}`,
      article_count: bucket.total,
      top_article: filtered.find((a) => a.published_at.startsWith(date)) || filtered[0],
      sentiment: bucket,
    }));

  return {
    buckets: Object.values(bucketsMap).sort((a, b) => (a.key > b.key ? 1 : -1)),
    items,
  };
}

export const health = {
  status: 'ok',
  last_updated_at: hoursAgo(0.15),
  version: '1.0.0-mock',
};

export function paginate(items, page = 1, pageSize = 12) {
  const p = Number(page) || 1;
  const size = Number(pageSize) || 12;
  const start = (p - 1) * size;
  const slice = items.slice(start, start + size);
  return {
    items: slice,
    total: items.length,
    page: p,
    page_size: size,
    pages: Math.max(1, Math.ceil(items.length / size)),
  };
}

export function filterArticles(params = {}) {
  let list = [...articles];
  if (params.q) {
    const q = String(params.q).toLowerCase();
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.summary || a.snippet || '').toLowerCase().includes(q),
    );
  }
  if (params.category) list = list.filter((a) => a.category === params.category);
  if (params.country) list = list.filter((a) => a.countries.some((c) => c.iso2 === params.country));
  if (params.sentiment) list = list.filter((a) => a.sentiment.label === params.sentiment);
  if (params.source_id) list = list.filter((a) => a.source.id === Number(params.source_id));
  if (params.topic_id) {
    const topic = trending.find((t) => t.id === Number(params.topic_id));
    if (topic) list = list.filter((a) => topic.sample_article_ids.includes(a.id) || a.title.toLowerCase().includes(topic.label.split(' ')[0].toLowerCase()));
  }
  if (params.event_id) list = list.filter((a) => a.event_id === Number(params.event_id));
  if (params.min_credibility) list = list.filter((a) => a.credibility.score >= Number(params.min_credibility));
  if (params.from) list = list.filter((a) => a.published_at >= params.from);
  if (params.to) list = list.filter((a) => a.published_at <= params.to);

  if (params.sort === 'credibility') {
    list.sort((a, b) => b.credibility.score - a.credibility.score);
  } else if (params.sort === 'relevance' && params.q) {
    list.sort((a, b) => Number(b.title.toLowerCase().includes(String(params.q).toLowerCase())) - Number(a.title.toLowerCase().includes(String(params.q).toLowerCase())));
  } else {
    list.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
  }

  return paginate(list, params.page, params.page_size);
}
