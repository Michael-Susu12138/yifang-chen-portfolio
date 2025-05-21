import React from "react";
import "./Interests.css";
// Adjust the path to your BJJ image once you have one
// import BJJImage from "/assets/bjj.jpg";

const Interests = () => {
  return (
    <div className="interests-container">
      <div className="interests-content">
        <div className="interests-text">
          <h3>Martial Arts</h3>
          <p>
            Outside of academic pursuits, I am passionate about martial arts.
            I've been actively training in:
          </p>
          <ul className="martial-arts-list">
            <li>
              <span className="martial-art">Brazilian Jiu-Jitsu</span>
              <span className="description">
                <strong>Blue Belt</strong> • Ground fighting and submission
                grappling
              </span>
            </li>
            <li>
              <span className="martial-art">Boxing</span>
              <span className="description">
                Developing striking technique and footwork
              </span>
            </li>
            <li>
              <span className="martial-art">Kickboxing</span>
              <span className="description">Expanding my striking arsenal</span>
            </li>
          </ul>
          <p className="highlight-text">
            BJJ has become my primary focus, and I'm proud to have earned my
            blue belt through consistent training and dedication.
          </p>
        </div>

        <div className="interests-image">
          {/* Replace this with your actual BJJ image */}
          <img src="/assets/bjj_blue.jpg" alt="Brazilian Jiu-Jitsu Training" />
          <div className="belt-caption">Blue Belt</div>
        </div>
      </div>
    </div>
  );
};

export default Interests;
