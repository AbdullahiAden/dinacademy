import { createError } from "../error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  // compare logged in user from jwt with current(params.id),user can update its own cred  & so can admin
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
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "you can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  // compare logged in user from jwt with current(params.id),user can delete its own cred  & so can admin
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("user has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "you can delete only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;

    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  const query = req.query.new;

  // only admin can get all users
  if (req.user.isAdmin) {
    try {
      // fetch last 3 users (.sort(_id:-1)) users if there is query( users/?new=true ), else fetch all
      const allUsers = query
        ? await User.find().sort({ _id: -1 }).limit(3)
        : await User.find();

      res.status(200).json(allUsers);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "you are not allowed to see all users"));
  }
};
