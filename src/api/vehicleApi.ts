import api from "./axios";
import type { VehicleResponse } from "../types/vehicle";

export interface GetVehiclesParams {
  page: number;
  pageSize: number;
  routes?: string[];
  trips?: string[];
}

export const getVehicles = async ({
  page,
  pageSize,
  routes = [],
  trips = [],
}: GetVehiclesParams): Promise<VehicleResponse> => {
  const offset = (page - 1) * pageSize;

  const params: Record<string, string | number> = {
    "page[limit]": pageSize,
    "page[offset]": offset,
    include: "route,trip",
  };

  if (routes.length > 0) {
    params["filter[route]"] = routes.join(",");
  } else if (trips.length > 0) {
    params["filter[trip]"] = trips.join(",");
  }

  const response = await api.get<VehicleResponse>(
    "/vehicles",
    { params }
  );

  return response.data;
};