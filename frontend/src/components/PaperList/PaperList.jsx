// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PaperList = () => {
  const papers = [
    {
      title:
        "Fast Gradient Computation for RoPE Attention in Almost Linear Time",
      authors:
        "Yifang Chen, Jiayan Huo, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission: "Arxiv",
      year: 2024,
      link: "https://arxiv.org/abs/2412.17316",
    },
    {
      title:
        "The Computational Limits of State-Space Models and Mamba via the Lens of Circuit Complexity",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission: "Arxiv",
      year: 2024,
      link: "https://arxiv.org/abs/2412.06148",
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
