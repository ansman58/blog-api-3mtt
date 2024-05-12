"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
class UserValidator {
    static loginSchema() {
        return zod_1.default.object({
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(6),
        });
    }
    static registerSchema() {
        return zod_1.default.object({
            first_name: zod_1.default.string().min(2),
            last_name: zod_1.default.string().min(2),
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(6),
        });
    }
}
exports.default = UserValidator;
