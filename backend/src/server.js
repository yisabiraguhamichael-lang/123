import dotenv from "dotenv";
import app from "./app.js";
import {testDatabaseConnection} from "./config/database.js";
dotenv.config();
const PORT=Number(process.env.PORT||5000);
try{
 const dbTime=await testDatabaseConnection();
 app.listen(PORT,()=>console.log(`API running: http://localhost:${PORT} | PostgreSQL connected | DB time: ${dbTime}`));
}catch(e){
 console.error("PostgreSQL connection failed:",e.message);
 process.exit(1);
}
