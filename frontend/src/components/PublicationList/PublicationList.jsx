// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PublicationList = () => {
  const papers = [
    {
      title: "Universal Approximation of Visual Autoregressive Transformers",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission:
        "ICML 2025: Forty-Second International Conference on Machine Learning",
      year: 2025,
      link: "https://arxiv.org/abs/2502.06167",
    },
    {
      title:
        "The Computational Limits of State-Space Models and Mamba via the Lens of Circuit Complexity",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission:
        "CPAL 2025 (Oral): Second Conference on Parsimony and Learning",
      year: 2025,
      link: "https://openreview.net/forum?id=bImlLT3r62",
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
