import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const initialState = {
  booksData: null,

  singleBookData: null,
  loading: true,
};

const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooksData: (state, action) => {
      state.booksData = action.payload;
      state.loading = false;
    },
    setSingleBookData: (state, action) => {
      state.singleBookData = action.payload;
      state.loading = false;
    },
  },
});

export const { setBooksData, setSingleBookData } = BookSlice.actions;
export default BookSlice.reducer;
