import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./Publications.css";

const Publications = () => {
  // Publications (Conference and Workshop papers) - Ranked chronologically
  const publications = [
    {
      title:
        "Finite Memory Collapse: Why Constant Floating-point Precision Mamba Fails on Long-Range Task?",
      authors:
        "Yifang Chen, Zihan Wang, Haochen Zhang, Vladimir Braverman, Manling Li, Yiping Lu, Zhaoran Wang",
      venue: "What Can('t) Transformers Do?",
      conferenceAbbr: "NeurIPS WCTD Workshop",
      year: 2025,
      link: "https://transformerstheory.github.io/",
      equalContribution: false,
    },
    {
      title:
        "Fundamental Limits of Visual Autoregressive Transformers: Universal Approximation Abilities",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song",
      venue: "Forty-Second International Conference on Machine Learning",
      conferenceAbbr: "ICML",
      year: 2025,
      link: "https://openreview.net/pdf?id=magOSIm8UT",
      equalContribution: true,
    },
    {
      title:
        "The Computational Limits of State-Space Models and Mamba via the Lens of Circuit Complexity",
      authors: "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song",
      venue: "Second Conference on Parsimony and Learning",
      conferenceAbbr: "CPAL",
      oral: true,
      oralNote: "Top 12",
      year: 2025,
      link: "https://openreview.net/forum?id=bImlLT3r62",
      equalContribution: true,
    },
    {
      title:
        "Fast Gradient Computation for RoPE Attention in Almost Linear Time",
      authors:
        "Yifang Chen, Jiayan Huo, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song",
      venue: "ICLR SCOPE Workshop",
      conferenceAbbr: "ICLR Scope Workshop",
      year: 2025,
      link: "https://arxiv.org/abs/2412.17316",
      equalContribution: true,
    },
  ];

  const manuscripts = [
    {
      title:
        "Time and Memory Trade-off of KV-Cache Compression in Tensor Transformer Decoding",
      authors:
        "Yifang Chen, Xiaoyu Li, Yingyu Liang, Zhenmei Shi, Zhao Song, Yu Tian",
      venue: "arXiv Preprint",
      year: 2025,
      link: "https://arxiv.org/abs/2503.11108",
      equalContribution: true,
    },
  ];

  const highlightAuthors = (authors, isEqualContribution) => {
    if (isEqualContribution) {
      // For equal contribution papers, add * after all author names
      const authorList = authors.split(", ");
      return (
        <>
          {authorList.map((author, idx) => {
            const isYifang = author.trim() === "Yifang Chen";
            return (
              <span key={idx}>
                <span className={isYifang ? "highlight-name" : ""}>
                  {author.trim()}*
                </span>
                {idx < authorList.length - 1 ? ", " : ""}
              </span>
            );
          })}
        </>
      );
    } else {
      // For non-equal contribution papers, just highlight Yifang Chen
      const parts = authors.split("Yifang Chen");
      return (
        <>
          {parts[0]}
          <span className="highlight-name">Yifang Chen</span>
          {parts[1]}
        </>
      );
    }
  };

  const renderPublicationItem = (pub, index, isManuscript = false) => (
    <div key={index} className="publication-item">
      <div className="publication-content">
        <div className="publication-title">
          <strong>
            {pub.link ? (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="publication-link"
              >
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </strong>
        </div>
        <div className="publication-authors">
          {highlightAuthors(pub.authors, pub.equalContribution)}
        </div>
        {!isManuscript && pub.conferenceAbbr && (
          <div className="publication-venue">
            <span
              className={
                pub.conferenceAbbr.toLowerCase().includes("workshop")
                  ? "workshop-abbr"
                  : "conference-abbr"
              }
            >
              {pub.conferenceAbbr} {pub.year}
            </span>
            {pub.oral && (
              <span className="oral-badge">
                {" "}
                | <span className="oral-highlight">Oral</span>
                {pub.oralNote && ` (${pub.oralNote})`}
              </span>
            )}
            {" - "}
            {pub.venue}
          </div>
        )}
        {isManuscript && (
          <div className="publication-venue">
            <span className="manuscript-venue">{pub.venue}, {pub.year}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="publications-page">
      <Navigation />
      <div className="publications-container">
        <header className="publications-header">
          <h1>Research</h1>
          <p className="alpha-beta-note">
            * (α-β) indicates alphabetical ordering
          </p>
        </header>

        <section className="publications-section">
          <h2 className="section-title">Publications</h2>
          <div className="publications-list">
            {publications.map((pub, index) =>
              renderPublicationItem(pub, index, false)
            )}
          </div>
        </section>

        <section className="publications-section">
          <h2 className="section-title">Manuscripts</h2>
          <div className="publications-list">
            {manuscripts.map((pub, index) =>
              renderPublicationItem(pub, index, true)
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Publications;
