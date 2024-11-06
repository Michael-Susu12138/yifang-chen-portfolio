// ProjectList.js

import React from "react";
import Project from "../Project/Project"; // Import the Project component

const ProjectList = () => {
  const projects = [
    {
      title: "National Village",
      image: "https://example.com/image.jpg", // Replace with actual image URL
      githubLink: "https://github.com/Michael-Susu12138/national-village",
      siteLink: "https://example.com", // Replace with actual deployed site URL
      stack: ["React", "CSS", "JavaScript"],
    },
    {
      title: "My Awesome Project",
      image: "https://example.com/awesome.jpg",
      githubLink: "https://github.com/user/awesome-project",
      siteLink: "https://awesomeproject.com",
      stack: ["Node.js", "Express", "MongoDB"],
    },
    // Add more projects here
  ];

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <Project
          key={index}
          title={project.title}
          image={project.image}
          githubLink={project.githubLink}
          siteLink={project.siteLink}
          stack={project.stack}
        />
      ))}
    </div>
  );
};

export default ProjectList;
