import type {
  Vehicle,
  IncludedResource,
} from "../types/vehicle";

import VehicleCard from "./VehicleCard";

interface VehicleGridProps {
  vehicles: Vehicle[];
  included?: IncludedResource[];
  onViewDetail: (vehicle: Vehicle) => void;
}

const VehicleGrid = ({
  vehicles,
  included,
  onViewDetail,
}: VehicleGridProps) => {
  console.log("VehicleGrid vehicles:", vehicles);

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-gray-700">
          No vehicles found.
        </p>

        <p className="mt-1 text-sm text-gray-500">
          No vehicle is currently operating on the selected trip.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          included={included}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default VehicleGrid;