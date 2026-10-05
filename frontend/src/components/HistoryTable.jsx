import { formatDate } from "../utils/status";

export default function HistoryTable({ readings }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">DATABASE RECORDS</p>
          <h2>Recent Measurements</h2>
        </div>
        <span className="record-count">{readings.length} records</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Air Quality</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {readings.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-cell">No measurements available.</td>
              </tr>
            ) : readings.map((reading, index) => (
              <tr key={reading.id ?? `${reading.createdAt}-${index}`}>
                <td>{formatDate(reading.createdAt || reading.created_at)}</td>
                <td>{reading.temperature} °C</td>
                <td>{reading.humidity} %</td>
                <td>{reading.airQuality ?? reading.air_quality}</td>
                <td>{reading.deviceId ?? reading.device_id ?? "ENV-001"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}