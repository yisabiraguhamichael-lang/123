import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { RefreshCw, Server, Database } from "lucide-react";
import Header from "./components/Header";
import MetricCard from "./components/MetricCard";
import ChartCard from "./components/ChartCard";
import HistoryTable from "./components/HistoryTable";
import Loading from "./components/Loading";
import ErrorState from "./components/ErrorState";
import {
  getDeviceStatus,
  getHistoricalReadings,
  getLatestReading
} from "./services/api";
import {
  airQualityStatus,
  formatTime,
  humidityStatus,
  temperatureStatus
} from "./utils/status";

const DEVICE_ID = import.meta.env.VITE_DEVICE_ID || "ENV-001";

function normalizeReading(item) {
  return {
    id: item.id,
    deviceId: item.deviceId ?? item.device_id,
    temperature: Number(item.temperature),
    humidity: Number(item.humidity),
    airQuality: Number(item.airQuality ?? item.air_quality),
    createdAt: item.createdAt ?? item.created_at
  };
}

export default function App() {
  const [latest, setLatest] = useState(null);
  const [readings, setReadings] = useState([]);
  const [device, setDevice] = useState({ status: "OFFLINE", lastSeen: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setError("");
    try {
      const [latestData, historyData, statusData] = await Promise.all([
        getLatestReading(),
        getHistoricalReadings(50),
        getDeviceStatus()
      ]);

      const normalizedHistory = (Array.isArray(historyData) ? historyData : [])
        .map(normalizeReading)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setLatest(latestData ? normalizeReading(latestData) : null);
      setReadings(normalizedHistory);
      setDevice({
        status: statusData?.status ?? "OFFLINE",
        lastSeen: statusData?.lastSeen ?? statusData?.last_seen ?? latestData?.createdAt ?? latestData?.created_at
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Could not connect to the Node.js backend. Make sure PostgreSQL and the API server are running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 5000);
    return () => clearInterval(interval);
  }, [loadDashboard]);

  const chartData = useMemo(
    () => readings.map((r) => ({
      time: formatTime(r.createdAt),
      temperature: r.temperature,
      humidity: r.humidity,
      airQuality: r.airQuality
    })),
    [readings]
  );

  if (loading) {
    return (
      <main className="app-shell">
        <Header deviceId={DEVICE_ID} status="OFFLINE" />
        <Loading />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Header
        deviceId={latest?.deviceId || DEVICE_ID}
        status={device.status}
        lastSeen={device.lastSeen}
      />

      <div className="dashboard">
        {error && <ErrorState message={error} onRetry={loadDashboard} />}

        <div className="page-title-row">
          <div>
            <p className="eyebrow">LIVE ENVIRONMENT</p>
            <h2>Monitoring Dashboard</h2>
            <p className="muted">
              Real-time readings from the REST API and PostgreSQL history.
            </p>
          </div>
          <button className="secondary-button" onClick={loadDashboard}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        <section className="metric-grid">
          <MetricCard
            type="temperature"
            title="Temperature"
            value={latest?.temperature}
            unit="°C"
            status={temperatureStatus(latest?.temperature)}
          />
          <MetricCard
            type="humidity"
            title="Humidity"
            value={latest?.humidity}
            unit="%"
            status={humidityStatus(latest?.humidity)}
          />
          <MetricCard
            type="air"
            title="Air Quality"
            value={latest?.airQuality}
            unit=""
            status={airQualityStatus(latest?.airQuality)}
          />
        </section>

        <div className="latest-strip">
          <span>Latest measurement</span>
          <strong>{latest?.createdAt ? new Date(latest.createdAt).toLocaleString() : "No data"}</strong>
        </div>

        <section className="chart-grid">
          <ChartCard title="Temperature Over Time">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Humidity Over Time">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="humidity" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Air Quality Over Time">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="airQuality" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        <HistoryTable readings={[...readings].reverse()} />

        <footer className="footer">
          <span><Server size={15} /> API: {import.meta.env.VITE_API_URL || "http://localhost:5000/api"}</span>
          <span><Database size={15} /> PostgreSQL accessed through Node.js API</span>
        </footer>
      </div>
    </main>
  );
}