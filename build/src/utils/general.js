"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordsPerMinute = exports.getEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv = (value) => {
    return process.env[value] || "";
};
exports.getEnv = getEnv;
const wordsPerMinute = (text) => {
    const AVERAGE_WORDS_PER_MINUTE = 200;
    const wordsWithoutSpaces = text.trim().split(/\s+/).length;
    const readingTime = wordsWithoutSpaces / AVERAGE_WORDS_PER_MINUTE;
    return Math.ceil(readingTime);
};
exports.wordsPerMinute = wordsPerMinute;
