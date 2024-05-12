"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const AuthRoutes_1 = __importDefault(require("./src/routes/AuthRoutes"));
const ArticleRoutes_1 = __importDefault(require("./src/routes/ArticleRoutes"));
const logger_1 = require("./src/services/logger");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World");
});
(async () => {
    try {
        const connect = await mongoose_1.default.connect(process.env.DB_URI);
        console.log("connected", connect.connection.host);
    }
    catch (err) {
        console.log("Oops! Sorry, connection to the DB failed.", err?.message);
    }
})();
app.use("/auth", logger_1.requestLogger, AuthRoutes_1.default);
app.use("/articles", logger_1.requestLogger, ArticleRoutes_1.default);
exports.default = app;
