import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ParticlesComponent from "../../components/ParticlesComponent/ParticlesComponent";
import MyCard from "../../components/Card/MyCard";
import ProfileImage from "/assets/selfie.jpg"; // Image of yourself
import TongyiIcon from "/assets/tongyi_icon_nobg.png";
import UChicagoIcon from "/assets/uchicago_icon.png";
import ProjectList from "../../components/ProjectList/ProjectList";
import PublicationList from "../../components/PublicationList/PublicationList";
import News from "../../components/News/News";
import Navigation from "../../components/Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "./Home.css";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [educationExpanded, setEducationExpanded] = useState(false);
  const [industryExpanded, setIndustryExpanded] = useState(false);

  const educationItems = [
    {
      school: "University of Chicago",
      degree: "Ph.D. in Data Science",
      date: "2026 - Present",
      icon: "/assets/uchicago_icon.png",
      iconAlt: "University of Chicago",
    },
    {
      school: "University of Chicago",
      degree: "M.S. in Applied Data Science",
      date: "2024 - 2025",
      icon: "/assets/uchicago_icon.png",
      iconAlt: "University of Chicago",
    },
    {
      school: "New York University",
      degree: "B.S. in Computer Science",
      date: "2020 - 2024",
      icon: "/assets/nyu_icon.png",
      iconAlt: "New York University",
    },
    {
      school: "North Broward Preparatory School",
      degree: "High School",
      date: "2016 - 2020",
      icon: "/assets/nbps_icon.jpg",
      iconAlt: "North Broward Preparatory School",
    },
    {
      school: "Zhengzhou Foreign Language Middle School",
      degree: "Middle School",
      date: "2014 - 2016",
      icon: "/assets/zzflms.png",
      iconAlt: "Zhengzhou Foreign Language Middle School",
    },
  ];

  const displayedEducationItems = educationExpanded
    ? educationItems
    : educationItems.slice(0, 3);

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
                  a strong focus on building{" "}
                  <strong>
                    Efficient and Expressive Large Language Models
                  </strong>
                  .
                </p>
                <p>
                  I am a Data Science Ph.D. student at the University of
                  Chicago. During my master's, I was fortunate enough to be
                  advised by{" "}
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
                      src={UChicagoIcon}
                      alt="University of Chicago"
                      className="company-icon"
                    />
                    <p>
                      I am a <strong>Data Science Ph.D. student</strong> at the{" "}
                      <a
                        href="https://datascience.uchicago.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="affiliation-link"
                      >
                        University of Chicago
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
                {displayedEducationItems.map((item) => (
                  <li
                    className="education-item"
                    key={`${item.school}-${item.date}`}
                  >
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt={item.iconAlt}
                        className="school-icon"
                      />
                    ) : (
                      <div className="school-icon-placeholder">EDU</div>
                    )}
                    <div className="education-details">
                      <strong className="degree">{item.school}</strong>
                      <span className="school-name">{item.degree}</span>
                      <span className="date">{item.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {educationItems.length > 3 && (
                <div className="education-toggle-container">
                  <a
                    href="#"
                    className="education-toggle-link"
                    onClick={(event) => {
                      event.preventDefault();
                      setEducationExpanded(!educationExpanded);
                    }}
                  >
                    {educationExpanded ? "Show Less" : "View Full Education"}
                  </a>
                </div>
              )}
            </section>

            <section className="industry-section">
              <h2>Industry</h2>
              <ul className="industry-list">
                <li className="industry-item">
                  <div className="industry-header">
                    <img
                      src={TongyiIcon}
                      alt="Alibaba Tongyi Lab"
                      className="company-logo-icon"
                    />
                    <div className="industry-details">
                      <strong className="company-name">
                        Alibaba Tongyi Lab
                      </strong>
                      <span className="role-name">LLM Research Intern</span>
                      <span className="date">Feb 2026 - Aug 2026</span>
                    </div>
                    <div className="industry-location">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="location-pin"
                      />
                      <span>Hangzhou, China</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="industry-toggle"
                    aria-expanded={industryExpanded}
                    aria-controls="tongyi-experience-details"
                    onClick={() => setIndustryExpanded(!industryExpanded)}
                  >
                    {industryExpanded ? "Hide details" : "View details"}
                  </button>
                  {industryExpanded && (
                    <ul
                      id="tongyi-experience-details"
                      className="industry-highlights"
                    >
                      <li>
                        Researched efficient and hybrid LLM architectures,
                        including DeltaNet, Gated DeltaNet, Kimi Linear,
                        OLMo/OLMo Hybrid, Concept Models, Hyper-Connections and
                        mHC, and depth-recurrent Transformers.
                      </li>
                      <li>
                        Studied training-free inference-time looping, using
                        repeated intermediate layers to increase effective model
                        depth and improve reasoning without additional training.
                      </li>
                      <li>
                        Investigated looped Transformers with Logit Lens,
                        J-Lens, activation patching, and
                        intermediate-representation analysis.
                      </li>
                      <li>
                        Developed a dynamic halting strategy that detects
                        activation signatures across WC, WW, CC, and CW
                        transitions to determine when recurrent computation is
                        beneficial.
                      </li>
                      <li>
                        Analyzed hidden-state and prediction trajectories across
                        loops to improve the effectiveness and computational
                        efficiency of training-free depth recurrence.
                      </li>
                    </ul>
                  )}
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
