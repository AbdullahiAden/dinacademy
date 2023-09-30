import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import "./dashboard.scss";

const Dashboard = () => {
  useEffect(() => {
    // fetch videos
  }, []);
  return (
    <div>
      <Navbar />
      <div className="top-sec">
        <h1>All of our books</h1>
      </div>

      <Card />
    </div>
  );
};

export default Dashboard;
