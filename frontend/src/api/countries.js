import client from './client';

export function getCountries(params = {}, config = {}) {
  return client.get('/countries', { params, ...config }).then((res) => res.data);
}

export function getCountry(iso2, params = {}, config = {}) {
  return client.get(`/countries/${iso2}`, { params, ...config }).then((res) => res.data);
}
