import { Request, Response } from "express";
import Article from "../models/Article";
import ArticleValidator from "../validators/ArticleValidator";
import { wordsPerMinute } from "../utils/general";
import { IArticle } from "src/interface/Article";

export default class ArticlesController {
  async index(request: Request, response: Response) {
    try {
      const articles = await Article.where({ state: "DRAFT" }).find();

      if (!articles) {
        return response
          .status(404)
          .json({ success: false, message: "No articles found" });
      }

      return response.status(200).json({
        success: true,
        message: "Articles fetched successfully!",
        data: articles,
      });
    } catch (error) {
      console.log("Error in fetching articles", error);
    }
  }

  async store(request: Request, response: Response) {
    const valdator = ArticleValidator.store();
    const { title, description, state, body, tags } = valdator!.parse(
      request.body
    );
    // const { title, description, state, body, tags } = request.body;

    const articleExists = await Article.findOne({ title });

    if (articleExists) {
      return response.status(400).json({
        success: false,
        message: "Article with this title already exists",
      });
    }

    const authorId = request["user"].id;

    const readingTime = wordsPerMinute(body);

    try {
      const article = await Article.create({
        title,
        description,
        state,
        author: authorId,
        body,
        reading_time: readingTime,
        tags,
      });

      if (!article) {
        return response.status(400).json({ message: "Article not created" });
      }

      response.status(201).json({
        success: true,
        message: "Article created successfully!",
        data: article,
      });
    } catch (error) {
      console.log("Error in creating article", error);
    }
  }

  async fetchOwnArticles(request: Request, response: Response) {
    const authorId = request.params.id;

    const state = request.query.state as string | undefined;

    if (
      state &&
      state.toUpperCase() !== "PUBLISHED" &&
      state.toUpperCase() !== "DRAFT"
    ) {
      return response.status(400).json({ message: "Invalid state parameter" });
    }

    try {
      let articles: IArticle[];

      if (state) {
        articles = await Article.find({
          author: authorId,
          state: state.toUpperCase(),
        }).exec();
      } else {
        articles = await Article.find({ author: authorId }).exec();
      }

      let message = "Articles fetched successfully!";
      if (state) {
        message = `${state.toLowerCase().charAt(0).toUpperCase()}${state.slice(
          1
        )} articles fetched successfully!`;
      }

      return response.status(200).json({
        success: true,
        message,
        data: articles,
      });
    } catch (error) {
      console.log("Error in fetching articles", error);
    }
  }

  async show(request: Request, response: Response) {
    try {
      const articleId = request.params.id;

      const article = await Article.findOne({
        _id: articleId,
        state: "DRAFT",
      }).populate("author");

      if (!article) {
        return response
          .status(404)
          .json({ success: false, message: "Article not found" });
      }

      response.status(200).json({
        success: true,
        message: "Article fetched successfully!",
        data: article,
      });

      article.read_count += 1;
      article.save();
    } catch (error) {
      console.log("Error in fetching article", error);
    }
  }

  async update(request: Request, response: Response) {
    const validator = ArticleValidator.update();
    try {
      const articleId = request.params.id;
      const { title, description, state, body, tags } = request.body;

      const article = await Article.findById(articleId);

      if (!article) {
        return response
          .status(404)
          .json({ success: false, message: "Article not found" });
      }

      const checkIfArticlesBelongsToUser = article.author.equals(articleId);

      if (!checkIfArticlesBelongsToUser) {
        return response.status(401).json({
          success: false,
          message:
            "Unauthorized access. Only the author of this article can update it.",
        });
      }

      article.title = title;
      article.description = description;
      article.state = state;
      article.body = body;
      article.tags = tags;

      article.save();

      response.status(200).json({
        success: true,
        message: "Article updated successfully!",
        data: article,
      });
    } catch (error) {
      console.log("Error in updating article", error);
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const articleId = request.params.id;

      const article = await Article.findById(articleId);

      if (!article) {
        return response.status(404).json({ message: "Article not found" });
      }

      const checkIfArticlesBelongsToUser = article.author.equals(articleId);

      if (!checkIfArticlesBelongsToUser) {
        return response.status(401).json({
          success: false,
          message:
            "Unauthorized access. Only the author of this article can delete it.",
        });
      }

      article.deleteOne();

      response.status(200).json({
        success: true,
        message: "Article deleted successfully!",
      });
    } catch (error) {
      console.log("Error in deleting article", error);
    }
  }
}
