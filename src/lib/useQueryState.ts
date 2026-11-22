import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Keeps a filter value in the URL query (?category=...), so filtered views are shareable
 * and survive back/forward navigation. Empty / default values are removed from the URL.
 */
export function useQueryState(key: string, fallback = 'all') {
  const [params, setParams] = useSearchParams();
  const value = params.get(key) ?? fallback;
  const setValue = useCallback(
    (v: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (!v || v === fallback) next.delete(key);
          else next.set(key, v);
          return next;
        },
        { replace: true },
      );
    },
    [key, fallback, setParams],
  );
  return [value, setValue] as const;
}
