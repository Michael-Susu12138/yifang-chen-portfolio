import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import Navigation from "../../components/Navigation/Navigation";
import { cld } from "../../utils/cloudinary";
import "./Gallery.css";

const NeurIPS2025 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Photos from NeurIPS 2025 - stored on Cloudinary with 'neurips2025' tag
  const photoIds = [
    "IMG_9057_aksrgo",
    "IMG_8959_iddqdx",
    "IMG_8942_xuzwsu",
    "IMG_2800_to9yt5",
    "IMG_8902_gbmgzs",
    "IMG_8925_rgadp7",
    "IMG_8927_whva28",
    "IMG_2862_zrsvp2",
    "IMG_2856_sur9qm",
    "IMG_2803_nv3du5",
    "IMG_2858_x5ulek",
    "IMG_2801_yszny3",
    "IMG_2802_oxnkma",
    "IMG_2799_ved9zi",
    "IMG_2785_zxbnhf",
    "IMG_2787_kegtcx",
    "IMG_2788_z1cfkm",
    "IMG_2783_gabvir",
    "IMG_2786_qlr8sc",
  ];

  const photos = photoIds.map((id, index) => ({
    id: index + 1,
    publicId: id, // Cloudinary folder structure
    image: cld.image(id),
    alt: "NeurIPS 2025 - San Diego",
    caption: "NeurIPS 2025",
  }));

  const openLightbox = (photo) => {
    setSelectedImage(photo);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    const currentIndex = photos.findIndex((p) => p.id === selectedImage.id);
    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
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
          <h1>NeurIPS 2025 - San Diego</h1>
          <p className="gallery-subtitle">
            Conference on Neural Information Processing Systems
          </p>
          <p className="gallery-date">December 2025</p>
        </div>

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

        {/* Lightbox Modal */}
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
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <AdvancedImage
                cldImg={selectedImage.image}
                alt={selectedImage.alt}
              />
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
      </div>
    </div>
  );
};

export default NeurIPS2025;
