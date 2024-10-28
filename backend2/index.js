import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./service/db.js";
 const app = express();

 app.use(cors())

 connectDb()

dotenv.config()




 app.get("/", (req,res)=>{res.send("Hello")})

 app.listen(5000, ()=>{console.log("Server running at 5000")})