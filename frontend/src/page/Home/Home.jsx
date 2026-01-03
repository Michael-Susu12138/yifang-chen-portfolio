import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ParticlesComponent from "../../components/ParticlesComponent/ParticlesComponent";
import MyCard from "../../components/Card/MyCard";
import ProfileImage from "/assets/selfie.jpg"; // Image of yourself
import ProjectList from "../../components/ProjectList/ProjectList";
import PublicationList from "../../components/PublicationList/PublicationList";
import News from "../../components/News/News";
import Navigation from "../../components/Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Home.css";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkIsMobile();

    // Add listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="home-page">
      <Navigation />

      <div
        className={`app-container ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <ParticlesComponent />

        {/* Mobile sidebar toggle button */}
        {isMobile && (
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
        )}

        {/* Overlay when sidebar is open on mobile */}
        {isMobile && sidebarOpen && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}

        <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
          <Sidebar />
        </div>

        <main className="main-content">
          <section className="about-section">
            <div className="about-content">
              <div className="about-text">
                <h2>Yifang Chen "陈奕方"</h2>
                <p>
                  I am <strong>Yifang Chen "陈奕方"</strong>, a researcher with
                  a strong focus on{" "}
                  <strong>
                    Machine Learning Theory, Expressiveness and Learnability of
                    Large Language Models (LLMs), and Efficient LLMs
                  </strong>
                  .
                </p>
                <div className="research-affiliation">
                  <p>
                    I am currently a Research Intern at{" "}
                    <a
                      href="https://www.mll.lab.northwestern.edu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="affiliation-link"
                    >
                      MLL Lab
                    </a>
                    , where I am fortunate to collaborate with{" "}
                    <a
                      href="https://limanling.github.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collab-link"
                    >
                      Prof. Manling Li
                    </a>
                    ,{" "}
                    <a
                      href="https://2prime.github.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collab-link"
                    >
                      Prof. Yiping Lu
                    </a>
                    , and{" "}
                    <a
                      href="https://zihanwang314.github.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collab-link"
                    >
                      Zihan Wang
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="about-image">
                <img src={ProfileImage} alt="Yifang 'Michael' Chen" />
              </div>
            </div>
            <div className="github-note">
              <p>
                Enjoying this site? If you find it helpful or inspiring,{" "}
                <a
                  href="https://github.com/Michael-Susu12138/yifang-chen-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  consider giving it a star on GitHub ⭐
                </a>
                . Feel free to{" "}
                <a
                  href="https://github.com/Michael-Susu12138/yifang-chen-portfolio/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  fork it
                </a>{" "}
                if you'd like to build your own version — and a little credit is
                always appreciated.
              </p>
            </div>
          </section>

          <section className="education-section">
            <h2>Education</h2>
            <ul>
              <li className="education-item">
                <img
                  src="/assets/uchicago_icon.png"
                  alt="University of Chicago"
                  className="school-icon"
                />
                <div className="education-details">
                  <strong className="degree">University of Chicago</strong>
                  <span className="school-name">
                    M.S. in Applied Data Science
                  </span>
                  <span className="date">2024 - 2025</span>
                </div>
              </li>
              <li className="education-item">
                <img
                  src="/assets/nyu_icon.png"
                  alt="New York University"
                  className="school-icon"
                />
                <div className="education-details">
                  <strong className="degree">New York University</strong>
                  <span className="school-name">B.S. in Computer Science</span>
                  <span className="date">2020 - 2024</span>
                </div>
              </li>
              <li className="education-item">
                <img
                  src="/assets/nbps_icon.jpg"
                  alt="North Broward Preparatory School"
                  className="school-icon"
                />
                <div className="education-details">
                  <strong className="degree">
                    North Broward Preparatory School
                  </strong>
                  <span className="school-name">High School</span>
                  <span className="date">2016 - 2020</span>
                </div>
              </li>
            </ul>
          </section>

          <section className="news-section">
            <h2>News</h2>
            <News />
          </section>

          <section className="ongoing-projects-section">
            <h2>Ongoing Projects</h2>
            <div className="project-card">
              <h3 className="project-title">
                Computational Limitations and Advantages of State-Space Models
                under Low Precision
              </h3>
              <div className="project-authors">
                <span className="author-name">Yifang Chen</span>,{" "}
                <a
                  href="https://zihanwang314.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-link"
                >
                  Zihan Wang
                </a>
                ,{" "}
                <a
                  href="https://scholar.google.com/citations?user=YN3tHZ4AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-link"
                >
                  Haochen Zhang
                </a>
                ,{" "}
                <a
                  href="https://www.cs.jhu.edu/~vova/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-link"
                >
                  Vladimir Braverman
                </a>
                ,{" "}
                <a
                  href="https://limanling.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-link"
                >
                  Manling Li
                </a>
                ,{" "}
                <a
                  href="https://2prime.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-link"
                >
                  Yiping Lu
                </a>
                ,{" "}
                <a
                  href="https://zhaoranwang.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-link"
                >
                  Zhaoran Wang
                </a>
              </div>
              <ul className="project-details">
                <li>
                  <strong>Finite Memory Collapse:</strong> Investigating how
                  Mamba fails at long-range tasks through the lens of floating
                  point precision.{" "}
                  <span className="acceptance-badge">
                    Accepted to{" "}
                    <a
                      href="https://transformerstheory.github.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="workshop-link"
                    >
                      NeurIPS'25 WCTD Workshop
                    </a>
                  </span>
                </li>
                <li>
                  <strong>Current Interest:</strong> Exploring circuit
                  complexity classes of SSMs with time-variant gating as
                  variables, and analyzing how different Chain-of-Thought (CoT)
                  lengths affect the circuit complexity classes of SSMs.
                </li>
              </ul>
            </div>
          </section>

          <section className="paper-section">
            <h2>Selected Publications</h2>
            <PublicationList></PublicationList>
            <Link to="/publications" className="view-all-link">
              → View full list of my research
            </Link>
          </section>

          <section className="service-section">
            <h2>Academic Services:</h2>
            <ul className="service-list">
              <li className="service-item">
                <strong>Reviewer</strong>
                <div className="service-tags">
                  <span className="service-tag">ICLR 2026</span>
                  <span className="service-tag">NeurIPS 2025 @ WCTD</span>
                </div>
              </li>
              <li className="service-item">
                <strong>Teaching Assistant</strong>
                <div className="service-tags">
                  <span className="service-tag">
                    CS-UY 2214: Computer Architecture and Organization
                  </span>{" "}
                  @ New York University
                </div>
              </li>
            </ul>
          </section>

          <section className="interests-section">
            <h2>Misc</h2>
            <ul className="misc-list">
              <li>
                I practice Brazilian Jiu-Jitsu and am proud to have earned my blue belt.{" "}
                <Link to="/gallery/bjj" className="bjj-gallery-link">
                  Check out my BJJ gallery →
                </Link>
              </li>
              <li>
                Ranked #61 nationally in PUBG Mobile China (和平精英)
              </li>
              <li>
                League of Legends player
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
