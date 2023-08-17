import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import pic from "../../img/pic.png";

import "./homePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <Navbar />
      <div className="intro-wrapper">
        <div className="intro-sec">
          <div className="left-sec">
            <h1>EMBARK ON YOUR JOURNEY OF SEEKING KNOWLEDGE WITH US</h1>
            <p>MASTER THE QURAN AND THE ARABIC LANGUAGE </p>
            <button>JOIN NOW</button>
          </div>
        </div>
      </div>

      <div>
        <h2>Browse Courses</h2>
      </div>
    </div>
  );
};

export default HomePage;
