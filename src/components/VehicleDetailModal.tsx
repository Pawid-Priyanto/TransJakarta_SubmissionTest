import type {
  Vehicle,
  IncludedResource,
} from "../types/vehicle";

import { findIncluded } from "../utils/included";
import VehicleMap from "./VehicleMap";

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  included?: IncludedResource[];
  onClose: () => void;
}

const VehicleDetailModal = ({
  vehicle,
  included,
  onClose,
}: VehicleDetailModalProps) => {
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
    route?.attributes?.short_name?.toString() ||
    route?.attributes?.long_name?.toString() ||
    routeId ||
    "-";

  const tripHeadSign =
    trip?.attributes?.headsign?.toString() ||
    tripId ||
    "-";

  const updatedAt = attributes.updated_at
    ? new Date(
        attributes.updated_at
      ).toLocaleString()
    : "-";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <p className="text-sm text-gray-500">
              Vehicle
            </p>

            <h2 className="text-xl font-bold text-gray-900">
              {attributes.label || vehicle.id}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Map */}

          <VehicleMap vehicle={vehicle} />

          {/* Basic information */}

          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Vehicle Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                label="Status"
                value={
                  attributes.current_status ||
                  "-"
                }
              />

              <InfoItem
                label="Route"
                value={routeName}
              />

              <InfoItem
                label="Trip"
                value={tripHeadSign}
              />

              <InfoItem
                label="Latitude"
                value={
                  attributes.latitude?.toString() ||
                  "-"
                }
              />

              <InfoItem
                label="Longitude"
                value={
                  attributes.longitude?.toString() ||
                  "-"
                }
              />

              <InfoItem
                label="Speed"
                value={
                  attributes.speed != null
                    ? `${attributes.speed} m/s`
                    : "-"
                }
              />

              <InfoItem
                label="Bearing"
                value={
                  attributes.bearing != null
                    ? `${attributes.bearing}°`
                    : "-"
                }
              />

              <InfoItem
                label="Direction ID"
                value={
                  attributes.direction_id != null
                    ? attributes.direction_id.toString()
                    : "-"
                }
              />

              <InfoItem
                label="Current Stop Sequence"
                value={
                  attributes.current_stop_sequence != null
                    ? attributes.current_stop_sequence.toString()
                    : "-"
                }
              />

              <InfoItem
                label="Occupancy"
                value={
                  attributes.occupancy_status ||
                  "-"
                }
              />

              <InfoItem
                label="Revenue"
                value={
                  attributes.revenue || "-"
                }
              />

              <InfoItem
                label="Last Updated"
                value={updatedAt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = ({
  label,
  value,
}: InfoItemProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default VehicleDetailModal;