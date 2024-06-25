import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

app.use("/api/user", userRouter);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
