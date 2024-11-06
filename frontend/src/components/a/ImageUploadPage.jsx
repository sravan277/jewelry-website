// /components/ImageUploadPage/ImageUploadPage.jsx
import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageGallery from "./ImageGallery";
import { fetchImages } from "./ImageUploadService"; // Ensure this service is correctly set up
import styles from "./ImageUploadStyles";

const ImageUploadPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages(); // Load images on component mount
  }, []);

  const loadImages = async () => {
    const fetchedImages = await fetchImages();
    setImages(fetchedImages);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Convert your dreams into Reality</h2>
      <ImageUploader loadImages={loadImages} />
      <ImageGallery images={images} loadImages={loadImages} />
    </div>
  );
};

export default ImageUploadPage;
