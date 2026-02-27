import express from "express";
import dotenv from "dotenv/config";
import ConnectDB from "./Config/DBConn.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Routes/authRoutes.js";
import vehicleRouter from "./Routes/vehicleRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";
import http from "http";
import { socketInit } from "./Config/socketConfig.js";

const app=express();

const server=http.createServer(app);

ConnectDB();

socketInit(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("This is homepage");
});

app.use("/auth",authRouter);
app.use("/vehicles",vehicleRouter);
app.use("/admin",adminRouter);

app.use(globalErrorHandler);
server.listen(process.env.PORT,()=>{
    console.log(`Server listening in port ${process.env.PORT}`);
});
