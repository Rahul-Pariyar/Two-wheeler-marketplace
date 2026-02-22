import mongoose, { Schema } from "mongoose";

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
      required: [true, 'Please add a year'],
      min: 1900,
      max: new Date().getFullYear() + 1
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
      type: Number,
      required: [true, 'Please add engine capacity']
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Electric', 'Diesel'],
    },
    condition: {
      type: String,
      enum: ['Like new','Used'],
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
      uppercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: 200,
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
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
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

// Create indexes for better search performance
// vehicleSchema.index({ brand: 1, model: 1 });
// vehicleSchema.index({ price: 1 });
// vehicleSchema.index({ 'location.city': 1 });
// vehicleSchema.index({ status: 1, isApproved: 1 });

vehicleSchema.index({brand:1,model:1});
vehicleSchema.index({price:1});
vehicleSchema.index({'location.city':1});
vehicleSchema.index({status:1,isApproved:1});

export default mongoose.model('Vehicle', vehicleSchema);
