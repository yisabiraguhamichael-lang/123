# Environmental Monitoring Backend

Matches the supplied React frontend.

Architecture:
React -> Node.js/Express -> PostgreSQL

API:
POST /api/readings
GET /api/readings/latest
GET /api/readings?limit=50
GET /api/device/status
GET /api/health

1. Install PostgreSQL and start its service.
2. Create the database:
   psql -U postgres -f database/schema.sql
3. Connect to it and create the table:
   psql -U postgres -d environment_monitor -f database/tables.sql
4. Optional demo data:
   psql -U postgres -d environment_monitor -f database/seed.sql
5. Edit .env and set DB_PASSWORD.
6. npm install
7. npm start

Frontend .env:
VITE_API_URL=http://localhost:5000/api
VITE_DEVICE_ID=ENV-001

Run simulator:
node simulator/sensorSimulator.js

The backend checks PostgreSQL during startup. If PostgreSQL is unavailable, it exits instead of pretending the system is connected.

For Monday ESP32:
POST the exact same JSON to http://YOUR-PC-IP:5000/api/readings.
Do not use localhost from the ESP32.
