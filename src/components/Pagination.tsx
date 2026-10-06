interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({
  page,
  pageSize,
  totalItems,
  hasNext,
  hasPrevious,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(
    totalItems / pageSize
  );

  const start =
    totalItems === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const end = Math.min(
    page * pageSize,
    totalItems
  );

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium text-gray-900">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-900">
          {totalItems}
        </span>{" "}
        data
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">
          Per page
        </label>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(
              Number(event.target.value)
            )
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={!hasPrevious}
          onClick={() =>
            onPageChange(page - 1)
          }
          className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="px-3 text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={!hasNext}
          onClick={() =>
            onPageChange(page + 1)
          }
          className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;