# Environmental Monitoring System — Frontend

React/Vite dashboard for the ESP32 + DHT11 + MQ-135 environmental monitoring project.

## Architecture

React frontend -> Node.js/Express REST API -> PostgreSQL

The frontend does NOT connect directly to PostgreSQL. The backend is the secure API/data layer.

## Backend expected endpoints

- `POST /api/readings`
- `GET /api/readings/latest`
- `GET /api/readings?limit=50`
- `GET /api/device/status`

## Configuration

The included `.env` contains:

```env
VITE_API_URL=http://localhost:5000/api
VITE_DEVICE_ID=ENV-001
```

If your backend runs on another host/port, change `VITE_API_URL`.

## Run

```bash
npm install
npm run dev
```

Vite normally starts the frontend at `http://localhost:5173`.

## Backend requirement

Start your Node.js/Express backend on port 5000 and make sure it is connected to PostgreSQL. The dashboard will automatically poll the API every 5 seconds.

## Expected reading JSON

```json
{
  "deviceId": "ENV-001",
  "temperature": 27.5,
  "humidity": 64,
  "airQuality": 420
}
```

## Notes

The dashboard accepts both camelCase API fields (`deviceId`, `airQuality`, `createdAt`) and PostgreSQL-style snake_case fields (`device_id`, `air_quality`, `created_at`) in responses.
