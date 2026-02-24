import cloudinary from "../Config/cloudinaryConfig.js";
import Vehicle from "../Models/Vehicle.js";
import ApiError from "../utils/ApiError.js";
import fs from "fs";

export const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({
    isApproved: true,
    status: "available",
  });

  return res.status(200).json({
    success: true,
    data: vehicles,
  });
};

export const getVehicleById = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id).populate(
    "seller",
    "email phone address",
  );

  if (!vehicle) {
    throw new ApiError("Vehicle not found", 400);
  }

  return res.status(200).json({
    success: true,
    data: vehicle,
  });
};

export const addVehicle = async (req, res) => {
  const {
    title,
    brand,
    model,
    makeYear,
    price,
    mileage,
    engineCapacity,
    fuelType,
    condition,
    kmDriven,
    registrationNumber,
    description,
    location,
  } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    throw new ApiError("At least one image must be uploaded", 400);
  }

  const uploadPromises = files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "Bikes",
      transformation:[
        {height:400,width:500,crop:"fill"},
        {fetch_format:"auto",quality:"auto"}
      ]
    });

    await fs.promises.unlink(file.path);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  });

  const uploadResult = await Promise.all(uploadPromises);

  const newVehicle = await Vehicle.create({
    seller: req.user.id,
    title,
    brand,
    model,
    makeYear,
    price,
    mileage,
    engineCapacity,
    fuelType,
    condition,
    kmDriven,
    registrationNumber,
    description,
    location,
    images: uploadResult,
  });

  return res.status(201).json({
    success: true,
    message: "Bike added successfully!",
    data: newVehicle,
  });
};
