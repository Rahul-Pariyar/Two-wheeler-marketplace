import User from "../Models/User.js"
import Vehicle from "../Models/Vehicle.js";
import ApiError from "../utils/ApiError.js";

export const addUser=async (req,res)=>{
    const {name,email,password,phone,role,address}=req.body;

    if(!name || !email || !password || !phone){
        throw new ApiError("Please fill all fields",400);
    }
    const exists=await User.findOne({email});
    if(exists){
        throw new ApiError("User already exists",400);
    }

    await User.create({
        name,email,password,phone,role,address
    });

    return res.status(201).json({
        success:true,
        message:"User created successfully!"
    });
}


export const getUser=async (req,res)=>{
    const users=await User.find().select("-refreshToken");
    
    return res.status(200).json({
        success:true,
        data:users
    });
}


export const getUserById=async(req,res)=>{
    const user=await User.findById(req.params.id).select("-password -refreshToken");

    if(!user){
        throw new ApiError("User not found",404);
    }
    
    return res.status(200).json({
        success:true,
        data:user
    });
}


export const updateUser=async(req,res)=>{
    const data=req.body;

    const updatedUser=await User.findByIdAndUpdate(req.params.id,data,{
        new:true,
        runValidators:true
    });

    if(!updatedUser){
        throw new ApiError("User failed to update, User not found",404)
    }

    return res.status(200).json({
        success:true,
        message:"User updated successfully!",
        data:updatedUser
    });
}


export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError('User not found',404);
  }

  if(user._id.toString()==req.user.id.toString()){
    throw new ApiError("Admin can't delete account itself",400);
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
};



export const getAllVehicles=async (req,res)=>{
    const vehicles=await Vehicle.find();

    return res.status(200).json({
        success:true,
        data:vehicles
    })
}


export const getStat=async (req,res)=>{
    const userData=await User.aggregate([
        {
            $facet:{
                userStat:[
                    {
                        $group:{
                            _id:null,
                            totalUsers:{$sum:1},
                            totalBuyers:{$sum:{$cond:[{$eq:["$role","buyer"]},1,0]}},
                            totalSellers:{$sum:{$cond:[{$eq:["$role","seller"]},1,0]}},
                        }
                    },
                ],
                recentUsers:[
                    { $sort:{createdAt:-1} },
                    { $limit:6 }
                ]
            }
        }
    ]);

    const vehicleData=await Vehicle.aggregate([
        {
            $facet:{
                vehicleStats:[
                    {
                        $group:{
                            _id:null,
                            totalVehicles:{$sum:1},
                            pendingVehicles:{$sum:{$cond:[{$eq:["$isApproved",false]},1,0]}},
                            soldVehicles:{$sum:{$cond:[{$eq:["$status","sold"]},1,0]}}
                        }
                    }
                ],
                recentVehicles:[
                    {$sort:{createdAt:-1}},
                    {$limit:6}
                ]
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data: {
            userStats: userData[0].userStat[0] || { totalUsers: 0, totalBuyers: 0, totalSellers: 0 },
            recentUsers: userData[0].recentUsers,
            vehicleStats: vehicleData[0].vehicleStats[0] || { totalVehicles: 0, pendingVehicles: 0, soldVehicles: 0 },
            recentVehicles: vehicleData[0].recentVehicles
        }
    });
}


export const vehicleApproval=async (req,res)=>{

    if(req.user.role!="admin"){
        throw new ApiError("Access denied",403);
    }

    await Vehicle.findByIdAndUpdate(req.params.id,
        {isApproved:true},
        {new:true}
    );

    return res.status(200).json({
        success:true,
        message:"Vehicle approved!"
    })
}