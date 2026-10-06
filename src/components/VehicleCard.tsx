import type { Vehicle, IncludedResource } from "../types/vehicle";
import { findIncluded } from "../utils/included";

interface VehicleCardProps {
  vehicle: Vehicle;
  included?: IncludedResource[];
  onViewDetail: (vehicle: Vehicle) => void;
}

const VehicleCard = ({
  vehicle,
  included,
  onViewDetail,
}: VehicleCardProps) => {
  const { attributes, relationships } = vehicle;

  const routeId =
  relationships.route?.data?.id ?? null;

const tripId =
  relationships.trip?.data?.id ?? null;

  const route = findIncluded(
    included,
    "route",
    routeId
  );

  const trip = findIncluded(
    included,
    "trip",
    tripId
  );

  const routeName =
    route?.attributes.short_name?.toString() ||
    route?.attributes.long_name?.toString() ||
    routeId ||
    "-";

  const tripName =
    trip?.attributes.headsign?.toString() ||
    tripId ||
    "-";

 const formattedDate =
  attributes.updated_at
    ? new Date(
        attributes.updated_at
      ).toLocaleString()
    : "-";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Vehicle
          </p>

          <h2 className="text-xl font-bold text-gray-900">
            {attributes.label}
          </h2>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            attributes.current_status === "IN_TRANSIT_TO"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
         {attributes.current_status ?? "Unknown"}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-500">
            Location
          </p>

        <p className="font-medium text-gray-800">
        {attributes.latitude ?? "-"},{" "}
        {attributes.longitude ?? "-"}
        </p>
        </div>

        <div>
          <p className="text-gray-500">
            Route
          </p>

          <p className="font-medium text-gray-800">
            {routeName}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Trip
          </p>

          <p className="font-medium text-gray-800">
            {tripName}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Last Updated
          </p>

          <p className="font-medium text-gray-800">
            {formattedDate}
          </p>
        </div>
      </div>

      <button
        onClick={() => onViewDetail(vehicle)}
        className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        View Detail
      </button>
    </div>
  );
};

export default VehicleCard;