import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IUser } from "src/interface/User";

export default class AccessToken {
  private static secret =
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

    return jwt.sign(payload, this.secret, options);
  }

  static verify(token: string) {
    try {
      return jwt.verify(token, this.secret);
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

    const user = this.verify(token);

    if (!user) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    request["user"] = user;
    next();
  }
}
