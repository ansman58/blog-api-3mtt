import { NextFunction, Request, Response } from "express";

export default class Authorize {
  static async isAuthorized(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const isLoggedIn = request["user"];
    if (!isLoggedIn) {
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized" });
    }
    next();
  }
}
