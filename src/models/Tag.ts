import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tagSchema = new Schema({
  title: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  meta: String,
  createdAt: Date,
  updatedAt: Date,
});

const Tag = model("Tag", tagSchema);

export default Tag;