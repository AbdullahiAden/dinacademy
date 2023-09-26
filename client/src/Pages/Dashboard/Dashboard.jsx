import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";

const Dashboard = () => {
  useEffect(() => {
    // fetch videos
  }, []);
  return (
    <div>
      <Navbar />
      Dashboard Books Page
      <Card />
    </div>
  );
};

export default Dashboard;
