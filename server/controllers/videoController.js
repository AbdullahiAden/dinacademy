import asyncHandler from "express-async-handler";
import Video from "../models/VideoModels.js";

const addVideo = asyncHandler(async (req, res) => {
  //   const newVideo = new Video({ playlistId: req.user.id, ...req.body });
  const newVideo = new Video({ ...req.body });
  // if video exists
  const { title, videoUrl } = req.body;

  const videoExists = await Video.findOne({ videoUrl });
  if (videoExists) {
    res.status(400);
    throw new Error("video with such Link already exists");
  }
  if (!title || !videoUrl) {
    throw new Error("Please Enter Video Link & Titel ");
  }

  await newVideo.save();
  res.status(201).json(newVideo);

  //if video is created
  if (newVideo) {
    console.log(newVideo);
  } else {
    res.status(401);
    throw new Error("video not created");
  }
});

const getAllVideos = asyncHandler(async (req, res) => {
  const allVideos = await Video.find();

  res.status(200).json(allVideos);

  if (allVideos) {
    console.log(allVideos);
  } else {
    res.status(401);
    throw new Error("cant get all videos ");
  }
});

const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  res.status(200).json(video);

  if (video) {
    console.log(video);
  } else {
    res.status(401);
    throw new Error("cant get single video");
  }
});

export { addVideo, getAllVideos, getVideo };
