import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./watch.scss";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import axios from "axios";

import { useGetVideoQuery } from "../../slices/videosApiSlice";
import { setClickedVideoData } from "../../slices/videoSlice";

const Watch = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetVideoQuery(params.id);
  const { singleVideoData } = useSelector((state) => state.videos);
  const { singleBookData } = useSelector((state) => state.books);

  useEffect(() => {
    if (data) {
      dispatch(setClickedVideoData({ ...data }));
    }

    // console.log(singleBookData?.bookVids);
  }, [data]);

  return (
    <div>
      <Navbar />
      {isLoading && <Loader />}
      <div className="player-container">
        <div className="player-wrapper">
          {singleVideoData && (
            <div className="player-sec">
              <ReactPlayer
                className="video"
                url={singleVideoData.videoUrl}
                controls={true}
                width="100%"
                height="100%"
              />
              <div key={singleVideoData._id} className="video-desc">
                {singleVideoData.titel}
              </div>
            </div>
          )}
          <div className="side-video-sec">
            <p className="total-vid-numb">total videos</p>

            <div>
              {singleBookData?.bookVids.map((videos) => {
                return (
                  <div className="reco-vids-wrapper">
                    <div className="reco-img">
                      <Link
                        to={`/watch/${videos._id}`}
                        key={videos._id}
                        className="link"
                      >
                        <img
                          src={videos.imgUrl}
                          alt=""
                          className="reco-vid-img "
                        />
                      </Link>
                    </div>
                    <div className="reco-info">
                      <p className="reco-title">{videos.title}</p>
                      <p className="reco-desc">{videos.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {singleVideoData.title}
      </div>
    </div>
  );
};

export default Watch;
