import React from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";

const Container = styled.div`
  color: white;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 3;
  border: 1px solid red;
  margin: 15px 15px;
  padding: 65px 45px;
`;
const IntroSec = styled.div`
  flex: 3;
  border: 1px solid red;
  align-items: center;

  font-weight: bolder;
  font-size: 5rem;
`;
const SubIntroSec = styled.div`
  font-weight: lighter;
  font-size: 1rem;
  padding: 25px 0 0 0;
`;
const Button = styled.button`
  cursor: pointer;
  border: 1px solid blue;
  color: #09172d;
  background-color: #00b2fe;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 17px 30px;
`;
const ImageSec = styled.div`
  display: flex;
  flex: 3;
  border: 1px solid red;
  align-items: center;
`;
const HomePage = () => {
  return (
    <div>
      <Navbar />
      Home page
    </div>
  );
};

export default HomePage;
