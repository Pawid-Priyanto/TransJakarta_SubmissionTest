export const getPaginationInfo = (
  lastUrl: string | undefined,
  pageSize: number
) => {
  if (!lastUrl) {
    return {
      totalItems: 0,
      totalPages: 0,
    };
  }

  try {
    const url = new URL(lastUrl);

    const lastOffset = Number(
      url.searchParams.get("page[offset]") ?? 0
    );

    const totalItems =
      lastOffset + pageSize;

    const totalPages = Math.ceil(
      totalItems / pageSize
    );

    return {
      totalItems,
      totalPages,
    };
  } catch {
    return {
      totalItems: 0,
      totalPages: 0,
    };
  }
};