import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// syntax: router.method(path, middleware, controller)
router.post("/", jwtCheck, MyUserController.createCurrrentUser);

export default router;
