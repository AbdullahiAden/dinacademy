import { apiSlice } from "./apiSlice";
const BOOKS_URL = "/api/books";
//using this slice for logging in user
//queries are fetching data from the backend
// mutations are doing something to the backend like adding user like register and login user

//creating our endpoints in this file and we inject them into apiSlice endpoints
export const BooksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //in our login form , we dispatch this addvideo action/ endpoint
    addBook: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/new`,
        method: "POST",
        body: data,
      }),
    }),

    getAllBooks: builder.query({
      query: () => ({
        url: `${BOOKS_URL}`,
        method: "GET",
      }),
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `${BOOKS_URL}/find/${id}`,
        method: "GET",
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `${BOOKS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

//specific convention to export mutation
//use + name + mutation
//use + name + query
export const {
  useAddBookMutation,
  useGetAllBooksQuery,
  useGetBookQuery,
  useDeleteBookMutation,
} = BooksApiSlice;
