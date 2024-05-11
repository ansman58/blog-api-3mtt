import { NextFunction } from "express";
import { IArticle } from "src/interface/Article";
import { z, ZodError } from "zod";

export default class ArticleValidator {
  static createSchema() {
    return z.object({
      title: z
        .string()
        .min(2, { message: "Title must be at least 2 characters long" }),
      state: z
        .union([z.literal("DRAFT"), z.literal("PUBLISHED")])
        .default("DRAFT"),
      body: z
        .string()
        .min(2, { message: "Body must be at least 2 characters long" }),
      description: z.string().min(2, {
        message: "Description must be at least 2 characters long",
      }),
      tags: z
        .array(z.string())
        .min(1, { message: "At least one tag must be provided" }),
    });
  }

  static updateSchema(payload: IArticle, next: NextFunction) {
    try {
      const result = this.createSchema().partial();
      result.parse(payload);
      return payload;
    } catch (error) {
      if (error instanceof ZodError) {
        return error.errors.map((err) => err.message);
      }
    }
  }
}
