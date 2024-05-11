import mongoose, { Model } from "mongoose";
import { IArticle } from "../interface/Article";
const { Schema, model, SchemaTypes } = mongoose;

type IArticleSchema = Model<IArticle>;

const articleSchema = new Schema<IArticle, IArticleSchema>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    description: String,
    body: {
      type: String,
      required: true,
    },
    state: {
      type: SchemaTypes.Mixed,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Article = model("article", articleSchema);
export default Article;
