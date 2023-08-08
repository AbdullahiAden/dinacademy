import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      unique: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    img: {
      type: "string",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
