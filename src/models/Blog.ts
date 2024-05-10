import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  description: {
    type: String,
    required: true,
  },
  read_count: {
    type: Number,
    default: 0,
  },
  reading_time: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date,
});

const Blog = model("BlogArticle", blogSchema);
export default Blog;
