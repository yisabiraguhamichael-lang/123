import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 8000
});

export async function getLatestReading() {
  const response = await api.get("/readings/latest");
  return response.data?.data ?? response.data;
}

export async function getHistoricalReadings(limit = 50) {
  const response = await api.get("/readings", { params: { limit } });
  return response.data?.data ?? response.data;
}

export async function getDeviceStatus() {
  const response = await api.get("/device/status");
  return response.data?.data ?? response.data;
}

export default api;