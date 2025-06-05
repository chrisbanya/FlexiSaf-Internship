const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
      <div>
        <strong>Error:</strong> {error}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-700 hover:text-red-900 font-bold text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
