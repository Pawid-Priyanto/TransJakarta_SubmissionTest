interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

const EmptyState = ({
  title = "No vehicles found",
  description = "No vehicles match the selected filters.",
  onReset,
}: EmptyStateProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <span className="text-xl">🔍</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;