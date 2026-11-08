import client from './client';

export function getOverview(config = {}) {
  return client.get('/stats/overview', config).then((res) => res.data);
}

export function getSentimentStats(params = {}, config = {}) {
  return client.get('/stats/sentiment', { params, ...config }).then((res) => res.data);
}

export function getCategoryStats(params = {}, config = {}) {
  return client.get('/stats/categories', { params, ...config }).then((res) => res.data);
}
