import React, { useEffect } from "react";
import "./card.scss";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetAllBooksQuery } from "../../slices/booksApiSlice";
import { useGetVideos } from "../../slices/apiSlice";
import { setBooksData } from "../../slices/bookSlice";

import Loader from "../Loader";

const Card = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3.9, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 3,
      slidesToSlide: 2.9, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 250 },
      items: 2,
      slidesToSlide: 1.9, // optional, default to 1.
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { booksData } = useSelector((state) => state.books);

  const { data, isLoading, error } = useGetAllBooksQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
      //set data to our global state
      dispatch(setBooksData({ ...data }));
    }
  }, [data]);

  const handleOnClick = (e) => {
    {
      // console.log(e);
    }
  };

  // const getVideos = async () => {
  //   try {
  //     const videosRes = await getAllVideos;
  //     console.log(videosRes);
  //   } catch (err) {
  //     console.log(err?.data?.message || err.error);
  //   }
  // };
  return (
    <div className="card-container">
      <div className="card-wrapper">
        {/* <Carousel
        className="vid-wrapper"
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-contaner"
        deviceType={props.deviceType}
        itemClass="carousel-item-padding-40-px"
      > */}

        {isLoading && <Loader />}
        {data &&
          data.map((book) => {
            return (
              <div key={book._id} className="card">
                <Link to={`/books/${book._id}`} className="link">
                  <img
                    src={book.imgUrl}
                    alt=""
                    onClick={() => handleOnClick(book._id)}
                  />
                  <p> {book.title}</p>
                </Link>
              </div>
            );
          })}

        {/* <div className="card">
          <img
            src="https://plus.unsplash.com/premium_photo-1671308539073-ebf8985a6a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60"
            alt=""
          />
          <p>Book title </p>
        </div>
        <div className="card">
          <img
            src="https://plus.unsplash.com/premium_photo-1671308539073-ebf8985a6a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60"
            alt=""
          />
          <p>Book title </p>
        </div>
        <div className="card">
          <img
            src="https://plus.unsplash.com/premium_photo-1671308539073-ebf8985a6a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60"
            alt=""
          />
          <p>Book title </p>
        </div> */}
        {/* </Carousel> */}
      </div>
    </div>
  );
};

export default Card;
