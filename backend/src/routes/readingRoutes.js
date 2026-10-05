import {Router} from "express";
import {postReading,latestReading,historicalReadings} from "../controllers/readingController.js";
const r=Router(); r.post("/",postReading); r.get("/latest",latestReading); r.get("/",historicalReadings); export default r;
