import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const ARRAY_KEYS = new Set();

function parseValue(key, value) {
  if (value == null || value === '') return undefined;
  if (key === 'page' || key === 'page_size' || key === 'min_credibility' || key === 'min_sources' || key === 'source_id' || key === 'topic_id' || key === 'event_id' || key === 'limit') {
    const num = Number(value);
    return Number.isFinite(num) ? num : undefined;
  }
  return value;
}

export default function useFilters(defaults = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const next = { ...defaults };
    searchParams.forEach((value, key) => {
      if (ARRAY_KEYS.has(key)) {
        next[key] = searchParams.getAll(key);
      } else {
        const parsed = parseValue(key, value);
        if (parsed !== undefined) next[key] = parsed;
      }
    });
    return next;
  }, [searchParams, defaults]);

  const setFilter = useCallback(
    (key, value) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (value == null || value === '' || value === defaults[key]) {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
          if (key !== 'page') {
            params.delete('page');
          }
          return params;
        },
        { replace: true },
      );
    },
    [defaults, setSearchParams],
  );

  const setFilters = useCallback(
    (patch, { resetPage = true } = {}) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          Object.entries(patch).forEach(([key, value]) => {
            if (value == null || value === '' || value === defaults[key]) {
              params.delete(key);
            } else {
              params.set(key, String(value));
            }
          });
          if (resetPage) params.delete('page');
          return params;
        },
        { replace: true },
      );
    },
    [defaults, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const apiParams = useMemo(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value;
      }
    });
    return params;
  }, [filters]);

  return { filters, setFilter, setFilters, clearFilters, apiParams, searchParams };
}
