import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieparser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URI;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieparser());
app.use(express.json());

const server = app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Data Base Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

import userRouter from "./routes/user.routes";
app.use("/api/v1/user", userRouter);
