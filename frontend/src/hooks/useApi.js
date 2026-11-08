import { useCallback, useEffect, useRef, useState } from 'react';

export default function useApi(fetcher, deps = [], { enabled = true, initialData = null } = {}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refetch = useCallback(async () => {
    if (!enabled) return null;

    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current({ signal: controller.signal });
      if (!controller.signal.aborted) {
        setData(result);
        setLoading(false);
      }
      return result;
    } catch (err) {
      if (err?.cancelled) return null;
      if (!controller.signal.aborted) {
        setError(err);
        setLoading(false);
      }
      return null;
    }
  }, [enabled, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    refetch();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [refetch]);

  return { data, loading, error, refetch, setData };
}
