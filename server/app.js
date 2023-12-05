import express from "express";
import {config} from "dotenv"
import ErrorMiddleware from "./middleware/Error.js"
import user from "./routes/userRoutes.js"
import cors from "cors"
config({
    path:"./config/config.env",
})
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true,  // otherwise we cannot access req.body;
}))
app.use(
    cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    // methods:["GET","POST","PUT","DELETE"],
}));
app.use("/api",user);

export default app;
app.use(ErrorMiddleware);