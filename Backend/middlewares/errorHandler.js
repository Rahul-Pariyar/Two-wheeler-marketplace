const globalErrorHandler=(err,req,res,next)=>{
    console.log(err);
    const statusCode=err.statusCode||500;

    if(err.isOperational){
        return res.status(statusCode).json({
            success:false,
            message:err.message
        });
    }

    res.status(statusCode).json({
        success:false,
        message:err.message
    });
}

export default globalErrorHandler;