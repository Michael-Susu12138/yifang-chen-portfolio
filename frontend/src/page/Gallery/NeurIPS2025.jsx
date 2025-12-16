import React, { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./Gallery.css";

const NeurIPS2025 = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Photos from NeurIPS 2025
  const photos = [
    {
      id: 1,
      src: "/assets/neurips2025/IMG_9057.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 2,
      src: "/assets/neurips2025/IMG_2862.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 3,
      src: "/assets/neurips2025/IMG_2858.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 4,
      src: "/assets/neurips2025/IMG_2856.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 5,
      src: "/assets/neurips2025/IMG_8959.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 6,
      src: "/assets/neurips2025/IMG_8942.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 7,
      src: "/assets/neurips2025/IMG_8927.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 8,
      src: "/assets/neurips2025/IMG_8925.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 9,
      src: "/assets/neurips2025/IMG_8902.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 10,
      src: "/assets/neurips2025/IMG_2803.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 11,
      src: "/assets/neurips2025/IMG_2802.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 12,
      src: "/assets/neurips2025/IMG_2801.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 13,
      src: "/assets/neurips2025/IMG_2800.PNG",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 14,
      src: "/assets/neurips2025/IMG_2799.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 15,
      src: "/assets/neurips2025/IMG_2788.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 16,
      src: "/assets/neurips2025/IMG_2787.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 17,
      src: "/assets/neurips2025/IMG_2783.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 18,
      src: "/assets/neurips2025/IMG_2786.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
    {
      id: 19,
      src: "/assets/neurips2025/IMG_2785.jpeg",
      alt: "NeurIPS 2025 - San Diego",
      caption: "NeurIPS 2025",
    },
  ];

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
              <img src={photo.src} alt={photo.alt} />
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
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.alt} />
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

