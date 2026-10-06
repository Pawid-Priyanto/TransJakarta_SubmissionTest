import type { IncludedResource } from "../types/vehicle";

export const findIncluded = (
  included: IncludedResource[] | undefined,
  type: string,
  id: string | null | undefined
) => {
  if (!id) return undefined;

  return included?.find(
    (item) => item.type === type && item.id === id
  );
};