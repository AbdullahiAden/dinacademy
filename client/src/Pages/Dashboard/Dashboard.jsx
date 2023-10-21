import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  return (
    <div>
      <Navbar />
      <div className="top-sec">
        <h1>All of our books</h1>

        {userInfo.isAdmin === true && (
          <div className="add-book">
            <button>add book </button>
          </div>
        )}
      </div>

      <form action=""></form>

      <Card />
    </div>
  );
};

export default Dashboard;
