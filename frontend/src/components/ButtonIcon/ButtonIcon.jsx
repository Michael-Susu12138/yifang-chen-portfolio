import React from "react";
import { FaGithub } from "react-icons/fa";
import "./ButtonIcon.css"; //

const ButtonIcon = () => {
  return (
    <div className="button-icon">
      <div className="icon">
        <FaGithub style={{ width: "25px", height: "25px", fill: "#222229" }} />
      </div>
      <div className="cube">
        <span className="side front">hover me</span>
        <span className="side top">check it on github</span>
      </div>
    </div>
  );
};

export default ButtonIcon;
