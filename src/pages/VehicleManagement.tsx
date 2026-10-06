import { useMemo, useState } from "react";
import MultiSelect from "../components/MultiSelect";

import { useVehicles } from "../hooks/useVehicles";
import { useRoutes } from "../hooks/useRoutes";
import { useTrips } from "../hooks/useTrips";

import VehicleGrid from "../components/VehicleGrid";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";

import type { Vehicle } from "../types/vehicle";

import { getPaginationInfo } from "../utils/pagination";
import VehicleDetailModal from "../components/VehicleDetailModal";
import VehicleGridSkeleton from "../components/VehicleGridSkeleton";
import EmptyState from "../components/EmptyState";

const VehicleManagement = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState(5);

  const [selectedRoutes, setSelectedRoutes] =
  useState<string[]>([]);

const [selectedTrips, setSelectedTrips] =
  useState<string[]>([]);

const [tripSourceRoutes, setTripSourceRoutes] =
  useState<string[]>([]);

  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);
    
    
    const {
    routes,
    loading: routesLoading,
    loadingMore: routesLoadingMore,
    hasMore: routesHasMore,
    error: routesError,
    loadMore: loadMoreRoutes,
    } = useRoutes();

   const {
  trips,
  loading: tripsLoading,
  loadingMore: tripsLoadingMore,
  hasMore: tripsHasMore,
  error: tripsError,
  loadMore: loadMoreTrips,
} = useTrips(tripSourceRoutes);

  const {
    vehicles,
    response,
    loading,
    error,
    refetch,
  } = useVehicles({
    page,
    pageSize,
    routes: selectedRoutes,
    trips: selectedTrips,
  });

  const pagination = useMemo(() => {
    return getPaginationInfo(
      response?.links?.last,
      pageSize
    );
  }, [response, pageSize]);

  const hasNext = Boolean(
    response?.links?.next
  );

  const hasPrevious = page > 1;

  const handlePageSizeChange = (
    size: number
  ) => {
    setPageSize(size);
    setPage(1);
  };

    const routeOptions = routes.map((route) => ({
    value: route.id,
    label:
        route.attributes.short_name ||
        route.attributes.long_name ||
        route.id,
    }));

    const tripOptions = trips.map((trip) => ({
    value: trip.id,
    label:
        trip.attributes.headsign ||
        trip.id,
    }));

    const handleResetFilters = () => {
                setSelectedRoutes([]);
                setSelectedTrips([]);
                setTripSourceRoutes([]);
                setPage(1);
                };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">
            Fleet Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            MBTA Vehicle Monitoring
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
  <div>
    <h2 className="text-lg font-semibold text-gray-900">
      Filters
    </h2>

    <p className="text-sm text-gray-500">
      Filter vehicles by route or trip.
    </p>
  </div>
</div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <MultiSelect
                    label="Route"
                    placeholder="Select route"
                    options={routeOptions}
                    selectedValues={selectedRoutes}
                    onChange={(values) => {
                        setSelectedRoutes(values);
                        setSelectedTrips([]);
                        setTripSourceRoutes(values);
                        setPage(1);
                    }}
                    loading={routesLoading}
                    loadingMore={routesLoadingMore}
                    hasMore={routesHasMore}
                    onLoadMore={loadMoreRoutes}
                    error={routesError}
                    />

                <MultiSelect
                    label="Trip"
                    placeholder={
                        tripSourceRoutes.length === 0
                        ? "Select route first"
                        : "Select trip"
                    }
                    options={tripOptions}
                    selectedValues={selectedTrips}
                    onChange={(values) => {
                        setSelectedTrips(values);
                        setSelectedRoutes([]);
                        setPage(1);
                    }}
                    loading={tripsLoading}
                    loadingMore={tripsLoadingMore}
                    hasMore={tripsHasMore}
                    onLoadMore={loadMoreTrips}
                    error={tripsError}
                    disabled={tripSourceRoutes.length === 0}
                    />
            </div>
            </div>

        {loading && <VehicleGridSkeleton count={pageSize} />}

        {error && !loading && (
          <ErrorMessage
            message={error}
            onRetry={refetch}
          />
        )}

        {!loading && !error && (
  <>
    {vehicles.length > 0 ? (
      <>
        <VehicleGrid
          vehicles={vehicles}
          included={response?.included}
          onViewDetail={setSelectedVehicle}
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={pagination.totalItems}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </>
    ) : (
      <EmptyState
        onReset={handleResetFilters}
      />
    )}
  </>
)}
      </main>


     {selectedVehicle && (
        <VehicleDetailModal
            vehicle={selectedVehicle}
            included={response?.included}
            onClose={() => setSelectedVehicle(null)}
        />
        )}
    </div>
  );
};

export default VehicleManagement;