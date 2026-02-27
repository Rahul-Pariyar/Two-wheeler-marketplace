import { Server } from "socket.io";

let io;

export const socketInit=(server)=>{
    io=new Server(server,{
        cors:{
            origin:"*"
        }
    });

    io.on("connection",(socket)=>{
        console.log(`User connected:${socket.id}`);
        


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