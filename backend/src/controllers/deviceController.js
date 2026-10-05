import {getDeviceStatus} from "../services/readingService.js";
export async function deviceStatus(req,res,next){
 try{res.json({success:true,data:await getDeviceStatus(req.query.deviceId)})}catch(e){next(e)}
}
