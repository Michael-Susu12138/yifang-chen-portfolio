import React from "react";
import Workshop from "../Workshop/Workshop";

const WorkshopList = () => {
  const workshops = [
    {
      title:
        "Fast Gradient Computation for RoPE Attention in Almost Linear Time",
      authors:
        "Yifang Chen, Jiayan Huo, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song.",
      workshop: "ICLR SCOPE Workshop 2025",
      year: 2025,
      link: "https://arxiv.org/abs/2412.17316",
      image: "/assets/paper-thumbs/ml_theory.png", // Optional: Add path to thumbnail image
    },
    // Add more workshops here as needed
  ];

  return (
    <div className="workshop-list">
      {workshops.map((workshop, index) => (
        <Workshop
          key={index}
          title={workshop.title}
          authors={workshop.authors}
          workshop={workshop.workshop}
          year={workshop.year}
          link={workshop.link}
          image={workshop.image}
        />
      ))}
    </div>
  );
};

export default WorkshopList;
