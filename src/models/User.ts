import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
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
  meta: String,
  createdAt: Date,
  updatedAt: Date,
});

const User = model("User", userSchema);
export default User;
