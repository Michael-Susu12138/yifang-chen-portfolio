import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import Navigation from "../../components/Navigation/Navigation";
import { cld } from "../../utils/cloudinary";
import "./Gallery.css";

const CPAL2025 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Photos from CPAL 2025 - stored on Cloudinary with 'cpal2025' tag
  const photoIds = [
    "IMG_5688_bgdebe",
    "IMG_5686_dmkede",
    "IMG_5680_zxzicx",
    "IMG_5678_kyeep3",
    "IMG_5675_sf6zzb",
    "IMG_5677_pqisoz",
    "IMG_5660_qiirlj",
    "IMG_5519_eyqbco",
    "IMG_5674_k2kjsl",
    "IMG_5555_lwdl2z",
    "IMG_2114_dfb4tn",
    "IMG_2115_fdg7k7",
    "IMG_2124_o18fal",
    "IMG_2086_xhnnz4",
    "IMG_2145_e44kal",
    "IMG_2117_vtc2d9",
    "IMG_2116_hgkgys",
  ];

  const photos = photoIds.map((id, index) => ({
    id: index + 1,
    publicId: id,
    image: cld.image(id),
    alt: "CPAL 2025 - Stanford University",
    caption: "CPAL 2025",
  }));

  const openLightbox = (photo) => {
    setSelectedImage(photo);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    const currentIndex = photos.findIndex((p) => p.id === selectedImage.id);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedImage(photos[previousIndex]);
  };

  const handleNext = () => {
    const currentIndex = photos.findIndex((p) => p.id === selectedImage.id);
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(photos[nextIndex]);
  };

  return (
    <div className="gallery-page">
      <Navigation />
      <div className="gallery-container">
        <div className="gallery-header">
          <h1>CPAL 2025 - Stanford University</h1>
          <p className="gallery-subtitle">
            Conference on Parsimony and Learning
          </p>
          <p className="gallery-date">May 2025</p>
        </div>

        {photos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#cccccc" }}>
            <p>Gallery coming soon! Images will be added after the conference.</p>
          </div>
        ) : (
          <>
            <div className="photo-grid">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="photo-card"
                  onClick={() => openLightbox(photo)}
                >
                  <AdvancedImage cldImg={photo.image} alt={photo.alt} />
                  <div className="photo-overlay">
                    <p>{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedImage && (
              <div className="lightbox" onClick={closeLightbox}>
                <button
                  className="lightbox-close"
                  onClick={closeLightbox}
                  aria-label="Close"
                >
                  ×
                </button>
                <button
                  className="lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                  <AdvancedImage cldImg={selectedImage.image} alt={selectedImage.alt} />
                  <p className="lightbox-caption">{selectedImage.caption}</p>
                </div>
                <button
                  className="lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CPAL2025;

