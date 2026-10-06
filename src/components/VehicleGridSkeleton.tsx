import VehicleCardSkeleton from "./VehicleCardSkeleton";

interface VehicleGridSkeletonProps {
  count?: number;
}

const VehicleGridSkeleton = ({
  count = 5,
}: VehicleGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map(
        (_, index) => (
          <VehicleCardSkeleton key={index} />
        )
      )}
    </div>
  );
};

export default VehicleGridSkeleton;