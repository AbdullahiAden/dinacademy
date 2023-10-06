import React, { useEffect, useState } from "react";
import "./bookDetailsPage.scss";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import Upload from "../../components/Upload/Upload.jsx";

import { useGetBookQuery } from "../../slices/booksApiSlice";
import { setSingleBookData } from "../../slices/bookSlice";

const BookDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [openUpload, setOpenUpload] = useState(false);

  //to fetch data using rtk query
  const { data, bookFetchLoading } = useGetBookQuery(params.id);
  // select data from state
  const { singleBookData, stateLoading } = useSelector((state) => state.books);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data) {
      //save rtk query fetch to state
      dispatch(setSingleBookData({ ...data }));
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <Navbar />

      {bookFetchLoading && <Loader />}
      {singleBookData?.book?._id !== params.id ? (
        <Loader />
      ) : (
        <>
          {singleBookData && (
            <div key={singleBookData.book._id} className="book-info">
              <div className="img-sec">
                <img src={singleBookData.book.imgUrl} alt="" />
              </div>
              {stateLoading === true && <Loader />}
              <div className="info-sec">
                <p> {singleBookData.book.title}</p>
                <p> {singleBookData.book.description}</p>
              </div>
            </div>
          )}
          <div className="upload">
            <div>All videos</div>
            {userInfo?.isAdmin === true && (
              <button onClick={() => setOpenUpload(true)}>
                upload video to book
              </button>
            )}
            {openUpload && <Upload setOpenUpload={setOpenUpload} />}
          </div>
          <div className="vid-card-wrapper">
            {singleBookData?.bookVids?.map((videos) => {
              return (
                <Link
                  to={`/watch/${videos._id}`}
                  key={videos._id}
                  className="link"
                >
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
