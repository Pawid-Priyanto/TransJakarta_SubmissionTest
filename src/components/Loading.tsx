const Loading = () => {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="flex items-center gap-3 text-gray-600">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />

        <span>Loading vehicles...</span>
      </div>
    </div>
  );
};

export default Loading;