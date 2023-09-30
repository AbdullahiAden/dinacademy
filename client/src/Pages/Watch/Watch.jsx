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
            <div className="video-info">
              <h1>{singleVideoData.title}</h1>
              <p>{singleVideoData.description}</p>
            </div>
          </div>
        )}

        <div className="side-video-sec">
          {singleBookData?.bookVids.map((video) => {
            return (
              <Link to={`/watch/${video._id}`} key={video._id} className="link">
                {params.id === video._id}
                <div
                  className={
                    params.id === video._id
                      ? "reco-vids-wrapper active-vid"
                      : "reco-vids-wrapper"
                  }
                >
                  <div className="reco-img">
                    <img src={video.imgUrl} alt="" className="reco-vid-img " />
                  </div>
                  <div className="reco-info">
                    <p className="reco-title">{video.title}</p>
                    <p className="reco-desc">{video.description}</p>
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
