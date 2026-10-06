const VehicleCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <div className="mb-2 h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
        </div>

        <div>
          <div className="mb-2 h-3 w-14 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
        </div>

        <div>
          <div className="mb-2 h-3 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        <div>
          <div className="mb-2 h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* Button */}
      <div className="mt-5 h-10 w-full animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
};

export default VehicleCardSkeleton;