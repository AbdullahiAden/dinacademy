import express from "express";
import {
  addVideo,
  getAllVideos,
  getVideo,
} from "../controllers/videoController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//create a video
router.get("/", protect, getAllVideos);
router.post("/new", protect, addVideo);
router.get("/find/:id", protect, getVideo);

//collection tags
// router.get("/tags", getCollection);

export default router;
