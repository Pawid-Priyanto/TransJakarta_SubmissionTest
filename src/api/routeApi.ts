import api from "./axios";
import type { RouteResponse } from "../types/route";

interface GetRoutesParams {
  page: number;
  pageSize: number;
}

export const getRoutes = async ({
  page,
  pageSize,
}: GetRoutesParams): Promise<RouteResponse> => {
  const offset = (page - 1) * pageSize;

  const response = await api.get<RouteResponse>("/routes", {
    params: {
      "page[limit]": pageSize,
      "page[offset]": offset,
    },
  });

  return response.data;
};