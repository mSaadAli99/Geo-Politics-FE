import client from './client';

export function getHealth(config = {}) {
  return client.get('/health', config).then((res) => res.data);
}

export function getCategories(config = {}) {
  return client.get('/categories', config).then((res) => res.data);
}

export function getSources(config = {}) {
  return client.get('/sources', config).then((res) => res.data);
}
