// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PaperList = () => {
  const papers = [
    {
      title: "A Nearly Optimal Size Coreset Algorithm with Nearly Linear Time",
      authors: "Bo Chen, Yifang Chen, Yichuan Deng, Zhao Song, Yitan Wang ",
      submission: "AISTATS2025",
      //   year: 2024,
      link: "https://arxiv.org/pdf/2210.08361",
    },
    {
      title: "In-Context Learning for Nonlinear Regression",
      authors: "Yifang Chen, Yeqi Gao, Jiangxuan Long, Zhao Song, Shenghao Xie",
      submission: "AISTATS2025",
      //   year: 2024,
      link: "https://arxiv.org/pdf/2307.02419",
    },
    {
      title:
        "A Mathematical Abstraction for Balancing the Trade-off Between Creativity and Reality in Large Language Models",
      authors:
        "Yifang Chen, Jiangxuan Long, Ritwik Sinha, Zhao Song, Tianyi Zhou",
      submission: "AISTATS2025",
      //   year: 2024,
      link: "https://arxiv.org/pdf/2306.02295",
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
