import { NextFunction, Request, Response } from "express";
import Article from "../models/Article";
import ArticleValidator from "../validators/ArticleValidator";
import { wordsPerMinute } from "../utils/general";
import { IArticle } from "src/interface/Article";
import { ZodError } from "zod";
import {
  paginationHelper,
  orderingHelper,
  searchHelper,
} from "../utils/requestHelper";

export default class ArticlesController {
  async index(request: Request, response: Response) {
    const { page, limit } = paginationHelper(request);
    const order = orderingHelper(request);

    try {
      const articles = await Article.find({
        state: "PUBLISHED",
      })
        .sort({
          read_count: order.sort_read_count,
          reading_time: order.sort_reading_time,
          createdAt: order.sort_createdAt,
          updatedAt: order.sort_updatedAt,
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

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
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const schema = ArticleValidator.createSchema();

      const { title, description, state, body, tags } = schema.parse(
        request.body
      );

      const articleExists = await Article.findOne({ title });

      if (articleExists) {
        return response.status(400).json({
          success: false,
          message: "Article with this title already exists",
        });
      }

      const authorId = request["user"].id;

      const readingTime = wordsPerMinute(body);

      const article = await Article.create({
        title,
        description,
        state: "DRAFT",
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
      if (error instanceof ZodError) {
        // If the error is an instance of ZodError, it contains detailed validation errors
        return response.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors,
        });
      }
      console.log("Error in creating article", error);
      return response
        .status(500)
        .json({ success: false, message: error.message });
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
      const { page, limit } = paginationHelper(request);
      let articles: IArticle[];

      if (state) {
        articles = await Article.find({
          author: authorId,
          state: state.toUpperCase(),
        })
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
      } else {
        articles = await Article.find({ author: authorId })
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
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
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const articleId = request.params.id;

      const article = await Article.findOne({
        _id: articleId,
        state: "PUBLISHED",
      })
        .populate("author")
        .exec();

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
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const articleId = request.params.id;
      const userId = request["user"].id;
      const schema = ArticleValidator.createSchema().partial();

      const { title, description, state, body, tags } = schema.parse(
        request.body
      );

      const article = await Article.findById(articleId);

      if (!article) {
        return response
          .status(404)
          .json({ success: false, message: "Article not found" });
      }

      const checkIfArticlesBelongsToUser = article.author.equals(userId);

      if (!checkIfArticlesBelongsToUser) {
        return response.status(401).json({
          success: false,
          message:
            "Unauthorized access. Only the author of this article can update it.",
        });
      }

      const articleExists = await Article.findOne({ title });

      if (articleExists) {
        return response.status(400).json({
          success: false,
          message: "Article with this title already exists",
        });
      }

      article.title = title || article.title;
      article.description = description || article.description;
      article.state = state || article.state;
      article.body = body || article.body;
      article.tags = tags || article.tags;

      await article.save();

      response.status(200).json({
        success: true,
        message: "Article updated successfully!",
        data: article,
      });
    } catch (error) {
      console.log("Error in updating article", error);
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const articleId = request.params.id;
      const userId = request["user"].id;

      const article = await Article.findById(articleId);

      if (!article) {
        return response.status(404).json({ message: "Article not found" });
      }

      const checkIfArticlesBelongsToUser = article.author.equals(userId);

      if (!checkIfArticlesBelongsToUser) {
        return response.status(401).json({
          success: false,
          message:
            "Unauthorized access. Only the author of this article can delete it.",
        });
      }

      await article.deleteOne().exec();

      response.status(200).json({
        success: true,
        message: "Article deleted successfully!",
      });
    } catch (error) {
      console.log("Error in deleting article", error);
      response.status(500).json({ success: false, message: error.message });
    }
  }
}
