// import React from 'react'
// import { Link } from "react-router-dom";
import { Navbar, CTA } from "../../Components";
import { Footer, WhatCOHUB, Header, Guide } from "../../Containers";
// import { CTA, Navbar } from "./Components";
import "./homePage.css";

const HomePage = () => {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Navbar />
        <Header />
      </div>
      <WhatCOHUB />
      <Guide />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;
