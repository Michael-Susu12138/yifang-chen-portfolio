import React from "react";
import "./Workshop.css";

const Workshop = ({ title, authors, workshop, year, link, image }) => {
  // Highlight "Yifang Chen" in the authors list
  const formattedAuthors = authors.replace(
    /(Yifang Chen)/gi,
    '<span class="author-highlight">$1</span>'
  );

  return (
    <div className={`workshop ${image ? "with-image" : ""}`}>
      {image && (
        <div className="workshop-image">
          <img src={image} alt={`Thumbnail for ${title}`} />
        </div>
      )}
      <div className="workshop-content">
        <h3>{title}</h3>
        <p>
          <strong>Authors:</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: formattedAuthors }} />
        </p>
        <p>
          <strong>Workshop:</strong> {workshop}
          {year && <span className="year"> ({year})</span>}
        </p>
        {link && (
          <p>
            <a href={link} target="_blank" rel="noopener noreferrer">
              View Workshop
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Workshop;
