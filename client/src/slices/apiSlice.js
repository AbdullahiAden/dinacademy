import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// no need for url since we use proxy in package, otherwise we would write server url
const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8800" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  //userApiSlice will use injects endpoints here
  endpoints: (builder) => ({}),
});
