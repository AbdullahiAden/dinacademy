import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Player from "../../components/Player/Player";
import "./watch.scss";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

import { useGetVideoQuery } from "../../slices/videosApiSlice";
import axios from "axios";
import { setClickedVideoData } from "../../slices/videoSlice";

const Watch = () => {
  const params = useParams();
  const dispatch = useDispatch();
  // console.log(params.id);

  const { singleVideoData } = useSelector((state) => state.videos);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/find/${params.id}`);
      dispatch(setClickedVideoData({ ...res.data }));
      // console.log(res.data);
    };
    fetchVideos();

    if (singleVideoData) {
      console.log(singleVideoData);
    }
  }, []);

  return (
    <div className="player-container">
      <Navbar />
      {/* <Player /> */}
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

          <div className="recommended-vids">
            <img
              src="https://images.unsplash.com/photo-1682685794761-c8e7b2347702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
              alt=""
              className="reco-vid-img"
            />
            <div>
              <p className="reco-vid-titel"> 1 reco vid </p>
              <p className="reco-vid-titel"> 30 min </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
