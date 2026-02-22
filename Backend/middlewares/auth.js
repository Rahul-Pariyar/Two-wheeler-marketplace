import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const verifyToken=async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError("Token not found", 401);
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user=decoded;
        next();
    } catch {
        throw new ApiError("Invalid or expired token", 401);
    }
}

export const authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new ApiError("Unauthorized User",403)
        }
        next();
    }
}