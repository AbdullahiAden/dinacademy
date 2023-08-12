import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//get all user
router.get("/", verifyToken, getAllUsers);

export default router;
