"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, SchemaTypes } = mongoose_1.default;
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    description: String,
    body: {
        type: String,
        required: true,
    },
    state: {
        type: SchemaTypes.Mixed,
        enum: ["DRAFT", "PUBLISHED"],
        default: "DRAFT",
    },
    read_count: {
        type: Number,
        default: 0,
    },
    reading_time: Number,
    tags: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
});
const Article = model("article", articleSchema);
exports.default = Article;
