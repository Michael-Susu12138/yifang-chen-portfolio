// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PaperList = () => {
  const papers = [
    {
      title:
        "Limits of KV Cache Compression for Tensor Attention based Autoregressive Transformers",
      authors:
        "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song, Yu Tian",
      submission: "arXiv",
      year: 2025,
      link: "https://arxiv.org/abs/2503.11108",
      image: "/assets/paper-thumbs/kv_cache.jpg", // Optional: Add path to thumbnail image
    },
    {
      title:
        "Fast Gradient Computation for RoPE Attention in Almost Linear Time",
      authors:
        "Yifang Chen, Jiayan Huo, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission: "ICLR SCOPE Workshop 2025",
      year: 2025,
      link: "https://arxiv.org/abs/2412.17316",
      image: "/assets/paper-thumbs/ml_theory.png", // Optional: Add path to thumbnail image
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
          image={paper.image} // Pass the optional image prop
        />
      ))}
    </div>
  );
};

export default PaperList;
