import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"; // Icons for location, email, and phone

import IpGlobe from "../IpGlobe/IpGlobe";

import OfficialImage from "/assets/official-removebg-preview.png";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="avatar">
          <img src={OfficialImage} alt="Yifang 'Michael' Chen" />
        </div>
        <h2>Yifang Chen</h2>
        <p className="description">MS student at the University of Chicago</p>
        <p className="research-interest">
          Research Interests:{" "}
          <strong>LLM, Machine Learning Theory, Formal Language Theory</strong>
        </p>
        {/* Contact Me Button */}
        <div className="contact-me-button-container">
          <a href="mailto:yifangc@uchicago.edu" className="contact-me-button">
            Contact Me
          </a>
        </div>
      </div>

      <div className="contact-info-bottom">
        <div className="contact-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
          <span>Chicago, IL</span>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span>michaelchen12138@gmail.com</span>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span>yifangc@uchicago.edu</span>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <span>(561) 990-9976</span>
        </div>
      </div>

      <div className="motto">
        {/* <p>"Innovation distinguishes between a leader and a follower."</p> */}
        {/* <IpGlobe></IpGlobe> */}
        <a href="https://clustrmaps.com/site/1c3hi" title="ClustrMaps">
          <img src="//www.clustrmaps.com/map_v2.png?d=MqSYHDjXgz0lKFdRxdOv4y4hnl1U8Ox1H8A-tf-ggEY&cl=ffffff" />
        </a>
      </div>

      <div className="social-links-bottom">
        <a
          href="https://scholar.google.com/citations?user=vWzFVaYAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          title="Google Scholar"
        >
          <FontAwesomeIcon icon={faGoogle} className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/yifang-michael-chen/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </a>
        <a
          href="https://github.com/Michael-Susu12138"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="icon" />
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
