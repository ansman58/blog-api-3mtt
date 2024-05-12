import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRouter from "./src/routes/AuthRoutes";
import articleRouter from "./src/routes/ArticleRoutes";
import { requestLogger } from "./src/services/logger";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

(async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI as string);

    console.log("connected", connect.connection.host);
  } catch (err) {
    console.log(
      "Oops! Sorry, connection to the DB failed.",
      (err as Error)?.message
    );
  }
})();

app.use("/auth", requestLogger, authRouter);
app.use("/articles", requestLogger, articleRouter);

export default app;
