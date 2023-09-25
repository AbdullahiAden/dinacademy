import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// db connection
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({ origin: true, credentials: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/books", bookRoutes);

// middleware for better error handling

app.use(notFound);
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   // if we dont send specific error, default 500
//   const status = err.status || 500;
//   const message = err.message || "something went wrong!";
//   return res.status(status).json({
//     success: false,
//     status,
//     message,
//   });
// });

app.listen(8800, () => {
  connect();
  console.log("connected to server");
});
