import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/dbConnect";

import userRoutes from "./routes/user";
import errorHandler from "./middlewares/errorHandler";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

app.use("/api", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || "8000";

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running:", PORT);
});
