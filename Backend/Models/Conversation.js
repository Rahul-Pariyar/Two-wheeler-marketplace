import mongoose from "mongoose";

const conversationSchema=new mongoose.Schema({
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    lastMessage:{
        type:String
    },
    lastMessageAt:{
        type:Date
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle"
    }
},{
    timestamps:true
});

export default mongoose.model("Conversation",conversationSchema);