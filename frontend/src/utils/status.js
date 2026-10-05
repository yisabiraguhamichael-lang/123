export function temperatureStatus(value) {
  if (value == null) return { label: "UNKNOWN", tone: "neutral" };
  if (value < 18) return { label: "COLD", tone: "info" };
  if (value <= 30) return { label: "NORMAL", tone: "good" };
  if (value <= 35) return { label: "HIGH", tone: "warning" };
  return { label: "CRITICAL", tone: "danger" };
}

export function humidityStatus(value) {
  if (value == null) return { label: "UNKNOWN", tone: "neutral" };
  if (value < 30) return { label: "LOW", tone: "warning" };
  if (value <= 60) return { label: "GOOD", tone: "good" };
  if (value <= 70) return { label: "MODERATE", tone: "warning" };
  return { label: "HIGH", tone: "danger" };
}

export function airQualityStatus(value) {
  if (value == null) return { label: "UNKNOWN", tone: "neutral" };
  if (value < 300) return { label: "GOOD", tone: "good" };
  if (value <= 500) return { label: "MODERATE", tone: "warning" };
  if (value <= 700) return { label: "POOR", tone: "danger" };
  return { label: "CRITICAL", tone: "danger" };
}

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
}

export function formatTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}