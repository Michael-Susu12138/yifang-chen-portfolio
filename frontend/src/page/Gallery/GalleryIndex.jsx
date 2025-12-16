import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./GalleryIndex.css";

const GalleryIndex = () => {
  // Gallery collections - add new galleries here
  const galleries = [
    {
      id: 1,
      title: "NeurIPS 2025",
      location: "San Diego, California",
      date: "December 2025",
      description:
        "Conference on Neural Information Processing Systems - One of the premier conferences in machine learning and AI.",
      thumbnail: "/assets/neurips2025/IMG_9057.jpeg",
      link: "/gallery/neurips2025",
      tag: "Conference",
      photoCount: 19,
    },
    // Add more galleries here as you attend more events
    // {
    //   id: 2,
    //   title: "ICML 2025",
    //   location: "Vancouver, Canada",
    //   date: "July 2025",
    //   description: "International Conference on Machine Learning",
    //   thumbnail: "/assets/icml2025/photo1.jpg",
    //   link: "/gallery/icml2025",
    //   tag: "Conference",
    //   photoCount: 5,
    // },
  ];

  return (
    <div className="gallery-index-page">
      <Navigation />
      <div className="gallery-index-container">
        <div className="gallery-index-header">
          <h1>Photo Galleries</h1>
          <p className="gallery-index-subtitle">
            Moments from conferences, events, and research experiences
          </p>
        </div>

        <div className="galleries-grid">
          {galleries.map((gallery) => (
            <Link
              to={gallery.link}
              key={gallery.id}
              className="gallery-card-link"
            >
              <div className="gallery-index-card">
                <div className="gallery-thumbnail">
                  <img src={gallery.thumbnail} alt={gallery.title} />
                  <div className="gallery-overlay-info">
                    <span className="photo-count">
                      {gallery.photoCount} {gallery.photoCount === 1 ? "Photo" : "Photos"}
                    </span>
                  </div>
                </div>
                <div className="gallery-card-content">
                  <div className="gallery-card-header">
                    <h2>{gallery.title}</h2>
                    <span className={`gallery-tag ${gallery.tag.toLowerCase()}`}>
                      {gallery.tag}
                    </span>
                  </div>
                  <div className="gallery-meta">
                    <p className="gallery-location">📍 {gallery.location}</p>
                    <p className="gallery-date">📅 {gallery.date}</p>
                  </div>
                  <p className="gallery-description">{gallery.description}</p>
                  <div className="view-gallery-btn">
                    View Gallery →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {galleries.length === 0 && (
          <div className="no-galleries">
            <p>No galleries available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryIndex;

