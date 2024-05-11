import dotenv from "dotenv";
import { IEnv } from "src/interface/Env";

dotenv.config();

export const getEnv = (value: IEnv): string => {
  return process.env[value] || "";
};

export const wordsPerMinute = (text: string) => {
  const AVERAGE_WORDS_PER_MINUTE = 200;
  const wordsWithoutSpaces = text.trim().split(/\s+/).length;
  const readingTime = wordsWithoutSpaces / AVERAGE_WORDS_PER_MINUTE;
  return Math.ceil(readingTime);
};
