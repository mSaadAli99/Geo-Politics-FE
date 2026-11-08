import client from './client';

export function getTimeline(params = {}, config = {}) {
  return client.get('/timeline', { params, ...config }).then((res) => res.data);
}
