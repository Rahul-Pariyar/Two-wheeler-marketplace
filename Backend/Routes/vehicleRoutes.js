import express from "express";
import { getVehicles,getVehicleById,addVehicle } from "../Controllers/vehicleController.js";
import { verifyToken,authorize } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router=express.Router();

router.get("/getVehicles",getVehicles);
router.get("/getVehicles/:id",getVehicleById);
router.post("/addVehicles",verifyToken,authorize('seller','admin'),upload.array('images', 5),addVehicle);

export default router;
