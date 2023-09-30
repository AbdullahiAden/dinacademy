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
        {singleVideoData && (
          <div className="player-wrapper">
            <div className="player-sec">
              <ReactPlayer
                className="video"
                url={singleVideoData.videoUrl}
                controls={true}
                width="100%"
                height="100%"
              />
            </div>
            <div>
              <h1 className="video-desc">{singleVideoData.title}</h1>
            </div>
          </div>
        )}

        <div className="side-video-sec">
          {singleBookData?.bookVids.map((videos) => {
            return (
              <Link
                to={`/watch/${videos._id}`}
                key={videos._id}
                className="link"
              >
                <div className="reco-vids-wrapper">
                  <div className="reco-img">
                    <img src={videos.imgUrl} alt="" className="reco-vid-img " />
                  </div>
                  <div className="reco-info">
                    <p className="reco-title">{videos.title}</p>
                    <p className="reco-desc">{videos.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Watch;
