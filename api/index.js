import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

 dotenv.config()


const app = express()


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongodb");
}).catch(()=>{
    console.log("Not connected to mongodb");
})

  app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
  })