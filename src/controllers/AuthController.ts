import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import UserValidator from "../validators/UserValidator";
import AccessToken from "../middlewares/AccessToken";

export default class AuthController {
  static async login(request: Request, response: Response) {
    const schema = UserValidator.loginSchema();
    const { email, password } = schema.parse(request.body);

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return response
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return response.status(401).json({ message: "Invalid password" });
      }

      return response.status(200).json({
        success: true,
        message: "Login successful",
        token: AccessToken.generate(user),
      });
    } catch (error) {
      console.log("Error in login", error);
      response.status(500).json({ success: false, message: error.message });
    }
  }

  static async register(request: Request, response: Response) {
    try {
      const schema = UserValidator.registerSchema();
      const { first_name, last_name, email, password } = schema.parse(
        request.body
      );

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return response
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      if (!user) {
        return response
          .status(400)
          .json({ success: false, message: "User not created" });
      }

      response.status(201).json({ success: "true", message: "User created" });
    } catch (error) {
      console.log("Error in registering user", error);
      response.status(500).json({ success: false, message: error.message });
    }
  }
}
