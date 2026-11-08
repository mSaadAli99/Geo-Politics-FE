export const CATEGORIES = [
  { value: 'politics', label: 'Politics' },
  { value: 'economy', label: 'Economy' },
  { value: 'conflict', label: 'Conflict' },
  { value: 'international_relations', label: 'International Relations' },
  { value: 'global_affairs', label: 'Global Affairs' },
];

export const SENTIMENTS = [
  { value: 'positive', label: 'Positive' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'negative', label: 'Negative' },
];

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'relevance', label: 'Relevance' },
  { value: 'credibility', label: 'Credibility' },
];

export const TRENDING_WINDOWS = [
  { value: '24h', label: '24 hours' },
  { value: '7d', label: '7 days' },
];

export const CREDIBILITY_DISCLAIMER =
  'Indicator based on defined factors, not a fact-check.';

export const DEFAULT_PAGE_SIZE = 12;

export const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/news', label: 'News' },
  { to: '/map', label: 'Map' },
  { to: '/sentiment', label: 'Sentiment' },
  { to: '/trending', label: 'Trending' },
  { to: '/compare', label: 'Compare' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/about', label: 'About' },
];
