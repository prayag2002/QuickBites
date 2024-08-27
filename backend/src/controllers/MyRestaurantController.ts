import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId }); // Check if restaurant already exists
    if (existingRestaurant) {
      return res.status(409).json({ message: "Restaurant already exists" });
    }

    const image = req.file as Express.Multer.File; // Get image from request
    const base64Image = Buffer.from(image.buffer).toString("base64"); // Convert image to base64
    const dataURI = `data:${image.mimetype};base64,${base64Image}`; // Create data uri

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI); // Upload image to cloudinary

    const restaurant = new Restaurant(req.body); // Create new restaurant object
    restaurant.imageUrl = uploadResponse.url; // Set imageUrl to cloudinary url
    restaurant.user = new mongoose.Types.ObjectId(req.userId); // Set user to current user
    restaurant.lastUpdated = new Date(); // Set lastUpdated to current date

    await restaurant.save(); // Save restaurant to database

    res.status(201).send(restaurant); // Send restaurant object as response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" }); // Send error response
  }
};

export default {
  createMyRestaurant,
};
