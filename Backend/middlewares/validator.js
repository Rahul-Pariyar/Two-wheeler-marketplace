import joi from "joi";

const signupSchema=joi.object({
    name: joi.string().min(5).max(30).required().messages({
        'string.min':'Name must be atleast 5 letter. Please enter Full name',
        'string.max':'Name can not exceed 30 characters',
        'any.required':'Name is required'
    }),
    email: joi.string().email().required().messages({
        'string.email':'Please enter valid email',
        'any.required':'Email is required'
    }),
    password: joi.string().min(8).max(30).required().messages({
        'string.min':"Password must be atleast 8 chracters long",
        'string.max':'Password too long. It must be less than 30 charaters',
        'any.required':'Password is required'
    }),
    phone: joi.string().pattern(/^(97|98)[0-9]{8}$/).required().messages({
        'string.pattern.base':'Invalid number format for Nepal',
        'any.required':'Phone number is required'
    }),
    address: joi.string()
});

export const signupValidator=(req,res,next)=>{
    const {error}=signupSchema.validate(req.body);
    if(error){
        return res.status(400).json(
            {errors: error.details.map(err => err.message)}
        )
    }
    next();
}

const loginSchema= joi.object({
    email: joi.string().email().trim().required().messages({
        'string.email':'Enter valid email',
        'any.required':'Email is required'
    }),
    password: joi.string().required().messages({
        'any.required':'Password is required'
    })
});

export const loginValidator=(req,res,next)=>{
    const {error}=loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            error:error.details.map(err=>err.message)
        })
    }
    next();
}