import { createError } from "../error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  // check if current user is same jwt id,user can update its own cred  & so can admin
  if (req.params.id === req.user.id || req.user.isAdmin) {
    // if password is updated, we encrypt it again
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {}
  } else {
    return next(createError(403, "you can update only your account"));
  }
};
export const deleteUser = (req, res, next) => {};
export const getUser = async (req, res, next) => {};
