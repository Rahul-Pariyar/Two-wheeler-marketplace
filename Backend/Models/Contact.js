import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle"
    },
    message:{
        type:String,
        required:true,
        max:200
    },
    buyerPhone:{
        type:Number,
        required:true
    },
    buyerEmail:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("Contact",contactSchema);
