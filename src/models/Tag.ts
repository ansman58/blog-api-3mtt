import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tagSchema = new Schema(
  {
    title: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    meta: String,
  },
  {
    timestamps: true,
  }
);

const Tag = model("Tag", tagSchema);

export default Tag;
