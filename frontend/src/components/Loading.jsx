export default function Loading({ text = "Loading monitoring data..." }) {
  return (
    <div className="loading-state">
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
}