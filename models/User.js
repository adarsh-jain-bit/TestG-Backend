import mongoose, { Schema } from "mongoose";

const UserScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: new Date().toISOString(),
  },
});

const User = mongoose.model("user", UserScheme);
export default User;
