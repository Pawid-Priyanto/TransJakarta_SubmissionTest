import { useCallback, useEffect, useState } from "react";
import { getVehicles } from "../api/vehicleApi";
import type {
  Vehicle,
  VehicleResponse,
} from "../types/vehicle";

interface UseVehiclesParams {
  page: number;
  pageSize: number;
  routes: string[];
  trips: string[];
}

export const useVehicles = ({
  page,
  pageSize,
  routes,
  trips,
}: UseVehiclesParams) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [response, setResponse] =
    useState<VehicleResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getVehicles({
        page,
        pageSize,
        routes,
        trips,
      });

      console.log("Vehicle API response:", result);

      setVehicles(
        Array.isArray(result.data)
          ? result.data
          : []
      );

      setResponse(result);
    } catch (error) {
      console.error(
        "Vehicle API error:",
        error
      );

      setVehicles([]);
      setResponse(null);

      setError(
        "Unable to load vehicle data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [
    page,
    pageSize,
    routes,
    trips,
  ]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    response,
    loading,
    error,
    refetch: fetchVehicles,
  };
};