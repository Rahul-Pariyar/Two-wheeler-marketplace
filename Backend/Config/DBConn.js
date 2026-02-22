import mongoose from "mongoose";

const ConnectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database server connected");
    }catch(err){
        console.log("Database server failed to connect");
        process.exit(1);
    }
}

export default ConnectDB;