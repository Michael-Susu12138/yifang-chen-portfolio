import React, { useState } from "react";
import "./News.css";

const News = () => {
  const [expanded, setExpanded] = useState(false);

  // Sample news data - you can replace this with your actual achievements
  const newsItems = [
    {
      id: 1,
      date: "May 2025",
      title: "Universal Approximation of VAR accepted at ICML 2025",
      description:
        "My paper on Universal Approximation of VAR was accepted at ICML 2025, here is the publication link: https://arxiv.org/abs/2502.06167",
      tag: "Research",
      link: "https://arxiv.org/abs/2502.06167",
    },
    {
      id: 2,
      date: "May 2025",
      title: "Attend the CPAL 2025 conference at Stanford University",
      description:
        "I attended the CPAL 2025 conference at Stanford University, here is the conference link: https://cpal.cc/",
      tag: "Research",
      link: "https://cpal.cc/",
    },
    {
      id: 3,
      date: "January 2025",
      title: "Mamba paper accepted at CPAL Oral 2025",
      description:
        "My paper on Mamba was accepted at the CPAL Oral 2025, here is the publication link: https://openreview.net/forum?id=bImlLT3r62",
      tag: "Research",
      link: "https://openreview.net/forum?id=bImlLT3r62",
    },
    {
      id: 4,
      date: "September 2024",
      title: "Started M.S. at University of Chicago",
      description:
        "Began graduate studies in Applied Data Science at the University of Chicago.",
      tag: "Education",
    },
    {
      id: 5,
      date: "May 2024",
      title: "Bachelor's Degree in Computer Science from New York University",
      description:
        "I graduated from New York University with a B.S. in Computer Science.",
      tag: "Education",
    },
  ];

  // Function to render description with clickable links
  const renderDescription = (description, link) => {
    if (link) {
      // Extract the link text from the description
      const linkText = description.substring(
        description.indexOf("http"),
        description.length
      );
      const textBeforeLink = description.substring(
        0,
        description.indexOf("http")
      );

      return (
        <>
          {textBeforeLink}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-link"
          >
            {linkText}
          </a>
        </>
      );
    }
    return description;
  };

  // Display all items if expanded, otherwise only show the first 3
  const displayedItems = expanded ? newsItems : newsItems.slice(0, 3);

  return (
    <div className="news-container">
      <div className="news-timeline">
        {displayedItems.map((item, index) => (
          <div
            className="news-item"
            key={item.id}
            style={{ "--item-index": index }}
          >
            <div className="news-meta">
              <span className="news-date">{item.date}</span>
              <span className={`news-tag ${item.tag.toLowerCase()}`}>
                {item.tag}
              </span>
            </div>
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{renderDescription(item.description, item.link)}</p>
            </div>
          </div>
        ))}
      </div>

      {newsItems.length > 3 && (
        <div className="news-toggle-container">
          <button
            className="news-toggle-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
