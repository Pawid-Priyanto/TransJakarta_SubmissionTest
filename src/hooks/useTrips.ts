import { useCallback, useEffect, useState } from "react";
import { getTrips } from "../api/tripApi";
import type { Trip } from "../types/trip";

const PAGE_SIZE = 20;

export const useTrips = (routes: string[]) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(async () => {
    // Jangan request /trips kalau belum ada route
    if (routes.length === 0) {
      setTrips([]);
      setPage(1);
      setHasMore(false);
      setError(null);

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await getTrips({
        page: 1,
        pageSize: PAGE_SIZE,
        routes,
      });

      setTrips(result.data);
      setPage(1);
      setHasMore(Boolean(result.links.next));
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      setError("Unable to load trips.");
    } finally {
      setLoading(false);
    }
  }, [routes]);

  const loadMore = useCallback(async () => {
    if (
      routes.length === 0 ||
      loadingMore ||
      !hasMore
    ) {
      return;
    }

    const nextPage = page + 1;

    try {
      setLoadingMore(true);
      setError(null);

      const result = await getTrips({
        page: nextPage,
        pageSize: PAGE_SIZE,
        routes,
      });

      setTrips((previous) => [
        ...previous,
        ...result.data,
      ]);

      setPage(nextPage);
      setHasMore(Boolean(result.links.next));
    } catch (error) {
      console.error(
        "Failed to load more trips:",
        error
      );

      setError("Unable to load more trips.");
    } finally {
      setLoadingMore(false);
    }
  }, [
    routes,
    page,
    loadingMore,
    hasMore,
  ]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return {
    trips,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    refetch: fetchTrips,
  };
};