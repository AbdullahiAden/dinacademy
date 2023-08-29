import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

// import { protect } from "../middleware/authMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

//get a user
router.get("/profile", protect, getUserProfile);

// update user
router.put("/profile/update", protect, updateUserProfile);

// //delete user
// router.delete("/:id", protect, deleteUser);

//get all user
router.get("/allUsers", protect, getAllUsers);

export default router;
