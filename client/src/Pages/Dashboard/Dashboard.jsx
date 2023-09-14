import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import VideoCard from "../../components/videoCard/VideoCard";

const Dashboard = () => {
  useEffect(() => {
    // fetch videos
  }, []);
  return (
    <div>
      <Navbar />
      Dashboard
      <VideoCard />
    </div>
  );
};

export default Dashboard;
