import express from "express";

import ArticlesController from "../controllers/ArticlesController";
import AccessToken from "../middlewares/AccessToken";

const articleRouter = express.Router();

const articlesController = new ArticlesController();

const authenticate = AccessToken.authenticate;

articleRouter.get("/", articlesController.index);
articleRouter.post("/", authenticate, articlesController.store);
articleRouter.get("/:id", articlesController.show);
articleRouter.get("/author/:id", articlesController.fetchOwnArticles);
articleRouter.put("/:id", authenticate, articlesController.update);
articleRouter.delete("/:id", authenticate, articlesController.destroy);

export default articleRouter;
