import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const initialState = {
  videosData: localStorage.getItem("videosData")
    ? JSON.parse(localStorage.getItem("videosData"))
    : null,

  singleVideoData: null,
};

const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideosData: (state, action) => {
      state.videosData = action.payload;
      localStorage.setItem("videosData", JSON.stringify(action.payload));
    },
    setClickedVideoData: (state, action) => {
      state.singleVideoData = action.payload;
    },
  },
});

export const { setVideosData, setClickedVideoData } = VideoSlice.actions;
export default VideoSlice.reducer;
