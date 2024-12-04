// Project.js

import React from "react";
import "./Project.css";

const Project = ({ title, image, githubLink, siteLink, stack }) => {
  return (
    <div className="project">
      <img src={image} alt={`${title} screenshot`} className="project-image" />
      <h3>{title}</h3>
      <p>
        <strong>Tech Stack:</strong> {stack.join(", ")}
      </p>
      <div className="project-links">
        {githubLink && (
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {siteLink && (
          <a href={siteLink} target="_blank" rel="noopener noreferrer">
            Live Site
          </a>
        )}
      </div>
    </div>
  );
};

export default Project;
