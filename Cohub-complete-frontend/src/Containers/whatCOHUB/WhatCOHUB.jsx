// import React from "react";
import "./whatCOHUB.css";
import { Feature } from "../../Components";

const WhatCOHUB = () => {
  return (
    <div className="cohub__whatcohub section__margin" id="wcohub">
      <div className="cohub__whatcohub-feature">
        <Feature
          title="What is Co-HUB?"
          text="A one-stop platform for all your project ideas"
        />
      </div>
      <div className="cohub__whatcohub-heading">
        <h1 className="gradient__text">
          The possibilities are beyond your imagination
        </h1>
      </div>
      <div className="cohub__whatcohub-container">
        <Feature
          title="Chatbots"
          text="We so opinion friends me message as delight. Whole front do of plate heard oh ought."
        />
        <Feature
          title="Knowledgebase"
          text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
        />
        <Feature
          title="Education"
          text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b"
        />
      </div>
    </div>
  );
};
export default WhatCOHUB;
