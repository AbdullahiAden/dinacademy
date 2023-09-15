import React, { useEffect } from "react";
import "./videocard.scss";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetAllVideosQuery } from "../../slices/videosApiSlice";
import { useGetVideos } from "../../slices/apiSlice";
import { setVideosData } from "../../slices/videoSlice";

const VideoCard = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 250 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { videosData } = useSelector((state) => state.videos);

  const { data, isLoading } = useGetAllVideosQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
      //set data to our global state
      dispatch(setVideosData({ ...data }));
    }
  }, [data]);

  // const getVideos = async () => {
  //   try {
  //     const videosRes = await getAllVideos;
  //     console.log(videosRes);
  //   } catch (err) {
  //     console.log(err?.data?.message || err.error);
  //   }
  // };
  return (
    <div className="container">
      <Carousel responsive={responsive} className="vid-wrapper">
        {/* <Link to="/watch"> */}
        <div className="video-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1677231559663-b9f6a7c33c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt=""
          />
          <p className="vid-card-desc"> intro to seeking z</p>
        </div>
        {/* </Link> */}
        <div className="video-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1677231559663-b9f6a7c33c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt=""
          />
          <p className="vid-card-desc"> intro to seeking z</p>
        </div>
      </Carousel>
    </div>
  );
};

export default VideoCard;
