import React from "react";
import "./Paper.css";

const Paper = ({ title, authors, submission, year, link }) => {
  console.log(submission);
  return (
    <div className="paper">
      <h3>{title}</h3>
      <p>
        <strong>Authors:</strong> {authors}
      </p>
      <p>
        <strong>Submitted to:</strong> {submission}{" "}
        {/* <span className="year">({year})</span> */}
      </p>
      {link && (
        <p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Paper
          </a>
        </p>
      )}
    </div>
  );
};

export default Paper;
