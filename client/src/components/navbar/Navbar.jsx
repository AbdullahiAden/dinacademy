import React from "react";
import "./navbar.scss";
import styled from "styled-components";
import logo from "../../img/logo.png";

import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  border: 1px solid white;
  padding: 0 30px;
`;
const Logo = styled.div`
  flex: 1;
`;
const Img = styled.img`
  height: 43px;
  padding: 5px 50px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex: 5;
  justify-content: flex-end;
  gap: 25px;
  margin: 10px 0;
`;
const NavLinks = styled.div`
  padding: 5px 15px;
  cursor: pointer;
`;
const Button = styled.button`
  cursor: pointer;
  border: 1px solid blue;
  color: white;
  background-color: transparent;
  border-radius: 11px;
  font-size: 1.2rem;
  padding: 1px 30px;
`;

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        DEEN
      </Link>
      <ul>
        <li>
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/signup" className="nav-links">
            Signup
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-links">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
