import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// no need for url since we use proxy in package, otherwise we would write server url
const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Videos", "singleVideo"],
  //userApiSlice will use injects endpoints here
  endpoints: (builder) => ({}),

  credentials: "include", // shows cookie in browser
});
