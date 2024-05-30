// import React from "react";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const registerOnClick = () => {
    navigate("/register");
  };
  return (
    <div className="cohub__header section__padding" id="home">
      <div className="cohub__header-content">
        <h1 className="gradient__text">Doubtful about your Project Idea?</h1>
        <p>
          Be it getting a Mentor or a Resource or any other kind of help.
          Don&apos;t worry, We have you covered!
        </p>

        <div className="cohub__header-content__input">
          <button type="button" onClick={registerOnClick}>
            Get Started
          </button>
        </div>

        <div className="cohub__header-content__people">
          <img src={people} />
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>

      <div className="cohub__header-image">
        <img src={ai} />
      </div>
    </div>
  );
};

export default Header;
