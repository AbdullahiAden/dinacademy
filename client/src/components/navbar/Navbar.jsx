import { useState } from "react";
import "./navbar.scss";
import styled from "styled-components";
import logo from "../../img/logo.png";

import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    </nav>
  );
};

export default Navbar;
