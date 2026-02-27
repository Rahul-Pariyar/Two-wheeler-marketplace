import rateLimit from "express-rate-limit";

const rateLimiter=(windowMinutes,maxRequest)=>{

    const window = Number(windowMinutes);
    const max = Number(maxRequest);

    return rateLimit({

        windowMs:window*60*1000,
        max:max,
        message:{
            status:429,
            error:"Too many requests"
        },
        standardHeaders:true,
        legacyHeaders:false
    });
}

export default rateLimiter;