import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:[6,"Minimum length should be 6"],
        max:[25,"Too long password"],
        select:false
    },
    phone:{
        type:Number,
        required:true,
        match: [
        /^(97|98)\d{8}$/,
        "Enter valid phone number, starting with 97/98"
        ]
    },
    role:{
        type:String,
        enum:['admin','seller','buyer'],
        default:'buyer'
    },
    address: {
      street: String,
      city: String,
      pincode: String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})    


userSchema.pre("save",async function(){

    if(!this.isModified("password")) return;

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});


userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

export default mongoose.model("User",userSchema);