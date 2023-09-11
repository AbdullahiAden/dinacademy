import { useState } from "react";
import "./navbar.scss";
import logo from "../../img/logo.png";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to call the logout mutation
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      // logoutApiCall make api call to destroy cookie
      const res = await logoutApiCall().unwrap();
      //dispatch logout to clear local storage
      dispatch(logout());
      toast(res.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {userInfo ? (
        <>
          <ul className={menuOpen ? "open" : ""}>
            <li>
              <NavLink to="/dashboard" className="nav-links">
                dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-links">{userInfo.email}</NavLink>
            </li>
            <li>
              <NavLink className="nav-links" onClick={logoutHandler}>
                logout
              </NavLink>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className={menuOpen ? "open" : ""}>
            <li>
              <NavLink to="/signup" className="nav-links">
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav-links">
                Login
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
