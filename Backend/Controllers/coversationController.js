import Vehicle from "../Models/Vehicle.js"
import ApiError from "../utils/ApiError.js"
import Conversation from "../Models/Conversation.js";
import Message from "../Models/Message.js";
import { getIO } from "../Config/socketConfig.js";

export const getOrCreateConversation=async (req,res)=>{
    const {sellerId, vehicleId}=req.body;
    const buyerId=req.user.id;

    const vehicle=await Vehicle.findById(vehicleId);
    if(!vehicle){
        throw new ApiError("Vehicle doesn't exist",404);
    }
    
    let conversation=await Conversation.findOne({
        members:{$all:[buyerId,sellerId]},
        vehicle:vehicleId
    }).populate("members","name email")
    .populate("vehicle","title brand model price images");

    if(!conversation){
        conversation=await Conversation.create({
            members:[buyerId,sellerId],
            vehicle:vehicleId
        });

        conversation=await Conversation.findById(conversation._id)
        .populate("members","name email")
        .populate("vehicle","title brand model price images");
    }

    return res.status(200).json({
        success:true,
        data:conversation
    });
}


export const getConversation=async(req,res)=>{

    const conversation=await Conversation.find({members:req.user.id})
    .populate("members","name email")
    .populate("vehicle","title brand model price images")
    .sort("-lastMessageAt");

    if(!conversation){
        throw new ApiError("Conversation not found",404);
    }

    return res.status(200).json({
        success:true,
        data:conversation
    })
}



export const getMessage=async (req,res)=>{
    const conversationId=req.params.id;

    const conversation=await Conversation.findById(conversationId);

    if(!conversation){
        throw new ApiError("Conversation not found",404);
    }

    const isMember=conversation.members.some(
        (m)=> m.toString()===req.user.id.toString()
    )

    if(!isMember){
        throw new ApiError("You are not the member of this chat",403);
    }

    const messages=await Message.find({conversation:conversationId})
    .populate("sender","name")
    .sort("createdAt");

    return res.status(200).json({
        success:true,
        data:messages
    });
}



export const sendMessage=async (req,res)=>{
    const {conversationId,sentContent}=req.body;

    const conversation=await Conversation.findById(conversationId);
    if(!conversation){
        throw new ApiError("Conversation doesn't exist",404);
    }

    const isMember=conversation.members.some(
        (m)=> m.toString() === req.user.id.toString()
    );

    if(!isMember){
        throw new ApiError("You are not the member of this chat",403);
    }

    const message=await Message.create({
        conversation:conversationId,
        sender:req.user.id,
        content:sentContent
    });

    conversation.lastMessage=sentContent;
    conversation.lastMessageAt=new Date();
    conversation.save();

    const populatedMessage=await Message.findById(message._id)
    .populate('sender', 'name');

    getIO().to(`Conversation:${conversationId}`).emit("new_message",populatedMessage);

    return res.status(201).json({
        success:true,
        data:populatedMessage
    });
}