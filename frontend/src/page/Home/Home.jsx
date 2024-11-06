import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ParticlesComponent from "../../components/ParticlesComponent/ParticlesComponent";
import MyCard from "../../components/Card/MyCard";
import PaperList from "../../components/PaperList/PaperList";
import ProfileImage from "/assets/selfie.jpg"; // Image of yourself
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
              <h2>Yifang "Michael" Chen</h2>
              <p>
                I am Yifang "Michael" Chen, a student with a strong focus on
                research in{" "}
                <strong>
                  LLM, Machine Learning Theory, Transformers, and Attention
                  Mechanism.
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
            <li>
              <strong>M.S. in Applied Data Science</strong>, University of
              Chicago <span className="date">2024 - 2026</span>
            </li>
            <li>
              <strong>B.S. in Computer Science</strong>, New York University{" "}
              <span className="date">2020 - 2024</span>
            </li>
          </ul>
        </section>
        <section className="paper-section">
          <h2>Research Papers</h2>
          {/* <PaperList /> */}
        </section>
      </main>
    </div>
  );
};

export default Home;
