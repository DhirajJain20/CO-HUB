// import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="cohub__footer section__padding">
      <div className="cohub__footer-links">
        <div className="cohub__footer-links_logo">
          <h3 className="logo">Co-HUB</h3>
        </div>
        <div className="cohub__footer-links_div">
          <h4>Links</h4>
          <p>Overons</p>
          <p>Social Media</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>
        <div className="cohub__footer-links_div">
          <h4>Company</h4>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className="cohub__footer-links_div">
          <h4>Get in touch</h4>
          <p>Silicon University</p>
          <p>Infocity, Patia</p>
          <p>silicon@gmail.com</p>
        </div>
      </div>
      <div className="cohub__footer-copyright">
        <p>Copyright © CODERS 2024</p>
      </div>
    </div>
  );
};

export default Footer;
