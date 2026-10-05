import {createReading,getLatestReading,getReadings} from "../services/readingService.js";
function validate(b){
 const e=[];
 if(typeof b?.deviceId!=="string"||!b.deviceId.trim()) e.push("deviceId is required and must be a string");
 if(!Number.isFinite(Number(b?.temperature))) e.push("temperature must be a number");
 if(!Number.isFinite(Number(b?.humidity))||Number(b.humidity)<0||Number(b.humidity)>100) e.push("humidity must be 0-100");
 if(!Number.isFinite(Number(b?.airQuality))||Number(b.airQuality)<0) e.push("airQuality must be a non-negative number");
 return e;
}
export async function postReading(req,res,next){
 try{
  const errors=validate(req.body);
  if(errors.length) return res.status(400).json({success:false,message:"Validation failed",errors});
  const data=await createReading({
   deviceId:req.body.deviceId.trim(),temperature:Number(req.body.temperature),
   humidity:Number(req.body.humidity),airQuality:Number(req.body.airQuality)
  });
  res.status(201).json({success:true,message:"Reading saved successfully",data});
 }catch(e){next(e)}
}
export async function latestReading(req,res,next){
 try{res.json({success:true,data:await getLatestReading(req.query.deviceId)})}catch(e){next(e)}
}
export async function historicalReadings(req,res,next){
 try{res.json({success:true,data:await getReadings(req.query.limit,req.query.deviceId)})}catch(e){next(e)}
}
