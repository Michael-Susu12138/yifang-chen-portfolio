// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PaperList = () => {
  const papers = [
    {
      title: "National Village",
      authors: "Yifang Chen",
      // submission: "AISTATS2025",
      //   year: 2024,
      link: "https://github.com/Michael-Susu12138/national-village",
    },
  ];

  return (
    <div className="paper-list">
      {papers.map((paper, index) => (
        <Paper
          key={index}
          title={paper.title}
          authors={paper.authors}
          submission={paper.submission}
          year={paper.year}
          link={paper.link}
        />
      ))}
    </div>
  );
};

export default PaperList;
