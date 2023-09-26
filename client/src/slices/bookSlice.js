import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const initialState = {
  booksData: null,

  singleBookData: null,
};

const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooksData: (state, action) => {
      state.booksData = action.payload;
    },
    setSingleBookData: (state, action) => {
      state.singleBookData = action.payload;
    },
  },
});

export const { setBooksData, setSingleBookData } = BookSlice.actions;
export default BookSlice.reducer;
