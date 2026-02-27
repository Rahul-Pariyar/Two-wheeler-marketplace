import express from "express";
import { getVehicles,getVehicleById,addVehicle,deleteVehicle,myVehicle,getPaginatedVehicles } from "../Controllers/vehicleController.js";
import { verifyToken,authorize } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import rateLimiter from "../middlewares/ratelimit.js";

const router=express.Router();

router.get("/getVehicles",rateLimiter(1,60),getVehicles);
router.get("/getVehicles/:id",rateLimiter(1,60),getVehicleById);
router.get("/getPaginatedVehicles",rateLimiter(1,600),getPaginatedVehicles);

router.post("/addVehicles",verifyToken,authorize('seller','admin'),rateLimiter(1,15),upload.array('images', 5),addVehicle);
router.delete("/deleteVehicle/:id",verifyToken,authorize('seller','admin'),rateLimiter(1,15),deleteVehicle);
router.get("/myVehicle",verifyToken,authorize('seller','admin'),rateLimiter(1,60),myVehicle);

export default router;
