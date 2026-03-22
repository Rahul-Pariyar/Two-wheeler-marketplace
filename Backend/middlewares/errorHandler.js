const globalErrorHandler = (err, req, res, next) => {
    console.log(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.isOperational ? err.message : "Something went wrong"
    });
};

export default globalErrorHandler;