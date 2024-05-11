import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  meta?: string;
  timestamp?: Date;
  created_at: Date;
  updated_at: Date;
}
