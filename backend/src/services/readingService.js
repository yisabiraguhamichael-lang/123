import {pool} from "../config/database.js";
export async function createReading({deviceId,temperature,humidity,airQuality}){
 const r=await pool.query(`
 INSERT INTO environmental_readings(device_id,temperature,humidity,air_quality)
 VALUES($1,$2,$3,$4)
 RETURNING id,device_id AS "deviceId",temperature,humidity,
 air_quality AS "airQuality",created_at AS "createdAt"`,
 [deviceId,temperature,humidity,airQuality]);
 return r.rows[0];
}
export async function getLatestReading(deviceId){
 const r=await pool.query(`
 SELECT id,device_id AS "deviceId",temperature,humidity,
 air_quality AS "airQuality",created_at AS "createdAt"
 FROM environmental_readings
 WHERE ($1::text IS NULL OR device_id=$1)
 ORDER BY created_at DESC LIMIT 1`,[deviceId||null]);
 return r.rows[0]||null;
}
export async function getReadings(limit=50,deviceId){
 const safe=Math.min(Math.max(Number(limit)||50,1),500);
 const r=await pool.query(`
 SELECT id,device_id AS "deviceId",temperature,humidity,
 air_quality AS "airQuality",created_at AS "createdAt"
 FROM environmental_readings
 WHERE ($1::text IS NULL OR device_id=$1)
 ORDER BY created_at DESC LIMIT $2`,[deviceId||null,safe]);
 return r.rows;
}
export async function getDeviceStatus(deviceId){
 const latest=await getLatestReading(deviceId);
 if(!latest) return {deviceId:deviceId||null,status:"OFFLINE",lastSeen:null};
 const seconds=Number(process.env.DEVICE_ONLINE_SECONDS||30);
 const age=Date.now()-new Date(latest.createdAt).getTime();
 return {deviceId:latest.deviceId,status:age<=seconds*1000?"ONLINE":"OFFLINE",lastSeen:latest.createdAt};
}
