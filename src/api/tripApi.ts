import api from "./axios";
import type { TripResponse } from "../types/trip";

interface GetTripsParams {
  page: number;
  pageSize: number;
  routes: string[];
}

export const getTrips = async ({
  page,
  pageSize,
  routes,
}: GetTripsParams): Promise<TripResponse> => {
  const offset = (page - 1) * pageSize;

  const response = await api.get<TripResponse>("/trips", {
    params: {
      "page[limit]": pageSize,
      "page[offset]": offset,
      "filter[route]": routes.join(","),
    },
  });

  return response.data;
};