import { Schema, model, Model } from "mongoose";
import { IUser } from "src/interface/User";

type IUserModel = Model<IUser>;

const userSchema = new Schema<IUser, IUserModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
