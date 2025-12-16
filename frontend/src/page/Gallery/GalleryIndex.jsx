import React from "react";
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import Navigation from "../../components/Navigation/Navigation";
import { cld } from "../../utils/cloudinary";
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
        "We come to the beautiful city of San Diego, and met with good friends and many great researchers",
      thumbnailId: "IMG_9057_aksrgo",
      thumbnail: cld.image("IMG_9057_aksrgo"),
      link: "/gallery/neurips2025",
      tag: "Conference",
      photoCount: 19,
    },
    {
      id: 2,
      title: "CPAL 2025",
      location: "Stanford University",
      date: "May 2025",
      description:
        "Attended the CPAL 2025 conference at Stanford University, and met with good friends and many great researchers",
      thumbnailId: "IMG_5680_zxzicx",
      thumbnail: cld.image("IMG_5680_zxzicx"),
      link: "/gallery/cpal2025",
      tag: "Conference",
      photoCount: 17,
    },
    {
      id: 3,
      title: "My Pets",
      location: "Home",
      date: "",
      description:
        "My lovely pets and their adorable moments, meet Luffy (2 years old): cocker spaniel, Dai Dai “呆呆” (3 years old): orange cat, and Sugar “糖糖” (4 months old): Ragdoll cat",
      thumbnailId: "IMG_2683_m0x1tj",
      thumbnail: cld.image("IMG_2683_m0x1tj"),
      link: "/gallery/pets",
      tag: "Personal",
      photoCount: 40,
    },
    {
      id: 4,
      title: "Brazilian Jiu-Jitsu",
      location: "China and USA",
      date: "2024-Ongoing",
      description:
        "I am glad that I have found the sport of my life and met with many great people along the way",
      thumbnailId: "b4a98af7d1f0acb6567c231e16569171_tjffni",
      thumbnail: cld.image("b4a98af7d1f0acb6567c231e16569171_tjffni"),
      link: "/gallery/bjj",
      tag: "Sports",
      photoCount: 12,
    },
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
                  <AdvancedImage
                    cldImg={gallery.thumbnail}
                    alt={gallery.title}
                  />
                  <div className="gallery-overlay-info">
                    <span className="photo-count">
                      {gallery.photoCount}{" "}
                      {gallery.photoCount === 1 ? "Photo" : "Photos"}
                    </span>
                  </div>
                </div>
                <div className="gallery-card-content">
                  <div className="gallery-card-header">
                    <h2>{gallery.title}</h2>
                    <span
                      className={`gallery-tag ${gallery.tag.toLowerCase()}`}
                    >
                      {gallery.tag}
                    </span>
                  </div>
                  <div className="gallery-meta">
                    <p className="gallery-location">📍 {gallery.location}</p>
                    <p className="gallery-date">📅 {gallery.date}</p>
                  </div>
                  <p className="gallery-description">{gallery.description}</p>
                  <div className="view-gallery-btn">View Gallery →</div>
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
