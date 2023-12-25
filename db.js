import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URL;
console.log(mongoURI);
// connecting database
const connectToMongo = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connected");
    })
    .catch((error) => console.log(error));
};

export default connectToMongo;
