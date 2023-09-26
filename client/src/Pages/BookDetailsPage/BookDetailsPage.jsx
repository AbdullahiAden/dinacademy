import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllVideosQuery } from "../../slices/videosApiSlice";
import { setVideosData } from "../../slices/videoSlice";

import Loader from "../../components/Loader";
import { setSingleBookData } from "../../slices/bookSlice";
import axios from "axios";
import { useGetBookQuery } from "../../slices/booksApiSlice";

const BookDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { singleBookData } = useSelector((state) => state.books);
  const { videosData } = useSelector((state) => state.videos);

  //   const { BookVideos, isLoading, error } = useGetAllVideosQuery();
  const { bookQueryData } = useGetBookQuery(params.id);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`/api/books/find/${params.id}`);
      dispatch(setSingleBookData({ ...res.data }));
      // console.log(res.data);
    };
    fetchBook();
  }, []);

  return (
    <div>
      <Navbar />
      {!singleBookData && <Loader />}

      {singleBookData && (
        <div>
          <h1>{singleBookData.title}</h1>
          <p>Book description</p>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
