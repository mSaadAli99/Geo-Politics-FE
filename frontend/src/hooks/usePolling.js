import { useEffect, useRef } from 'react';

export default function usePolling(callback, intervalSeconds, { enabled = true } = {}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled || !intervalSeconds) return undefined;

    let timerId;
    let cancelled = false;

    const tick = async () => {
      if (document.hidden || cancelled) return;
      await callbackRef.current();
    };

    const start = () => {
      clearInterval(timerId);
      timerId = setInterval(tick, intervalSeconds * 1000);
    };

    const onVisibility = () => {
      if (!document.hidden) {
        tick();
        start();
      } else {
        clearInterval(timerId);
      }
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      clearInterval(timerId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [intervalSeconds, enabled]);
}
