// import React from "react";
import "./guide.css";
import buy from "../../assets/buy-sell 1.png";
import mentor from "../../assets/mentor 1.png";
import startProject from "../../assets/start-a-project 1.png";
import { GuideFeature } from "../../Components";
import { useNavigate } from "react-router-dom";

const Guide = () => {
  const navigate = useNavigate();
  const registerOnClick = () => {
    navigate("/register");
  };
  return (
    <div className="guide_container">
      <div className="guide_container_first">
        <div className="first_image">
          <img src={startProject} alt="start a project" />
        </div>
        <div className="first_feature">
          <GuideFeature
            title="How to Get Started with your project?"
            text="Develop and articulate your concept, then identify the resources and steps necessary to bring it to life."
          />
          <div className="first_button">
            <button onClick={registerOnClick}>Register</button>
          </div>
        </div>
      </div>
      <div className="guide_container_second">
        <div className="second_image">
          <img src={mentor} alt="mentor" />
        </div>
        <div className="second_feature">
          <GuideFeature
            title="Mentor students at your comfort"
            text="Develop and articulate your concept, then identify the resources and steps necessary to bring it to life."
          />
          <div className="second_button">
            <button>Register as Mentor</button>
          </div>
        </div>
      </div>
      <div className="guide_container_third">
        <div className="third_image">
          <img src={buy} alt="buy" />
        </div>
        <div className="third_feature">
          <GuideFeature
            title="Buy / rent / sell at your convenience"
            text="Develop and articulate your concept, then identify the resources and steps necessary to bring it to life."
          />
          <div className="third_button">
            <button onClick={registerOnClick}>Buy/Sell</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Guide;
