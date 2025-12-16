import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import Navigation from "../../components/Navigation/Navigation";
import { cld } from "../../utils/cloudinary";
import "./Gallery.css";

const BJJ = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // BJJ photos - stored on Cloudinary with 'bjj' tag
  const photoIds = [
    // "IMG_4193_rty5xd",
    "IMG_2877_scv8qj",
    "IMG_2876_gvsqfm",
    "IMG_0794_arjss9",
    "fb5e981b5ac6906206c714a28f7aab13_vpqc73",
    "eeaced4dec64b404f27114df297690fa_dpw5j6",
    "d6ae26bc806f1363ac8ff0ea6231fdb1_e7apsv",
    "b96b21c0bd1f5d54bfc705e1de412ad4_rechpx",
    "b60cc6b896bce15550efa58c6b4ea35e_coghzh",
    "541d20aa6affadae1d1a478384510513_depm60",
    "b4a98af7d1f0acb6567c231e16569171_tjffni",
    "2f0ad84d-6852-4eab-b308-caaeb7aea132_c8kcwe",
  ];

  const photos = photoIds.map((id, index) => ({
    id: index + 1,
    publicId: id,
    image: cld.image(id),
    alt: "Brazilian Jiu-Jitsu",
    caption: "BJJ Training",
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
          <h1>Brazilian Jiu-Jitsu</h1>
          <p className="gallery-subtitle">Training and Competition Moments</p>
        </div>

        {photos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#cccccc",
            }}
          >
            <p>BJJ photos will be added soon!</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default BJJ;
