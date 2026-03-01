import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ParticlesComponent from "../../components/ParticlesComponent/ParticlesComponent";
import MyCard from "../../components/Card/MyCard";
import ProfileImage from "/assets/selfie.jpg"; // Image of yourself
import AliCloudIcon from "/assets/alibabacloud-color.png";
import ProjectList from "../../components/ProjectList/ProjectList";
import PublicationList from "../../components/PublicationList/PublicationList";
import News from "../../components/News/News";
import Navigation from "../../components/Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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
                <p>During my master's, I was fortunate enough to be advised by{" "}
                  <a
                    href="https://2prime.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="collab-link"
                  >
                    Prof. Yiping Lu
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://limanling.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="collab-link"
                  >
                    Prof. Manling Li
                  </a>
                  .
                  </p>
                <div className="research-affiliation">
                  <div className="current-position">
                    <img
                      src={AliCloudIcon}
                      alt="Alibaba Cloud"
                      className="company-icon"
                    />
                    <p>
                      I am currently a{" "}
                      <strong>Multimodal LLM Intern</strong> at{" "}
                      <a
                        href="https://www.alibabacloud.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="affiliation-link"
                      >
                        Alibaba Cloud
                      </a>
                      .
                    </p>
                  </div>
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

          <div className="edu-industry-wrapper">
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
                    <span className="school-name">
                      B.S. in Computer Science
                    </span>
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

            <section className="industry-section">
              <h2>Industry</h2>
              <ul>
                <li className="industry-item">
                  <img
                    src={AliCloudIcon}
                    alt="Alibaba Cloud"
                    className="company-logo-icon"
                  />
                  <div className="industry-details">
                    <strong className="company-name">Alibaba Cloud</strong>
                    <span className="role-name">Multimodal LLM Intern</span>
                    <span className="date">Feb 2026 - Present</span>
                  </div>
                    <div className="industry-location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="location-pin" />
                      <span>Hangzhou, China</span>
                    </div>
                </li>
              </ul>
            </section>
          </div>

          <section className="news-section">
            <h2>News</h2>
            <News />
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
                I practice Brazilian Jiu-Jitsu and am proud to have earned my
                blue belt.{" "}
                <Link to="/gallery/bjj" className="bjj-gallery-link">
                  Check out my BJJ gallery →
                </Link>
              </li>
              {/* <li>
                Ranked #61 nationally in PUBG Mobile China (和平精英)
              </li>
              <li>
                League of Legends player
              </li> */}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
