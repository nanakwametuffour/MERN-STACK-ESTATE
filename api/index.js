import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch(() => {
    console.log("Not connected to mongodb");
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//  middlewares

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
