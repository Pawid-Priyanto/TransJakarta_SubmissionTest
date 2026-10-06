import { useCallback, useEffect, useState } from "react";
import { getRoutes } from "../api/routeApi";
import type { Route } from "../types/route";

const PAGE_SIZE = 20;

export const useRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getRoutes({
        page: 1,
        pageSize: PAGE_SIZE,
      });

      setRoutes(result.data);
      setPage(1);

      setHasMore(Boolean(result.links.next));
    } catch (error) {
      console.error(error);
      setError("Unable to load routes.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;

    try {
      setLoadingMore(true);

      const result = await getRoutes({
        page: nextPage,
        pageSize: PAGE_SIZE,
      });

      setRoutes((prev) => [...prev, ...result.data]);
      setPage(nextPage);

      setHasMore(Boolean(result.links.next));
    } catch (error) {
      console.error(error);
      setError("Unable to load more routes.");
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  return {
    routes,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    refetch: fetchRoutes,
  };
};