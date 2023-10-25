import asyncHandler from "express-async-handler";
import Book from "../models/BookModels.js";
import Videos from "../models/VideoModels.js";

const addBook = asyncHandler(async (req, res) => {
  //   const newVideo = new Video({ playlistId: req.user.id, ...req.body });
  const newBook = new Book({ ...req.body });
  // if video exists
  const { title } = req.body;
  const bookExists = await Book.findOne({ title });
  if (bookExists) {
    res.status(400);
    throw new Error("book already exists");
  }

  await newBook.save();
  //if video is created
  if (newBook) {
    res.status(201).json(newBook);
  } else {
    res.status(401);
    throw new Error("book not created");
  }
});

const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.find();

  if (allBooks) {
    res.status(200).json(allBooks);
  } else {
    res.status(401);
    throw new Error("cant get all books ");
  }
});

const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  const bookVids = await Videos.find({ bookId: book._id });

  if (book) {
    if (bookVids) {
      res.status(200);
      res.json({ book: book, bookVids: bookVids });
    }
  } else {
    res.status(401);
    throw new Error("book not found");
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new Error("book not found");
  }

  if (req.user.isAdmin === true) {
    if (book) {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedBook);
    }
  } else {
    res.status(404);
    throw new Error("only admin can book update ");
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  // only admin can delete books

  if (req.user.isAdmin === true) {
    const delBokVids = await Videos.deleteMany({
      bookId: req.params.id,
    });
    const delBook = await Book.findByIdAndDelete(req.params.id);

    res.status(200);
    res.json("book deleted with vids");
  } else {
    res.status(403);
    throw new Error("only admin can delete a book");
  }
});

export { addBook, getAllBooks, getBook, updateBook, deleteBook };
