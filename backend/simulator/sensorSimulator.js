const API_URL=process.env.API_URL||"http://localhost:5000/api";
const DEVICE_ID=process.env.DEVICE_ID||"ENV-001";
const INTERVAL_MS=Number(process.env.INTERVAL_MS||5000);
let t=27.5,h=64,aq=420;
const vary=(v,a,min,max)=>Math.min(max,Math.max(min,Number((v+(Math.random()*2-1)*a).toFixed(2))));
async function send(){
 t=vary(t,.8,18,35); h=vary(h,1.5,20,90); aq=Math.round(vary(aq,25,100,900));
 const payload={deviceId:DEVICE_ID,temperature:t,humidity:h,airQuality:aq};
 try{
  const r=await fetch(`${API_URL}/readings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const d=await r.json(); if(!r.ok) throw new Error(d.message||"API rejected reading");
  console.log(new Date().toLocaleTimeString(),payload);
 }catch(e){console.error("Simulator:",e.message)}
}
console.log(`Simulator -> ${API_URL}/readings every ${INTERVAL_MS}ms`);
send(); setInterval(send,INTERVAL_MS);
