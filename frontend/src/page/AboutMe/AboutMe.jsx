import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import ParticlesComponent from "../../components/ParticlesComponent/ParticlesComponent";

const AboutMe = () => {
  return (
    <div
      className="p-0 m-0 border-0"
      style={{ height: "100vh", width: "100vw" }}
    >
      <ParticlesComponent />
      <Navigation />
    </div>
  );
};

export default AboutMe;
