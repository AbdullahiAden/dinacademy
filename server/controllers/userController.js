import asyncHandler from "express-async-handler";
import { errorHandler } from "../middleware/errorMiddleware.js";
import User from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//  auth user / set token
// POST /api/users/auth
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  // compare password with hashed password in db
  const matchPassword = await bcrypt.compare(password, user.password);

  if (user && matchPassword) {
    const { password, ...restUserInfo } = user._doc;

    generateToken(res, restUserInfo._id);
    res.status(200).json(restUserInfo);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//  register new user
// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = bcrypt.genSaltSync(10);
  // encrypting the password
  const hash = bcrypt.hashSync(password, salt);
  // created a new user
  const newUser = new User({ ...req.body, password: hash });
  // save to db
  await newUser.save();

  // if user was successfully created
  if (newUser) {
    // return all user info except password
    const { password, ...restUserInfo } = newUser._doc;

    generateToken(res, restUserInfo._id);
    res.status(201).json(restUserInfo);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//  logout  user
// POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // compare logged in user from jwt with current(params.id),user can update its own cred  & so can admin
  if (user) {
    // if password is updated, we encrypt it again
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = async (req, res, next) => {
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

const getAllUsers = async (req, res, next) => {
  const query = req.query.new;

  // only admin can get all users
  if (req.user.isAdmin === true) {
    // fetch last 3 users (.sort(_id:-1)) users if there is query( users/?new=true ), else fetch all
    const allUsers = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();

    res.status(200).json(allUsers);
  } else {
    res.status(400).json({ message: "only admin can see all users" });
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
};
