import express from "express";
import connectToMongo from "./db.js";
import router from "./Routes/Auth.js";
import dataRouter from "./Routes/data.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
// if i wanna use req.body then i have to use app.use(express.json());middleware
app.use(express.json());
connectToMongo();
connectToMongo();
app.use("/api/auth", router);
app.use("/api/data", dataRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
