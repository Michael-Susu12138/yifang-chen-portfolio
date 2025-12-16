import React, { useState } from "react";
import { AdvancedImage, AdvancedVideo } from "@cloudinary/react";
import Navigation from "../../components/Navigation/Navigation";
import { cld } from "../../utils/cloudinary";
import "./Gallery.css";

const Pets = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Pet media - stored on Cloudinary with 'pets' tag (includes images and videos)
  const videoIds = ["IMG_2627_ikiwln", "IMG_2464_tzxl18", "221_ugqp5u"];
  
  const mediaIds = [
    "IMG_2627_ikiwln",
    "IMG_2683_m0x1tj",
    "IMG_9857_fjnp23",
    "IMG_4937_zfbuto",
    "IMG_4939_njho6s",
    "IMG_2464_tzxl18",
    "IMG_2902_gbskcp",
    "IMG_2755_tffrtf",
    "IMG_2717_f9hvmb",
    "IMG_2678_uoorzt",
    "IMG_2626_l5oleu",
    "IMG_2462_yswgvv",
    "IMG_2576_srduvn",
    "IMG_2220_chuf4m",
    "IMG_2217_vglawm",
    "IMG_2185_m4piei",
    "IMG_2166_poilkc",
    "IMG_2181_wumrkz",
    "IMG_2161_bg88qc",
    "IMG_2155_xwuqgw",
    "IMG_2160_gkk5hk",
    "IMG_2064_lve243",
    "IMG_1947_ha7onb",
    "IMG_1950_bgamvi",
    "IMG_1905_ayiv4w",
    "IMG_1841_nn06ae",
    "IMG_1826_c3iwc1",
    "IMG_1647_v3xh6p",
    "IMG_1679_cje5yj",
    "IMG_1616_qnsdv4",
    "IMG_0603_rtfx4b",
    "IMG_0766_aikhn0",
    "IMG_0656_thp4qv",
    "IMG_0244_awwmvt",
    "IMG_0121_puzwyl",
    "c99a706353faedaa7afc2290608f0aa7_e6omfq",
    "a43980afb79ca1d98cef519b2229e897_haomw5",
    "401b4dd640291def16cf838526e0627f_ebaxik",
    "292ad6654ee2c9ccf37d830025aec26c_jhdflv",
    "221_ugqp5u",
  ];

  const photos = mediaIds.map((id, index) => {
    const isVideo = videoIds.includes(id);
    return {
      id: index + 1,
      publicId: id,
      type: isVideo ? "video" : "image",
      media: isVideo ? cld.video(id) : cld.image(id),
      alt: "Pets",
      caption: "My Pets",
    };
  });

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
          <h1>My Pets</h1>
          <p className="gallery-subtitle">
            Photos of my furry friends
          </p>
        </div>

        {photos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#cccccc" }}>
            <p>Pet photos will be added soon!</p>
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
                  {photo.type === "video" ? (
                    <AdvancedVideo cldVid={photo.media} controls />
                  ) : (
                    <AdvancedImage cldImg={photo.media} alt={photo.alt} />
                  )}
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
                  {selectedImage.type === "video" ? (
                    <AdvancedVideo cldVid={selectedImage.media} controls autoPlay />
                  ) : (
                    <AdvancedImage cldImg={selectedImage.media} alt={selectedImage.alt} />
                  )}
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

export default Pets;

