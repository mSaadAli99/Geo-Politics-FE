import client from './client';

export function getArticles(params = {}, config = {}) {
  return client.get('/articles', { params, ...config }).then((res) => res.data);
}

export function getArticle(id, config = {}) {
  return client.get(`/articles/${id}`, config).then((res) => res.data);
}
