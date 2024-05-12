import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 4400;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
