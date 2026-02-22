import jwt from "jsonwebtoken"

export const generateAccessToken=(user)=>{
    
    const payload={
        id:user._id,
        email:user.email,
        role:user.role
    }
    const accessToken=jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1min'});
    return accessToken;
}

export const generateRefreshToken=(user)=>{
    const payload={
        id:user._id,
        email:user.email,
        role:user.role
    }
    const refreshToken=jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'10d'});
    return refreshToken;
}