import {Router} from "express";
import {deviceStatus} from "../controllers/deviceController.js";
const r=Router(); r.get("/status",deviceStatus); export default r;
