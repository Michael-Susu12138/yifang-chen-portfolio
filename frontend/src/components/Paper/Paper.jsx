import React from "react";
import "./Paper.css";

const Paper = ({ title, authors, submission, year, link }) => {
  console.log(submission);

  // Highlight "Oral" in the submission
  const formattedSubmission = submission.replace(
    /(Oral)/gi,
    '<span class="oral-highlight">$1</span>'
  );

  // Highlight "Yifang Chen" in the authors list
  const formattedAuthors = authors.replace(
    /(Yifang Chen)/gi,
    '<span class="author-highlight">$1</span>'
  );

  return (
    <div className="paper">
      <h3>{title}</h3>
      <p>
        <strong>Authors:</strong>{" "}
        <span dangerouslySetInnerHTML={{ __html: formattedAuthors }} />
      </p>
      <p>
        <strong>
          {submission.startsWith("arXiv") ? "Preprint:" : "Publication:"}
        </strong>{" "}
        <span dangerouslySetInnerHTML={{ __html: formattedSubmission }} />
        {submission.startsWith("arXiv") && (
          <span className="year">({year})</span>
        )}
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
