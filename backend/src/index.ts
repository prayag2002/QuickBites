import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to Database Successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());

// Health Check
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health Ok!" });
});

app.use("/api/my/user", MyUserRoute);

app.listen(7000, () => {
  console.log("server started successfully on localhost:7000");
});
