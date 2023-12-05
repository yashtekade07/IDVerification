import mongoose from "mongoose";
import { User } from "../models/User.js";
export  const connectDB= async()=>{
  const {connection} = await  mongoose.connect(process.env.Mongo_URI)
  console.log(`MongoDB connected with ${connection.host}`)
}