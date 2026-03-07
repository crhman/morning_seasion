import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import { userRout } from "./routes/userRoutes.js";


dotenv.config();

const app = express()

connectDB()

app.use(express.json())

app.use("/api/auth", userRout)

const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log("server is running");
    
} )