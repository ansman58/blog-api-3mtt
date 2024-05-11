import mongoose, { Model } from "mongoose";
import { IArticle } from "../interface/Article";
const { Schema, model, SchemaTypes } = mongoose;

type IArticleSchema = Model<IArticle>;

const articleSchema = new Schema<IArticle, IArticleSchema>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  state: {
    type: SchemaTypes.Mixed,
    enum: ["DRAFT", "PUBLISHED"],
    default: "DRAFT",
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
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
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
  created_at: Date,
  updated_at: Date,
});

// blogSchema.pre("save", function (next) {
//   this.updated_at = Date.now();
//   next();
// });

const Blog = model("article", articleSchema);
export default Blog;
