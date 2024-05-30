// import React from "react";
import "./cta.css";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  const registerOnClick = () => {
    navigate("/register");
  };
  return (
    <div className="cohub__cta">
      <div className="cohub__cta-content">
        <p>Got a project idea but don&apos;t know where to start from?</p>
        <h3>Register today & start exploring the endless possibilities.</h3>
      </div>
      <div className="cohub__cta-btn">
        <button type="button" onClick={registerOnClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CTA;
