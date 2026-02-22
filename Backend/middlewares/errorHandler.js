const globalErrorHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode||500;

    if(err.isOperational){
        return res.status(statusCode).json({
            success:false,
            message:err.message
        });
    }

    res.status(500).json({
        success:false,
        message:"Internal server error"
    });
}

export default globalErrorHandler;