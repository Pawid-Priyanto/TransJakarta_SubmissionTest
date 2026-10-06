interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({
  message,
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="mb-4 text-sm text-red-700">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorMessage;