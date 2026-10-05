-- ============================================================
-- ENVIRONMENTAL READINGS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS environmental_readings (
    id SERIAL PRIMARY KEY,

    device_id VARCHAR(50) NOT NULL,

    temperature DECIMAL(5,2) NOT NULL,

    humidity DECIMAL(5,2) NOT NULL
        CHECK (humidity >= 0 AND humidity <= 100),

    air_quality DECIMAL(10,2) NOT NULL
        CHECK (air_quality >= 0),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_environmental_readings_created_at
ON environmental_readings (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_environmental_readings_device_id
ON environmental_readings (device_id);