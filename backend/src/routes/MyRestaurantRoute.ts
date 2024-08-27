import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

// /api/my/restaurant
router.post(
  "/",
  upload.single("imageFile"), // Upload image to memory
  validateMyRestaurantRequest, // Validate request
  jwtCheck, // Check if token is valid
  jwtParse, // the data from the token is stored in req.userId and passed to the next middleware
  MyRestaurantController.createMyRestaurant // Call createMyRestaurant function from MyRestaurantController
);

export default router;
