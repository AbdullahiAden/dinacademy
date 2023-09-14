import React from "react";
import "./videocard.scss";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const VideoCard = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="container">
      <Carousel responsive={responsive} className="vid-wrapper">
        <div className="video-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1677231559663-b9f6a7c33c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt=""
          />
          <p className="vid-card-desc"> intro to seeking z</p>
        </div>
        <div className="video-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1677231559663-b9f6a7c33c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt=""
          />
          <p className="vid-card-desc"> intro to seeking z</p>
        </div>
        <div className="video-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1677231559663-b9f6a7c33c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt=""
          />
          <p className="vid-card-desc"> intro to seeking z</p>
        </div>

        <div>item</div>
      </Carousel>
    </div>
  );
};

export default VideoCard;
