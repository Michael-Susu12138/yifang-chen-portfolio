import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ParticlesComponent from "../../components/ParticlesComponent/ParticlesComponent";
import MyCard from "../../components/Card/MyCard";
import PaperList from "../../components/PaperList/PaperList";
import ProfileImage from "/assets/selfie.jpg"; // Image of yourself
import ProjectList from "../../components/ProjectList/ProjectList";
import PublicationList from "../../components/PublicationList/PublicationList";
import News from "../../components/News/News";
import Interests from "../../components/Interests/Interests";
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
                <h2>Yifang Chen "陈奕方" </h2>
                <p>
                  I am Yifang Chen "陈奕方", a student with a strong focus on
                  research in{" "}
                  <strong>
                    Large Language Models, Machine Learning Theory,
                    Transformers, and Attention Mechanism.
                  </strong>
                </p>
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
                if you'd like to build your own version — and a little credit is always appreciated.
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
                  <span className="date">2024 - Present</span>
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

          <section className="paper-section">
            <h2>Publications:</h2>
            <PublicationList></PublicationList>
          </section>
          <section className="paper-section">
            <h2>Manuscripts:</h2>
            <PaperList></PaperList>
          </section>

          <section className="interests-section">
            <h2>Misc. Interests</h2>
            <Interests />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
