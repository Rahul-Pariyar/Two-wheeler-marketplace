import express from "express";
import { addUser,getUser,getUserById,updateUser,deleteUser, getStat, getAllVehicles,vehicleApproval } from "../Controllers/adminController.js";
import { authorize,verifyToken } from "../middlewares/auth.js";

const router=express.Router();

router.post("/addUser",verifyToken,authorize("admin"),addUser);
router.get("/getUser",verifyToken,authorize("admin"),getUser);
router.get("/getUser/:id",verifyToken,authorize("admin"),getUserById);
router.put("/updateUser/:id",verifyToken,authorize("admin"),updateUser);
router.delete("/deleteUser/:id",verifyToken,authorize("admin"),deleteUser);
router.get("/getStat",verifyToken,authorize("admin"),getStat);
router.get("/getAllVehicles",verifyToken,authorize("admin"),getAllVehicles);
router.put("/approve/:id",verifyToken,authorize("admin"),vehicleApproval);


export default router;