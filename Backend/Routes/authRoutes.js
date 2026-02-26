import express from "express";
import { login,refreshTokenMethod,signup,getMe,updateProfile } from "../Controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/refresh-token",refreshTokenMethod);
router.get("/getMe",verifyToken,getMe);
router.put("/updateProfile",verifyToken,updateProfile);

export default router;