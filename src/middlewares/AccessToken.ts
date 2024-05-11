import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IUser } from "../interface/User";
import { getEnv } from "../utils/general";
import dotenv from "dotenv";

dotenv.config();

export default class AccessToken {
  private static secret: string =
    process.env.JWT_SECRET ||
    "b4f788cba9eb6951b22a4b19a7fa03e36eaadadf957708deacfff4b300e9c2f1";

  static generate(user: IUser) {
    const payload = {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    const options: SignOptions = {
      expiresIn: "1h",
    };

    return jwt.sign(payload, AccessToken.secret, options);
  }

  static verify(token: string, next: NextFunction) {
    console.log("token 27", token);
    try {
      return jwt.verify(token, AccessToken.secret, (error, user) => {
        if (error) {
          console.log("Error in verifying token", error);
          return null;
        }

        next();
      });
    } catch (error) {
      console.log("Error in verifying token", error);
    }
  }

  static authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    console.log("secret 55", AccessToken.secret);
    return jwt.verify(token, AccessToken.secret, (error, user) => {
      if (error) {
        console.log("Error in verifying token", error);
        return null;
      }

      request["user"] = user;

      next();
    });
  }
}
