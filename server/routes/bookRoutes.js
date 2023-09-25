import express from "express";
import {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//create a video
router.get("/", protect, getAllBooks);
router.post("/new", protect, addBook);
router.get("/find/:id", protect, getBook);
router.put("/update/:id", protect, updateBook);
router.delete("/delete/:id", protect, deleteBook);

//collection tags
// router.get("/tags", getCollection);

export default router;
