import express from "express";
import { login,refreshTokenMethod,signup,getMe,updateProfile } from "../Controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";
import rateLimiter from "../middlewares/ratelimit.js";

const router=express.Router();

router.post("/signup",rateLimiter(10,25),signup);
router.post("/login",rateLimiter(10,25),login);
router.post("/refresh-token",rateLimiter(10,20),refreshTokenMethod);
router.get("/getMe",verifyToken,rateLimiter(10,80),getMe);
router.put("/updateProfile",verifyToken,rateLimiter(10,20),updateProfile);

export default router;