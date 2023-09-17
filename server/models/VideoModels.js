import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    playlistId: {
      type: "string",
      required: true,
    },
    titel: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    thumbnail: {
      type: "string",
    },
    videoUrl: {
      type: "string",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);