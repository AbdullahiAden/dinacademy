import { apiSlice } from "./apiSlice";
const VIDEOS_URL = "/api/videos";

//using this slice for logging in user
//queries are fetching data from the backend
// mutations are doing something to the backend like adding user like register and login user

//creating our endpoints in this file and we inject them into apiSlice endpoints
export const VideosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //in our login form , we dispatch this addvideo action/ endpoint
    addVideo: builder.mutation({
      query: (data) => ({
        url: `${VIDEOS_URL}/new`,
        method: "POST",
        body: data,
      }),
    }),

    getAllVideos: builder.query({
      query: () => ({
        url: `${VIDEOS_URL}`,
        method: "GET",
      }),
    }),
  }),
});

//specific convention to export mutation
//use + name + mutation
//use + name + query
export const { useAddVideoMutation, useGetAllVideosQuery } = VideosApiSlice;
