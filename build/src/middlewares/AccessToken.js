"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AccessToken {
    static generate(user) {
        const payload = {
            id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        };
        const options = {
            expiresIn: "1h",
        };
        return jsonwebtoken_1.default.sign(payload, AccessToken.secret, options);
    }
    static authenticate(request, response, next) {
        const authHeader = request.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return response.status(401).json({ message: "Unauthorized" });
        }
        return jsonwebtoken_1.default.verify(token, AccessToken.secret, (error, user) => {
            if (error) {
                console.log("Error in verifying token", error);
                return response
                    .status(403)
                    .json({ success: false, message: error.message });
            }
            request["user"] = user;
            next();
        });
    }
}
AccessToken.secret = process.env.JWT_SECRET ||
    "b4f788cba9eb6951b22a4b19a7fa03e36eaadadf957708deacfff4b300e9c2f1";
exports.default = AccessToken;
