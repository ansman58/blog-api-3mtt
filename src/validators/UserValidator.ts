import z from "zod";

export default class UserValidator {
  static loginSchema() {
    return z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
  }

  static registerSchema() {
    return z.object({
      first_name: z.string().min(2),
      last_name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });
  }
}
