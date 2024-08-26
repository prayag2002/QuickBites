import { Request, Response } from "express";
import User from "../models/user";

// it contains the logic for getting the current user from the database
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser); //to send the user back to the frontend
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// it contains the logic for creating a new user in the database
const createCurrrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id }); // check if the user already exists in the database

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body); //req.body contains the user data
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.send(user); //to send the updated user back to the frontend developer
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createCurrrentUser,
  updateCurrentUser,
};
