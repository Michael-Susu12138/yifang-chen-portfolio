import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">Yifang Chen</NavLink>
        </div>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Notes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
