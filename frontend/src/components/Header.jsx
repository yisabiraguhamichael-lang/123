import { Activity, Wifi, WifiOff } from "lucide-react";
import { formatDate } from "../utils/status";

export default function Header({ deviceId, status, lastSeen }) {
  const online = String(status || "").toUpperCase() === "ONLINE";

  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon"><Activity size={24} /></div>
        <div>
          <h1>Environmental Monitor</h1>
          <p>ESP32 · DHT11 · MQ-135</p>
        </div>
      </div>

      <div className="device-meta">
        <div className="device-id">
          <span>Device</span>
          <strong>{deviceId || "ENV-001"}</strong>
        </div>
        <div className={`connection ${online ? "online" : "offline"}`}>
          {online ? <Wifi size={17} /> : <WifiOff size={17} />}
          <div>
            <strong>{online ? "ONLINE" : "OFFLINE"}</strong>
            <span>{lastSeen ? `Last seen ${formatDate(lastSeen)}` : "No recent reading"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}