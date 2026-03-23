import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
      trim: true
    },
    model: {
      type: String,
      required: [true, 'Please add a model'],
      trim: true
    },
    makeYear: {
      type: Number,
      min: 1800,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0
    },
    mileage: {
      type: Number,
      min: 0
    },
    engineCapacity: {
      type: Number
    },
    category:{
      type:String,
      enum:["sports naked","sports","commuter","scooter","cruiser","dirt"]
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Electric', 'Diesel'],
    },
    condition: {
      type: String,
      enum: ['Brand new','Like new','Used'],
      required: true,
    },
    kmDriven: {
      type: Number,
      required: [true, 'Please add kilometers driven'],
      min: 0,
    },
    registrationNumber: {
      type: String,
      trim: true,
      unique:[true,"regitrationNumber must be unique"]
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      max: 200,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    location: {
      city: {
        type: String
      },
      state: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

vehicleSchema.index({brand:1,model:1});
vehicleSchema.index({price:1});
vehicleSchema.index({'location.city':1});
vehicleSchema.index({status:1,isApproved:1});
vehicleSchema.index({category:1});

export default mongoose.model('Vehicle', vehicleSchema);
