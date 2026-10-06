import { useEffect, useRef, useState } from "react";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  placeholder?: string;

  options: MultiSelectOption[];

  selectedValues: string[];

  onChange: (values: string[]) => void;

  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;

  onLoadMore?: () => void;

  error?: string | null;
  disabled?: boolean;
}

const MultiSelect = ({
  label,
  placeholder = "Select...",
  options,
  selectedValues,
  onChange,
  loading = false,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
  error,
  disabled = false,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(
        selectedValues.filter((selected) => selected !== value)
      );
    } else {
      onChange([...selectedValues, value]);
    }
  };

  useEffect(() => {
    if (!open || !hasMore || !onLoadMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );

    const element = loadMoreRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [open, hasMore, onLoadMore]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const getButtonText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }

    if (selectedValues.length === 1) {
      const selected = options.find(
        (option) => option.value === selectedValues[0]
      );

      return selected?.label ?? "1 selected";
    }

    return `${selectedValues.length} selected`;
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left text-sm shadow-sm ${
            disabled
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
        }`}
        >
        <span
          className={
            selectedValues.length === 0
              ? "text-gray-400"
              : "text-gray-900"
          }
        >
          {getButtonText()}
        </span>

        <span className="text-gray-400">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="max-h-64 overflow-y-auto p-2">
            {loading && (
              <div className="px-3 py-4 text-center text-sm text-gray-500">
                Loading...
              </div>
            )}

            {!loading && error && (
              <div className="px-3 py-4 text-center text-sm text-red-500">
                {error}
              </div>
            )}

            {!loading &&
              !error &&
              options.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-gray-500">
                  No options found.
                </div>
              )}

            {!loading &&
              options.map((option) => {
                const checked = selectedValues.includes(
                  option.value
                );

                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        toggleOption(option.value)
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />

                    <span className="text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                );
              })}

            {hasMore && (
              <div
                ref={loadMoreRef}
                className="flex justify-center px-3 py-3"
              >
                {loadingMore ? (
                  <span className="text-xs text-gray-500">
                    Loading more...
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">
                    Scroll for more
                  </span>
                )}
              </div>
            )}

            {!hasMore && options.length > 0 && (
              <div className="px-3 py-3 text-center text-xs text-gray-400">
                No more options
              </div>
            )}
          </div>

          {selectedValues.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-3 py-2">
              <span className="text-xs text-gray-500">
                {selectedValues.length} selected
              </span>

              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs font-medium text-red-500 hover:text-red-600"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;