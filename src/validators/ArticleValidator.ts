import { IArticle } from "src/interface/Article";
import { z, ZodError } from "zod";

export default class ArticleValidator {
  static store() {
    return z.object({
      title: z
        .string()
        .min(2, { message: "Title must be at least 2 characters long" }),
      state: z
        .string()
        .min(2, { message: "State must be at least 2 characters long" }),
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

  static update(payload?: IArticle) {
    const result = z
      .object({
        title: z
          .string()
          .min(2, {
            message: "Title must be at least 2 characters long",
          })
          .optional(),
        state: z
          .string()
          .min(2, {
            message: "State must be at least 2 characters long",
          })
          .optional(),
        body: z
          .string()
          .min(2, {
            message: "Body must be at least 2 characters long",
          })
          .optional(),
        description: z
          .string()
          .min(2, {
            message: "Description must be at least 2 characters long",
          })
          .optional(),
        tags: z
          .array(z.string())
          .min(1, { message: "At least one tag must be provided" }),
      })
      .optional();

    return result;

    const parse = result.safeParse(payload);

    // if(!parse.success){
    //    const formattedErrors = result.error.format()
    // }

    // return {
    //   parse,
    //   error: (result as any).error as ZodError,
    // };
  }
}
