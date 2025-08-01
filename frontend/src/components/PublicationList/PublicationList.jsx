// PaperList.js

import React from "react";
import Paper from "../Paper/Paper"; // Import the Paper component

const PublicationList = () => {
  const papers = [
    {
      title:
        "Fundamental Limits of Visual Autoregressive Transformers: Universal Approximation Abilities",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission:
        "ICML 2025: Forty-Second International Conference on Machine Learning",
      year: 2025,
      link: "https://openreview.net/pdf?id=magOSIm8UT",
      image: "/assets/paper-thumbs/var_universality.png", // Optional: Add path to thumbnail image
    },
    {
      title:
        "The Computational Limits of State-Space Models and Mamba via the Lens of Circuit Complexity",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      submission:
        "CPAL 2025 (Oral): Second Conference on Parsimony and Learning",
      year: 2025,
      link: "https://openreview.net/forum?id=bImlLT3r62",
      image: "/assets/paper-thumbs/mamba_tc0.jpg", // Optional: Add path to thumbnail image
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
          image={paper.image} // Pass the optional image prop
        />
      ))}
    </div>
  );
};

export default PublicationList;
