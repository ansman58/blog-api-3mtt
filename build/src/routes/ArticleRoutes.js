"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArticlesController_1 = __importDefault(require("../controllers/ArticlesController"));
const AccessToken_1 = __importDefault(require("../middlewares/AccessToken"));
const articleRouter = express_1.default.Router();
const articlesController = new ArticlesController_1.default();
const authenticate = AccessToken_1.default.authenticate;
articleRouter.get("/", articlesController.index);
articleRouter.post("/", authenticate, articlesController.store);
articleRouter.get("/:id", articlesController.show);
articleRouter.get("/author/:id", articlesController.fetchOwnArticles);
articleRouter.patch("/:id", authenticate, articlesController.update);
articleRouter.delete("/:id", authenticate, articlesController.destroy);
exports.default = articleRouter;
