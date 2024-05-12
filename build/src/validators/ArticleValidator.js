"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
class ArticleValidator {
    static createSchema() {
        return zod_1.z.object({
            title: zod_1.z
                .string()
                .min(2, { message: "Title must be at least 2 characters long" }),
            state: zod_1.z
                .union([zod_1.z.literal("DRAFT"), zod_1.z.literal("PUBLISHED")])
                .default("DRAFT"),
            body: zod_1.z
                .string()
                .min(2, { message: "Body must be at least 2 characters long" }),
            description: zod_1.z.string().min(2, {
                message: "Description must be at least 2 characters long",
            }),
            tags: zod_1.z
                .array(zod_1.z.string())
                .min(1, { message: "At least one tag must be provided" }),
        });
    }
}
exports.default = ArticleValidator;
