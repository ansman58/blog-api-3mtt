import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export type IArticleState = "DRAFT" | "PUBLISHED";

export interface IArticle extends mongoose.Document<ObjectId> {
  title: string;
  slug: string;
  state: IArticleState;
  description: string;
  read_count: number;
  reading_time: string;
  author: ObjectId; // User ID
  body: string;
  tags: string[];
  timestamp?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
