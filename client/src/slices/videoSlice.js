import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const initialState = {
  videosData: null,

  singleVideoData: null,
};

const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideosData: (state, action) => {
      state.videosData = action.payload;
      // localStorage.setItem("videosData", JSON.stringify(action.payload));
    },
    setClickedVideoData: (state, action) => {
      state.singleVideoData = action.payload;
      // localStorage.setItem("singleVideoData", JSON.stringify(action.payload));
    },
  },
});

export const { setVideosData, setClickedVideoData } = VideoSlice.actions;
export default VideoSlice.reducer;
