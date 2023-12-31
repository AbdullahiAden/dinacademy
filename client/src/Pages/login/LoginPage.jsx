import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import img from "../../img/img.png";
import "./loginPage.scss";

import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //to get the function to call to  fire off login mutation
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // if userinfo means we are logged in
    //todo:: navigate to dashboard
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      //call login in our mutation in our usersApiSlice, it makes post req to backend
      //returns a promise, so we unwrap that promise
      const res = await login({ email, password }).unwrap();
      console.log(res);

      // then call setCredentials which will set logged in user data to localstorage & to our state
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };
  return (
    <div className="container">
      <Navbar />
      <div className="form-wrapper">
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
              {isLoading && <Loader />}
              <button type="submit" disabled={isLoading}>
                LOGIN
              </button>
            </div>
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
