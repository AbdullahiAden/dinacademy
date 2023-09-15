import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videosData: localStorage.getItem("videosData")
    ? JSON.parse(localStorage.getItem("videosData"))
    : null,
};

const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideosData: (state, action) => {
      state.videosData = action.payload;
      localStorage.setItem("videosData", JSON.stringify(action.payload));

      console.log(state.videosData);
    },
  },
});

export const { setVideosData } = VideoSlice.actions;
export default VideoSlice.reducer;
