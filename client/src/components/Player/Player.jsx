import React from "react";
import ReactPlayer from "react-player";
import "./player.scss";

const Player = () => {
  return (
    <div className="player-wrapper">
      <div className="player-sec">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          controls={true}
          width="100%"
          height="500px"
        />
      </div>
      <div className="side-vids">
        <h2>videos</h2>
      </div>
    </div>
  );
};

export default Player;
