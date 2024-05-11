import { z } from "zod";

export default class BlogValidator {
  static store() {
    return z.object({
      title: z.string().min(2),
      state: z.string().min(2),
      body: z.string().min(2),
      description: z.string().min(2),
      reading_time: z.string().min(2),
      tags: z.array(z.string()).min(1),
    });
  }
}
