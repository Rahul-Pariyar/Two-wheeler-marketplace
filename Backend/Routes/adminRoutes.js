import express from "express";
import { addUser,getUser,getUserById,updateUser,deleteUser, getStat, getAllVehicles,vehicleApproval } from "../Controllers/adminController.js";
import { authorize,verifyToken } from "../middlewares/auth.js";
import rateLimiter from "../middlewares/ratelimit.js";

const router=express.Router();

router.post("/addUser",verifyToken,authorize("admin"),rateLimiter(5,50),addUser);
router.get("/getUser",verifyToken,authorize("admin"),rateLimiter(5,50),getUser);
router.get("/getUser/:id",verifyToken,authorize("admin"),rateLimiter(5,50),getUserById);
router.put("/updateUser/:id",verifyToken,authorize("admin"),rateLimiter(5,50),updateUser);
router.delete("/deleteUser/:id",verifyToken,authorize("admin"),rateLimiter(5,50),deleteUser);
router.get("/getStat",verifyToken,authorize("admin"),rateLimiter(5,100),getStat);
router.get("/getAllVehicles",verifyToken,authorize("admin"),rateLimiter(5,100),getAllVehicles);
router.put("/approve/:id",verifyToken,authorize("admin"),rateLimiter(5,100),vehicleApproval);


export default router;