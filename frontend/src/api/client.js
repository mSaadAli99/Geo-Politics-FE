import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const client = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
      return Promise.reject({ message: 'Request cancelled', status: 0, cancelled: true });
    }

    const status = error.response?.status ?? 0;
    const detail = error.response?.data?.detail;
    const message =
      (typeof detail === 'string' && detail) ||
      error.message ||
      'Something went wrong. Please try again.';

    return Promise.reject({ message, status, raw: error });
  },
);

export default client;
