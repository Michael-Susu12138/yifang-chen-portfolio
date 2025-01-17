import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ParticlesComponent from "../../components/ParticlesComponent/ParticlesComponent";
import MyCard from "../../components/Card/MyCard";
import PaperList from "../../components/PaperList/PaperList";
import ProfileImage from "/assets/selfie.jpg"; // Image of yourself
import ProjectList from "../../components/ProjectList/ProjectList";
import "./Home.css";

const Home = () => {
  return (
    <div className="app-container">
      <ParticlesComponent />
      <Sidebar />
      <main className="main-content">
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2>Yifang Chen "陈奕方" </h2>
              <p>
                I am Yifang Chen "陈奕方", a student with a strong focus on
                research in{" "}
                <strong>
                  Large Language Models, Machine Learning Theory, Transformers,
                  and Attention Mechanism.
                </strong>
              </p>
            </div>
            <div className="about-image">
              <img src={ProfileImage} alt="Yifang 'Michael' Chen" />
            </div>
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
                <span className="date">2024 - 2026</span>
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
          </ul>
        </section>

        <section className="paper-section">
          <h2>Papers</h2>
          <PaperList></PaperList>
          {/* <h2>Projects</h2>
          <ProjectList /> */}
        </section>
      </main>
    </div>
  );
};

export default Home;
