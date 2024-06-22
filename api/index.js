import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch(() => {
    console.log("Not connected to mongodb");
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//  middlewares

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode|| 500;
   const message = err.message || "Internal Server Error";
   return res.status(statusCode).json({
      success: false,
       statusCode,
       message,
   })
});
