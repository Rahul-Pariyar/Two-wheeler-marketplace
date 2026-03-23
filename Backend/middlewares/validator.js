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

const vehicleSchema = joi.object({
  title: joi.string().trim().required().messages({
    "string.empty":'Title is required',
    "any.required": "Title is required",
  }),

  brand: joi.string().trim().required().messages({
    "string.empty":"Brand is required",
    "any.required": "Brand is required",
  }),

  model: joi.string().trim().required().messages({
    "string.empty":"model is required",
    "any.required": "Model is required",
  }),

  makeYear: joi.number()
    .integer()
    .min(1800)
    .max(new Date().getFullYear())
    .messages({
      "number.base": "Make year must be a number",
      "number.max": `Make year cannot exceed ${new Date().getFullYear()}`,
    }),

  price: joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  mileage: joi.number().min(0).messages({
    "number.base": "Mileage must be a number",
    "number.min": "Mileage cannot be negative",
  }),

  engineCapacity: joi.number().positive().optional().messages({
    "number.base": "Engine capacity must be a number",
    "number.positive": "Engine capacity must be positive",
  }),

  category: joi.string()
    .valid("sports naked", "sports", "commuter", "scooter", "cruiser", "dirt")
    .messages({
      "any.only": "Category must be one of: sports naked, sports, commuter, scooter, cruiser, dirt",
    }),

  fuelType: joi.string()
    .valid("Petrol", "Electric", "Diesel")
    .messages({
      "any.only": "Fuel type must be one of: Petrol, Electric, Diesel",
    }),

  condition: joi.string()
    .valid("Brand new","Like new", "Used")
    .required()
    .messages({
      "any.only": "Condition must be either 'Like new' or 'Used'",
      "any.required": "Condition is required",
    }),

  kmDriven: joi.number().min(0).required().messages({
    "number.base": "Kilometers driven must be a number",
    "number.min": "Kilometers driven cannot be negative",
    "any.required": "Kilometers driven is required",
  }),

  registrationNumber: joi.string().trim(),

  description: joi.string().trim().max(200).required().messages({
    "string.max": "Description cannot exceed 200 characters",
    "any.required": "Description is required",
  }),

  location: joi.object({
    city: joi.string().trim(),
    state: joi.string().trim(),
  })
});

export const vehicleValidator=(req,res,next)=>{
    const {error}=vehicleSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            error:error.details.map(err=>err.message)
        })
    }
    next();
}