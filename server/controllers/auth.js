import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

//todo: SUBSCRIBTION PLAN
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    // encrypting the password
    const hash = bcrypt.hashSync(req.body.password, salt);
    // created a new user
    const newUser = new User({ ...req.body, password: hash });

    // save to db
    await newUser.save();
    res.status(200).send("user has been created");
  } catch (err) {
    next(err);
  }
};
export const signin = async (req, res, next) => {
  try {
    // find user
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found"));

    // compare password with hashed password in db
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Invalid credentials"));

    // then create jwt token to send to signed in user after sucessfuly signed in
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "5d" }
    );

    // additional security to hide the hide hashed password
    // hide the hashed password from the the rest of user data
    const { password, ...info } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      // send the other user data except the password
      .json(info);
  } catch (err) {
    next(err);
  }
};
