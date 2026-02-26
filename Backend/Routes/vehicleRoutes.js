import express from "express";
import { getVehicles,getVehicleById,addVehicle,deleteVehicle,myVehicle,getPaginatedVehicles } from "../Controllers/vehicleController.js";
import { verifyToken,authorize } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router=express.Router();

router.get("/getVehicles",getVehicles);
router.get("/getVehicles/:id",getVehicleById);
router.post("/addVehicles",verifyToken,authorize('seller','admin'),upload.array('images', 5),addVehicle);
router.delete("/deleteVehicle/:id",verifyToken,authorize('seller','admin'),deleteVehicle);
router.get("/myVehicle",verifyToken,authorize('seller','admin'),myVehicle);
router.get("/getPaginatedVehicles",getPaginatedVehicles);

export default router;
