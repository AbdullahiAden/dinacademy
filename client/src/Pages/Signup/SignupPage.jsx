import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import img from "../../img/img.png";
import "../Signup/signupPage.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

import Loader from "../../components/Loader";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      //call register in our mutation in our usersApiSlice, it makes post req to backend
      //returns a promise, so we unwrap that promise
      const res = await register({ email, password }).unwrap();
      // set the user credentials to localstorage, login user
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast(err?.data?.message || err.error, { autoClose: 500 });
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="form-wrapper">
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
                id="email"
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
            <button type="submit" disabled={isLoading}>
              SIGN UP
            </button>

            {isLoading && <Loader />}
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
