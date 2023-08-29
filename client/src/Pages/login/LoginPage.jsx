import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import img from "../../img/img.png";
import "../Signup/signupPage.scss";
import axios from "axios";

const LoginPage = () => {
  const [signUser, setSignUser] = useState([]);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/users/auth", {
        email,
        password,
      });
      console.log(res.data);

      setEmail(res.data.email);
      setPassword(res.data.password);
      if (res.data) {
        localStorage.setItem("jwt", res.data);
        console.log("LOGGED IN");

        navigate("/");
      } else {
        console.log("no data ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <Navbar />
      <div className="wrapper">
        <div className="form-sec">
          <div className="top-sec">
            <h2>LOGIN </h2>
            <p>Sign up if you are new</p>
          </div>

          <form className="form" onSubmit={handleOnSubmit}>
            <div className="form-input">
              <label className="label">Email:</label>
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                // onChange={(e) =>
                //   setSignUser({ ...signUser, email: e.target.value })
                // }
                value={email}
              />
            </div>
            <div className="form-input">
              <label className="label">password:</label>
              <input
                type="text"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // onChange={(e) =>
                //   setSignUser({ ...signUser, password: e.target.value })
                // }
                value={password}
              />
            </div>
            <button>LOGIN</button>
          </form>
        </div>
        <div className="right-sec">
          {/* <img src={signUpImage} alt="" /> */}
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
