import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const initialState = {
  booksData: localStorage.getItem("booksData")
    ? JSON.parse(localStorage.getItem("booksData"))
    : null,

  singleBookData: localStorage.getItem("singleBookData")
    ? JSON.parse(localStorage.getItem("singleBookData"))
    : null,
  loading: true,
};

const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooksData: (state, action) => {
      state.booksData = action.payload;
      localStorage.setItem("booksData", JSON.stringify(action.payload));
      state.loading = false;
    },
    setSingleBookData: (state, action) => {
      state.singleBookData = action.payload;
      localStorage.setItem("singleBookData", JSON.stringify(action.payload));

      state.loading = false;
    },
  },
});

export const { setBooksData, setSingleBookData } = BookSlice.actions;
export default BookSlice.reducer;
