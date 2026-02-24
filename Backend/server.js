import express from "express";
import dotenv from "dotenv/config";
import ConnectDB from "./Config/DBConn.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Routes/authRoutes.js";
import vehicleRouter from "./Routes/vehicleRoutes.js";

// dotenv.config();

const app=express();

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("This is homepage");
});

app.use("/auth",authRouter);
app.use("/vehicles",vehicleRouter)

app.use(globalErrorHandler);
app.listen(process.env.PORT,()=>{
    console.log(`Server listening in port ${process.env.PORT}`);
});
