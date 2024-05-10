import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDb } from "./dbConfig";
import mongoose from "mongoose";

dotenv.config();
const app = express();

(async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URI as string);
    
    console.log("connected", connect.connection.host);
  } catch (err) {
    console.log("opps sorry", (err as Error)?.message);
  }
})();

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// connectToDb().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
