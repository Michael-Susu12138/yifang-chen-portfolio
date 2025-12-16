import { Cloudinary } from "@cloudinary/url-gen";

// Create and configure your Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

// Helper function to get optimized image URL
export const getCloudinaryImageUrl = (publicId, options = {}) => {
  return cld.image(publicId).toURL();
};

