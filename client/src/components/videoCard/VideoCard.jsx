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

import Loader from "../Loader";

const VideoCard = (props) => {
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

  const { videosData } = useSelector((state) => state.videos);

  const { data, isLoading, error } = useGetAllVideosQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
      //set data to our global state
      dispatch(setVideosData({ ...data }));
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
    <div className="container">
      <Carousel
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
      >
        {isLoading && <Loader />}
        {data &&
          data.map((video) => {
            return (
              <Link to={`/watch/${video._id}`} key={video._id}>
                <div
                  className="video-card"
                  onClick={() => handleOnClick(video._id)}
                >
                  <img src={video.thumbnail} alt="" />
                  {video.titel}
                </div>
              </Link>
            );
          })}
      </Carousel>
    </div>
  );
};

export default VideoCard;
