// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PublicationList = () => {
  const papers = [
    {
      title:
        "The Computational Limits of State-Space Models and Mamba via the Lens of Circuit Complexity",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission: "Conference on Parsimony and Learning (CPAL 2025), Oral",
      year: 2025,
      link: "https://arxiv.org/abs/2502.06167",
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
          // year={paper.year}
          link={paper.link}
        />
      ))}
    </div>
  );
};

export default PublicationList;
