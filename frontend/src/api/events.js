import client from './client';

export function getEvents(params = {}, config = {}) {
  return client.get('/events', { params, ...config }).then((res) => res.data);
}

export function getEvent(id, config = {}) {
  return client.get(`/events/${id}`, config).then((res) => res.data);
}
