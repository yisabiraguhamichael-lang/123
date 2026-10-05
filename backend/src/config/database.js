import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const {Pool}=pg;
export const pool=new Pool({
 host:process.env.DB_HOST, port:Number(process.env.DB_PORT||5432),
 database:process.env.DB_NAME, user:process.env.DB_USER,
 password:process.env.DB_PASSWORD, max:10, idleTimeoutMillis:30000,
 connectionTimeoutMillis:5000
});
pool.on("error",e=>console.error("PostgreSQL pool error:",e.message));
export async function testDatabaseConnection(){
 const r=await pool.query("SELECT NOW() AS now"); return r.rows[0].now;
}
