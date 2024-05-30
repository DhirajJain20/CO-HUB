import React from "react";
import "./guideFeature.css";
const GuideFeature = ({ title, text }) => {
  return (
    <div className="guideFeature_container">
      <div className="guideFeature_container-title">
        <h1>{title}</h1>
      </div>
      <div className="guideFeature_container-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default GuideFeature;
