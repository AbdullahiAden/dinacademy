import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

// update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//get all user
router.get("/", verifyToken, getAllUsers);

export default router;
