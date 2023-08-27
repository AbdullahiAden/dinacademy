import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import img from "../../img/img.png";
import "../Signup/signupPage.scss";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/api/users", {
        email,
        password,
      });
      console.log(res.data);
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
            <h2>SIGN UP </h2>
            <p>Login if you have account</p>
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
                value={password}
              />
            </div>
            <button>SIGN UP</button>
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

export default SignupPage;
