import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    bookId: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    imgUrl: {
      type: "string",
      default:
        "https://images.unsplash.com/photo-1598620617137-2ab990aadd37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    },
    videoUrl: {
      type: "string",
      required: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
