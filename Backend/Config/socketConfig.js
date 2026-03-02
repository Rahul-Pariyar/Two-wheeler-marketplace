import { Server } from "socket.io";
import jwt from "jsonwebtoken"

let io;

export const socketInit=(server)=>{
    io=new Server(server,{
        cors:{
            origin:"*"
        }
    });

    io.use((socket,next)=>{
        const token=socket.handshake.auth.token;
        if(!token){
            return next(new Error("Token not found!"));
        }
        try{
            const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            socket.user=decoded;
            next();
        }catch(err){
            return next(new Error("Invalid or expired token"));
        }
    });

    io.on("connection",(socket)=>{
        console.log(`User connected:${socket.id}`);
        
        socket.on("join_conversation",(conversationId)=>{
            socket.join(`Conversation:${conversationId}`);
            console.log(`${socket.id} joined conversation ${conversationId}`);
        });

        socket.on("leave_conversation",(conversationId)=>{
            socket.leave(`Conversation:${conversationId}`);
            console.log(`${socket.id} left conversation ${conversationId}`);
        })

        socket.on("disconnect",()=>{
            console.log(`User disconnected:${socket.id}`);
        })
    })
}

export const getIO=()=>{
    if(!io){
        throw new Error("Socket initiation failed!")
    }
    return io;
}