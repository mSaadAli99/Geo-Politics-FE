import client from './client';

export function getTrending(params = {}, config = {}) {
  return client.get('/trending', { params, ...config }).then((res) => res.data);
}
