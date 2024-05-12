"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const UserValidator_1 = __importDefault(require("../validators/UserValidator"));
const AccessToken_1 = __importDefault(require("../middlewares/AccessToken"));
class AuthController {
    static async login(request, response) {
        const schema = UserValidator_1.default.loginSchema();
        const { email, password } = schema.parse(request.body);
        try {
            const user = await User_1.default.findOne({ email });
            if (!user) {
                return response
                    .status(404)
                    .json({ success: false, message: "User not found" });
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return response.status(401).json({ message: "Invalid password" });
            }
            return response.status(200).json({
                success: true,
                message: "Login successful",
                token: AccessToken_1.default.generate(user),
            });
        }
        catch (error) {
            console.log("Error in login", error);
            response.status(500).json({ success: false, message: error.message });
        }
    }
    static async register(request, response) {
        try {
            const schema = UserValidator_1.default.registerSchema();
            const { first_name, last_name, email, password } = schema.parse(request.body);
            const existingUser = await User_1.default.findOne({ email });
            if (existingUser) {
                return response
                    .status(400)
                    .json({ success: false, message: "User already exists" });
            }
            const saltRounds = 10;
            const salt = await bcrypt_1.default.genSalt(saltRounds);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const user = await User_1.default.create({
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
        }
        catch (error) {
            console.log("Error in registering user", error);
            response.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.default = AuthController;
