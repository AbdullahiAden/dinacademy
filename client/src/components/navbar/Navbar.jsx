import { useState } from "react";
import "./navbar.scss";
import logo from "../../img/logo.png";

import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("jwt");

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
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

      {!token && (
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
      )}

      {token && (
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/dashboard" className="nav-links">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-links" onClick={logoutUser}>
              logout
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
