import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Upload from "../../components/Upload/Upload.jsx";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openUpload, setOpenUpload] = useState(false);

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
      </div>
      <div className="upload">
        <div>All books</div>
        {userInfo?.isAdmin === true && (
          <button onClick={() => setOpenUpload(true)}>add book</button>
        )}
        {openUpload && <Upload setOpenUpload={setOpenUpload} />}
      </div>

      <form action=""></form>

      <Card />
    </div>
  );
};

export default Dashboard;
