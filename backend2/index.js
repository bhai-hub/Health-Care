import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./service/db.js";
import router from "./Routes/Patient/pRoutes.js";
import wRoute from "./Routes/Wellness/wRoute.js";
import dRouter from "./Routes/Doctors/dRoute.js";

dotenv.config(); // Load environment variables at the start

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

connectDb(); // Connect to the database

// Use router for the /api/patient route
app.use('/api/patient', router);
app.use('/api/wellness', wRoute);
app.use('/api/doctor',dRouter)

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Server running at port 5000");
});
