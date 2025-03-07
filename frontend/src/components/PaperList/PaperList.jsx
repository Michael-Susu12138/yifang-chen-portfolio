// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PaperList = () => {
  const papers = [
    {
      title:
        "Scaling Law Phenomena Across Regression Paradigms: Multiple and Kernel Approaches",
      authors:
        "Yifang Chen, Xuyang Guo, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission: "arXiv",
      year: 2025,
      link: "https://arxiv.org/abs/2503.01314",
    },
    {
      title: "Universal Approximation of Visual Autoregressive Transformers",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission: "arXiv",
      year: 2025,
      link: "https://arxiv.org/abs/2502.06167",
    },
    {
      title:
        "Fast Gradient Computation for RoPE Attention in Almost Linear Time",
      authors:
        "Yifang Chen, Jiayan Huo, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission: "ICLR 2025, SCOPE Workshop",
      year: 2025,
      link: "https://arxiv.org/abs/2412.17316",
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
