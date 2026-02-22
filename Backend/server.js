import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./Config/DBConn.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./Routes/authRoutes.js";

dotenv.config();

const app=express();

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("This is homepage");
});

app.use("/auth",router);

app.use(globalErrorHandler);
app.listen(process.env.PORT,()=>{
    console.log(`Server listening in port ${process.env.PORT}`);
});
