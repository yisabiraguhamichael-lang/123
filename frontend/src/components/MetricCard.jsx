import { Activity, Droplets, Thermometer } from "lucide-react";

const icons = {
  temperature: Thermometer,
  humidity: Droplets,
  air: Activity
};

export default function MetricCard({ type, title, value, unit, status }) {
  const Icon = icons[type] || Activity;

  return (
    <article className="metric-card">
      <div className="metric-top">
        <div>
          <p className="metric-title">{title}</p>
          <div className="metric-value">
            {value ?? "—"} <span>{unit}</span>
          </div>
        </div>
        <div className={`metric-icon ${status?.tone || "neutral"}`}>
          <Icon size={22} />
        </div>
      </div>
      <div className={`status-pill ${status?.tone || "neutral"}`}>
        {status?.label || "UNKNOWN"}
      </div>
    </article>
  );
}