import React, { useEffect } from "react";
import "./card.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetAllBooksQuery } from "../../slices/booksApiSlice";

import { setBooksData } from "../../slices/bookSlice";

import Loader from "../Loader";

const Card = () => {
  const { data, isLoading, error } = useGetAllBooksQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      //set data to our global state
      dispatch(setBooksData({ ...data }));
    }
  }, [data]);

  return (
    <div className="card-container">
      <div className="card-wrapper">
        {isLoading && <Loader />}
        {data &&
          data.map((book) => {
            return (
              <div key={book._id} className="card">
                <Link to={`/books/${book._id}`} className="link">
                  <img src={book.imgUrl} alt="" />
                  <p> {book.title}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Card;
