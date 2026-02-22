import express from "express";
import { login,refreshTokenMethod,signup } from "../Controllers/authController.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/refresh-token",refreshTokenMethod);

export default router;