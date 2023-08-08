import express from "express";
import { signin, signup } from "../controllers/auth.js";

const router = express.Router();

// CREATE A USER
router.post("/signup", signup);

// SIGN IN USER
router.post("/signin", signin);

// GOOGLE  AUTH, SIGN IN WITH GOOGLE ACCOUNT
router.post("/google");

export default router;
