import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <AlertTriangle size={22} />
      <div>
        <strong>Backend unavailable</strong>
        <p>{message || "Unable to retrieve data from the Node.js API."}</p>
      </div>
      {onRetry && (
        <button className="secondary-button" onClick={onRetry}>
          <RefreshCw size={16} /> Retry
        </button>
      )}
    </div>
  );
}