import React, { useEffect } from "react";
import "./bookDetailsPage.scss";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";

import { useGetBookQuery } from "../../slices/booksApiSlice";
import { setSingleBookData } from "../../slices/bookSlice";

const BookDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  //to fetch data using rtk query
  const { data, bookLoading } = useGetBookQuery(params.id);

  useEffect(() => {
    if (data) {
      //save rtk query fetch to state
      dispatch(setSingleBookData({ ...data }));
    }
  }, [data]);

  // select data from state
  const { singleBookData, loading } = useSelector((state) => state.books);

  return (
    <div>
      <Navbar />

      {/* {bookLoading && <Loader />} */}
      {singleBookData?.book?._id !== params.id ? (
        <Loader />
      ) : (
        <>
          {singleBookData && (
            <div key={singleBookData.book._id} className="book-info">
              <div className="img-sec">
                <img src={singleBookData.book.imgUrl} alt="" />
              </div>
              {loading === true && <Loader />}
              <div className="info-sec">
                <p> {singleBookData.book.title}</p>
                <p> {singleBookData.book.description}</p>
              </div>
            </div>
          )}

          <div className="vids-container">
            <div>All videos</div>
          </div>
          <div className="vid-card-wrapper">
            {singleBookData.bookVids.map((videos) => {
              return (
                <Link className="link">
                  <div className="vid-card">
                    <img src={videos.imgUrl} alt="" />
                    <p className="vid-title">{videos.title}</p>
                    <p className="vid-desc">{videos.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetailsPage;
